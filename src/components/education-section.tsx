import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const educationalContent = [
    {
        title: "What is Misinformation?",
        content: "Misinformation is false or inaccurate information that is spread, regardless of intent to deceive. It can be simple mistakes, but it can also be part of a larger disinformation campaign designed to mislead."
    },
    {
        title: "How to Spot Fake News",
        content: "1. Check the source: Is it a reputable news organization? \n2. Look for evidence: Does the article cite credible sources? \n3. Watch for emotional language: Misinformation often tries to provoke a strong emotional reaction. \n4. Check the date: Old news can be re-shared out of context."
    },
    {
        title: "Understanding Different Types of Bias",
        content: "Bias in media can take many forms, including: \n- Political Bias: Favoring one political party or ideology. \n- Confirmation Bias: Presenting information that confirms existing beliefs. \n- Omission Bias: Leaving out facts that contradict a certain viewpoint. \n- Sensationalism: Exaggerating details to make a story more dramatic."
    },
    {
        title: "Fact-Checking Resources",
        content: "You can use independent fact-checking websites to verify claims. Some popular ones include Snopes, PolitiFact, and FactCheck.org. Many news organizations also have their own fact-checking departments."
    }
];

export function EducationSection() {
    return (
        <section className="mt-16 w-full max-w-4xl mx-auto">
            <Card className="bg-card/80">
                <CardHeader>
                    <div className="flex flex-col items-center text-center gap-2">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline">Become a Better Fact-Checker</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {educationalContent.map((item, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">{item.title}</AccordionTrigger>
                                <AccordionContent className="whitespace-pre-wrap text-base text-muted-foreground">
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </section>
    );
}
