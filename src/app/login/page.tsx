
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleWorkerLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you'd have login logic here.
    router.push("/dashboard");
  };

  const handleAgencyLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    // In a real app, you'd have login logic here.
    router.push("/agency");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
           <div className="flex items-center justify-center gap-2 mb-4">
             <Link href="/" className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold tracking-tight">RefVault</span>
             </Link>
            </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your details below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleWorkerLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue="worker@example.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full">
              Login as Worker
            </Button>
            <Button variant="outline" className="w-full" onClick={handleAgencyLogin}>
              Login as an Agency
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
