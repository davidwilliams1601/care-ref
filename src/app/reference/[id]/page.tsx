
"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { ReferenceSubmissionForm } from "@/components/reference-submission-form";
import { getReferenceRequest } from "@/app/actions/get-reference-request";
import type { ReferenceRequest } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubmitReferencePage({ params }: { params: { id: string }}) {
  const { id } = params;
  const [request, setRequest] = React.useState<ReferenceRequest | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRequest = async () => {
      setIsLoading(true);
      const fetchedRequest = await getReferenceRequest(id);

      if (fetchedRequest) {
        // Convert ISO date strings back to Date objects for the form
        setRequest({
          ...fetchedRequest,
          dateRequested: new Date(fetchedRequest.dateRequested),
          dateCompleted: fetchedRequest.dateCompleted ? new Date(fetchedRequest.dateCompleted) : null,
          startDate: fetchedRequest.startDate ? new Date(fetchedRequest.startDate) : undefined,
          endDate: fetchedRequest.endDate ? new Date(fetchedRequest.endDate) : undefined,
        } as ReferenceRequest);
      } else {
        setRequest(undefined);
      }

      setIsLoading(false);
    };

    fetchRequest();
  }, [id]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
         {isLoading ? (
             <div className="container mx-auto max-w-2xl p-4 md:p-8">
                 <Card>
                   <CardHeader>
                     <Skeleton className="h-6 w-48" />
                     <Skeleton className="h-4 w-96 mt-2" />
                   </CardHeader>
                   <CardContent className="space-y-4">
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-32 w-full" />
                   </CardContent>
                 </Card>
             </div>
         ) : (
            <ReferenceSubmissionForm request={request} />
         )}
      </main>
    </div>
  );
}
