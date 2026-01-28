"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Mail,
  Send,
  CheckCircle,
  Share2,
  Search,
  CreditCard,
  Eye,
  UserCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Clock,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto py-16 md:py-24 px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              How RefVault Works
            </h1>
            <p className="text-xl text-muted-foreground">
              A simple three-step process that makes reference checking faster for everyone.
            </p>
          </div>
        </section>

        {/* For Workers Section */}
        <section className="container mx-auto pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                For Care Workers
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Build Your Reference Vault
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Collect your references once and share them with unlimited employers.
                No more chasing down the same people every time you apply for a job.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <CardTitle className="text-center">Request Reference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <Send className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Enter your former employer's details. We'll send them a secure email with
                    a simple form to complete.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1 pt-2">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Takes less than 1 minute</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Track status in real-time</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <CardTitle className="text-center">Reference Submitted</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <Sparkles className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Your referee completes the form. Our AI instantly creates a professional
                    summary and stores it securely in your vault.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1 pt-2">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>AI-powered summaries</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Email notification when complete</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <CardTitle className="text-center">Share Your ID</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <Share2 className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Get your unique Worker ID (RV-XXXXXX) and share it with agencies when
                    applying. They can instantly verify all your references.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1 pt-2">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Easy to share and remember</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Use with unlimited agencies</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Agencies Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4" variant="secondary">
                  For Agencies
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Verify References Instantly
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  No more waiting days for reference checks. Verify care workers in seconds
                  and fill positions faster.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                      <span className="font-bold text-lg">1</span>
                    </div>
                    <CardTitle className="text-center">Enter Worker ID</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <Search className="h-16 w-16 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Ask the care worker for their RefVault Worker ID (format: RV-XXXXXX).
                      Enter it in your verification dashboard.
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1 pt-2">
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Simple 6-digit format</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Instant lookup</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                      <span className="font-bold text-lg">2</span>
                    </div>
                    <CardTitle className="text-center">Use 1 Credit</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <CreditCard className="h-16 w-16 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      If it's the first time viewing this worker, 1 credit is deducted.
                      Repeat views are free forever.
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1 pt-2">
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Only charged once per worker</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Credits never expire</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                      <span className="font-bold text-lg">3</span>
                    </div>
                    <CardTitle className="text-center">View All References</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <Eye className="h-16 w-16 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Instantly access all verified references, including employment dates,
                      referee details, and AI-generated summaries.
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1 pt-2">
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Complete reference history</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Make faster hiring decisions</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Starting at £18 per verification
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Referees Section */}
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                For Referees
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Submit a Reference Once
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No more repeating yourself. Write one reference and know it's stored
                securely for your former employee to share.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <CardTitle className="text-center">Receive Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <Mail className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Get a secure email request from your former employee via RefVault.
                    Click the link to open the reference form.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1 pt-2">
                    <p className="flex items-start gap-2">
                      <Lock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Secure, authenticated link</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>One-time submission</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <CardTitle className="text-center">Complete Simple Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <FileText className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Fill in employment dates, your role, and write your reference. Our AI
                    creates a professional summary automatically.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1 pt-2">
                    <p className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Takes 5-10 minutes</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>AI helps with formatting</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <CardTitle className="text-center">Done!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <UserCheck className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Your reference is securely stored. The worker can now share it with
                    agencies. You'll never be asked again.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1 pt-2">
                    <p className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Secure & encrypted storage</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>No account required</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground">
                Referees don't need to create an account - just click, complete, and done!
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why RefVault Works Better
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Clock className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Save Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Cut reference checking from days to seconds. Workers don't chase referees,
                      agencies don't wait, referees submit once.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Secure & Verified</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      All references submitted directly via authenticated email links.
                      No fake references, no fraud, complete peace of mind.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Sparkles className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>AI-Powered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Automatic professional summaries highlight key strengths and experience.
                      Easier for agencies to review, better presentation for workers.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Streamline Your References?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join care workers and agencies making reference checking faster and easier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">
                  View Pricing
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
