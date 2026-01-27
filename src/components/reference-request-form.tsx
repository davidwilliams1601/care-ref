
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { sendReferenceRequest } from "@/app/actions/send-reference-request";

const formSchema = z.object({
  workerId: z.string().default("worker-123"), // This would be the logged in user's ID
  employerName: z.string().min(2, "Employer name is required."),
  employerEmail: z.string().email("Please enter a valid email address."),
  jobTitle: z.string().min(2, "Job title is required."),
});

export function ReferenceRequestForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workerId: "worker-123",
      employerName: "",
      employerEmail: "",
      jobTitle: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const result = await sendReferenceRequest(values);

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Request Sent!",
        description: `Your reference request has been sent to ${values.employerName}.`,
      });
      router.push("/dashboard");
      router.refresh(); // Refresh the page to show the new request
    } else {
       toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Request a New Reference</CardTitle>
              <CardDescription>
                Enter your former employer's details below. We'll send them a secure link to complete your reference.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="employerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Care UK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Email</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. manager@care-provider.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We will send the reference request to this email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Care Assistant" {...field} />
                    </FormControl>
                     <FormDescription>
                      The job title you held with this employer.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
              <Send className="mr-2"/>
              Send Request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
