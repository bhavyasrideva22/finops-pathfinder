import { Question } from '@/types/assessment';

export const questions: Question[] = [
  // Psychometric Section - Personality & Motivation
  {
    id: 'psych_1',
    text: 'I enjoy working with spreadsheets, dashboards, or data visualization tools.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'analytical_preference',
    weight: 1.2
  },
  {
    id: 'psych_2',
    text: 'I often seek ways to improve systems and reduce waste.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'optimization_mindset',
    weight: 1.5
  },
  {
    id: 'psych_3',
    text: 'I prefer clear processes and guidelines over ambiguity.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'structure_preference',
    weight: 1.0
  },
  {
    id: 'psych_4',
    text: 'When learning something new, I persist even when it\'s difficult.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'grit',
    weight: 1.3
  },
  {
    id: 'psych_5',
    text: 'I enjoy finding patterns and trends in data.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'analytical_thinking',
    weight: 1.4
  },
  {
    id: 'psych_6',
    text: 'Which work environment energizes you most?',
    type: 'multiple-choice',
    options: [
      'Working independently on complex analysis',
      'Collaborating across teams to solve problems',
      'Leading projects and managing timelines',
      'Teaching and mentoring others'
    ],
    category: 'psychometric',
    subcategory: 'work_style',
    weight: 1.0
  },

  // Technical Knowledge Section
  {
    id: 'tech_1',
    text: 'Which AWS service is primarily used for cost monitoring and optimization?',
    type: 'multiple-choice',
    options: [
      'AWS Cost Explorer',
      'AWS CloudTrail',
      'AWS Lambda',
      'AWS RDS'
    ],
    category: 'technical',
    subcategory: 'aws_knowledge',
    weight: 1.5
  },
  {
    id: 'tech_2',
    text: 'What is a Reserved Instance in cloud computing?',
    type: 'multiple-choice',
    options: [
      'A discounted pricing model for long-term commitments',
      'A backup instance for disaster recovery',
      'An instance that cannot be terminated',
      'A high-performance computing instance'
    ],
    category: 'technical',
    subcategory: 'pricing_models',
    weight: 1.4
  },
  {
    id: 'tech_3',
    text: 'How comfortable are you with scripting languages like Python or Bash?',
    type: 'likert',
    category: 'technical',
    subcategory: 'scripting_comfort',
    weight: 1.2
  },
  {
    id: 'tech_4',
    text: 'Which pricing model offers the highest discount but requires upfront payment?',
    type: 'multiple-choice',
    options: [
      'On-Demand',
      'Spot Instances',
      'All Upfront Reserved Instances',
      'Savings Plans'
    ],
    category: 'technical',
    subcategory: 'pricing_optimization',
    weight: 1.3
  },
  {
    id: 'tech_5',
    text: 'Rate your experience with financial concepts like budgeting and forecasting.',
    type: 'likert',
    category: 'technical',
    subcategory: 'finance_knowledge',
    weight: 1.3
  },

  // WISCAR Framework Section
  {
    id: 'wiscar_will_1',
    text: 'I am willing to invest significant time learning cloud cost optimization over the next 6-12 months.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    weight: 1.5
  },
  {
    id: 'wiscar_interest_1',
    text: 'How interested are you in the intersection of technology and finance?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    weight: 1.4
  },
  {
    id: 'wiscar_skill_1',
    text: 'Rate your current ability to analyze complex datasets and identify trends.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    weight: 1.3
  },
  {
    id: 'wiscar_cognitive_1',
    text: 'You notice your team\'s cloud bill increased 40% last month. What\'s your first step?',
    type: 'multiple-choice',
    options: [
      'Immediately alert management about the cost spike',
      'Analyze usage patterns to identify the root cause',
      'Implement cost controls to prevent further increases',
      'Compare with previous months to see if it\'s a trend'
    ],
    category: 'wiscar',
    subcategory: 'cognitive',
    weight: 1.4
  },
  {
    id: 'wiscar_ability_1',
    text: 'How quickly do you typically adapt when learning new technical tools or platforms?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    weight: 1.2
  },
  {
    id: 'wiscar_real_1',
    text: 'You\'re tasked with presenting cost optimization recommendations to both technical and finance teams. How do you approach this?',
    type: 'scenario',
    options: [
      'Create separate presentations tailored to each audience',
      'Use one technical presentation with financial summaries',
      'Focus on high-level savings numbers for both groups',
      'Let each team lead present to their own stakeholders'
    ],
    category: 'wiscar',
    subcategory: 'realWorld',
    weight: 1.5
  }
];

export const getQuestionsByCategory = (category: string) => {
  return questions.filter(q => q.category === category);
};

export const getQuestionsBySubcategory = (subcategory: string) => {
  return questions.filter(q => q.subcategory === subcategory);
};