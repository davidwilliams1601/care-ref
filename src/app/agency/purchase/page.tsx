
"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function PurchasePage() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate network request
        setTimeout(() => {
            router.push('/agency?purchase=success');
        }, 1500);
    }

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
            <Card>
                <CardHeader>
                    <CardTitle>Complete Your Purchase</CardTitle>
                    <CardDescription>Securely purchase one verification credit for £20.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                             <Label htmlFor="email">Email</Label>
                             <Input id="email" type="email" defaultValue="agency@example.com" required />
                        </div>
                         <div className="space-y-2">
                             <Label htmlFor="card-details">Card Details</Label>
                             <div className="relative">
                                <Input id="card-details" placeholder="Card Number" required />
                                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="MM / YY" required/>
                                <Input placeholder="CVC" required/>
                             </div>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="cardholder-name">Cardholder Name</Label>
                             <Input id="cardholder-name" placeholder="Name on card" required/>
                        </div>
                         <div className="space-y-2">
                             <Label htmlFor="billing-address">Billing Address</Label>
                             <Input id="billing-address" placeholder="Country" defaultValue="United Kingdom" required/>
                             <Input placeholder="Postcode" required/>
                        </div>

                        <Button type="submit" className="w-full" disabled={isProcessing}>
                            {isProcessing ? 'Processing...' : 'Pay £20.00'}
                        </Button>
                    </form>
                    <div className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-2">
                        <Lock className="h-3 w-3"/>
                        <span>Payments are securely processed by Stripe.</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
