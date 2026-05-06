"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import HomeHero from "@/components/home/HomeHero";
import NameSetupCard from "@/components/home/NameSetupCard";
import PlayerBanner from "@/components/home/PlayerBanner";
import CreateRoomForm from "@/components/home/CreateRoomForm";
import JoinRoomForm from "@/components/home/JoinRoomForm";
import QuickPlayModal from "@/components/modals/QuickPlayModal";
import backgroundScene from "@/components/assets/background.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { createRoom, getPublicRooms, joinRoom, reEnterRoom } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();

  const [playerName, setPlayerName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [identityReady, setIdentityReady] = useState(false);
  const [error, setError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [reEnterLoading, setReEnterLoading] = useState(false);
  const [hasPreviousRoom, setHasPreviousRoom] = useState(false);
  const [quickPlayModalOpen, setQuickPlayModalOpen] = useState(false);

  useEffect(() => {
    let playerId = localStorage.getItem("player_id");
    const storedName = localStorage.getItem("player_name") || "";
    const storedRoom = localStorage.getItem("room_code");

    if (!playerId) {
      playerId = crypto.randomUUID();
      localStorage.setItem("player_id", playerId);
    }

    setPlayerName(storedName);
    setDraftName(storedName);
    setHasPreviousRoom(!!storedRoom);
    setIdentityReady(true);
  }, []);

  function handleSaveName(e: FormEvent) {
    e.preventDefault();
    const normalizedName = draftName.trim();
    if (!normalizedName) { setError("Name is required"); return; }
    localStorage.setItem("player_name", normalizedName);
    setPlayerName(normalizedName);
    setError("");
  }

  function handleClearLocalStorage() {
    localStorage.clear();
    localStorage.setItem("player_id", crypto.randomUUID());
    setPlayerName("");
    setDraftName("");
    setError("");
    setHasPreviousRoom(false);
    setIdentityReady(true);
  }

  async function handleCreateRoom(visibility: "public" | "private") {
    setError("");
    setCreateLoading(true);
    try {
      const playerId = localStorage.getItem("player_id") || "";
      const name = localStorage.getItem("player_name") || "";
      if (!playerId || !name) throw new Error("Player identity not initialized");
      const data = await createRoom(name, playerId, visibility);
      localStorage.setItem("player_id", data.player_id);
      localStorage.setItem("room_code", data.room_code);
      localStorage.setItem("player_card", JSON.stringify(data.card));
      router.push(`/room/${data.room_code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create room");
    } finally {
      setCreateLoading(false);
    }
  }

  async function handleJoinRoom(roomCode: string) {
    setError("");
    setJoinLoading(true);
    try {
      const playerId = localStorage.getItem("player_id") || "";
      const name = localStorage.getItem("player_name") || "";
      if (!playerId || !name) throw new Error("Player identity not initialized");
      const data = await joinRoom(roomCode, playerId, name);
      localStorage.setItem("player_id", data.player_id);
      localStorage.setItem("room_code", data.room_code);
      localStorage.setItem("player_card", JSON.stringify(data.card));
      router.push(`/room/${data.room_code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join room");
    } finally {
      setJoinLoading(false);
    }
  }

  async function handleQuickPlay() {
    setError("");
    try {
      const rooms = await getPublicRooms();
      if (rooms.length === 0) {
        setQuickPlayModalOpen(true);
        return;
      }
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
      await handleJoinRoom(randomRoom.room_code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to quick play");
    }
  }


  async function handleReEnter() {
    setError("");
    setReEnterLoading(true);
    try {
      const playerId = localStorage.getItem("player_id") || "";
      const roomCode = localStorage.getItem("room_code") || "";
      if (!playerId || !roomCode) throw new Error("No previous session found");
      const data = await reEnterRoom(roomCode, playerId);
      localStorage.setItem("player_card", JSON.stringify(data.card));
      router.push(`/room/${roomCode}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to re-enter room");
    } finally {
      setReEnterLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-sky-100 px-4 py-6 sm:px-6">
      <Image
        src={backgroundScene}
        alt="LuckyBingo background"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10 mx-auto max-w-5xl space-y-4">
        <HomeHero />

        {/* NAME SETUP */}
        {identityReady && !playerName && (
          <NameSetupCard
            draftName={draftName}
            onChange={setDraftName}
            onSubmit={handleSaveName}
          />
        )}

        {/* MAIN CONTENT */}
        {playerName && (
          <>
            <PlayerBanner
              playerName={playerName}
              hasPreviousRoom={hasPreviousRoom}
              reEnterLoading={reEnterLoading}
              onReEnter={handleReEnter}
              onReset={handleClearLocalStorage}
            />

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
                  onClick={handleQuickPlay}
                  disabled={joinLoading}
                  className="w-full sm:w-auto rounded-xl border border-yellow-300 bg-yellow-200 px-6 py-2.5 text-sm font-semibold text-yellow-900 hover:bg-yellow-300 hover:border-yellow-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
                >
                  {joinLoading ? "Joining…" : "Find a room →"}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <CreateRoomForm onSubmit={handleCreateRoom} loading={createLoading} />
              <JoinRoomForm onSubmit={handleJoinRoom} loading={joinLoading} />
            </div>

            
          </>
        )}

        <p className="text-center text-xs pt-6 font-light text-slate-500">
          © QuadCore 2026
        </p>
      </div>

      <QuickPlayModal
        open={quickPlayModalOpen}
        onClose={() => setQuickPlayModalOpen(false)}
      />
    </main>
  );
}