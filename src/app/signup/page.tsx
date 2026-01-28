"use client";

import * as React from "react";
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
import { FileText, Loader2, Mail } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { signUp, signInWithGoogle } = useAuth();

  const [userType, setUserType] = React.useState<'worker' | 'agency'>('worker');
  const [displayName, setDisplayName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const handleEmailSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (!displayName.trim()) {
      toast({
        variant: "destructive",
        title: "Name Required",
        description: "Please enter your full name.",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match.",
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
      });
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, displayName, userType);

      toast({
        title: "Account Created! ✉️",
        description: "Please check your email to verify your account.",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message || "Could not create account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    try {
      await signInWithGoogle(userType);

      toast({
        title: "Welcome to RefVault!",
        description: "Your account has been created successfully.",
      });

      router.push("/dashboard");
    } catch (error: any) {
      console.error('Google signup error:', error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message || "Could not sign up with Google. Please try again.",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">RefVault</span>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Choose your account type and sign up to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignup} className="grid gap-4">
            {/* User Type Selection */}
            <div className="grid gap-2">
              <Label>I am a...</Label>
              <RadioGroup value={userType} onValueChange={(value) => setUserType(value as 'worker' | 'agency')} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="worker" id="worker" className="peer sr-only" />
                  <Label
                    htmlFor="worker"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <span className="font-semibold">Care Worker</span>
                    <span className="text-xs text-muted-foreground mt-1">Store references</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="agency"
                    id="agency"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="agency"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <span className="font-semibold">Agency</span>
                    <span className="text-xs text-muted-foreground mt-1">Verify references</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="displayName">Full Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Smith"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                disabled={loading}
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-primary underline hover:no-underline" target="_blank">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary underline hover:no-underline" target="_blank">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading || googleLoading || !agreeToTerms}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Sign up with Google
          </Button>

          {/* Login Link */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary hover:text-primary/80">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
