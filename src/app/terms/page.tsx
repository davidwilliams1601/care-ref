import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using RefVault ("Platform", "Service", "we", "our", or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform.
              </p>
              <p className="mt-4">
                These Terms constitute a legally binding agreement between you and RefVault. Please read them carefully.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
              <p>To use our Platform, you must:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be prohibited from using our services under UK law</li>
                <li>Provide accurate and complete registration information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Account Types and Services</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">3.1 Care Worker Accounts</h3>
              <p>Care workers can:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Request employment references from former employers</li>
                <li>Store references securely in their personal vault</li>
                <li>Grant agencies access to view their references</li>
                <li>Manage and track reference requests</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">3.2 Agency Accounts</h3>
              <p>Recruitment agencies can:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Purchase verification credits</li>
                <li>Access care workers' verified employment references</li>
                <li>View reference history and summaries</li>
                <li>Re-access previously viewed workers at no additional cost</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">4.1 Account Security</h3>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Using a strong, unique password</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">4.2 Accurate Information</h3>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide truthful, accurate, and complete information</li>
                <li>Update your information to maintain accuracy</li>
                <li>Not impersonate any person or entity</li>
                <li>Not create false or misleading references</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">4.3 Prohibited Conduct</h3>
              <p>You must not:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Use the Platform for any unlawful purpose</li>
                <li>Submit false, fraudulent, or fabricated references</li>
                <li>Attempt to gain unauthorized access to any part of the Platform</li>
                <li>Use automated systems (bots, scrapers) without permission</li>
                <li>Interfere with or disrupt the Platform's operation</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share your account access with others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Reference Requests and Submissions</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">5.1 For Care Workers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may only request references from employers where you were genuinely employed</li>
                <li>You must provide legitimate employer contact information</li>
                <li>You understand that we validate corporate email addresses to ensure authenticity</li>
                <li>Personal email addresses (Gmail, Yahoo, etc.) cannot be used for employer contacts</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">5.2 For Referees (Employers)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>References must be truthful and based on genuine employment experience</li>
                <li>You confirm you have authority to provide employment references</li>
                <li>You understand references may be viewed by multiple agencies</li>
                <li>Once submitted, references cannot be edited (but can be disputed - see Section 11)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">6.1 Pricing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Care Workers:</strong> Free to create accounts and request references</li>
                <li><strong>Agencies:</strong> Purchase verification credits to access references</li>
                <li>Pricing is displayed clearly before purchase</li>
                <li>Bulk discounts available for multiple credits</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">6.2 Payment Processing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments are processed securely through Stripe</li>
                <li>All prices are in British Pounds (GBP)</li>
                <li>Payments are non-refundable except as required by law</li>
                <li>We reserve the right to change pricing with 30 days' notice</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">6.3 Credits</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credits are used to access worker references</li>
                <li>One credit = access to one worker's complete reference history</li>
                <li>Re-accessing previously viewed workers is free</li>
                <li>Credits do not expire</li>
                <li>Credits are non-transferable and non-refundable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">7.1 Platform Ownership</h3>
              <p>
                The Platform, including all content, features, and functionality, is owned by RefVault and protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">7.2 User Content</h3>
              <p>You retain ownership of content you submit (references, requests, etc.) but grant us a license to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Store and process your content to provide our services</li>
                <li>Share references with authorized agencies as per platform functionality</li>
                <li>Use anonymized, aggregated data for service improvement</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">7.3 AI-Generated Summaries</h3>
              <p>
                We use AI to generate reference summaries. These summaries are provided as-is and should be reviewed alongside the original reference text. We do not guarantee accuracy of AI-generated content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Data Protection and Privacy</h2>
              <p>
                Your use of the Platform is also governed by our <a href="/privacy" className="text-primary underline">Privacy Policy</a>, which explains how we collect, use, and protect your personal information in compliance with UK GDPR.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Disclaimers and Limitations of Liability</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">9.1 Service "As Is"</h3>
              <p>
                The Platform is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">9.2 Reference Accuracy</h3>
              <p>We do not:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Verify the truthfulness or accuracy of references</li>
                <li>Guarantee employment based on references</li>
                <li>Take responsibility for hiring decisions made using our Platform</li>
                <li>Warrant that references are complete or up-to-date</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">9.3 Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by UK law, RefVault shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the Platform.
              </p>
              <p className="mt-4">
                Our total liability to you for any claim arising from these Terms shall not exceed the amount you paid us in the 12 months preceding the claim, or £100, whichever is greater.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless RefVault, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Your use of the Platform</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any false or fraudulent information you provide</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Dispute Resolution</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">11.1 Reference Disputes</h3>
              <p>If you believe a reference is inaccurate or fraudulent:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Contact us at <a href="mailto:support@refvault.co.uk" className="text-primary underline">support@refvault.co.uk</a></li>
                <li>Provide evidence of the inaccuracy</li>
                <li>We will investigate and may remove or flag disputed references</li>
                <li>Final determination is at our discretion</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">11.2 Informal Resolution</h3>
              <p>
                For any dispute arising from these Terms, you agree to first contact us to attempt informal resolution before pursuing legal action.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">11.3 Governing Law</h3>
              <p>
                These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">12.1 By You</h3>
              <p>You may terminate your account at any time by contacting us. Upon termination:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your account will be deactivated</li>
                <li>Unused credits are non-refundable</li>
                <li>Your data will be retained or deleted per our Privacy Policy</li>
                <li>Previously shared references may remain accessible to agencies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">12.2 By Us</h3>
              <p>We may suspend or terminate your account if you:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent activity</li>
                <li>Fail to pay fees owed</li>
                <li>Pose a security or legal risk</li>
              </ul>
              <p className="mt-4">
                We will provide notice where reasonably possible, except in cases of serious violations or legal requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. Material changes will be notified via email or prominent notice on the Platform. Continued use after changes constitutes acceptance of the modified Terms.
              </p>
              <p className="mt-4">
                If you do not agree to the modified Terms, you must stop using the Platform and may terminate your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">14. General Provisions</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">14.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and RefVault regarding use of the Platform.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">14.2 Severability</h3>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">14.3 Waiver</h3>
              <p>
                Our failure to enforce any right or provision of these Terms does not constitute a waiver of such right or provision.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">14.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms without our written consent. We may assign these Terms without restriction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
              <p>For questions about these Terms, contact us:</p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p><strong>Email:</strong> <a href="mailto:support@refvault.co.uk" className="text-primary underline">support@refvault.co.uk</a></p>
                <p className="mt-2"><strong>Legal Inquiries:</strong> <a href="mailto:legal@refvault.co.uk" className="text-primary underline">legal@refvault.co.uk</a></p>
              </div>
            </section>

            <div className="mt-8 p-6 bg-muted rounded-lg border-l-4 border-primary">
              <p className="font-semibold">Important Notice:</p>
              <p className="mt-2 text-sm">
                By creating an account and using RefVault, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our Platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
