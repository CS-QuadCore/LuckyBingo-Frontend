"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InvalidBingoModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-sm text-center sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl text-destructive">
            ❌ Invalid Bingo
          </DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground">
          Your card does not form a valid bingo yet.
        </p>

        <Button onClick={onClose} className="w-full sm:w-auto">
          Try Again
        </Button>
      </DialogContent>
    </Dialog>
  );
}