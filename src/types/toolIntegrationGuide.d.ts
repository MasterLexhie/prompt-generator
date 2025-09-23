// Type definitions
export interface IntegrationTool {
  id: string
  name: string
  description: string
  category: 'ai-tools' | 'ides' | 'workflow' | 'api'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedSetupTime: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  features: string[]
  pros: string[]
  cons: string[]
  bestFor: string[]
  requirements: string[]
  setupSteps: SetupStep[]
  codeExamples?: CodeExample[]
  officialDocs?: string
  communityResources?: string[]
}

export interface SetupStep {
  id: string
  title: string
  description: string
  code?: string
  additionalInfo?: string
  warning?: string
}

export interface CodeExample {
  id: string
  title: string
  description: string
  language: string
  code: string
}

export interface WorkflowTip {
  id: string
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  category: 'productivity' | 'quality' | 'collaboration'
}

export type CategoryFilter = 'all' | IntegrationTool['category']
export type DifficultyFilter = 'all' | IntegrationTool['difficulty']
