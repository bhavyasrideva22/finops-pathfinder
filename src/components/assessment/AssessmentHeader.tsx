import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AssessmentHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  className?: string;
}

export const AssessmentHeader = ({ 
  currentStep, 
  totalSteps, 
  title, 
  subtitle,
  className 
}: AssessmentHeaderProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full max-w-2xl mx-auto mb-8", className)}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-lg">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-primary font-medium">
            {currentStep} of {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>
    </div>
  );
};