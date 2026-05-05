"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  winnerName: string;
  canPlayAgain: boolean;
  playAgainLoading?: boolean;
  onLeave: () => void;
  onPlayAgain: () => void;
  onClose: () => void;
};

export default function WinnerModal({
  open,
  winnerName,
  canPlayAgain,
  playAgainLoading = false,
  onLeave,
  onPlayAgain,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-md text-center sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">🎉 Bingo Winner!</DialogTitle>
          <DialogDescription className="sr-only">
            Winner announcement with actions to leave the room or start another round.
          </DialogDescription>
        </DialogHeader>

        <p className="text-lg">
          <span className="font-bold">{winnerName}</span> got BINGO!
        </p>

        <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={onLeave} className="w-full sm:w-auto">
            Leave
          </Button>
          <Button
            onClick={onPlayAgain}
            disabled={!canPlayAgain || playAgainLoading}
            title={canPlayAgain ? "Start a new round" : "Only the host can start a new round"}
            className="w-full sm:w-auto"
          >
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}