import { Question } from "@/types/assessment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, value: number | string | string[]) => void;
  currentAnswer?: number | string | string[];
}

export const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<number | string | string[]>(currentAnswer || '');

  const handleLikertSelect = (value: number) => {
    setSelectedValue(value);
    onAnswer(question.id, value);
  };

  const handleMultipleChoice = (option: string) => {
    setSelectedValue(option);
    onAnswer(question.id, option);
  };

  const renderLikertScale = () => {
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Strongly Disagree</span>
          <span>Strongly Agree</span>
        </div>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              variant={selectedValue === value ? "hero" : "outline"}
              size="lg"
              className={cn(
                "w-16 h-16 rounded-full font-bold text-lg transition-spring",
                selectedValue === value && "scale-110"
              )}
              onClick={() => handleLikertSelect(value)}
            >
              {value}
            </Button>
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {selectedValue && labels[(selectedValue as number) - 1]}
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <Button
            key={index}
            variant={selectedValue === option ? "hero" : "outline"}
            className={cn(
              "w-full p-4 h-auto text-left justify-start transition-spring",
              selectedValue === option && "scale-105"
            )}
            onClick={() => handleMultipleChoice(option)}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-4 h-4 rounded-full border-2 transition-colors",
                selectedValue === option 
                  ? "bg-primary border-primary" 
                  : "border-muted-foreground"
              )} />
              <span className="text-sm leading-relaxed">{option}</span>
            </div>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold leading-relaxed text-foreground">
              {question.text}
            </h2>
          </div>
          
          {question.type === 'likert' && renderLikertScale()}
          {(question.type === 'multiple-choice' || question.type === 'scenario') && renderMultipleChoice()}
        </div>
      </CardContent>
    </Card>
  );
};