
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  workerId: z.string().min(5, "Worker ID must be at least 5 characters."),
});

interface VerifyReferenceFormProps {
  onVerify: () => Promise<void>;
  currentCredits: number;
}

export function VerifyReferenceForm({ onVerify, currentCredits }: VerifyReferenceFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workerId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (currentCredits <= 0) {
      toast({
        variant: "destructive",
        title: "No Credits Remaining",
        description: `Please purchase more credits to verify references.`,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Deduct credit
      await onVerify();

      toast({
        title: "Verification Credit Used",
        description: `Searching for references for worker ID: ${values.workerId}`,
      });

      // Navigate to results
      router.push(`/agency/results/${values.workerId}`);
    } catch (error) {
      console.error('Verification failed:', error);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Failed to deduct credit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="workerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Worker ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g. worker-123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={currentCredits <= 0 || isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Verify References (1 Credit)
        </Button>
      </form>
    </Form>
  );
}
