
"use client";

import * as React from "react";
import { PlusCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/header";
import type { Reference, ReferenceRequest } from "@/types";
import { ReferenceList } from "@/components/dashboard/reference-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReferenceRequestList } from "@/components/dashboard/reference-request-list";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useReferences } from "@/hooks/useReferences";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function WorkerDashboard() {
  const { userProfile } = useAuth();
  const { requests, loading, error, deleteRequest } = useReferences(userProfile?.uid);
  const { toast } = useToast();

  // Convert completed requests to Reference type
  const completedReferences = React.useMemo(() => {
    return requests
      .filter(req => req.status === 'Completed')
      .map(req => ({
        id: req.id,
        workerId: req.workerId,
        employerName: req.employerName,
        jobTitle: req.jobTitle,
        startDate: req.startDate || req.dateRequested,
        endDate: req.endDate || null,
        referenceText: req.referenceText || '',
        summary: req.summary || '',
        versionHistory: [{
          version: 1,
          date: req.dateCompleted || req.dateRequested,
          changes: 'Initial reference added.',
        }],
      } as Reference));
  }, [requests]);

  const pendingRequests = React.useMemo(() => {
    return requests.filter(req => req.status !== 'Completed');
  }, [requests]);

  const handleReferenceDelete = async (id: string) => {
    try {
      await deleteRequest(id);
      toast({
        title: "Reference Deleted",
        description: "The reference has been removed from your vault.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete reference. Please try again.",
      });
    }
  };

  return (
    <ProtectedRoute requireUserType="worker">
      <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Reference Vault</h1>
            <p className="text-muted-foreground">Manage your stored references and pending requests.</p>
          </div>
          <Button asChild>
            <Link href="/request-reference">
              <PlusCircle />
              <span className="md:inline ml-2">Request a Reference</span>
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full max-w-md" />
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-96 mt-2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          </div>
        ) : (
          <Tabs defaultValue="vault" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="vault">My Vault</TabsTrigger>
                <TabsTrigger value="requests">Pending Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="vault">
                 <Card>
                    <CardHeader>
                        <CardTitle>Completed References</CardTitle>
                        <CardDescription>
                        Here are the references you have successfully collected.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ReferenceList references={completedReferences} onReferenceDelete={handleReferenceDelete} />
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="requests">
                <Card>
                    <CardHeader>
                        <CardTitle>Reference Requests</CardTitle>
                        <CardDescription>
                        Track the status of reference requests you've sent out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ReferenceRequestList requests={pendingRequests} />
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
    </ProtectedRoute>
  );
}
