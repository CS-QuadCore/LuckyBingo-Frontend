"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type CreateRoomFormProps = {
  onSubmit: (visibility: "public" | "private") => Promise<void>;
  loading?: boolean;
};

export default function CreateRoomForm({
  onSubmit,
  loading = false,
}: CreateRoomFormProps) {
  const [visibility, setVisibility] = useState<"public" | "private">("private");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSubmit(visibility);
  }

  return (
    <Card className="rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-base text-slate-900">Create Room</CardTitle>
        <CardDescription className="text-slate-500">
          Start a new bingo room as the host.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Room visibility
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={visibility === "private" ? "default" : "outline"}
                onClick={() => setVisibility("private")}
                disabled={loading}
                className={
                  visibility === "private"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "border-white/60 bg-white/70 text-slate-700 hover:bg-white"
                }
              >
                Private
              </Button>
              <Button
                type="button"
                variant={visibility === "public" ? "default" : "outline"}
                onClick={() => setVisibility("public")}
                disabled={loading}
                className={
                  visibility === "public"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "border-white/60 bg-white/70 text-slate-700 hover:bg-white"
                }
              >
                Public
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              Public rooms appear in the active lobby list. Private rooms can only be joined by room code.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Room"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}