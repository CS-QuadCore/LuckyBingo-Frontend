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

export default function NoMoreNumbersModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-sm text-center sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl text-emerald-600">
            ✅ No More Numbers
          </DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">
          Please check your cards to see who got bingo.
        </p>
        <Button onClick={onClose} className="w-full sm:w-auto">
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  );
}
