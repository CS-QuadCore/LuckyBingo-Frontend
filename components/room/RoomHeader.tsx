"use client";

import { useState } from "react";
import type { RoomSnapshot } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WinPattern } from "@/lib/types";
import { cn } from "@/lib/utils";

const WIN_PATTERN_OPTIONS: Array<{ value: WinPattern; label: string }> = [
  { value: "DEFAULT", label: "Any Line (Default)" },
  { value: "HORIZONTAL_ONLY", label: "Horizontal Only" },
  { value: "VERTICAL_ONLY", label: "Vertical Only" },
  { value: "DIAGONAL_ONLY", label: "Diagonal Only" },
  { value: "CROSS", label: "Cross" },
  { value: "X_PATTERN", label: "X Pattern" },
  { value: "FOUR_CORNERS", label: "Four Corners" },
  { value: "FULL_BLACKOUT", label: "Full Blackout" },
  { value: "PICTURE_FRAME", label: "Picture Frame" },
];

type RoomHeaderProps = {
  room: RoomSnapshot;
  isHost: boolean;
  actionLoading: boolean;
  showCallNumber?: boolean;
  onCallNumber: () => Promise<void>;
  onLeave: () => void;
  onEndSession: () => Promise<void>;
  onRestartSession: () => Promise<void>;
  onRefreshCards: () => Promise<void>;
  onWinPatternChange: (pattern: WinPattern) => Promise<void>;
};

export default function RoomHeader({
  room,
  isHost,
  actionLoading,
  showCallNumber = true,
  onCallNumber,
  onLeave,
  onEndSession,
  onRestartSession,
  onRefreshCards,
  onWinPatternChange,
}: RoomHeaderProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Card className="rounded-3xl border-none bg-white/70 backdrop-blur-xl shadow-xl">
      <Collapsible open={!collapsed} onOpenChange={(open) => setCollapsed(!open)}>
        <CardContent
          className={cn(
            "flex flex-col",
            collapsed ? "p-4 sm:p-5 gap-3" : "p-3 sm:p-5 gap-2 sm:gap-5"
          )}
        >
          {/* TOP INFO */}
          <div
            className={cn(
              "flex items-start justify-between",
              collapsed ? "gap-4" : "flex-col gap-2 sm:flex-row sm:items-center"
            )}
          >
            {/* LEFT */}
            <div className="flex w-full items-start justify-between gap-2 sm:w-auto">
              <div>
                <h1
                  className={cn(
                    "font-extrabold tracking-tight text-slate-900",
                    collapsed ? "text-lg sm:text-3xl" : "text-base sm:text-3xl"
                  )}
                >
                  Room {room.room_code}
                </h1>
                {!collapsed ? (
                  <p className="text-[9px] sm:text-xs text-slate-500 uppercase tracking-wide">
                    {room.status}
                  </p>
                ) : null}
              </div>
              {!collapsed ? (
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 rounded-full px-2 text-[10px] sm:hidden"
                  >
                    Hide
                  </Button>
                </CollapsibleTrigger>
              ) : null}
            </div>

            {/* RIGHT - CURRENT NUMBER */}
            <div className="flex items-center gap-2 sm:justify-end">
              {!collapsed ? (
                <div className="flex flex-col sm:items-end">
                  <span className="text-[9px] sm:text-xs text-slate-500">Current</span>
                  <div className="text-base sm:text-2xl font-bold text-emerald-600">
                    {room.current_number ?? "--"}
                  </div>
                </div>
              ) : null}
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full px-3 text-[11px] sm:text-xs underline",
                    collapsed ? "h-8" : "hidden sm:inline-flex h-8"
                  )}
                >
                  {collapsed ? "Show" : "Hide"}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent>
            {/* WIN PATTERN */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-[11px] sm:text-sm text-slate-500 whitespace-nowrap">
                Win Pattern
              </span>

              {/* SELECT */}
              {isHost ? (
                <Select
                  value={room.win_pattern}
                  onValueChange={(value) =>
                    onWinPatternChange(value as WinPattern)
                  }
                  disabled={
                    actionLoading || room.status === "finished" ||
                    (room.called_numbers && room.called_numbers.length > 0)
                  }
                >
                  <SelectTrigger className="w-full sm:w-64 rounded-lg bg-white shadow-sm text-[11px] sm:text-xs">
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    {WIN_PATTERN_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full sm:w-64 rounded-lg bg-white px-3 py-2 text-xs sm:text-sm shadow-sm text-slate-700 ">
                  {WIN_PATTERN_OPTIONS.find(
                    (pattern) => pattern.value === room.win_pattern
                  )?.label}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-4">
              {isHost && showCallNumber ? (
                <Button
                  onClick={onCallNumber}
                  disabled={actionLoading || room.status === "finished"}
                  className="h-8 sm:h-11 rounded-lg bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-emerald-600 transition"
                >
                  Call Number
                </Button>
              ) : null}

              {/* HOST SECONDARY */}
              {isHost && (
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button
                    onClick={onRestartSession}
                    disabled={actionLoading || room.status !== "finished"}
                    className="h-8 sm:h-10 rounded-lg bg-yellow-400 text-yellow-900 text-xs sm:text-sm hover:bg-yellow-500"
                  >
                    Play Again
                  </Button>

                  <Button
                  variant="outline"
                  onClick={onRefreshCards}
                  disabled={
                    actionLoading ||
                    room.status !== "waiting" ||
                    room.called_numbers.length > 0
                  }
                  className="h-8 sm:h-10 rounded-lg text-xs sm:text-sm"
                  >
                    Change Card
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={onEndSession}
                    disabled={actionLoading || room.status === "finished"}
                    className="h-8 sm:h-10 rounded-lg text-xs sm:text-sm"
                  >
                    End
                  </Button>

                  <Button
                      variant="destructive"
                      onClick={onLeave}
                      className="w-full h-8 sm:h-10 rounded-lg text-xs sm:text-sm"
                    >
                      Leave Room
                    </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
}