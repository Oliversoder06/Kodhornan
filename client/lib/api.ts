const API_URL = process.env.NEXT_PUBLIC_COMPILER_URL;

export async function runCode(code: string): Promise<{ output: string; error: string }> {
  // Dev only: log compiler URL for verification
  console.log("Compiler URL:", process.env.NEXT_PUBLIC_COMPILER_URL);
  
  try {
    const response = await fetch(`${API_URL}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      return { output: "", error: "Serverfel: kunde inte köra kod" };
    }

    const data = await response.json();
    return { output: data.output || "", error: data.error || "" };
  } catch (error) {
    return { output: "", error: "Kunde inte ansluta till servern" };
  }
}
