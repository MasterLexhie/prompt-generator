// Type definitions
export interface QuickPrompt {
  id: string
  title: string
  description: string
  category:
    | 'database'
    | 'api'
    | 'component'
    | 'testing'
    | 'deployment'
    | 'security'
    | 'performance'
  tags: string[]
  complexity: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  prompt: string
  useCase: string
  techStack?: string[]
  lastUpdated: string
}

export interface PromptCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  count: number
}

export type CategoryFilter = 'all' | QuickPrompt['category']
export type ComplexityFilter = 'all' | QuickPrompt['complexity']
