export interface IFormData {
  // Situation fields
  projectType: string
  techStack: string
  architecture: string
  existingPatterns: string
  constraints: string

  // Challenge fields
  taskDescription: string
  inputs: string
  outputs: string
  performance: string
  requirements: string

  // Audience fields
  teamLevel: 'junior' | 'mid-level' | 'senior' | 'expert'
  techFamiliarity: string
  maintenance: string
  codebase: 'internal' | 'external' | 'open-source'

  // Format fields
  codingStyle: string
  conventions: string
  documentation: string
  testing: string
  structure: string

  // Foundations fields
  security: string
  errorHandling: string
  accessibility: string
  compliance: string
  logging: string

  // Advanced options
  promptType: 'standard' | 'example-driven' | 'constraint-based' | 'test-driven'
  examples: string
  constraints_advanced: string
  testCases: string
}
