import Link from "next/link";
import { ArrowLeft, Compass, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#06080e] text-white text-center relative overflow-hidden">
      <div className="absolute w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs">
          <Compass className="w-3.5 h-3.5" />
          <span>ERR_404 // ROUTE_NOT_FOUND</span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-mono font-bold tracking-tight text-gradient-cyan">
          404
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          The requested route or resource does not exist in this deployment cluster.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
