"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto py-16 md:py-24 px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about RefVault. Can't find what you're looking for?{" "}
              <Link href="mailto:support@refvault.co.uk" className="underline hover:text-primary">
                Contact us
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto pb-16 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* General Questions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">General Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    What is RefVault?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      RefVault is a digital reference management platform designed specifically for the
                      care sector. It allows care workers to collect, store, and share employment
                      references securely, while enabling agencies to verify references instantly. Think of
                      it as a secure "vault" for your professional references that you can access and share
                      anytime.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    How does RefVault make reference checking faster?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p>
                        RefVault eliminates the traditional back-and-forth of reference checking:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                          <strong>Workers:</strong> Request references once, share them unlimited times
                        </li>
                        <li>
                          <strong>Referees:</strong> Submit a reference once via a simple form (5-10 minutes)
                        </li>
                        <li>
                          <strong>Agencies:</strong> Enter a Worker ID and see all references instantly
                        </li>
                      </ul>
                      <p className="mt-2">
                        Instead of waiting days or weeks for references, agencies get instant access to
                        verified, authenticated references, allowing them to make hiring decisions faster.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Is RefVault only for the care sector?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      RefVault is specifically designed for care workers and care agencies, with features
                      tailored to the unique needs of the care sector. However, the platform can be used by
                      anyone who needs to manage and share employment references.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* For Care Workers */}
            <div>
              <h2 className="text-2xl font-bold mb-6">For Care Workers</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="worker-1">
                  <AccordionTrigger className="text-left">
                    Is RefVault really free for care workers?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, completely free. There are no hidden costs, no premium tiers, and no limits.
                      Care workers can create unlimited reference requests, store unlimited references,
                      and share them with unlimited agencies at no cost. We believe workers shouldn't have
                      to pay to prove their experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="worker-2">
                  <AccordionTrigger className="text-left">
                    How do I request a reference?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p>Requesting a reference is simple:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Sign up for a free account</li>
                        <li>Click "Request a Reference" from your dashboard</li>
                        <li>
                          Enter your former employer's details (name, email, your job title, employment dates)
                        </li>
                        <li>Submit - we'll send them a secure email with a simple form</li>
                      </ol>
                      <p className="mt-2">
                        You can track the status of all your requests from your dashboard and receive email
                        notifications when references are completed.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="worker-3">
                  <AccordionTrigger className="text-left">
                    What is my Worker Reference ID?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Your Worker Reference ID is a unique 6-digit code (format: RV-XXXXXX) that's
                      automatically generated when you create your account. This ID is much easier to share
                      than a long Firebase UID. You can find it prominently displayed on your dashboard with
                      a copy button. Share this ID with agencies when applying for positions - they can use
                      it to instantly verify all your references.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="worker-4">
                  <AccordionTrigger className="text-left">
                    How do I share my references with an agency?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Simply provide your Worker Reference ID (RV-XXXXXX) to the agency when applying.
                      You can copy it from your dashboard with one click. The agency can then enter your
                      ID into their RefVault account to instantly access all your verified references.
                      You don't need to do anything else - the agency handles the verification on their end.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="worker-5">
                  <AccordionTrigger className="text-left">
                    What if my referee doesn't respond?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      You can track the status of all reference requests from your dashboard. If a referee
                      hasn't responded after a reasonable time, you can politely follow up with them directly.
                      You can also create a new request if needed. We recommend giving referees at least
                      1-2 weeks to respond, as they may be busy with their own work commitments.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="worker-6">
                  <AccordionTrigger className="text-left">
                    Can I edit or delete a reference?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To maintain authenticity and prevent fraud, references cannot be edited once submitted
                      by the referee. However, you can delete references from your vault if needed. If you
                      believe a reference contains an error, we recommend contacting the referee directly
                      to request a new submission with corrections.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="worker-7">
                  <AccordionTrigger className="text-left">
                    How many references should I have?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Most agencies prefer at least 2-3 recent references covering your most recent
                      positions. However, having more references in your vault gives agencies a more
                      complete picture of your work history. We recommend collecting references from all
                      significant positions in your care career.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* For Agencies */}
            <div>
              <h2 className="text-2xl font-bold mb-6">For Agencies</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="agency-1">
                  <AccordionTrigger className="text-left">
                    How does the credit system work?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p>The credit system is simple and fair:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                          <strong>First time viewing a worker:</strong> 1 credit is deducted when you enter
                          their Worker ID and access their references
                        </li>
                        <li>
                          <strong>Repeat views:</strong> If you need to view the same worker's references
                          again (e.g., they apply for another position), access is free - no additional
                          credit is charged
                        </li>
                        <li>
                          <strong>Credits never expire:</strong> Buy them when convenient and use as needed
                        </li>
                      </ul>
                      <p className="mt-2">
                        This means you only pay once per worker, regardless of how many times you need to
                        review their references.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="agency-2">
                  <AccordionTrigger className="text-left">
                    How much do credits cost?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p>We offer tiered pricing with bulk discounts:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>1 credit: £20</li>
                        <li>5 credits: £95 (£19 per credit, save 5%)</li>
                        <li>10 credits: £180 (£18 per credit, save 10%)</li>
                        <li>25 credits: £400 (£16 per credit, save 20%)</li>
                      </ul>
                      <p className="mt-2">
                        See our <Link href="/pricing" className="underline hover:text-primary">pricing page</Link> for
                        more details. Contact us for enterprise pricing for high-volume agencies.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="agency-3">
                  <AccordionTrigger className="text-left">
                    Do credits expire?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      No, credits never expire. Buy them whenever you need them and use them at your own
                      pace. This gives you flexibility and ensures you're never pressured to use credits
                      before they expire.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="agency-4">
                  <AccordionTrigger className="text-left">
                    What if a worker has no references?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      If you search for a worker who hasn't collected any completed references yet, you'll
                      see a "no references found" message. Importantly, <strong>no credit will be charged</strong> in
                      this case. Credits are only deducted when you successfully access a worker's reference
                      history.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="agency-5">
                  <AccordionTrigger className="text-left">
                    How do I verify a worker's references?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Ask the care worker for their Worker Reference ID (format: RV-XXXXXX)</li>
                        <li>Log in to your RefVault agency account</li>
                        <li>Enter the Worker ID in the verification form</li>
                        <li>If you haven't viewed this worker before, 1 credit will be deducted</li>
                        <li>Instantly access their complete reference history</li>
                      </ol>
                      <p className="mt-2">
                        The entire process takes less than 30 seconds.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="agency-6">
                  <AccordionTrigger className="text-left">
                    Can I get a refund on unused credits?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Credits are non-refundable once purchased, as they never expire and can be used at
                      any time in the future. However, if you have an issue with your purchase or account,
                      please contact our support team at support@refvault.co.uk and we'll be happy to help
                      resolve it.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="agency-7">
                  <AccordionTrigger className="text-left">
                    Do you offer enterprise pricing?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes! For larger agencies with high-volume verification needs, we offer custom pricing
                      packages. Please contact us at support@refvault.co.uk with details about your
                      anticipated volume, and we'll create a tailored package for you.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Security & Privacy */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Security & Privacy</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="security-1">
                  <AccordionTrigger className="text-left">
                    Is my data secure?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p>Yes. We take security very seriously:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                          <strong>Encryption:</strong> All data is encrypted in transit (HTTPS) and at rest
                          (AES-256)
                        </li>
                        <li>
                          <strong>Cloud Infrastructure:</strong> Hosted on Google Cloud with 99.9% uptime
                          guarantee
                        </li>
                        <li>
                          <strong>Authentication:</strong> Secure Firebase authentication with email
                          verification
                        </li>
                        <li>
                          <strong>Regular Backups:</strong> Automatic daily backups to prevent data loss
                        </li>
                        <li>
                          <strong>UK-Based:</strong> Data stored in UK/EU data centers
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security-2">
                  <AccordionTrigger className="text-left">
                    Is RefVault GDPR compliant?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, RefVault is fully compliant with UK GDPR and data protection regulations. You
                      own your data and can export or delete it at any time. We are transparent about
                      what data we collect and how we use it. Read our{" "}
                      <Link href="/privacy" className="underline hover:text-primary">
                        Privacy Policy
                      </Link>{" "}
                      for full details.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security-3">
                  <AccordionTrigger className="text-left">
                    How do you prevent fake references?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p>We have several measures in place to ensure reference authenticity:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                          <strong>Authenticated Email Links:</strong> References must be submitted via
                          secure, unique email links sent directly to the referee's email address
                        </li>
                        <li>
                          <strong>One-Time Submission:</strong> Each reference link can only be used once
                        </li>
                        <li>
                          <strong>Email Verification:</strong> Referee email addresses are verified
                        </li>
                        <li>
                          <strong>Timestamp Tracking:</strong> All submissions are timestamped and logged
                        </li>
                        <li>
                          <strong>Audit Trail:</strong> Complete audit trail of all reference submissions
                        </li>
                      </ul>
                      <p className="mt-2">
                        These measures make it extremely difficult to submit fraudulent references.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security-4">
                  <AccordionTrigger className="text-left">
                    Who can see my references?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p>
                        <strong>For workers:</strong> Only agencies you explicitly share your Worker ID with can view
                        your references. Your references are not publicly visible or searchable. You have complete
                        control over who can access your reference vault.
                      </p>
                      <p className="mt-2">
                        <strong>For agencies:</strong> You can only view references for workers whose Worker ID you
                        have been given. You cannot browse or search for workers randomly - you must have their
                        explicit permission (via their Worker ID) to view their references.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security-5">
                  <AccordionTrigger className="text-left">
                    Can I delete my account and data?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, you can delete your account at any time. When you delete your account, all your
                      personal data and references are permanently removed from our systems. This action cannot
                      be undone. Please contact support@refvault.co.uk to request account deletion.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Technical & Support */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Technical & Support</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="tech-1">
                  <AccordionTrigger className="text-left">
                    Do I need to install an app?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      No, RefVault is a web-based platform that works in any modern browser (Chrome, Safari,
                      Firefox, Edge). Simply visit our website and log in. The platform is fully responsive
                      and works seamlessly on desktop, tablet, and mobile devices.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-2">
                  <AccordionTrigger className="text-left">
                    What browsers are supported?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      RefVault works on all modern browsers including Google Chrome, Safari, Firefox,
                      Microsoft Edge, and Opera. We recommend using the latest version of your preferred
                      browser for the best experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-3">
                  <AccordionTrigger className="text-left">
                    I'm having technical issues. Who can I contact?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Our support team is here to help! Email us at{" "}
                      <a
                        href="mailto:support@refvault.co.uk"
                        className="underline hover:text-primary"
                      >
                        support@refvault.co.uk
                      </a>{" "}
                      with details about your issue, including:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground mt-2">
                      <li>What you were trying to do</li>
                      <li>What happened instead</li>
                      <li>Any error messages you saw</li>
                      <li>Your browser and device type</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      We typically respond within 24 hours on business days.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-4">
                  <AccordionTrigger className="text-left">
                    Do you have a mobile app?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Not currently, but RefVault is fully mobile-responsive and works perfectly in mobile
                      browsers. We're exploring a dedicated mobile app for the future based on user feedback.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-5">
                  <AccordionTrigger className="text-left">
                    Can I integrate RefVault with my existing systems?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We're currently focused on our core platform, but API integrations are on our roadmap.
                      If you're interested in integrating RefVault with your agency management system or
                      other tools, please contact us at support@refvault.co.uk to discuss your needs.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto p-8">
              <div className="text-center space-y-4">
                <Mail className="h-12 w-12 text-primary mx-auto" />
                <h2 className="text-2xl font-bold">Still Have Questions?</h2>
                <p className="text-muted-foreground">
                  We're here to help. Get in touch with our support team and we'll get back to you
                  as soon as possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button asChild>
                    <a href="mailto:support@refvault.co.uk">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/how-it-works">
                      Learn How It Works
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
