"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LeaveSessionModal({ open, onConfirm, onCancel }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel(); }}>
      <DialogContent className="w-[92vw] max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave Room?</DialogTitle>
          <DialogDescription>
            You can re-enter this room later from the home screen as long as it is still active.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-3">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Stay
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="w-full sm:w-auto">
            Leave
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}