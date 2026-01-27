
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarIcon,
  History,
  Loader2,
  Sparkles,
  UploadCloud,
} from "lucide-react";

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
import type { Reference } from "@/types";
import { summarizeReference } from "@/ai/flows/summarize-reference";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";

const formSchema = z.object({
  employerName: z.string().min(2, "Employer name is required."),
  jobTitle: z.string().min(2, "Job title is required."),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date().optional(),
  referenceText: z.string().min(50, "Reference text must be at least 50 characters."),
  summary: z.string().optional(),
});

interface ReferenceFormProps {
  referenceToEdit?: Reference;
}

export function ReferenceForm({ referenceToEdit }: ReferenceFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSummarizing, setIsSummarizing] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employerName: referenceToEdit?.employerName || "",
      jobTitle: referenceToEdit?.jobTitle || "",
      startDate: referenceToEdit?.startDate,
      endDate: referenceToEdit?.endDate,
      referenceText: referenceToEdit?.referenceText || "",
      summary: referenceToEdit?.summary || "",
    },
  });

  const handleSummarize = async () => {
    const referenceText = form.getValues("referenceText");
    if (!referenceText || referenceText.length < 50) {
      toast({
        variant: "destructive",
        title: "Text is too short",
        description: "Please provide at least 50 characters to summarize.",
      });
      return;
    }
    setIsSummarizing(true);
    try {
      const result = await summarizeReference({ referenceText });
      form.setValue("summary", result.summary, { shouldValidate: true });
      toast({
        title: "Summary Generated!",
        description: "The AI summary has been added to the form.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Summarization Failed",
        description: "Could not generate summary. Please try again.",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: referenceToEdit ? "Reference Updated" : "Reference Saved",
      description: "Your reference has been successfully saved.",
    });
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {referenceToEdit ? "Edit Reference" : "Add New Reference"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior Care Assistant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
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
                      <FormLabel>End Date (optional)</FormLabel>
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
                      <FormLabel>Reference Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Copy and paste the full text of the reference here."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
              <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                    <FormLabel>AI Generated Summary</FormLabel>
                    <Button type="button" size="sm" onClick={handleSummarize} disabled={isSummarizing}>
                       {isSummarizing ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : (<Sparkles className="mr-2 h-4 w-4" />)}
                       {isSummarizing ? "Generating..." : "Generate with AI"}
                    </Button>
                 </div>
                 <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Click 'Generate with AI' or write your own summary."
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A concise summary of the reference, highlighting key skills.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Label>Document Upload (Optional)</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                    <div className="text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"
                        >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-muted-foreground">PDF, DOCX, PNG, JPG up to 10MB</p>
                    </div>
                </div>
              </div>

            </CardContent>
          </Card>
          
          {referenceToEdit && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" /> Version History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {referenceToEdit.versionHistory.map(v => (
                    <li key={v.version} className="flex justify-between">
                      <span>Version {v.version}: {v.changes}</span>
                      <span>{format(v.date, "dd MMM yyyy")}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isSummarizing}>
              {referenceToEdit ? "Save Changes" : "Save Reference"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
