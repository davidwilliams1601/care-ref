
"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { ReferenceSubmissionForm } from "@/components/reference-submission-form";
import { mockRequests } from "@/lib/mock-data";
import type { ReferenceRequest } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitReferencePage({ params }: { params: { id: string }}) {
  const { id } = params;
  const [request, setRequest] = React.useState<ReferenceRequest | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  // In a real app, you'd fetch from a backend. Here we simulate it.
  React.useEffect(() => {
    const foundRequest = mockRequests.find(r => r.id === id);
    setRequest(foundRequest);
    setIsLoading(false);
  }, [id]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
         {isLoading ? (
             <div className="container mx-auto max-w-2xl p-4 md:p-8 text-center">
                 <p>Loading...</p>
             </div>
         ) : (
            <ReferenceSubmissionForm request={request} />
         )}
      </main>
    </div>
  );
}
