
"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function PurchaseContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userProfile } = useAuth();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = React.useState(false);
    const wasCanceled = searchParams.get('canceled') === 'true';

    const handlePurchase = async () => {
        if (!userProfile?.uid || !userProfile?.email) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "You must be logged in to purchase credits.",
            });
            return;
        }

        setIsProcessing(true);

        try {
            // Create checkout session
            const response = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userProfile.uid,
                    userEmail: userProfile.email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Purchase error:', error);
            toast({
                variant: "destructive",
                title: "Purchase Failed",
                description: "Failed to initiate checkout. Please try again.",
            });
            setIsProcessing(false);
        }
    };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-start">
        <div className="w-full max-w-md space-y-4">
             <Button variant="ghost" asChild className="mb-4">
                <Link href="/agency">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
                </Link>
            </Button>

            {wasCanceled && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Payment Canceled</AlertTitle>
                <AlertDescription>
                  Your payment was canceled. No charges were made.
                </AlertDescription>
              </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Purchase Verification Credit</CardTitle>
                    <CardDescription>
                      Add one verification credit to your account for £20.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">Verification Credit</h3>
                          <p className="text-sm text-muted-foreground">
                            Verify one care worker's references
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">£20</p>
                          <p className="text-xs text-muted-foreground">One-time payment</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span>Access to complete reference history</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span>Free re-access to previously viewed workers</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span>Verified corporate references only</span>
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handlePurchase}
                      className="w-full"
                      disabled={isProcessing}
                      size="lg"
                    >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Redirecting to checkout...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Continue to Checkout
                          </>
                        )}
                    </Button>

                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                        <Lock className="h-3 w-3"/>
                        <span>Secure payment processing by Stripe</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}

export default function PurchasePage() {
  return (
    <React.Suspense fallback={
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    }>
      <PurchaseContent />
    </React.Suspense>
  );
}
