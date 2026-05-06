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
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function EndSessionModal({
  open,
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel(); }}>
      <DialogContent className="w-[92vw] max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>End Session?</DialogTitle>
          <DialogDescription>
            This will finish the current game for everyone in the room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-3">
          <Button variant="outline" onClick={onCancel} disabled={loading} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Ending..." : "End Session"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}