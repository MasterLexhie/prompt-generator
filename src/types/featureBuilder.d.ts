// Type definitions
export interface Project {
  name: string
  techStack: string
  architecture: string
  description: string
}

export interface FeatureTemplate {
  name: string
  description: string
  complexity: 'low' | 'medium' | 'high'
  estimatedPrompts: number
  dependencies: string[]
  components: string[]
}

export interface Feature extends FeatureTemplate {
  id: string
  phase: 'foundation' | 'core' | 'advanced'
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  dateAdded: string
  generatedCode: string
  notes: string
  customPrompt?: string
}

export interface NewFeature {
  name: string
  description: string
  complexity: 'low' | 'medium' | 'high'
  phase: 'foundation' | 'core' | 'advanced'
  dependencies: string[]
  components: string[]
  customPrompt: string
}

export interface ComplexityColors {
  bg: string
  text: string
  border: string
}

export interface StatusColors {
  bg: string
  text: string
  icon: React.ComponentType<{ className?: string }>
}

export interface PhaseTemplates {
  foundation: FeatureTemplate[]
  core: FeatureTemplate[]
  advanced: FeatureTemplate[]
}

export interface ProjectSummary {
  project: Project
  features: Feature[]
  phases: {
    foundation: Feature[]
    core: Feature[]
    advanced: Feature[]
  }
  summary: {
    totalFeatures: number
    completedFeatures: number
    estimatedPrompts: number
  }
}
