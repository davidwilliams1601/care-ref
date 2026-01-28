
"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Lock, Loader2, BadgePercent } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Pricing tiers with bulk discounts
const PRICING_TIERS = [
  { credits: 1, price: 2000, pricePerCredit: 20, discount: 0, label: "Single Credit" },
  { credits: 5, price: 9500, pricePerCredit: 19, discount: 5, label: "Small Pack", popular: false },
  { credits: 10, price: 18000, pricePerCredit: 18, discount: 10, label: "Medium Pack", popular: true },
  { credits: 25, price: 40000, pricePerCredit: 16, discount: 20, label: "Large Pack", popular: false },
] as const;

function PurchaseContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userProfile } = useAuth();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [selectedTier, setSelectedTier] = React.useState(0); // Index of PRICING_TIERS
    const wasCanceled = searchParams.get('canceled') === 'true';

    const selectedPricing = PRICING_TIERS[selectedTier];

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
                    quantity: selectedPricing.credits,
                    priceInPence: selectedPricing.price,
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
                    <CardTitle>Purchase Verification Credits</CardTitle>
                    <CardDescription>
                      Choose a credit package. Save more with larger bundles.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Select Package</Label>
                      <RadioGroup
                        value={selectedTier.toString()}
                        onValueChange={(value) => setSelectedTier(parseInt(value))}
                        className="space-y-3"
                      >
                        {PRICING_TIERS.map((tier, index) => (
                          <div key={index} className="relative">
                            <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedTier === index ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
                            }`}>
                              <RadioGroupItem value={index.toString()} id={`tier-${index}`} />
                              <Label
                                htmlFor={`tier-${index}`}
                                className="flex-1 cursor-pointer flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  <div>
                                    <div className="font-semibold flex items-center gap-2">
                                      {tier.credits} {tier.credits === 1 ? 'Credit' : 'Credits'}
                                      {tier.popular && (
                                        <Badge variant="secondary" className="text-xs">
                                          Most Popular
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      £{tier.pricePerCredit} per credit
                                      {tier.discount > 0 && (
                                        <span className="text-green-600 dark:text-green-500 ml-2">
                                          Save {tier.discount}%
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold">
                                    £{(tier.price / 100).toFixed(0)}
                                  </div>
                                  {tier.discount > 0 && (
                                    <div className="text-xs text-muted-foreground line-through">
                                      £{(tier.credits * 20).toFixed(0)}
                                    </div>
                                  )}
                                </div>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Credits:</span>
                        <span className="font-semibold">{selectedPricing.credits}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Price per credit:</span>
                        <span className="font-semibold">£{selectedPricing.pricePerCredit}</span>
                      </div>
                      {selectedPricing.discount > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">You save:</span>
                          <span className="font-semibold text-green-600 dark:text-green-500">
                            £{((selectedPricing.credits * 20) - (selectedPricing.price / 100)).toFixed(0)} ({selectedPricing.discount}%)
                          </span>
                        </div>
                      )}
                      <div className="pt-2 border-t flex items-center justify-between">
                        <span className="font-semibold">Total:</span>
                        <span className="text-2xl font-bold">£{(selectedPricing.price / 100).toFixed(0)}</span>
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
                      <p className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Credits never expire</span>
                      </p>
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
                            Continue to Checkout - £{(selectedPricing.price / 100).toFixed(0)}
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
