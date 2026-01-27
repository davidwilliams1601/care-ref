
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { CalendarIcon, CheckCircle, Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { ReferenceRequest } from "@/types";
import { summarizeReference } from "@/ai/flows/summarize-reference";
import { submitReference } from "@/app/actions/submit-reference";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

const formSchema = z.object({
  refereeName: z.string().min(2, "Your name is required."),
  refereeJobTitle: z.string().min(2, "Your job title is required."),
  startDate: z.date({ required_error: "Employment start date is required." }),
  endDate: z.date().optional(),
  referenceText: z.string().min(50, "Reference text must be at least 50 characters."),
});

interface ReferenceSubmissionFormProps {
    request?: ReferenceRequest;
}

export function ReferenceSubmissionForm({ request: initialRequest }: ReferenceSubmissionFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [request, setRequest] = React.useState(initialRequest);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      refereeName: "",
      refereeJobTitle: "",
      referenceText: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!request) return;

    setIsSubmitting(true);
    try {
      // TEMPORARY: AI summarization disabled due to quota limits
      // Generate AI summary of the reference
      // const { summary } = await summarizeReference({ referenceText: values.referenceText });

      // Use placeholder summary for now
      const summary = `Reference provided for ${request.jobTitle} position at ${request.employerName}. Employment period: ${values.startDate.toLocaleDateString()} to ${values.endDate?.toLocaleDateString() || 'Present'}.`;

      // Submit reference to Firestore
      const result = await submitReference({
        requestId: request.id,
        workerId: request.workerId,
        refereeName: values.refereeName,
        refereeJobTitle: values.refereeJobTitle,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate?.toISOString(),
        referenceText: values.referenceText,
        summary,
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      toast({
          title: "Reference Submitted!",
          description: "Thank you for providing a reference. It has been stored securely.",
      });
      setIsSubmitted(true);

    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Could not submit the reference. Please try again.",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
        <div className="container mx-auto max-w-2xl p-4 md:p-8 text-center">
             <Card>
                <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="mt-4">Thank You!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your reference has been securely submitted. You can now close this window.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  if (!request) {
     return (
        <div className="container mx-auto max-w-2xl p-4 md:p-8 text-center">
             <Card>
                <CardHeader>
                    <CardTitle>Invalid Request Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This reference request link is either invalid or has expired. Please contact the person who requested the reference.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  if (request.status === 'Completed') {
     return (
        <div className="container mx-auto max-w-2xl p-4 md:p-8 text-center">
             <Card>
                <CardHeader>
                    <CardTitle>Reference Already Submitted</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This reference has already been completed. Thank you for your time. You can now close this window.</p>
                </CardContent>
            </Card>
        </div>
    )
  }


  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Reference</CardTitle>
              <CardDescription>
                You are submitting a reference for a former employee who worked as a <span className="font-semibold">{request.jobTitle}</span> at <span className="font-semibold">{request.employerName}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="refereeName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Full Name</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g. Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="refereeJobTitle"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Job Title</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g. Care Home Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
               </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Employment Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Employment End Date (optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                             disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="referenceText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide a fair and honest reference for the individual based on their time with your organization."
                        className="min-h-[250px]"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      We will generate an AI summary for the next employer, but this full text will be stored securely.
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
              Submit Reference
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
