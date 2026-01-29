using Microsoft.AspNetCore.Mvc;
using Compiler.Services;

namespace Compiler.Controllers;

[ApiController]
[Route("[controller]")]
public class RunController : ControllerBase
{
    private readonly CodeRunner _codeRunner;

    public RunController()
    {
        _codeRunner = new CodeRunner();
    }

    [HttpPost]
    public IActionResult Post([FromBody] RunRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Code))
        {
            return BadRequest(new { error = "Ingen kod angiven" });
        }

        var result = _codeRunner.Run(request.Code);
        return Ok(new { output = result.Output, error = result.Error });
    }
}

public class RunRequest
{
    public string Code { get; set; } = "";
}
