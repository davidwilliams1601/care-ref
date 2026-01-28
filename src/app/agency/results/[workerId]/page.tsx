
"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { getWorkerReferences } from "@/app/actions/get-worker-references";
import { recordWorkerView } from "@/app/actions/agency-viewed-workers";
import { useAuth } from "@/contexts/AuthContext";
import type { ReferenceRequest } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AgencyResultsPage({ params }: { params: { workerId: string }}) {
  const { workerId } = params;
  const { userProfile } = useAuth();
  const [completedReferences, setCompletedReferences] = React.useState<ReferenceRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchReferences = async () => {
      setLoading(true);
      setError(null);

      const result = await getWorkerReferences(workerId);

      if (result.success) {
        // Convert ISO date strings back to Date objects for display
        const referencesWithDates = result.references.map(ref => ({
          ...ref,
          dateRequested: new Date(ref.dateRequested),
          dateCompleted: ref.dateCompleted ? new Date(ref.dateCompleted) : null,
          startDate: ref.startDate ? new Date(ref.startDate) : undefined,
          endDate: ref.endDate ? new Date(ref.endDate) : undefined,
        })) as ReferenceRequest[];

        setCompletedReferences(referencesWithDates);

        // Record this worker view for the agency
        if (userProfile?.uid && result.references.length > 0) {
          // Get worker name from first reference (employer name or use worker ID)
          const workerName = `Worker ${workerId.substring(0, 8)}...`;

          await recordWorkerView(
            userProfile.uid,
            workerId,
            workerName,
            result.references.length
          );
        }
      } else {
        setError(result.error || 'Failed to load references');
      }

      setLoading(false);
    };

    fetchReferences();
  }, [workerId, userProfile?.uid]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/agency">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Verification
            </Link>
          </Button>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Verification Results</CardTitle>
              <CardDescription>
                {loading ? (
                  <Skeleton className="h-4 w-64" />
                ) : (
                  <>
                    Showing {completedReferences.length} completed reference(s) for Worker ID: <span className="font-semibold">{workerId}</span>.
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : completedReferences.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {completedReferences.map((ref, index) => (
                    <AccordionItem value={`item-${index}`} key={ref.id}>
                      <AccordionTrigger>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-left">
                           <span className="font-semibold">{ref.employerName}</span>
                           <span className="text-sm text-muted-foreground">{ref.jobTitle}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                         <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Employment Dates</h4>
                                <p className="text-sm text-muted-foreground">
                                    {ref.startDate && format(ref.startDate, "MMM yyyy")} - {ref.endDate ? format(ref.endDate, "MMM yyyy") : 'Present'}
                                </p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-sm mb-1">Referee</h4>
                                <p className="text-sm text-muted-foreground">
                                    {ref.refereeName}, {ref.refereeJobTitle}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Summary</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-line bg-muted p-3 rounded-md">
                                    {ref.summary || "No summary available."}
                                </p>
                            </div>
                         </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No Completed References</h3>
                  <p className="text-sm text-muted-foreground">This worker either does not exist or has no completed references in their vault.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
