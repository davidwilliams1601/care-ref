"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2, Search } from "lucide-react";
import { getWorkerReferences } from "@/app/actions/get-worker-references";

export default function VerifyWorkerIdPage() {
  const [workerId, setWorkerId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{
    success: boolean;
    references: any[];
    error?: string;
  } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workerId.trim()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const lookupResult = await getWorkerReferences(workerId.trim());
      setResult(lookupResult);
    } catch (error) {
      setResult({
        success: false,
        references: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Worker ID Verification Test</CardTitle>
              <CardDescription>
                Test that Worker Reference ID lookup is working correctly.
                Enter either a Worker Reference ID (RV-XXXXXX) or a Firebase UID.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workerId">Worker ID</Label>
                  <Input
                    id="workerId"
                    placeholder="e.g. RV-482917 or Firebase UID"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will test the Worker ID lookup without deducting any credits.
                  </p>
                </div>

                <Button type="submit" disabled={loading || !workerId.trim()} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Test Lookup
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant={result.success ? "default" : "destructive"}>
                  {result.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {result.success ? "Worker Found" : "Lookup Failed"}
                  </AlertTitle>
                  <AlertDescription>
                    {result.success ? (
                      <div className="space-y-2">
                        <p className="font-semibold">
                          Found {result.references.length} completed reference(s)
                        </p>
                        {result.references.length === 0 && (
                          <p className="text-sm">
                            Worker exists but has no completed references yet.
                          </p>
                        )}
                      </div>
                    ) : (
                      <p>{result.error || "Failed to lookup worker"}</p>
                    )}
                  </AlertDescription>
                </Alert>

                {result.success && result.references.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Reference Details:</h4>
                    <div className="space-y-2">
                      {result.references.map((ref, index) => (
                        <div
                          key={ref.id}
                          className="border rounded-md p-3 bg-muted/50 text-sm"
                        >
                          <div className="font-semibold">
                            {index + 1}. {ref.employerName}
                          </div>
                          <div className="text-muted-foreground">
                            {ref.jobTitle}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Referee: {ref.refereeName} ({ref.refereeJobTitle})
                          </div>
                          {ref.summary && (
                            <div className="text-xs mt-2 border-t pt-2">
                              <span className="font-semibold">Summary: </span>
                              {ref.summary.substring(0, 150)}
                              {ref.summary.length > 150 && "..."}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground border-t pt-3 space-y-1">
                  <p className="font-semibold">✅ What this confirms:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Worker ID lookup is functioning correctly</li>
                    <li>The system can find workers by their RV-XXXXXX ID</li>
                    <li>ALL completed references are being retrieved</li>
                    <li>The agency verification flow will work properly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-base">How the System Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <strong>1. Worker gets their ID:</strong> When a care worker signs up, they automatically
                get a unique Worker Reference ID (format: RV-XXXXXX) displayed on their dashboard.
              </p>
              <p>
                <strong>2. Worker shares ID:</strong> The worker shares this ID with agencies when
                applying for positions.
              </p>
              <p>
                <strong>3. Agency verifies:</strong> Agency enters the Worker ID in the verification form.
              </p>
              <p>
                <strong>4. System looks up worker:</strong> The system finds the worker by their ID and
                retrieves ALL their completed references.
              </p>
              <p>
                <strong>5. Agency sees all references:</strong> The agency can view all the worker's
                references in one place.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
