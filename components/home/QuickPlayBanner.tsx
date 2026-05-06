"use client";

interface QuickPlayBannerProps {
  loading: boolean;
  onQuickPlay: () => void;
}

export default function QuickPlayBanner({ loading, onQuickPlay }: QuickPlayBannerProps) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-xl backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 text-sm font-black shadow shadow-yellow-200 shrink-0">
            ↯
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-sm">Quick Play</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Instantly drop into a random public room.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onQuickPlay}
          disabled={loading}
          className="w-full sm:w-auto rounded-xl border border-yellow-300 bg-yellow-200 px-6 py-2.5 text-sm font-semibold text-yellow-900 hover:bg-yellow-300 hover:border-yellow-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
        >
          {loading ? "Joining…" : "Find a room →"}
        </button>
      </div>
    </div>
  );
}