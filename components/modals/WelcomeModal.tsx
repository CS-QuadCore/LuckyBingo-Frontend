"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  playerName: string;
  roomCode: string;
  onClose: () => void;
};

export default function WelcomeModal({ open, playerName, roomCode, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <DialogContent className="w-[92vw] max-w-sm text-center sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome, {playerName || "Player"}!</DialogTitle>
          <DialogDescription>
            You are now in room {roomCode}. Mark called numbers and claim bingo when you have the win pattern.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onClose} className="w-full sm:w-auto">
          Let's play
        </Button>
      </DialogContent>
    </Dialog>
  );
}
