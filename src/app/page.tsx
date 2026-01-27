
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function WelcomePage() {
  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">RefVault</span>
            </Link>
            <div className="flex items-center gap-4">
               <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto py-20 md:py-24">
           <div className="grid grid-cols-1 gap-12 items-center">
             <div className="space-y-6 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Stop Waiting. Start Working.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                    RefVault reduces time-to-hire by giving care workers a secure, portable vault for their job references. Less paperwork for agencies, faster employment for workers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                    <Link href="/signup">Get Started for Free</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                    <Link href="/login">Access Your Vault</Link>
                    </Button>
                </div>
             </div>
           </div>
        </section>

        <section className="bg-muted py-20">
            <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <h3 className="text-2xl font-bold">For Workers</h3>
                    <p className="mt-2 text-muted-foreground">Get hired faster. Own your references and share them instantly and securely with any potential employer.</p>
                </div>
                 <div>
                    <h3 className="text-2xl font-bold">For Agencies</h3>
                    <p className="mt-2 text-muted-foreground">Cut down on recruitment admin. Verify trusted references in a single click and place candidates quicker.</p>
                </div>
                 <div>
                    <h3 className="text-2xl font-bold">For Referees</h3>
                    <p className="mt-2 text-muted-foreground">Submit a reference once. Our simple, secure form and AI tools make it quick and easy.</p>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">A Simpler, Faster Way to Verify References</h2>
              <p className="mt-4 text-muted-foreground">
                Our streamlined process eliminates the back-and-forth, getting you from request to verification in record time.
              </p>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="mt-4 text-xl font-bold">Request</h3>
                <p className="mt-2 text-muted-foreground">Workers send a reference request to former employers with a single click.</p>

              </div>
              <div className="flex flex-col items-center">
                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="mt-4 text-xl font-bold">Submit & Summarize</h3>
                <p className="mt-2 text-muted-foreground">Referees use a simple form to submit. Our AI instantly creates a professional summary.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                  <span className="font-bold text-lg">3</span>
                </div>
                <h3 className="mt-4 text-xl font-bold">Share & Verify</h3>
                <p className="mt-2 text-muted-foreground">Workers share securely. Agencies verify trusted references with one click.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto">
             <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Trusted by the Care Community</h2>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman portrait" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                     <p className="text-sm text-muted-foreground">"RefVault has been a game-changer. I landed my new role two weeks faster because my references were ready to go. No more chasing managers for paperwork!"</p>
                     <p className="mt-4 font-semibold">Aisha Khan</p>
                     <p className="text-xs text-muted-foreground">Senior Care Worker</p>
                  </div>
                </CardHeader>
              </Card>
               <Card>
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="male portrait" />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                     <p className="text-sm text-muted-foreground">"The time we save on reference checks is incredible. We can verify a candidate's history in minutes, not days. This lets us fill positions faster with trusted professionals."</p>
                     <p className="mt-4 font-semibold">David Patel</p>
                     <p className="text-xs text-muted-foreground">Recruitment Manager, Helping Hands Agency</p>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

      </main>
       <footer className="border-t py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {year || new Date().getFullYear()} RefVault. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
