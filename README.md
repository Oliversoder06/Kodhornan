Kodhörnan is a focused learning platform that teaches basic C# programming concepts with a simple, predictable user experience.

Design Goals

- Predictable workflows and clear instructions
- Low cognitive load: minimal UI, tiny lessons
- Immediate feedback on exercises

Quick start

1. Open two terminals.
2. In one terminal, start the compiler service:

```powershell
cd compiler
dotnet run
```

3. In the other terminal, install dependencies and run the client:

```powershell
cd client
npm install
npm run dev
```

Project layout (high level)

- `client/` — Next.js frontend and UI components
- `compiler/` — .NET service that compiles and runs submitted code
- `shared/` — shared exercise data and generators
- `scripts/` — helper scripts used during development
