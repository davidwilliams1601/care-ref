"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Search } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Tools</h1>
            <p className="text-muted-foreground">
              Worker ID management and verification tools
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <CardTitle>Worker ID Migration</CardTitle>
                </div>
                <CardDescription>
                  Generate Worker Reference IDs for existing workers who don't have one yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p>This tool will:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Find workers without IDs</li>
                      <li>Generate RV-XXXXXX format IDs</li>
                      <li>Update Firestore records</li>
                    </ul>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/admin/migrate">
                      Run Migration
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  <CardTitle>Worker ID Verification</CardTitle>
                </div>
                <CardDescription>
                  Test that Worker Reference ID lookup is functioning correctly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p>This tool will:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Test Worker ID lookup</li>
                      <li>Show all references found</li>
                      <li>Verify the complete flow</li>
                    </ul>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/verify-worker-id">
                      Test Verification
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="text-base">How the Worker ID System Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold mb-1">1. ID Generation</h4>
                <p className="text-muted-foreground">
                  When a care worker signs up, they automatically receive a unique Worker Reference ID
                  in the format RV-XXXXXX (e.g., RV-482917). This ID is displayed on their dashboard.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">2. ID Sharing</h4>
                <p className="text-muted-foreground">
                  Workers can easily copy their ID and share it with agencies when applying for positions.
                  The ID is much easier to share than Firebase UIDs.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">3. Agency Verification</h4>
                <p className="text-muted-foreground">
                  Agencies enter the Worker ID in their verification form. The system automatically:
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground">
                  <li>Looks up the worker by their Reference ID</li>
                  <li>Retrieves ALL completed references for that worker</li>
                  <li>Displays all references in a clean, organized format</li>
                  <li>Tracks the view (no credit charged on repeat views)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-1">4. Credit System</h4>
                <p className="text-muted-foreground">
                  The first time an agency views a specific worker's references, 1 credit is deducted.
                  Subsequent views of the same worker are free.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>If you have existing workers:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Run the Migration tool to generate IDs for existing workers</li>
                <li>Use the Verification tool to test a worker's ID</li>
                <li>Confirm that all references appear correctly</li>
              </ol>

              <p className="mt-3"><strong>If you're starting fresh:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>New workers will automatically get IDs on signup</li>
                <li>Use the Verification tool to test the complete flow</li>
                <li>The system is ready to use!</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
