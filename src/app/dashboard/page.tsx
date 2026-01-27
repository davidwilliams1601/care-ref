
"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/header";
import { mockReferences, mockRequests } from "@/lib/mock-data";
import type { Reference, ReferenceRequest } from "@/types";
import { ReferenceList } from "@/components/dashboard/reference-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReferenceRequestList } from "@/components/dashboard/reference-request-list";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function WorkerDashboard() {
  const [references, setReferences] = React.useState<Reference[]>(mockReferences);
  const [requests, setRequests] = React.useState<ReferenceRequest[]>(mockRequests);

  const handleReferenceDelete = (id: string) => {
    setReferences(prev => prev.filter(ref => ref.id !== id));
  }

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
                        <ReferenceList references={references} onReferenceDelete={handleReferenceDelete} />
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
                        <ReferenceRequestList requests={requests.filter(r => r.status !== 'Completed')} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </main>
    </div>
    </ProtectedRoute>
  );
}
