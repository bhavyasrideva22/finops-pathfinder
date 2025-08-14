import { useState } from "react";
import { AssessmentHeader } from "@/components/assessment/AssessmentHeader";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { Button } from "@/components/ui/button";
import { questions } from "@/data/questions";
import { AssessmentResponse, AssessmentState } from "@/types/assessment";
import { AssessmentEngine } from "@/utils/assessmentEngine";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Assessment = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AssessmentState>({
    currentStep: 1,
    totalSteps: questions.length,
    responses: [],
    startTime: new Date(),
    isComplete: false
  });

  const currentQuestion = questions[state.currentStep - 1];
  const currentResponse = state.responses.find(r => r.questionId === currentQuestion?.id);

  const handleAnswer = (questionId: string, value: number | string | string[]) => {
    setState(prev => ({
      ...prev,
      responses: [
        ...prev.responses.filter(r => r.questionId !== questionId),
        { questionId, value }
      ]
    }));
  };

  const handleNext = () => {
    if (state.currentStep < state.totalSteps) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    } else {
      // Complete assessment
      const engine = new AssessmentEngine(state.responses);
      const result = engine.generateResult();
      
      // Store result and navigate to results page
      localStorage.setItem('assessmentResult', JSON.stringify(result));
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (state.currentStep > 1) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    } else {
      navigate('/');
    }
  };

  const isAnswered = currentResponse !== undefined;
  const isLastQuestion = state.currentStep === state.totalSteps;

  const getSectionTitle = () => {
    if (state.currentStep <= 6) return "Psychometric Assessment";
    if (state.currentStep <= 11) return "Technical Knowledge";
    return "WISCAR Framework";
  };

  const getSectionSubtitle = () => {
    if (state.currentStep <= 6) return "Understanding your personality and work preferences";
    if (state.currentStep <= 11) return "Evaluating your current technical readiness";
    return "Measuring your potential for success in this field";
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <AssessmentHeader
          currentStep={state.currentStep}
          totalSteps={state.totalSteps}
          title={getSectionTitle()}
          subtitle={getSectionSubtitle()}
        />

        <div className="flex flex-col items-center space-y-8">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={currentResponse?.value}
          />

          <div className="flex gap-4 w-full max-w-md">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {state.currentStep === 1 ? 'Home' : 'Back'}
            </Button>
            
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex-1"
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
              {!isLastQuestion && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};