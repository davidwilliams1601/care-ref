"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, IdCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkerIdCardProps {
  workerReferenceId: string;
  displayName: string | null;
}

export function WorkerIdCard({ workerReferenceId, displayName }: WorkerIdCardProps) {
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(workerReferenceId);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Your Worker ID has been copied to clipboard.",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy to clipboard. Please try again.",
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <IdCard className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Your Worker Reference ID</CardTitle>
        </div>
        <CardDescription>
          Share this ID with agencies to give them access to your references
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-background rounded-lg border-2 border-primary/30">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Worker ID</p>
            <p className="text-3xl font-bold font-mono tracking-wider text-primary">
              {workerReferenceId}
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={handleCopy}
            className="ml-4"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy ID
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            💡 <strong>How to use:</strong> When an agency wants to verify your references,
            simply share this ID with them. They can enter it on their verification page to
            instantly access all your completed references.
          </p>
          <p>
            ✅ This ID is unique to you and provides secure access to your reference vault.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
