import Image from "next/image";
import logo from "@/components/assets/logo.svg";

export default function HomeHero() {
  return (
    <section className="py-2 text-center">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 sm:gap-2">
        <div className="flex items-center justify-center">
          <Image src={logo} alt="LuckyBingo logo" width={300} height={300} priority />
        </div>
        <div>
          <p className=" text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Real-time Multiplayer
          </p>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-white sm:text-base">
          Create a bingo room, invite players, and play together in real time. Have fun and may luck be on your side!
        </p>
      </div>
    </section>
  );
}