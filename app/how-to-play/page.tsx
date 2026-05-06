import Link from "next/link";

const STEPS = [
  {
    title: "Set your name",
    detail: "Pick a player name so the room can track your card and wins.",
  },
  {
    title: "Create or join",
    detail: "Host a new room or join with a room code from a friend.",
  },
  {
    title: "Mark your card",
    detail: "Tap called numbers on your card. FREE is always marked.",
  },
  {
    title: "Claim bingo",
    detail: "Hit Claim Bingo when you complete the win pattern.",
  },
];

const HOST_TIPS = [
  "Pick a win pattern before the first number is called.",
  "Use the Call Number button to draw each new number.",
  "Restart the session to play another round with fresh cards.",
];

const PLAYER_TIPS = [
  "Listen for the current number and mark it fast.",
  "Use quick chat to celebrate or alert the room.",
  "If you leave, you can re-enter from the home screen.",
];

export default function HowToPlayPage() {
  return (
    <main className="min-h-screen bg-[#F7F2EC] px-5 pb-16 pt-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
              Guide
            </p>
            <h1 className="font-display text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
              How to play LuckyBingo
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-stone-500 sm:text-base">
              Start a room, join friends, and chase the winning pattern together.
            </p>
          </div>
          <Link
            href="/"
            className="hidden rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs font-semibold text-stone-600 shadow-sm transition hover:border-stone-300 hover:text-stone-800 sm:inline-flex"
          >
            Back home
          </Link>
        </header>

        <section className="rounded-3xl bg-white/80 p-5 shadow-xl ring-1 ring-stone-100 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-stone-100 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h2 className="text-base font-semibold text-stone-900">
                    {step.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm text-stone-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/90 p-5 shadow-lg ring-1 ring-stone-100 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Host tips
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              {HOST_TIPS.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white/90 p-5 shadow-lg ring-1 ring-stone-100 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
              Player tips
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              {PLAYER_TIPS.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-100 via-amber-100 to-rose-100 p-5 text-center shadow-lg sm:p-8">
          <h2 className="font-display text-2xl font-bold text-stone-900">
            Ready to play?
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Create a room or join your friends and start calling numbers.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-full bg-stone-900 px-6 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-sm transition hover:bg-stone-800"
          >
            Go to lobby
          </Link>
        </section>

        <Link
          href="/"
          className="inline-flex rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs font-semibold text-stone-600 shadow-sm transition hover:border-stone-300 hover:text-stone-800 sm:hidden"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
