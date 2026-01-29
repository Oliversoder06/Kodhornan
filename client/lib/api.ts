const API_URL = "http://localhost:5000";

export async function runCode(code: string): Promise<{ output: string; error: string }> {
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
