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

export default function RestartSessionModal({
  open,
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => {
      if (!v) onCancel();
    }}>
      <DialogContent className="w-[92vw] max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start a new round?</DialogTitle>
          <DialogDescription>
            This will reset the board and start a fresh game for everyone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-3">
          <Button variant="outline" onClick={onCancel} disabled={loading} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Restarting..." : "Restart"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
