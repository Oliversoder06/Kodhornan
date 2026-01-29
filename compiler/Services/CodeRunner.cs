using System.Reflection;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;

namespace Compiler.Services;

public class CodeRunner
{
    public CodeRunResult Run(string code)
    {
        try
        {
            // Wrap user code in a simple program structure with using System
            var programCode = $@"
using System;

class Program
{{
    static void Main(string[] args)
    {{
        {code}
    }}
}}";

            // Parse the code
            var syntaxTree = CSharpSyntaxTree.ParseText(programCode);

            // Reference only System and System.Console
            var references = new[]
            {
                MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
                MetadataReference.CreateFromFile(typeof(Console).Assembly.Location),
                MetadataReference.CreateFromFile(Assembly.Load("System.Runtime").Location),
            };

            // Compile with restrictions
            var compilation = CSharpCompilation.Create(
                "UserCode",
                new[] { syntaxTree },
                references,
                new CSharpCompilationOptions(
                    OutputKind.ConsoleApplication,
                    allowUnsafe: false
                )
            );

            // Check for compilation errors
            var diagnostics = compilation.GetDiagnostics();
            var errors = diagnostics.Where(d => d.Severity == DiagnosticSeverity.Error).ToList();
            
            if (errors.Any())
            {
                var errorMessages = string.Join("\n", errors.Select(e => e.GetMessage()));
                return new CodeRunResult { Error = errorMessages };
            }

            // Emit to memory
            using var ms = new MemoryStream();
            EmitResult result = compilation.Emit(ms);

            if (!result.Success)
            {
                var failures = result.Diagnostics.Where(d => d.Severity == DiagnosticSeverity.Error);
                var errorMessages = string.Join("\n", failures.Select(f => f.GetMessage()));
                return new CodeRunResult { Error = errorMessages };
            }

            // Execute the code with output capture
            ms.Seek(0, SeekOrigin.Begin);
            var assembly = Assembly.Load(ms.ToArray());
            
            var output = new StringBuilder();
            var originalOut = Console.Out;
            
            try
            {
                using var writer = new StringWriter(output);
                Console.SetOut(writer);
                
                // Execute with timeout
                var entryPoint = assembly.EntryPoint;
                if (entryPoint == null)
                {
                    return new CodeRunResult { Error = "Inget startpunkt hittades i koden" };
                }

                entryPoint.Invoke(null, new object[] { Array.Empty<string>() });
                
                return new CodeRunResult { Output = output.ToString().TrimEnd() };
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException?.Message ?? ex.Message;
                return new CodeRunResult { Error = $"Körningsfel: {errorMessage}" };
            }
            finally
            {
                Console.SetOut(originalOut);
            }
        }
        catch (Exception ex)
        {
            return new CodeRunResult { Error = $"Oväntat fel: {ex.Message}" };
        }
    }
}

public class CodeRunResult
{
    public string Output { get; set; } = "";
    public string Error { get; set; } = "";
}
