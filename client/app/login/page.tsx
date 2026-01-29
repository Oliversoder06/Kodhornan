"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h1 style={{ marginBottom: 24 }}>Logga in</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>E-post</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </div>
        {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loggar in..." : "Logga in"}
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: "center" }}>
        Har du inget konto?{" "}
        <a href="/signup" style={{ color: "#22c55e" }}>
          Registrera dig
        </a>
      </p>
    </div>
  );
}
