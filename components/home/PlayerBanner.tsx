"use client";

interface PlayerBannerProps {
  playerName: string;
  hasPreviousRoom: boolean;
  reEnterLoading: boolean;
  onReEnter: () => void;
  onReset: () => void;
}

export default function PlayerBanner({
  playerName,
  hasPreviousRoom,
  reEnterLoading,
  onReEnter,
  onReset,
}: PlayerBannerProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-white/60 bg-white/75 backdrop-blur-xl px-5 py-3.5 shadow-xl">
      {/* Avatar + name */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-900 font-black text-sm shadow-md shrink-0">
          {playerName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-slate-600">
          Playing as{" "}
          <span className="font-bold text-slate-900">{playerName}</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-row gap-2 w-full sm:w-auto">
        {hasPreviousRoom && (
          <button
            onClick={onReEnter}
            disabled={reEnterLoading}
            className="flex-1 sm:flex-none rounded-xl border border-emerald-300 bg-emerald-100/80 px-3 py-1.5 text-[10px] font-semibold text-emerald-900 transition-all hover:bg-emerald-200/80 active:scale-95 disabled:opacity-50 sm:px-4 sm:py-2 sm:text-xs"
          >
            {reEnterLoading ? "Re-entering…" : "↩ Re-enter Last Room"}
          </button>
        )}
        <button
          onClick={onReset}
          className="flex-1 sm:flex-none rounded-xl border border-white/70 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition-all hover:text-slate-900 hover:border-white active:scale-95 sm:px-4 sm:py-2 sm:text-xs"
        >
          Change Name
        </button>
      </div>
    </div>
  );
}