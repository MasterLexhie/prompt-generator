'use client'
import React, { useState } from 'react'
import {
  Copy,
  Download,
  RefreshCw,
  Settings,
  Code,
  Shield,
  Users,
  Zap,
  Brain,
  Target
} from 'lucide-react'
import { SystemPromptFormData } from '@/types'

const SystemPromptGenerator: React.FC = () => {
  const [formData, setFormData] = useState<SystemPromptFormData>({
    // Core Identity
    experienceLevel: 'senior',
    specializations: '',
    primaryTechStack: '',
    architecturalPatterns: '',

    // Coding Philosophy
    codingStyle: 'functional',
    qualityStandards: '',
    performanceApproach: '',
    documentationLevel: 'comprehensive',

    // Security & Best Practices
    securityApproach: '',
    errorHandlingStyle: '',
    testingPhilosophy: '',
    accessibilityStandards: '',

    // Communication Style
    explanationLevel: 'detailed',
    commentingStyle: '',
    responseStyle: 'professional',
    questionHandling: '',

    // Team Context
    teamSkillLevel: 'mixed',
    codebaseType: 'production',
    maintenanceTimeframe: 'long-term',
    handoffRequirements: '',

    // Technical Preferences
    frameworkPreferences: '',
    toolingPreferences: '',
    deploymentContext: '',
    scalabilityConsiderations: '',

    // Custom Rules
    doAlways: '',
    neverDo: '',
    priorityOrder: '',
    specialInstructions: ''
  })

  const [generatedPrompt, setGeneratedPrompt] = useState('')

  const handleInputChange = (
    field: keyof SystemPromptFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const generateSystemPrompt = () => {
    let prompt = ''

    // Experience and Role
    const experienceLevels = {
      junior:
        'You are a junior software engineer with 1-3 years of experience, eager to learn and follow established best practices.',
      'mid-level':
        'You are a mid-level software engineer with 3-7 years of experience, capable of making architectural decisions and mentoring junior developers.',
      senior:
        'You are a senior software engineer with 7+ years of experience, expert in system design, code quality, and technical leadership.',
      principal:
        'You are a principal/staff engineer with 10+ years of experience, expert in large-scale systems, architecture, and technical strategy.',
      architect:
        'You are a solutions architect with deep expertise in system design, scalability, and enterprise-level decision making.'
    }

    // Core Identity Section
    prompt += '# CORE IDENTITY\n'

    prompt += `${experienceLevels[formData.experienceLevel]}\n\n`

    if (formData.specializations) {
      prompt += `Your core specializations include: ${formData.specializations}.\n\n`
    }

    if (formData.primaryTechStack) {
      prompt += `Your primary technology expertise covers: ${formData.primaryTechStack}.\n\n`
    }

    if (formData.architecturalPatterns) {
      prompt += `You prefer and recommend these architectural patterns: ${formData.architecturalPatterns}.\n\n`
    }

    // Coding Philosophy Section
    prompt += '# CODING PHILOSOPHY\n'

    const codingStyles = {
      functional:
        'You strongly prefer functional programming patterns, immutability, and pure functions wherever possible.',
      'object-oriented':
        'You follow object-oriented principles with proper encapsulation, inheritance, and polymorphism.',
      hybrid:
        'You choose the most appropriate paradigm (functional, OOP, or procedural) based on the specific problem context.',
      reactive:
        'You prefer reactive programming patterns, event-driven architectures, and declarative code styles.'
    }

    prompt += `${codingStyles[formData.codingStyle]}\n\n`

    if (formData.qualityStandards) {
      prompt += `Your quality standards include: ${formData.qualityStandards}.\n\n`
    }

    if (formData.performanceApproach) {
      prompt += `Your approach to performance: ${formData.performanceApproach}.\n\n`
    }

    // Documentation and Communication
    const documentationLevels = {
      minimal: 'You write concise, essential comments only for complex logic.',
      moderate:
        'You provide clear comments for functions and non-obvious code sections.',
      comprehensive:
        'You write detailed documentation including function purposes, parameters, return values, and examples.',
      tutorial:
        'You write extensive documentation that could teach someone the concepts and implementation details.'
    }

    prompt += `Documentation style: ${
      documentationLevels[formData.documentationLevel]
    }\n\n`

    // Security and Best Practices Section
    prompt += '# SECURITY & BEST PRACTICES\n'

    if (formData.securityApproach) {
      prompt += `Security approach: ${formData.securityApproach}.\n\n`
    } else {
      prompt +=
        'You always implement security best practices including input validation, output encoding, authentication, authorization, and protection against common vulnerabilities (OWASP Top 10).\n\n'
    }

    if (formData.errorHandlingStyle) {
      prompt += `Error handling philosophy: ${formData.errorHandlingStyle}.\n\n`
    } else {
      prompt +=
        'You implement comprehensive error handling with graceful degradation, user-friendly error messages, and proper logging for debugging.\n\n'
    }

    if (formData.testingPhilosophy) {
      prompt += `Testing approach: ${formData.testingPhilosophy}.\n\n`
    }

    if (formData.accessibilityStandards) {
      prompt += `Accessibility standards: ${formData.accessibilityStandards}.\n\n`
    }

    // Communication Style Section
    prompt += '# COMMUNICATION STYLE\n'

    const explanationLevels = {
      brief:
        'You provide concise explanations focusing on key decisions and implementation details.',
      balanced:
        'You explain important concepts and decisions with moderate detail.',
      detailed:
        'You provide thorough explanations of concepts, decisions, and alternative approaches.',
      educational:
        'You explain everything in detail as if teaching, including background concepts and learning resources.'
    }

    prompt += `${explanationLevels[formData.explanationLevel]}\n\n`

    const responseStyles = {
      professional:
        'You maintain a professional, direct communication style focused on technical excellence.',
      friendly:
        'You use a warm, approachable tone while maintaining technical accuracy.',
      mentor:
        'You adopt a mentoring tone, explaining concepts and guiding learning.',
      collaborative:
        'You communicate as a peer collaborator, discussing tradeoffs and seeking input.'
    }

    prompt += `${responseStyles[formData.responseStyle]}\n\n`

    if (formData.commentingStyle) {
      prompt += `Code commenting style: ${formData.commentingStyle}.\n\n`
    }

    if (formData.questionHandling) {
      prompt += `When requirements are unclear: ${formData.questionHandling}.\n\n`
    } else {
      prompt +=
        'When requirements are unclear, you ask specific clarifying questions and suggest best practices based on common patterns.\n\n'
    }

    // Team and Context Section
    prompt += '# TEAM & PROJECT CONTEXT\n'

    const teamLevels = {
      junior:
        'You write code primarily for junior developers, with extensive comments and simple, readable patterns.',
      mixed:
        'You write code that can be maintained by developers of varying skill levels, balancing clarity with efficiency.',
      senior:
        'You write code for experienced developers, using advanced patterns and concise, expressive implementations.',
      expert:
        'You write code for expert-level developers, utilizing sophisticated patterns and domain-specific optimizations.'
    }

    prompt += `Target audience: ${teamLevels[formData.teamSkillLevel]}\n\n`

    const codebaseTypes = {
      prototype:
        'You prioritize speed and experimentation over long-term maintainability.',
      mvp: 'You balance rapid development with basic maintainability and scalability considerations.',
      production:
        'You write production-ready code with full error handling, testing, and long-term maintainability.',
      enterprise:
        'You write enterprise-grade code with extensive documentation, compliance considerations, and scalability planning.'
    }

    prompt += `Codebase type: ${codebaseTypes[formData.codebaseType]}\n\n`

    const maintenanceTimeframes = {
      'short-term':
        'You optimize for immediate functionality with basic maintainability.',
      'medium-term':
        'You balance current needs with reasonable future flexibility (6-18 months).',
      'long-term':
        'You design for long-term maintainability and evolution (2-5+ years).',
      legacy:
        'You design systems meant to last for many years with minimal changes.'
    }

    prompt += `Maintenance timeframe: ${
      maintenanceTimeframes[formData.maintenanceTimeframe]
    }\n\n`

    if (formData.handoffRequirements) {
      prompt += `Handoff requirements: ${formData.handoffRequirements}.\n\n`
    }

    // Technical Preferences Section
    if (
      formData.frameworkPreferences ||
      formData.toolingPreferences ||
      formData.deploymentContext ||
      formData.scalabilityConsiderations
    ) {
      prompt += '# TECHNICAL PREFERENCES\n'

      if (formData.frameworkPreferences) {
        prompt += `Framework preferences: ${formData.frameworkPreferences}.\n\n`
      }

      if (formData.toolingPreferences) {
        prompt += `Tooling preferences: ${formData.toolingPreferences}.\n\n`
      }

      if (formData.deploymentContext) {
        prompt += `Deployment context: ${formData.deploymentContext}.\n\n`
      }

      if (formData.scalabilityConsiderations) {
        prompt += `Scalability approach: ${formData.scalabilityConsiderations}.\n\n`
      }
    }

    // Custom Rules Section
    if (
      formData.doAlways ||
      formData.neverDo ||
      formData.priorityOrder ||
      formData.specialInstructions
    ) {
      prompt += '# CUSTOM RULES\n'

      if (formData.doAlways) {
        prompt += `ALWAYS: ${formData.doAlways}\n\n`
      }

      if (formData.neverDo) {
        prompt += `NEVER: ${formData.neverDo}\n\n`
      }

      if (formData.priorityOrder) {
        prompt += `PRIORITY ORDER: ${formData.priorityOrder}\n\n`
      }

      if (formData.specialInstructions) {
        prompt += `SPECIAL INSTRUCTIONS: ${formData.specialInstructions}\n\n`
      }
    }

    // Closing Instructions
    prompt += '# RESPONSE FORMAT\n'
    prompt += 'For every code generation request:\n'
    prompt +=
      '1. Generate complete, working code that follows all the above principles\n'
    prompt +=
      '2. Include appropriate comments based on your documentation style\n'
    prompt += '3. Implement proper error handling and security measures\n'
    prompt += '4. Provide setup/installation instructions when relevant\n'
    prompt += '5. Explain key decisions and tradeoffs when appropriate\n'
    prompt += '6. Suggest improvements or alternatives when beneficial\n\n'

    prompt +=
      "Remember: You embody these principles consistently across all interactions. Every piece of code you generate should reflect this system prompt's guidelines."

    setGeneratedPrompt(prompt)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
  }

  const downloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'system-prompt-vibe-coding.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearForm = () => {
    setFormData({
      experienceLevel: 'senior',
      specializations: '',
      primaryTechStack: '',
      architecturalPatterns: '',
      codingStyle: 'functional',
      qualityStandards: '',
      performanceApproach: '',
      documentationLevel: 'comprehensive',
      securityApproach: '',
      errorHandlingStyle: '',
      testingPhilosophy: '',
      accessibilityStandards: '',
      explanationLevel: 'detailed',
      commentingStyle: '',
      responseStyle: 'professional',
      questionHandling: '',
      teamSkillLevel: 'mixed',
      codebaseType: 'production',
      maintenanceTimeframe: 'long-term',
      handoffRequirements: '',
      frameworkPreferences: '',
      toolingPreferences: '',
      deploymentContext: '',
      scalabilityConsiderations: '',
      doAlways: '',
      neverDo: '',
      priorityOrder: '',
      specialInstructions: ''
    })
    setGeneratedPrompt('')
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-3'>
            System Prompt Generator
          </h1>
          <p className='text-gray-600'>
            Create consistent AI behavior for professional vibe coding sessions
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Input Form */}
          <div className='space-y-6'>
            {/* Core Identity Section */}
            <div className='bg-blue-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Brain className='h-5 w-5 text-blue-600 mr-2' />
                <h3 className='text-lg font-semibold text-blue-900'>
                  Core Identity
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) =>
                      handleInputChange('experienceLevel', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='junior'>Junior Engineer (1-3 years)</option>
                    <option value='mid-level'>
                      Mid-Level Engineer (3-7 years)
                    </option>
                    <option value='senior'>Senior Engineer (7+ years)</option>
                    <option value='principal'>
                      Principal/Staff Engineer (10+ years)
                    </option>
                    <option value='architect'>Solutions Architect</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Core Specializations
                  </label>
                  <input
                    type='text'
                    value={formData.specializations}
                    onChange={(e) =>
                      handleInputChange('specializations', e.target.value)
                    }
                    placeholder='e.g., Full-stack web development, DevOps, Mobile development'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Primary Tech Stack
                  </label>
                  <input
                    type='text'
                    value={formData.primaryTechStack}
                    onChange={(e) =>
                      handleInputChange('primaryTechStack', e.target.value)
                    }
                    placeholder='e.g., React, Node.js, PostgreSQL, AWS, Docker'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Preferred Architectural Patterns
                  </label>
                  <input
                    type='text'
                    value={formData.architecturalPatterns}
                    onChange={(e) =>
                      handleInputChange('architecturalPatterns', e.target.value)
                    }
                    placeholder='e.g., Microservices, Clean Architecture, MVC, Event-driven'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
              </div>
            </div>

            {/* Coding Philosophy Section */}
            <div className='bg-green-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Code className='h-5 w-5 text-green-600 mr-2' />
                <h3 className='text-lg font-semibold text-green-900'>
                  Coding Philosophy
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Preferred Coding Style
                  </label>
                  <select
                    value={formData.codingStyle}
                    onChange={(e) =>
                      handleInputChange('codingStyle', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='functional'>Functional Programming</option>
                    <option value='object-oriented'>Object-Oriented</option>
                    <option value='hybrid'>Hybrid (Context-dependent)</option>
                    <option value='reactive'>Reactive Programming</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Quality Standards
                  </label>
                  <textarea
                    value={formData.qualityStandards}
                    onChange={(e) =>
                      handleInputChange('qualityStandards', e.target.value)
                    }
                    placeholder='e.g., DRY principles, SOLID principles, code coverage >80%, ESLint compliance'
                    rows={2}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Performance Approach
                  </label>
                  <input
                    type='text'
                    value={formData.performanceApproach}
                    onChange={(e) =>
                      handleInputChange('performanceApproach', e.target.value)
                    }
                    placeholder='e.g., Optimize for readability first, then performance; Use lazy loading; Minimize bundle size'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Documentation Level
                  </label>
                  <select
                    value={formData.documentationLevel}
                    onChange={(e) =>
                      handleInputChange('documentationLevel', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='minimal'>Minimal (Essential only)</option>
                    <option value='moderate'>
                      Moderate (Functions & complex logic)
                    </option>
                    <option value='comprehensive'>
                      Comprehensive (Detailed explanations)
                    </option>
                    <option value='tutorial'>
                      Tutorial-level (Teaching-focused)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security & Best Practices */}
            <div className='bg-red-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Shield className='h-5 w-5 text-red-600 mr-2' />
                <h3 className='text-lg font-semibold text-red-900'>
                  Security & Best Practices
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Security Approach
                  </label>
                  <textarea
                    value={formData.securityApproach}
                    onChange={(e) =>
                      handleInputChange('securityApproach', e.target.value)
                    }
                    placeholder='e.g., Zero-trust architecture, OWASP compliance, input validation, output encoding'
                    rows={2}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Error Handling Style
                  </label>
                  <input
                    type='text'
                    value={formData.errorHandlingStyle}
                    onChange={(e) =>
                      handleInputChange('errorHandlingStyle', e.target.value)
                    }
                    placeholder='e.g., Fail fast with graceful degradation, comprehensive logging, user-friendly messages'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Testing Philosophy
                  </label>
                  <input
                    type='text'
                    value={formData.testingPhilosophy}
                    onChange={(e) =>
                      handleInputChange('testingPhilosophy', e.target.value)
                    }
                    placeholder='e.g., Test-driven development, Unit tests + Integration tests, >80% coverage'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Accessibility Standards
                  </label>
                  <input
                    type='text'
                    value={formData.accessibilityStandards}
                    onChange={(e) =>
                      handleInputChange(
                        'accessibilityStandards',
                        e.target.value
                      )
                    }
                    placeholder='e.g., WCAG 2.1 AA compliance, semantic HTML, screen reader support'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
              </div>
            </div>

            {/* Communication Style */}
            <div className='bg-purple-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Users className='h-5 w-5 text-purple-600 mr-2' />
                <h3 className='text-lg font-semibold text-purple-900'>
                  Communication Style
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Explanation Level
                  </label>
                  <select
                    value={formData.explanationLevel}
                    onChange={(e) =>
                      handleInputChange('explanationLevel', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='brief'>Brief (Key points only)</option>
                    <option value='balanced'>Balanced (Moderate detail)</option>
                    <option value='detailed'>
                      Detailed (Thorough explanations)
                    </option>
                    <option value='educational'>
                      Educational (Teaching-focused)
                    </option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Response Style
                  </label>
                  <select
                    value={formData.responseStyle}
                    onChange={(e) =>
                      handleInputChange('responseStyle', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='professional'>Professional & Direct</option>
                    <option value='friendly'>Friendly & Approachable</option>
                    <option value='mentor'>Mentoring & Guiding</option>
                    <option value='collaborative'>
                      Collaborative & Peer-like
                    </option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Code Commenting Style
                  </label>
                  <input
                    type='text'
                    value={formData.commentingStyle}
                    onChange={(e) =>
                      handleInputChange('commentingStyle', e.target.value)
                    }
                    placeholder="e.g., JSDoc format, inline for complex logic, explain 'why' not 'what'"
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
              </div>
            </div>

            {/* Team Context */}
            <div className='bg-yellow-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Target className='h-5 w-5 text-yellow-600 mr-2' />
                <h3 className='text-lg font-semibold text-yellow-900'>
                  Team & Project Context
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Team Skill Level
                  </label>
                  <select
                    value={formData.teamSkillLevel}
                    onChange={(e) =>
                      handleInputChange('teamSkillLevel', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='junior'>Primarily Junior Developers</option>
                    <option value='mixed'>Mixed Skill Levels</option>
                    <option value='senior'>Primarily Senior Developers</option>
                    <option value='expert'>Expert-level Team</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Codebase Type
                  </label>
                  <select
                    value={formData.codebaseType}
                    onChange={(e) =>
                      handleInputChange('codebaseType', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='prototype'>
                      Prototype/Proof of Concept
                    </option>
                    <option value='mvp'>MVP/Early Stage</option>
                    <option value='production'>Production Application</option>
                    <option value='enterprise'>
                      Enterprise/Mission-Critical
                    </option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Maintenance Timeframe
                  </label>
                  <select
                    value={formData.maintenanceTimeframe}
                    onChange={(e) =>
                      handleInputChange('maintenanceTimeframe', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='short-term'>
                      Short-term (less than 6 months)
                    </option>
                    <option value='medium-term'>
                      Medium-term (6-18 months)
                    </option>
                    <option value='long-term'>Long-term (2-5+ years)</option>
                    <option value='legacy'>Legacy System (5+ years)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Technical Preferences */}
            <div className='bg-indigo-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Settings className='h-5 w-5 text-indigo-600 mr-2' />
                <h3 className='text-lg font-semibold text-indigo-900'>
                  Technical Preferences
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Framework Preferences
                  </label>
                  <input
                    type='text'
                    value={formData.frameworkPreferences}
                    onChange={(e) =>
                      handleInputChange('frameworkPreferences', e.target.value)
                    }
                    placeholder='e.g., Prefer Next.js over Create React App, Express.js for APIs'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Tooling Preferences
                  </label>
                  <input
                    type='text'
                    value={formData.toolingPreferences}
                    onChange={(e) =>
                      handleInputChange('toolingPreferences', e.target.value)
                    }
                    placeholder='e.g., TypeScript over JavaScript, Prettier + ESLint, Jest for testing'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Deployment Context
                  </label>
                  <input
                    type='text'
                    value={formData.deploymentContext}
                    onChange={(e) =>
                      handleInputChange('deploymentContext', e.target.value)
                    }
                    placeholder='e.g., AWS with Docker containers, Vercel for frontend, CI/CD with GitHub Actions'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Scalability Considerations
                  </label>
                  <input
                    type='text'
                    value={formData.scalabilityConsiderations}
                    onChange={(e) =>
                      handleInputChange(
                        'scalabilityConsiderations',
                        e.target.value
                      )
                    }
                    placeholder='e.g., Design for horizontal scaling, database optimization, caching strategies'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
              </div>
            </div>

            {/* Custom Rules */}
            <div className='bg-gray-100 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Zap className='h-5 w-5 text-gray-600 mr-2' />
                <h3 className='text-lg font-semibold text-gray-900'>
                  Custom Rules & Instructions
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Always Do
                  </label>
                  <textarea
                    value={formData.doAlways}
                    onChange={(e) =>
                      handleInputChange('doAlways', e.target.value)
                    }
                    placeholder='e.g., Include TypeScript types, Add error boundaries, Implement loading states'
                    rows={2}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Never Do
                  </label>
                  <textarea
                    value={formData.neverDo}
                    onChange={(e) =>
                      handleInputChange('neverDo', e.target.value)
                    }
                    placeholder="e.g., Use 'any' type in TypeScript, Skip input validation, Use deprecated APIs"
                    rows={2}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Priority Order
                  </label>
                  <input
                    type='text'
                    value={formData.priorityOrder}
                    onChange={(e) =>
                      handleInputChange('priorityOrder', e.target.value)
                    }
                    placeholder='e.g., Security > Performance > Developer Experience > Code Brevity'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Special Instructions
                  </label>
                  <textarea
                    value={formData.specialInstructions}
                    onChange={(e) =>
                      handleInputChange('specialInstructions', e.target.value)
                    }
                    placeholder='Any other specific behaviors, constraints, or preferences...'
                    rows={3}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className='flex gap-4'>
              <button
                onClick={generateSystemPrompt}
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center'
              >
                <RefreshCw className='h-5 w-5 mr-2' />
                Generate System Prompt
              </button>
              <button
                onClick={clearForm}
                className='bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200'
              >
                Clear
              </button>
            </div>
          </div>

          {/* Generated Prompt Output */}
          <div className='bg-gray-900 p-6 rounded-lg h-fit sticky top-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-white'>
                Generated System Prompt
              </h3>
              <div className='flex gap-2'>
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedPrompt}
                  className='bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white p-2 rounded-md transition duration-200'
                  title='Copy to clipboard'
                >
                  <Copy className='h-4 w-4' />
                </button>
                <button
                  onClick={downloadPrompt}
                  disabled={!generatedPrompt}
                  className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white p-2 rounded-md transition duration-200'
                  title='Download as text file'
                >
                  <Download className='h-4 w-4' />
                </button>
              </div>
            </div>

            <div className='bg-black rounded-md p-4 h-96 overflow-y-auto'>
              {generatedPrompt ? (
                <pre className='text-green-400 text-sm whitespace-pre-wrap font-mono leading-relaxed'>
                  {generatedPrompt}
                </pre>
              ) : (
                <div className='text-gray-500 text-center mt-20'>
                  <Brain className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <p>
                    Configure your preferences and click "Generate System
                    Prompt" to create your AI assistant's personality
                  </p>
                </div>
              )}
            </div>

            {generatedPrompt && (
              <div className='mt-4 p-3 bg-green-900 bg-opacity-20 rounded-md'>
                <p className='text-green-300 text-sm'>
                  ✅ System prompt generated! Use this to configure your AI
                  assistant's behavior for consistent vibe coding sessions.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Usage Instructions */}
        {generatedPrompt && (
          <div className='mt-8 bg-blue-50 p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-blue-900 mb-3'>
              How to Use This System Prompt
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='bg-white p-4 rounded-md'>
                <h4 className='font-semibold text-blue-800 mb-2'>Claude</h4>
                <p className='text-sm text-gray-600'>
                  Use as "Custom Instructions" or paste at the beginning of
                  conversations
                </p>
              </div>
              <div className='bg-white p-4 rounded-md'>
                <h4 className='font-semibold text-blue-800 mb-2'>ChatGPT</h4>
                <p className='text-sm text-gray-600'>
                  Add to "Custom Instructions" in Settings → Personalization
                </p>
              </div>
              <div className='bg-white p-4 rounded-md'>
                <h4 className='font-semibold text-blue-800 mb-2'>
                  Claude Code
                </h4>
                <p className='text-sm text-gray-600'>
                  Configure in your Claude Code settings for consistent coding
                  sessions
                </p>
              </div>
              <div className='bg-white p-4 rounded-md'>
                <h4 className='font-semibold text-blue-800 mb-2'>API Usage</h4>
                <p className='text-sm text-gray-600'>
                  Use as the "system" message in your API calls for programmatic
                  consistency
                </p>
              </div>
            </div>
            <div className='mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-md'>
              <p className='text-sm text-yellow-800'>
                <strong>Pro Tip:</strong> Combine this system prompt with the
                S.C.A.F.F. user prompts from the previous generator for maximum
                effectiveness. The system prompt sets the AI's personality and
                standards, while user prompts handle specific tasks.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SystemPromptGenerator
