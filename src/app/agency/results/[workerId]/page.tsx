
"use client";

import { Header } from "@/components/header";
import { mockRequests } from "@/lib/mock-data";
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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AgencyResultsPage({ params }: { params: { workerId: string }}) {
  const { workerId } = params;
  // In a real app, you'd fetch the request details from your backend using the ID.
  // We only show completed references to the agency.
  const completedReferences = mockRequests.filter(
    (r) => r.workerId === workerId && r.status === 'Completed'
  );

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

          <Card>
            <CardHeader>
              <CardTitle>Verification Results</CardTitle>
              <CardDescription>
                Showing {completedReferences.length} completed reference(s) for Worker ID: <span className="font-semibold">{workerId}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {completedReferences.length > 0 ? (
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
                                    {format(ref.dateRequested, "MMM yyyy")} - {ref.dateCompleted ? format(ref.dateCompleted, "MMM yyyy") : 'Present'}
                                </p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-sm mb-1">Referee</h4>
                                <p className="text-sm text-muted-foreground">
                                    {ref.refereeName}, {ref.refereeJobTitle}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">AI Summary</h4>
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
