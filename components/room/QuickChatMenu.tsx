"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const QUICK_CHAT_OPTIONS = [
  "Good luck!",
  "I am close to bingo!",
  "This is getting intense!",
  "GG!",
];

type QuickChatMenuProps = {
  onSendQuickChat?: (message: string) => Promise<void> | void;
};

export default function QuickChatMenu({ onSendQuickChat }: QuickChatMenuProps) {
  const [showQuickChatMenu, setShowQuickChatMenu] = useState(false);
  const [customQuickChat, setCustomQuickChat] = useState("");

  function sendQuickChat(message: string) {
    const normalized = message.trim();
    if (!normalized) return;
    onSendQuickChat?.(normalized.slice(0, 80));
    setShowQuickChatMenu(false);
    setCustomQuickChat("");
  }

  return (
    <div className="relative shrink-0">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => setShowQuickChatMenu((prev) => !prev)}
        className="rounded-full bg-white/70 text-base font-semibold hover:bg-white/90"
        aria-label="Open quick chat"
      >
        ...
      </Button>
      {showQuickChatMenu ? (
        <Card className="fixed bottom-4 left-1/2 z-50 w-[90vw] max-w-xs -translate-x-1/2 rounded-2xl border border-white/70 bg-white/95 shadow-2xl backdrop-blur sm:absolute sm:bottom-auto sm:left-auto sm:right-0 sm:top-12 sm:w-64 sm:max-w-none sm:translate-x-0">
          <CardContent className="max-h-[45vh] space-y-2 overflow-auto p-2 sm:max-h-[60vh]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                type="text"
                value={customQuickChat}
                onChange={(event) => setCustomQuickChat(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendQuickChat(customQuickChat);
                  }
                }}
                placeholder="Type quick chat"
                maxLength={80}
                className="h-7 text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={() => sendQuickChat(customQuickChat)}
                className="w-full sm:w-auto"
              >
                Send
              </Button>
            </div>
            {QUICK_CHAT_OPTIONS.map((message) => (
              <Button
                key={message}
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-start rounded-lg bg-white/70 px-2 py-1 text-xs hover:bg-white"
                onClick={() => {
                  sendQuickChat(message);
                }}
              >
                {message}
              </Button>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
