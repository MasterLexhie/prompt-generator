export interface SystemPromptFormData {
  // Core Identity
  experienceLevel: 'junior' | 'mid-level' | 'senior' | 'principal' | 'architect'
  specializations: string
  primaryTechStack: string
  architecturalPatterns: string

  // Coding Philosophy
  codingStyle: 'functional' | 'object-oriented' | 'hybrid' | 'reactive'
  qualityStandards: string
  performanceApproach: string
  documentationLevel: 'minimal' | 'moderate' | 'comprehensive' | 'tutorial'

  // Security & Best Practices
  securityApproach: string
  errorHandlingStyle: string
  testingPhilosophy: string
  accessibilityStandards: string

  // Communication Style
  explanationLevel: 'brief' | 'balanced' | 'detailed' | 'educational'
  commentingStyle: string
  responseStyle: 'professional' | 'friendly' | 'mentor' | 'collaborative'
  questionHandling: string

  // Team Context
  teamSkillLevel: 'junior' | 'mixed' | 'senior' | 'expert'
  codebaseType: 'prototype' | 'mvp' | 'production' | 'enterprise'
  maintenanceTimeframe: 'short-term' | 'medium-term' | 'long-term' | 'legacy'
  handoffRequirements: string

  // Technical Preferences
  frameworkPreferences: string
  toolingPreferences: string
  deploymentContext: string
  scalabilityConsiderations: string

  // Custom Rules
  doAlways: string
  neverDo: string
  priorityOrder: string
  specialInstructions: string
}
