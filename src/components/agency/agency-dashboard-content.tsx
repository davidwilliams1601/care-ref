
"use client";

import * as React from "react";
import { VerifyReferenceForm } from "@/components/agency/verify-reference-form";
import { ViewedWorkersList } from "@/components/agency/viewed-workers-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAgencyCredits } from "@/hooks/useAgencyCredits";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AgencyDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userProfile } = useAuth();
  const { credits, loading, error, deductCredit } = useAgencyCredits(userProfile?.uid);
  const { toast } = useToast();
  const hasShownSuccessToast = React.useRef(false);

  React.useEffect(() => {
    if (searchParams.get("purchase") === "success" && !hasShownSuccessToast.current) {
      hasShownSuccessToast.current = true;
      toast({
        title: "Payment Successful!",
        description: "Your credit is being added to your account. It will appear within a few seconds.",
      });
      // Clean the URL
      router.replace('/agency', { scroll: false });
    }
  }, [searchParams, toast, router]);


  const handlePurchase = () => {
    router.push('/agency/purchase');
  };

  const handleVerify = async () => {
    try {
      await deductCredit();
    } catch (err) {
      console.error('Failed to deduct credit:', err);
      throw err;
    }
  };

  if (loading) {
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
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
            <CardHeader>
                <CardTitle>Verify Worker References</CardTitle>
                <CardDescription>Enter a worker's unique ID to view their completed references. This will use one of your verification credits.</CardDescription>
            </CardHeader>
            <CardContent>
                <VerifyReferenceForm onVerify={handleVerify} currentCredits={credits} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Credits</CardTitle>
                <CardDescription>You have <span className="font-bold text-primary">{credits}</span> verification credit(s) available.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h3 className="font-semibold">Purchase More Credits</h3>
                    <p className="text-sm text-muted-foreground">Buy credits to verify worker references. Save more with bulk packages.</p>
                </div>
                <Button onClick={handlePurchase}>
                    <CreditCard className="mr-2"/>
                    Purchase Credits
                </Button>
            </CardContent>
        </Card>

        <ViewedWorkersList />
    </div>
  );
}
