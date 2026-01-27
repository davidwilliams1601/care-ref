
"use client";

import * as React from "react";
import { VerifyReferenceForm } from "@/components/agency/verify-reference-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export function AgencyDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tokens, setTokens] = React.useState(5); // Mocked token count
  const { toast } = useToast();

  React.useEffect(() => {
    if (searchParams.get("purchase") === "success") {
      setTokens(prev => prev + 1);
      toast({
        title: "Purchase Successful!",
        description: "You have purchased 1 token for £20. It has been added to your account.",
      });
      // Clean the URL
      router.replace('/agency', { scroll: false });
    }
  }, [searchParams, toast, router]);


  const handlePurchase = () => {
    router.push('/agency/purchase');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Verify Worker References</CardTitle>
                <CardDescription>Enter a worker's unique ID to view their completed references. This will use one of your verification credits.</CardDescription>
            </CardHeader>
            <CardContent>
                <VerifyReferenceForm onVerify={() => setTokens(prev => prev > 0 ? prev -1 : 0)} currentTokens={tokens} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Credits</CardTitle>
                <CardDescription>You have <span className="font-bold text-primary">{tokens}</span> verification credit(s) available.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h3 className="font-semibold">Purchase More Credits</h3>
                    <p className="text-sm text-muted-foreground">Each credit costs £20 and allows one worker verification.</p>
                </div>
                <Button onClick={handlePurchase}>
                    <CreditCard className="mr-2"/>
                    Purchase 1 Credit
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
