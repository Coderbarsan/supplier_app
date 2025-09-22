"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { AnalysisForm } from "@/components/analysis-form";
import { AnalysisResults } from "@/components/analysis-results";
import { EducationSection } from "@/components/education-section";
import type { AnalysisResult } from "@/app/actions/analyze";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

function ResultsSkeleton() {
    return (
        <div className="mt-12 space-y-8 animate-pulse">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="flex flex-col items-center justify-center pt-6 lg:col-span-1">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-6 w-32 mt-4" />
                    <Skeleton className="h-48 w-48 rounded-full mt-4" />
                    <div className="w-full px-6 space-y-2 mt-4">
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-3/5" />
                    </div>
                </Card>
                <Card className="lg:col-span-2 p-6 space-y-4">
                     <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-52" />
                    <div className="space-y-2 pt-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </Card>
            </div>
        </div>
    );
}


export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalysisStart = () => {
    setShowResults(true);
    setAnalysisResult(null);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-16">
          <section className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Shine a Light on the Truth
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI-powered tool helps you analyze content, detect bias, and verify information in real-time. Make sense of the digital world with confidence.
            </p>
          </section>

          <section className="mt-10 mx-auto max-w-3xl">
              <AnalysisForm 
                onAnalysisStart={handleAnalysisStart}
                onAnalysisComplete={handleAnalysisComplete}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
          </section>

          {showResults && (
             <section className="mt-12">
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-background px-3 font-headline text-lg font-medium text-primary">Analysis Results</span>
                    </div>
                </div>

                {isLoading && <ResultsSkeleton />}
                {analysisResult && <AnalysisResults results={analysisResult} />}
             </section>
          )}

          <EducationSection />
          
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} VeriScope. All rights reserved.
      </footer>
    </div>
  );
}
