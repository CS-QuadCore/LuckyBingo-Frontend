"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type JoinRoomFormProps = {
  onSubmit: (roomCode: string) => Promise<void>;
  loading?: boolean;
};

export default function JoinRoomForm({
  onSubmit,
  loading = false,
}: JoinRoomFormProps) {
  const [roomCode, setRoomCode] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSubmit(roomCode.trim().toUpperCase());
  }

  return (
    <Card className="rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-base text-slate-900">Join Room</CardTitle>
        <CardDescription className="text-slate-500">Enter room code to join.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Room code
            </label>
            <Input
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="Enter room code"
              required
              className="border-white/70 bg-white/70 text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:border-sky-300 focus-visible:ring-sky-200/60"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-sky-500 text-white hover:bg-sky-600"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Room"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}