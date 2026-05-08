"use client";

import type { PlayerSummary } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuickChatMenu from "@/components/room/QuickChatMenu";

type PlayerListProps = {
  players: PlayerSummary[];
  currentPlayerId?: string;
  activeQuickChats?: Record<string, string>;
  onSendQuickChat?: (message: string) => Promise<void> | void;
};

export default function PlayerList({
  players,
  currentPlayerId,
  activeQuickChats = {},
  onSendQuickChat,
}: PlayerListProps) {
  function getPlayerStyle(player: PlayerSummary) {
    if (player.player_id === currentPlayerId) {
      return {
        container: "border-emerald-300 bg-emerald-100/70",
        meta: "text-emerald-900",
      };
    }

    if (player.is_host) {
      return {
        container: "border-amber-300 bg-amber-100/70",
        meta: "text-amber-900",
      };
    }

    return {
      container: "border-rose-300 bg-rose-100/70",
      meta: "text-rose-900",
    };
  }

  return (
    <Card className="overflow-visible rounded-3xl border border-white/60 bg-white/70 shadow-xl backdrop-blur-xl">
      <CardHeader className="px-4 pb-2 sm:px-6">
        <CardTitle className="text-lg font-semibold text-slate-900">Players</CardTitle>
        <p className="text-xs text-slate-500">Live lobby status</p>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4 sm:px-6">
        {players.map((player) => {
          const style = getPlayerStyle(player);
          const isCurrentPlayer = player.player_id === currentPlayerId;
          const quickChat = activeQuickChats[player.player_id];

          return (
            <div
              key={player.player_id}
              className={`rounded-2xl border px-4 py-3 shadow-sm transition hover:shadow-md ${style.container}`}
            >
              <div className="flex items-start justify-between gap-2 sm:items-center">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {player.player_name}
                  </div>
                  <div className={`text-xs ${style.meta}`}>
                    {player.is_host ? "Host" : "Player"} · {player.connected ? "Connected" : "Disconnected"}
                  </div>
                  {quickChat ? (
                    <div className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm max-w-[70%]">
                      <span className="text-slate-500">💬</span>
                      <span className="whitespace-normal break-words break-all">{quickChat}</span>
                    </div>
                  ) : null}
                </div>

                {isCurrentPlayer ? (
                  <div className="self-start sm:self-center">
                    <QuickChatMenu onSendQuickChat={onSendQuickChat} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}