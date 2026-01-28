"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Pricing tiers matching the purchase page
const PRICING_TIERS = [
  { credits: 1, price: 20, discount: 0, label: "Single Credit" },
  { credits: 5, price: 95, pricePerCredit: 19, discount: 5, label: "Small Pack" },
  { credits: 10, price: 180, pricePerCredit: 18, discount: 10, label: "Medium Pack", popular: true },
  { credits: 25, price: 400, pricePerCredit: 16, discount: 20, label: "Large Pack" },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto py-16 md:py-24 px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works for you. No hidden fees, no subscriptions.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto pb-16 px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Worker Pricing - FREE */}
            <Card className="border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                Popular
              </div>
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-2xl">For Care Workers</CardTitle>
                <CardDescription>
                  Build and manage your reference vault
                </CardDescription>
                <div className="mt-4">
                  <div className="text-5xl font-bold">Free</div>
                  <div className="text-muted-foreground">Forever</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Unlimited reference requests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Secure reference vault storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Unique shareable Worker ID (RV-XXXXXX)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Share references with unlimited agencies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>AI-powered reference summaries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Track request status in real-time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Email notifications</span>
                  </li>
                </ul>

                <Button asChild className="w-full" size="lg">
                  <Link href="/signup">
                    Get Started Free
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Agency Pricing - Credits */}
            <Card className="border-2">
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-2xl">For Agencies</CardTitle>
                <CardDescription>
                  Verify care worker references instantly
                </CardDescription>
                <div className="mt-4">
                  <div className="text-5xl font-bold">£18</div>
                  <div className="text-muted-foreground">per verification</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    When buying 10 credits
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Instant access to verified references</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>1 credit per new worker verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Free re-access to previously viewed workers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Complete reference history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>AI-summarized references</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Credits never expire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Bulk discounts available</span>
                  </li>
                </ul>

                <Button asChild className="w-full" size="lg" variant="outline">
                  <Link href="/signup">
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Credit Packages */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Agency Credit Packages</h2>
              <p className="text-muted-foreground">
                Buy credits in bulk and save. Credits never expire.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {PRICING_TIERS.map((tier, index) => (
                <Card
                  key={index}
                  className={`relative ${tier.popular ? 'border-2 border-primary shadow-lg' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="px-3 py-1">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-6">
                    <CardTitle>{tier.label}</CardTitle>
                    <div className="mt-4">
                      <div className="text-4xl font-bold">£{tier.price}</div>
                      <div className="text-muted-foreground mt-1">
                        {tier.credits} {tier.credits === 1 ? 'credit' : 'credits'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-semibold text-primary">
                        £{tier.pricePerCredit || 20}
                      </div>
                      <div className="text-sm text-muted-foreground">per credit</div>

                      {tier.discount > 0 && (
                        <div className="pt-2">
                          <Badge variant="secondary" className="text-green-600 dark:text-green-400">
                            Save {tier.discount}%
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 text-sm text-muted-foreground text-center">
                      {tier.discount > 0 ? (
                        <>
                          <div className="line-through">£{tier.credits * 20}</div>
                          <div className="text-green-600 dark:text-green-400 font-semibold">
                            Save £{(tier.credits * 20) - tier.price}
                          </div>
                        </>
                      ) : (
                        <div className="h-10"></div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Already have an account? <Link href="/login" className="underline">Sign in</Link> to purchase credits
              </p>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              What's Included with Every Verification
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              When you use a credit to verify a worker's references, you get:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Complete Reference History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access to all verified references the worker has collected, including employment dates,
                    referee details, and full reference text.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI-Powered Summaries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Each reference includes an AI-generated summary highlighting key points, strengths,
                    and relevant experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Free Re-Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View the same worker's references again anytime at no additional cost. Credits are
                    only charged for the first verification.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verified Authenticity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    All references are submitted directly by employers via secure email links, ensuring
                    authenticity and preventing fraud.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Pricing FAQs
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    How does the credit system work for agencies?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      When you verify a worker's references for the first time, 1 credit is deducted from your
                      account. You can then view that worker's complete reference history. If you need to view
                      the same worker again in the future (for example, if they apply for another position),
                      you can access their references for free - no additional credit is charged.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Do credits expire?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      No. Credits never expire. Buy them whenever you need them and use them at your own pace.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Is RefVault really free for care workers?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, completely free. Workers can create unlimited reference requests, store unlimited
                      references, and share them with as many agencies as they want. We believe workers
                      shouldn't have to pay to prove their experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We accept all major credit and debit cards through Stripe, our secure payment processor.
                      Payments are processed in GBP (£).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Can I get a refund on unused credits?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Credits are non-refundable once purchased, as they never expire and can be used at any
                      time. However, if you have an issue with your purchase, please contact our support team
                      at support@refvault.co.uk and we'll be happy to help.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">
                    Do you offer enterprise pricing?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      For larger agencies with high-volume needs, please contact us at support@refvault.co.uk
                      to discuss custom pricing packages.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">
                    What if a worker has no references yet?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      If you search for a worker who has not yet collected any completed references, you will
                      see a "no references found" message and no credit will be charged. Credits are only
                      deducted when you successfully access a worker's reference history.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Streamline Your Hiring?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join care agencies and workers using RefVault to make reference checking faster and easier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/how-it-works">
                  Learn How It Works
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
