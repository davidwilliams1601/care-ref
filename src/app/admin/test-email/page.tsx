"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";

export default function TestEmailPage() {
  const [email, setEmail] = React.useState("david@theentrepreneurialdad.com");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{
    success: boolean;
    message?: string;
    emailId?: string;
    error?: string;
  } | null>(null);

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: email }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Outgoing Email</CardTitle>
              <CardDescription>
                Send a test email to verify your Resend configuration is working correctly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendTest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Recipient Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the email address where you want to receive the test email.
                  </p>
                </div>

                <Button type="submit" disabled={loading || !email.trim()} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Test Email...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Test Email
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Test Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant={result.success ? "default" : "destructive"}>
                  {result.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {result.success ? "Email Sent Successfully! ✉️" : "Email Failed"}
                  </AlertTitle>
                  <AlertDescription>
                    {result.success ? (
                      <div className="space-y-2">
                        <p>{result.message}</p>
                        {result.emailId && (
                          <p className="text-xs">Email ID: {result.emailId}</p>
                        )}
                        <p className="text-sm mt-2">
                          Check your inbox at <strong>{email}</strong> for the test email.
                          It should arrive within a few seconds.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>Error: {result.error}</p>
                        <p className="text-xs mt-2">
                          Check that your RESEND_API_KEY is set correctly in environment variables.
                        </p>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>

                {result.success && (
                  <div className="text-xs text-muted-foreground border-t pt-3 space-y-1">
                    <p className="font-semibold">✅ What this confirms:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Resend API is configured correctly</li>
                      <li>Domain verification (refvault.co.uk) is working</li>
                      <li>Email delivery is operational</li>
                      <li>Your application can send transactional emails</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-base">Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">From Address:</div>
                <div>RefVault &lt;noreply@refvault.co.uk&gt;</div>

                <div className="font-semibold">Email Provider:</div>
                <div>Resend</div>

                <div className="font-semibold">Domain:</div>
                <div>refvault.co.uk</div>

                <div className="font-semibold">Incoming Email:</div>
                <div>Cloudflare Email Routing</div>
              </div>

              <div className="border-t pt-3 mt-3">
                <p className="font-semibold mb-2">Production Email Flows:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><strong>Welcome emails</strong> - Sent on user signup</li>
                  <li><strong>Reference requests</strong> - Sent to employers</li>
                  <li><strong>Reference submissions</strong> - Sent to workers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
