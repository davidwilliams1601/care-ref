"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { generateWorkerIdsForExistingUsers } from "@/app/actions/generate-worker-ids-for-existing-users";

export default function MigrationPage() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{
    success: boolean;
    updated: number;
    skipped: number;
    error?: string;
  } | null>(null);

  const handleMigration = async () => {
    setLoading(true);
    setResult(null);

    try {
      const migrationResult = await generateWorkerIdsForExistingUsers();
      setResult(migrationResult);
    } catch (error) {
      setResult({
        success: false,
        updated: 0,
        skipped: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Worker ID Migration</CardTitle>
              <CardDescription>
                Generate Worker Reference IDs for existing workers who don't have one yet.
                This is a one-time migration for workers created before the Worker ID system was implemented.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">What this does:</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Finds all workers without a Worker Reference ID</li>
                  <li>Generates a unique ID in format RV-XXXXXX for each</li>
                  <li>Updates their profile in Firestore</li>
                  <li>Skips workers who already have an ID</li>
                </ul>
              </div>

              {result && (
                <Alert variant={result.success ? "default" : "destructive"}>
                  {result.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {result.success ? "Migration Completed" : "Migration Failed"}
                  </AlertTitle>
                  <AlertDescription>
                    {result.success ? (
                      <div className="space-y-1">
                        <p>✅ Updated: {result.updated} worker(s)</p>
                        <p>⏭️ Skipped: {result.skipped} worker(s) (already had IDs)</p>
                      </div>
                    ) : (
                      <p>Error: {result.error}</p>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleMigration}
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Running Migration..." : "Run Migration"}
              </Button>

              <div className="text-xs text-muted-foreground border-t pt-4">
                <p className="font-semibold mb-1">⚠️ Important Notes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>This operation is safe to run multiple times</li>
                  <li>Only workers without IDs will be updated</li>
                  <li>The operation cannot be undone</li>
                  <li>Make sure you have proper Firebase permissions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
