import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 p-6">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center shadow-xl">
        <div className="text-7xl mb-4 animate-bounce select-none">👾</div>
        <h1 className="text-3xl text-slate-100 font-bold mb-2">
          404 — Här blev det tomt!
        </h1>
        <p className="text-slate-400 mb-6">
          Sidan du letar efter verkar ha tagit en fika med din kod.
        </p>

        <pre className="text-xs text-slate-500 bg-black/40 rounded-md p-3 mb-6 overflow-x-auto">
          Error: PageNotFound: path not found (╯°□°)╯︵ ┻━┻
        </pre>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition"
          >
            Ta mig hem
          </Link>
        </div>
      </div>
    </div>
  );
}
