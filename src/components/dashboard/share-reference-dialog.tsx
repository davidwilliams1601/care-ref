"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Reference } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ShareReferenceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  reference: Reference | null;
}

export function ShareReferenceDialog({ isOpen, onOpenChange, reference }: ShareReferenceDialogProps) {
  const [shareLink, setShareLink] = React.useState("");
  const [hasCopied, setHasCopied] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (isOpen) {
      setShareLink("");
      setHasCopied(false);
    }
  }, [isOpen]);

  const generateLink = () => {
    if (reference) {
      const link = `${window.location.origin}/share/ref/${reference.id}/${Date.now()}`;
      setShareLink(link);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setHasCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setHasCopied(false), 2000);
  };

  if (!reference) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Reference</DialogTitle>
          <DialogDescription>
            Generate a secure link to share your reference for "{reference.jobTitle}".
          </DialogDescription>
        </DialogHeader>
        {shareLink ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Anyone with this link will be able to view this reference. The link is unique and secure.
            </p>
            <div className="flex items-center space-x-2">
              <Input id="link" value={shareLink} readOnly />
              <Button type="button" size="icon" onClick={copyToClipboard} disabled={hasCopied}>
                {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 pt-4">
            <p className="text-sm text-muted-foreground">
              Click the button to generate a new secure sharing link.
            </p>
          </div>
        )}
        <DialogFooter className="sm:justify-between mt-4">
           <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {!shareLink && (
            <Button type="button" onClick={generateLink}>
              Generate Link
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
