"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Vault,
  Share2,
  Bell,
  TrendingUp,
  Search,
  History,
  CreditCard,
  BarChart3,
  Mail,
  Sparkles,
  FileCheck,
  Clock,
  Shield,
  Lock,
  Database,
  CheckCircle,
  Users,
  Zap,
  Fingerprint,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto py-16 md:py-24 px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Everything You Need for Faster Reference Checking
            </h1>
            <p className="text-xl text-muted-foreground">
              Powerful features designed for care workers, agencies, and referees.
            </p>
          </div>
        </section>

        {/* Worker Features */}
        <section className="container mx-auto pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                For Care Workers
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Build Your Professional Reference Portfolio
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Own your references, share them instantly, and never chase down former employers again.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Vault className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Secure Reference Vault</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Store unlimited verified references in your personal vault. Encrypted and
                    secure, accessible anytime you need them.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Fingerprint className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Unique Worker ID</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get your personal Worker Reference ID (RV-XXXXXX) - easy to share, easy to
                    remember. Share it with unlimited agencies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Share2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>One-Click Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Share your complete reference history instantly. No more requesting the same
                    references repeatedly for every job application.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Bell className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Real-Time Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get email notifications when referees submit references. Track request status
                    and know exactly when references are ready.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Request Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monitor all your reference requests in one place. See pending, sent, and
                    completed references at a glance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>AI-Enhanced Summaries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Each reference includes an AI-generated professional summary highlighting
                    your key strengths and experience.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-muted rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Free for Care Workers. Forever.</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlimited requests, unlimited storage, unlimited sharing.
                  </p>
                </div>
                <Button asChild>
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Agency Features */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4" variant="secondary">
                  For Agencies
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Verify References in Seconds, Not Days
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Cut recruitment admin, fill positions faster, and hire with confidence.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Search className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Instant Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Enter a Worker ID and access their complete reference history in seconds.
                      No waiting, no phone tag, no delays.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <History className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Complete Reference History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View all verified references for a worker, including employment dates,
                      referee details, and full reference text.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CreditCard className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Pay-Per-Use Credits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Only pay when viewing a worker for the first time. Re-access the same
                      worker's references unlimited times at no extra cost.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Users className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Worker View History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Track which workers you've verified. Easily find and re-access candidates
                      for future positions at no additional cost.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <BarChart3 className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Bulk Discounts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Save up to 20% with bulk credit packages. Credits never expire, so buy
                      when convenient and use as needed.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Sparkles className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>AI-Summarized References</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Quickly scan AI-generated summaries highlighting key points, strengths,
                      and relevant experience for faster decision-making.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 p-6 bg-background rounded-lg border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Starting at £18 per verification</h3>
                    <p className="text-sm text-muted-foreground">
                      When buying 10 credits. Save more with larger packages.
                    </p>
                  </div>
                  <Button asChild>
                    <Link href="/pricing">
                      View Pricing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Referee Features */}
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                For Referees
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Simple Reference Submission
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Write once, help your former employee forever. No account needed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Mail className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Secure Email Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Receive an authenticated email with a secure link. No account creation,
                    no passwords to remember.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileCheck className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Simple Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fill in employment dates, your role, and write your reference. Clean,
                    intuitive interface takes 5-10 minutes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>AI Assistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our AI automatically creates a professional summary from your reference,
                    highlighting key strengths and experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>One-Time Submission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Submit once and you're done. Your former employee can share it with
                    unlimited agencies without bothering you again.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Verified Authenticity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    References submitted via authenticated email links prevent fraud and ensure
                    authenticity for agencies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Instant Confirmation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get immediate confirmation when your reference is submitted. The worker
                    is notified automatically.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4" variant="secondary">
                  Security & Compliance
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Built with Security & Privacy First
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your data is protected with enterprise-grade security and full GDPR compliance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <Lock className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">End-to-End Encryption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      All data transmitted and stored is encrypted using industry-standard
                      AES-256 encryption.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">GDPR Compliant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Full compliance with UK GDPR and data protection regulations. Your
                      privacy is our priority.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Database className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">Secure Cloud Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Data stored on Google Cloud infrastructure with automatic backups and
                      99.9% uptime guarantee.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Zap className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">Authenticated Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Multi-factor authentication and secure email verification ensure only
                      authorized users access data.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-base">UK-Based</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      UK-registered company with data stored in UK/EU data centers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CheckCircle className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-base">Regular Audits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Regular security audits and penetration testing to ensure safety.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-base">Data Ownership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      You own your data. Export or delete it anytime, no questions asked.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Read our{" "}
                  <Link href="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="underline hover:text-primary">
                    Terms of Service
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                A Platform Built for Care
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Designed specifically for the care sector's unique reference checking needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Built on modern cloud infrastructure for instant access and real-time updates.
                    No waiting, no lag.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Sub-second reference lookups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Real-time status updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Instant email notifications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Accessible Anywhere</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access RefVault from any device - desktop, tablet, or mobile. Responsive
                    design works seamlessly everywhere.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Mobile-optimized interface</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Works on all modern browsers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>No app installation required</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>AI-Powered Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced AI extracts key insights from references, creating professional
                    summaries automatically.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Automatic summary generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Key strengths highlighted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Consistent professional format</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Support When You Need It</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dedicated UK-based support team ready to help with any questions or issues.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Email support: support@refvault.co.uk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Comprehensive help documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Fast response times</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Reference Checking?
              </h2>
              <p className="text-xl text-primary-foreground/90">
                Join the care community already saving time with RefVault.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/how-it-works">
                    See How It Works
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
