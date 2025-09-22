import { ShieldCheck, Scale, Info, Flag, Link } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { type AnalysisResult } from "@/app/actions/analyze";

type AnalysisResultsProps = {
  results: AnalysisResult;
};

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const { toast } = useToast();

  const handleReport = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for helping improve our platform's accuracy.",
    });
  };
  
  const score = results.analysis.credibilityScore;
  const displayScore = Math.round(score * 100);

  let scoreColor = "text-chart-2"; // Green
  if (score < 0.7) scoreColor = "text-chart-1"; // Yellow
  if (score < 0.4) scoreColor = "text-destructive"; // Red


  return (
    <div className="mt-12 space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex flex-col items-center justify-center pt-6 text-center md:col-span-1">
          <CardHeader className="items-center pb-2">
             <ShieldCheck className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline">Credibility Score</CardTitle>
          </CardHeader>
          <CardContent className="flex w-full flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <span className={`font-headline text-6xl font-bold ${scoreColor}`}>
                  {displayScore}
                </span>
                <span className="text-sm font-medium text-muted-foreground">out of 100</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{results.analysis.insights}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline">Explanation :-</CardTitle>
            </div>
            <CardDescription>
              A detailed explanation of the analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{results.bias.biasAssessment}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Flag className="h-8 w-8 text-destructive" />
              <CardTitle className="font-headline">Potential Misinformation</CardTitle>
            </div>
            <CardDescription>
              Statements or claims that could be misleading, unverified, or false.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{results.analysis.potentialMisinformation}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Info className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline">Source Verification</CardTitle>
            </div>
            <CardDescription>
              Links to sources used for verification.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {results.analysis.sources.length > 0 ? (
                <ul className="space-y-2">
                    {results.analysis.sources.map((source, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Link className="h-4 w-4 text-primary" />
                            <a 
                                href={source} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline truncate"
                            >
                                {source}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">No sources were provided for this analysis.</p>
            )}
            
          </CardContent>
        </Card>
      </div>

       <div className="text-center pt-4">
        <Button variant="ghost" size="sm" onClick={handleReport} className="text-muted-foreground">
          <Flag className="mr-2 h-4 w-4" /> Report Inaccuracy in Analysis
        </Button>
      </div>
    </div>
  );
}
