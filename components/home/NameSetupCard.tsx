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
    <div className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Before you start
      </p>
      <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
        What should we call you?
      </h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={draftName}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your name"
          required
          className="flex-1 rounded-xl border border-white/70 bg-white/70 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 focus:bg-white"
        />
        <button
          type="submit"
          className="w-full sm:w-auto rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 active:scale-95 transition-all"
        >
          Continue →
        </button>
      </form>
    </div>
  );
}