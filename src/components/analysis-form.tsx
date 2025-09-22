"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import { runAnalysis, type AnalysisResult } from "@/app/actions/analyze";

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Please enter some content to analyze.",
  }).max(5000, {
    message: "Content must not be longer than 5000 characters."
  }),
});

type AnalysisFormProps = {
    onAnalysisComplete: (result: AnalysisResult) => void;
    onAnalysisStart: () => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
};

export function AnalysisForm({ onAnalysisComplete, onAnalysisStart, setIsLoading, isLoading }: AnalysisFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onAnalysisStart();
    setIsLoading(true);
    const result = await runAnalysis(values.content);
    setIsLoading(false);

    if (result.success) {
      onAnalysisComplete(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: result.error,
      });
    }
  }

  return (
    <Card>
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Content to Analyze</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste a news article, social media post, or any text here to verify..."
                      className="min-h-[200px] text-base resize-y shadow-inner"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
                <Button type="submit" size="lg" disabled={isLoading} className="font-headline text-lg shadow-md hover:shadow-lg transition-shadow">
                    {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <Wand2 className="mr-2 h-5 w-5" />
                    )}
                    Analyze Content
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
}
