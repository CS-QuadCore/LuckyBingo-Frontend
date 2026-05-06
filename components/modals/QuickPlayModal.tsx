"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QuickPlayModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QuickPlayModal({ open, onClose }: QuickPlayModalProps) {
  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <DialogContent className="w-[92vw] max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>No public lobbies right now</DialogTitle>
          <DialogDescription>
            You can create a lobby from the home screen and invite your friends to play.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
