export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'ranking';
  options?: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  weight: number;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string | string[];
  confidence?: number;
}

export interface AssessmentScore {
  psychometric: number;
  technical: number;
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
  overall: number;
}

export interface CareerMatch {
  role: string;
  description: string;
  matchScore: number;
  skills: string[];
  salaryRange: string;
}

export interface AssessmentResult {
  scores: AssessmentScore;
  recommendation: 'Yes' | 'No' | 'Maybe';
  confidence: number;
  careerMatches: CareerMatch[];
  skillGaps: string[];
  learningPath: string[];
  feedback: string;
}

export interface AssessmentState {
  currentStep: number;
  totalSteps: number;
  responses: AssessmentResponse[];
  startTime: Date;
  isComplete: boolean;
}