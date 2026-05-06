"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onGoHome: () => void;
  onCancel: () => void;
};

export default function SessionEndedModal({ open, onGoHome, onCancel }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel(); }}>
      <DialogContent className="w-[92vw] max-w-md text-center sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">Session Ended</DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground">
          The host has ended the session. Do you want to go back to home?
        </p>

        <div className="mt-4 flex flex-col-reverse sm:flex-row justify-center gap-3">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Stay
          </Button>
          <Button onClick={onGoHome} className="w-full sm:w-auto">
            Yes, go home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}