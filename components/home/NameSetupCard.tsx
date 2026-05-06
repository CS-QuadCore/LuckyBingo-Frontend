"use client";

import { FormEvent } from "react";

interface NameSetupCardProps {
  draftName: string;
  onChange: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function NameSetupCard({
  draftName,
  onChange,
  onSubmit,
}: NameSetupCardProps) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-3 shadow-xl backdrop-blur-xl sm:p-6">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
        Before you start
      </p>
      <h2 className="mb-3 font-display text-lg font-bold text-slate-900 sm:mb-4 sm:text-xl">
        What should we call you?
      </h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <input
          value={draftName}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your name"
          required
          className="flex-1 rounded-xl border border-white/70 bg-white/70 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 focus:bg-white sm:py-2.5"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-95 sm:w-auto sm:px-6 sm:py-2.5"
        >
          Continue →
        </button>
      </form>
    </div>
  );
}