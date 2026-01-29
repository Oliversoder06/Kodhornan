import { ExerciseBoard } from "../components/ExerciseBoard";

export default function Home() {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-8">
      <header className="text-center mb-20 pt-16 relative">
        <h1 className="text-6xl mb-4 font-extrabold pb-2 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Kodhörnan
        </h1>
        <p className="text-slate-400 text-xl max-w-[600px] mx-auto font-normal">
          Lär dig programmera C# steg för steg
        </p>
      </header>
      
      <ExerciseBoard />
    </div>
  );
}
