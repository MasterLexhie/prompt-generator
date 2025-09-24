// Type definitions
export interface BestPractice {
  id: string
  title: string
  description: string
  category:
    | 'prompt-engineering'
    | 'code-quality'
    | 'security'
    | 'team-collaboration'
  difficulty: 'essential' | 'intermediate' | 'advanced'
  impact: 'high' | 'medium' | 'low'
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  keyPrinciples: string[]
  commonMistakes: string[]
  actionableSteps: ActionableStep[]
  examples: PracticeExample[]
  relatedPractices?: string[]
}

export interface ActionableStep {
  id: string
  title: string
  description: string
  code?: string
  warning?: string
  tip?: string
}

export interface PracticeExample {
  id: string
  title: string
  scenario: string
  badExample: string
  goodExample: string
  explanation: string
}

export interface Technique {
  id: string
  name: string
  description: string
  category: 'prompt-crafting' | 'iteration' | 'quality-assurance'
  useWhen: string
  example: string
  benefits: string[]
}

export interface AntiPattern {
  id: string
  name: string
  description: string
  whyProblematic: string
  howToFix: string
  example: string
}

export type CategoryFilter = 'all' | BestPractice['category']
export type DifficultyFilter = 'all' | BestPractice['difficulty']
