import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to RefVault ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our reference management platform at refvault.co.uk.
              </p>
              <p className="mt-4">
                RefVault is operated from the United Kingdom and complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, user type (care worker or agency)</li>
                <li><strong>Reference Requests:</strong> Employer names, job titles, employment dates, contact information</li>
                <li><strong>Reference Content:</strong> Employment references, referee details, reference summaries</li>
                <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store card details)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">2.2 Information Automatically Collected</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                <li><strong>Authentication Data:</strong> Login times, security events</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p>We use your personal information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Service Delivery:</strong> To provide and maintain the reference management platform</li>
                <li><strong>Communication:</strong> To send reference requests, notifications, and service updates</li>
                <li><strong>Verification:</strong> To verify employment references and maintain platform integrity</li>
                <li><strong>Payment Processing:</strong> To process credit purchases and maintain billing records</li>
                <li><strong>Improvement:</strong> To analyze usage and improve our services</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing (UK GDPR)</h2>
              <p>We process your personal data under the following legal bases:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Contract Performance:</strong> Processing necessary to provide our services to you</li>
                <li><strong>Legitimate Interests:</strong> Platform security, fraud prevention, service improvement</li>
                <li><strong>Consent:</strong> Marketing communications (where you have opted in)</li>
                <li><strong>Legal Obligation:</strong> Compliance with UK employment and data protection laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. How We Share Your Information</h2>

              <h3 className="text-xl font-semibold mb-2 mt-4">5.1 Reference Sharing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>With Agencies:</strong> When agencies purchase verification credits, they can view references you've provided</li>
                <li><strong>With Referees:</strong> Your reference request information is shared with the employers you specify</li>
                <li><strong>You Control:</strong> References are only shared with authorized, paying agencies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">5.2 Service Providers</h3>
              <p>We share data with trusted third-party service providers:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Firebase/Google Cloud:</strong> Database and authentication services (UK/EU data centers)</li>
                <li><strong>Stripe:</strong> Payment processing (PCI DSS compliant)</li>
                <li><strong>Resend:</strong> Email delivery services</li>
                <li><strong>Vercel:</strong> Hosting and infrastructure</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">5.3 Legal Requirements</h3>
              <p>We may disclose your information if required by law, court order, or to protect our legal rights.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations (e.g., financial records for 7 years)</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>
              <p className="mt-4">
                <strong>Reference Data:</strong> Employment references are retained for 7 years from creation to comply with UK employment law requirements. You may request earlier deletion, subject to our legal obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights Under UK GDPR</h2>
              <p>You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Right to Object:</strong> Object to certain types of processing</li>
                <li><strong>Rights Related to Automated Decision-Making:</strong> We do not use automated decision-making</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us at <a href="mailto:support@refvault.co.uk" className="text-primary underline">support@refvault.co.uk</a>. We will respond within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your data:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Data encryption in transit (TLS/SSL) and at rest</li>
                <li>Secure authentication with Firebase Auth</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
                <li>Secure payment processing through Stripe (PCI DSS Level 1)</li>
              </ul>
              <p className="mt-4">
                While we use industry-standard security measures, no system is 100% secure. We cannot guarantee absolute security of your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
              <p>
                Your data is primarily stored in UK/EU data centers. Some service providers (e.g., Vercel, Stripe) may process data outside the UK/EU using appropriate safeguards such as Standard Contractual Clauses (SCCs) approved by the UK Information Commissioner's Office (ICO).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Cookies and Tracking</h2>
              <p>We use essential cookies to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Ensure platform security</li>
              </ul>
              <p className="mt-4">
                We do not use advertising or tracking cookies. You can control cookies through your browser settings, but disabling essential cookies may affect platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a prominent notice on our platform. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p>For questions about this Privacy Policy or to exercise your data protection rights, contact us:</p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p><strong>Email:</strong> <a href="mailto:support@refvault.co.uk" className="text-primary underline">support@refvault.co.uk</a></p>
                <p className="mt-2"><strong>Data Protection Officer:</strong> <a href="mailto:dpo@refvault.co.uk" className="text-primary underline">dpo@refvault.co.uk</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">14. Complaints</h2>
              <p>
                If you believe we have not handled your personal data properly, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p><strong>ICO Website:</strong> <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-primary underline">ico.org.uk/make-a-complaint</a></p>
                <p className="mt-2"><strong>ICO Helpline:</strong> 0303 123 1113</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
