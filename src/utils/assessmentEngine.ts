import { AssessmentResponse, AssessmentScore, AssessmentResult, CareerMatch } from '@/types/assessment';
import { questions } from '@/data/questions';

export class AssessmentEngine {
  private responses: AssessmentResponse[];

  constructor(responses: AssessmentResponse[]) {
    this.responses = responses;
  }

  calculateScores(): AssessmentScore {
    const psychometric = this.calculateCategoryScore('psychometric');
    const technical = this.calculateCategoryScore('technical');
    
    // WISCAR scores
    const will = this.calculateSubcategoryScore('will');
    const interest = this.calculateSubcategoryScore('interest');
    const skill = this.calculateSubcategoryScore('skill');
    const cognitive = this.calculateSubcategoryScore('cognitive');
    const ability = this.calculateSubcategoryScore('ability');
    const realWorld = this.calculateSubcategoryScore('realWorld');
    
    // Overall score weighted calculation
    const overall = Math.round(
      (psychometric * 0.3 + technical * 0.4 + 
       (will + interest + skill + cognitive + ability + realWorld) / 6 * 0.3)
    );

    return {
      psychometric: Math.round(psychometric),
      technical: Math.round(technical),
      will: Math.round(will),
      interest: Math.round(interest),
      skill: Math.round(skill),
      cognitive: Math.round(cognitive),
      ability: Math.round(ability),
      realWorld: Math.round(realWorld),
      overall: Math.round(overall)
    };
  }

  private calculateCategoryScore(category: string): number {
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryResponses = this.responses.filter(r => 
      categoryQuestions.some(q => q.id === r.questionId)
    );

    if (categoryResponses.length === 0) return 0;

    let totalWeightedScore = 0;
    let totalWeight = 0;

    categoryResponses.forEach(response => {
      const question = categoryQuestions.find(q => q.id === response.questionId);
      if (question) {
        const normalizedScore = this.normalizeScore(response.value, question.type);
        totalWeightedScore += normalizedScore * question.weight;
        totalWeight += question.weight;
      }
    });

    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  }

  private calculateSubcategoryScore(subcategory: string): number {
    const subcategoryQuestions = questions.filter(q => q.subcategory === subcategory);
    const subcategoryResponses = this.responses.filter(r => 
      subcategoryQuestions.some(q => q.id === r.questionId)
    );

    if (subcategoryResponses.length === 0) return 0;

    let totalWeightedScore = 0;
    let totalWeight = 0;

    subcategoryResponses.forEach(response => {
      const question = subcategoryQuestions.find(q => q.id === response.questionId);
      if (question) {
        const normalizedScore = this.normalizeScore(response.value, question.type);
        totalWeightedScore += normalizedScore * question.weight;
        totalWeight += question.weight;
      }
    });

    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  }

  private normalizeScore(value: number | string | string[], type: string): number {
    switch (type) {
      case 'likert':
        return typeof value === 'number' ? (value - 1) / 4 : 0; // Convert 1-5 scale to 0-1
      case 'multiple-choice':
        // Score based on correctness (simplified - in real implementation, check against correct answers)
        return this.scoreMultipleChoice(value as string);
      case 'scenario':
        return this.scoreScenario(value as string);
      default:
        return 0;
    }
  }

  private scoreMultipleChoice(answer: string): number {
    // Simplified scoring - in reality, this would check against correct answers
    const correctAnswers: { [key: string]: string } = {
      'tech_1': 'AWS Cost Explorer',
      'tech_2': 'A discounted pricing model for long-term commitments',
      'tech_4': 'All Upfront Reserved Instances'
    };

    // Find the question this answer belongs to
    for (const [questionId, correctAnswer] of Object.entries(correctAnswers)) {
      if (answer === correctAnswer) return 1;
    }
    return 0.3; // Partial credit for other answers
  }

  private scoreScenario(answer: string): number {
    // Score based on best practices
    const bestAnswers = [
      'Analyze usage patterns to identify the root cause',
      'Create separate presentations tailored to each audience'
    ];
    
    return bestAnswers.includes(answer) ? 1 : 0.6;
  }

  generateResult(): AssessmentResult {
    const scores = this.calculateScores();
    const recommendation = this.determineRecommendation(scores);
    const confidence = this.calculateConfidence(scores);
    const careerMatches = this.generateCareerMatches(scores);
    const skillGaps = this.identifySkillGaps(scores);
    const learningPath = this.generateLearningPath(scores, skillGaps);
    const feedback = this.generateFeedback(scores, recommendation);

    return {
      scores,
      recommendation,
      confidence,
      careerMatches,
      skillGaps,
      learningPath,
      feedback
    };
  }

  private determineRecommendation(scores: AssessmentScore): 'Yes' | 'No' | 'Maybe' {
    if (scores.overall >= 75 && scores.technical >= 70) return 'Yes';
    if (scores.overall >= 60 && scores.psychometric >= 70) return 'Maybe';
    return 'No';
  }

  private calculateConfidence(scores: AssessmentScore): number {
    return Math.min(100, Math.max(0, scores.overall + (scores.technical * 0.2)));
  }

  private generateCareerMatches(scores: AssessmentScore): CareerMatch[] {
    const matches: CareerMatch[] = [
      {
        role: 'Cloud Cost Optimization Analyst',
        description: 'Reduce waste and maximize efficiency in cloud spending',
        matchScore: scores.overall,
        skills: ['Cloud pricing', 'Data analysis', 'Cost optimization'],
        salaryRange: '$95k-$130k'
      },
      {
        role: 'FinOps Practitioner',
        description: 'Governance and cost modeling across cloud services',
        matchScore: Math.round((scores.technical + scores.will + scores.realWorld) / 3),
        skills: ['Cost modeling', 'Cross-functional teamwork', 'Cloud governance'],
        salaryRange: '$100k-$140k'
      },
      {
        role: 'Cloud Financial Analyst',
        description: 'Budgeting and forecasting for cloud infrastructure',
        matchScore: Math.round((scores.technical + scores.skill) / 2),
        skills: ['Financial modeling', 'Excel/Sheets', 'Cloud platforms'],
        salaryRange: '$85k-$120k'
      }
    ];

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }

  private identifySkillGaps(scores: AssessmentScore): string[] {
    const gaps: string[] = [];
    
    if (scores.technical < 70) gaps.push('Cloud platform knowledge');
    if (scores.skill < 60) gaps.push('Data analysis skills');
    if (scores.cognitive < 65) gaps.push('Problem-solving methodology');
    if (scores.realWorld < 70) gaps.push('Cross-functional communication');
    
    return gaps;
  }

  private generateLearningPath(scores: AssessmentScore, skillGaps: string[]): string[] {
    const path: string[] = [];
    
    if (skillGaps.includes('Cloud platform knowledge')) {
      path.push('AWS Cloud Practitioner Certification');
      path.push('Azure Fundamentals');
    }
    
    if (skillGaps.includes('Data analysis skills')) {
      path.push('Excel for Data Analysis');
      path.push('Python for Cost Analysis');
    }
    
    path.push('FinOps Foundation Certification');
    path.push('Cloud Cost Optimization Bootcamp');
    
    return path;
  }

  private generateFeedback(scores: AssessmentScore, recommendation: string): string {
    if (recommendation === 'Yes') {
      return `Excellent fit! You demonstrate strong analytical thinking and technical readiness. Your ${scores.psychometric > 80 ? 'analytical mindset' : 'technical foundation'} positions you well for cloud cost optimization roles.`;
    } else if (recommendation === 'Maybe') {
      return `Good potential! You have ${scores.psychometric > scores.technical ? 'strong analytical skills but need technical development' : 'technical foundation but could strengthen analytical approach'}. With focused learning, you could excel in this field.`;
    } else {
      return `Consider building foundational skills first. Focus on ${scores.technical < 50 ? 'cloud platforms and pricing models' : 'analytical and problem-solving skills'} before pursuing specialized cost optimization roles.`;
    }
  }
}