
import * as React from "react";
import { Header } from "@/components/header";
import { AgencyDashboardContent } from "@/components/agency/agency-dashboard-content";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function AgencyDashboardFallback() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Verify Worker References</CardTitle>
           <Skeleton className="h-4 w-[250px] mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
         <CardHeader>
            <CardTitle>Your Credits</CardTitle>
            <Skeleton className="h-4 w-[200px] mt-2" />
         </CardHeader>
         <CardContent>
             <Skeleton className="h-10 w-40" />
         </CardContent>
      </Card>
    </div>
  )
}


export default function AgencyDashboard() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Suspense fallback={<AgencyDashboardFallback />}>
          <AgencyDashboardContent />
        </Suspense>
      </main>
    </div>
  );
}
