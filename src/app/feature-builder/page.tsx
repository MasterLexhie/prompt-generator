'use client'
import React, { useState } from 'react'
import {
  Code2,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Copy,
  Trash2,
  Edit3,
  Play,
  Layers
} from 'lucide-react'
import type {
  Project,
  Feature,
  PhaseTemplates,
  NewFeature,
  ComplexityColors,
  StatusColors,
  FeatureTemplate,
  ProjectSummary
} from '@/types/featureBuilder'
import Link from 'next/link'

// Predefined feature templates organized by phase
const featureTemplates: PhaseTemplates = {
  foundation: [
    {
      name: 'User Authentication System',
      description: 'Complete login, registration, JWT tokens, and security',
      complexity: 'high' as const,
      estimatedPrompts: 1,
      dependencies: [],
      components: [
        'Login/Register forms',
        'Auth middleware',
        'JWT handling',
        'Password security'
      ]
    },
    {
      name: 'Database Schema & Models',
      description: 'Database design, models, migrations, and relationships',
      complexity: 'high' as const,
      estimatedPrompts: 1,
      dependencies: [],
      components: ['Entity models', 'Relationships', 'Migrations', 'Validation']
    },
    {
      name: 'API Foundation',
      description: 'Base API structure, middleware, error handling, logging',
      complexity: 'medium' as const,
      estimatedPrompts: 1,
      dependencies: [],
      components: [
        'Express setup',
        'Middleware',
        'Error handling',
        'Request logging'
      ]
    },
    {
      name: 'UI Layout & Navigation',
      description: 'Base layout components, navigation, routing',
      complexity: 'medium' as const,
      estimatedPrompts: 1,
      dependencies: [],
      components: [
        'Layout components',
        'Navigation bar',
        'Routing',
        'Responsive design'
      ]
    }
  ],
  core: [
    {
      name: 'Product/Content Management',
      description: 'CRUD operations for main business entities',
      complexity: 'high' as const,
      estimatedPrompts: 1,
      dependencies: ['Database Schema & Models', 'API Foundation'],
      components: [
        'CRUD operations',
        'Search/Filter',
        'Pagination',
        'Validation'
      ]
    },
    {
      name: 'User Dashboard/Profile',
      description: 'User profile management and personal dashboard',
      complexity: 'medium' as const,
      estimatedPrompts: 1,
      dependencies: ['User Authentication System'],
      components: [
        'Profile forms',
        'Settings',
        'Dashboard widgets',
        'Personal data'
      ]
    },
    {
      name: 'Core Business Logic',
      description: 'Shopping cart, booking system, or main app functionality',
      complexity: 'high' as const,
      estimatedPrompts: 1,
      dependencies: [
        'Product/Content Management',
        'User Authentication System'
      ],
      components: [
        'Business rules',
        'State management',
        'Calculations',
        'Workflows'
      ]
    },
    {
      name: 'Search & Filtering',
      description: 'Advanced search, filtering, and sorting capabilities',
      complexity: 'medium' as const,
      estimatedPrompts: 1,
      dependencies: ['Product/Content Management'],
      components: ['Search interface', 'Filters', 'Sorting', 'Results display']
    }
  ],
  advanced: [
    {
      name: 'Payment Integration',
      description: 'Payment processing, subscriptions, billing',
      complexity: 'high' as const,
      estimatedPrompts: 1,
      dependencies: ['Core Business Logic', 'User Authentication System'],
      components: [
        'Payment forms',
        'Stripe/PayPal',
        'Webhooks',
        'Billing management'
      ]
    },
    {
      name: 'Admin Panel',
      description: 'Administrative interface and management tools',
      complexity: 'high' as const,
      estimatedPrompts: 1,
      dependencies: [
        'User Authentication System',
        'Product/Content Management'
      ],
      components: [
        'Admin dashboard',
        'User management',
        'Content moderation',
        'Analytics'
      ]
    },
    {
      name: 'Notifications System',
      description: 'Email, SMS, push notifications, and alerts',
      complexity: 'medium' as const,
      estimatedPrompts: 1,
      dependencies: ['User Authentication System'],
      components: [
        'Email templates',
        'Push notifications',
        'SMS integration',
        'Notification preferences'
      ]
    },
    {
      name: 'Analytics & Reporting',
      description: 'Usage analytics, reports, and business intelligence',
      complexity: 'medium' as const,
      estimatedPrompts: 1,
      dependencies: ['Admin Panel'],
      components: [
        'Analytics tracking',
        'Report generation',
        'Charts/Graphs',
        'Export functionality'
      ]
    }
  ]
}

const complexityColors: Record<'low' | 'medium' | 'high', ComplexityColors> = {
  low: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200'
  },
  medium: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200'
  },
  high: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
}

const statusColors: Record<
  'pending' | 'in_progress' | 'completed' | 'blocked',
  StatusColors
> = {
  pending: { bg: 'bg-gray-100', text: 'text-gray-600', icon: Clock },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-600', icon: Play },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    icon: CheckCircle
  },
  blocked: { bg: 'bg-red-100', text: 'text-red-600', icon: AlertCircle }
}

const FeatureByFeatureBuilder: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<Project>({
    name: '',
    techStack: '',
    architecture: '',
    description: ''
  })

  const [features, setFeatures] = useState<Feature[]>([])
  const [currentPhase, setCurrentPhase] = useState<
    'foundation' | 'core' | 'advanced'
  >('foundation')
  const [showAddFeature, setShowAddFeature] = useState<boolean>(false)
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [newFeature, setNewFeature] = useState<NewFeature>({
    name: '',
    description: '',
    complexity: 'medium',
    phase: 'foundation',
    dependencies: [],
    components: [''],
    customPrompt: ''
  })

  const addFeatureFromTemplate = (
    template: FeatureTemplate,
    phase: 'foundation' | 'core' | 'advanced'
  ): void => {
    const newId = Date.now().toString()
    const feature: Feature = {
      ...template,
      id: newId,
      phase: phase,
      status: 'pending',
      dateAdded: new Date().toISOString(),
      generatedCode: '',
      notes: ''
    }
    setFeatures([...features, feature])
  }

  const addCustomFeature = (): void => {
    if (!newFeature.name || !newFeature.description) return

    const customFeature: Feature = {
      ...newFeature,
      id: Date.now().toString(),
      status: 'pending',
      dateAdded: new Date().toISOString(),
      estimatedPrompts: 1,
      generatedCode: '',
      notes: '',
      components: newFeature.components.filter((c) => c.trim() !== '')
    }

    setFeatures([...features, customFeature])
    setNewFeature({
      name: '',
      description: '',
      complexity: 'medium',
      phase: 'foundation',
      dependencies: [],
      components: [''],
      customPrompt: ''
    })
    setShowAddFeature(false)
  }

  const updateFeatureStatus = (
    featureId: string,
    newStatus: 'pending' | 'in_progress' | 'completed' | 'blocked'
  ): void => {
    setFeatures(
      features.map((f) =>
        f.id === featureId ? { ...f, status: newStatus } : f
      )
    )
  }

  const deleteFeature = (featureId: string): void => {
    setFeatures(features.filter((f) => f.id !== featureId))
  }

  const generateFeaturePrompt = (feature: Feature): string => {
    const dependencies = features
      .filter(
        (f) => feature.dependencies.includes(f.name) && f.status === 'completed'
      )
      .map((f) => f.name)

    return `SITUATION: I'm building ${
      currentProject.name || 'a web application'
    } using ${currentProject.techStack || 'modern web technologies'}. ${
      currentProject.architecture
        ? `The application follows ${currentProject.architecture}.`
        : ''
    } ${
      dependencies.length > 0
        ? `I have already implemented: ${dependencies.join(', ')}.`
        : ''
    }

    CHALLENGE: Create a complete ${feature.name} that includes:
    ${feature.components.map((c) => `- ${c}`).join('\n')}

    ${feature.description}

    AUDIENCE: Mid-level developers will maintain this code for long-term use (3+ years).

    FORMAT: Use modern best practices, functional programming where appropriate, comprehensive error handling, and include detailed comments for complex logic.

    FOUNDATIONS: Implement proper input validation, security best practices, comprehensive error handling, and ensure integration with existing systems. Include proper testing considerations and performance optimization.

    ${
      feature.customPrompt
        ? `\nADDITIONAL REQUIREMENTS: ${feature.customPrompt}`
        : ''
    }`
  }

  const copyPromptToClipboard = async (feature: Feature): Promise<void> => {
    const prompt = generateFeaturePrompt(feature)
    try {
      await navigator.clipboard.writeText(prompt)
    } catch (err) {
      console.error('Failed to copy prompt:', err)
    }
  }

  const exportProjectPlan = (): void => {
    const projectData: ProjectSummary = {
      project: currentProject,
      features: features,
      phases: {
        foundation: features.filter((f) => f.phase === 'foundation'),
        core: features.filter((f) => f.phase === 'core'),
        advanced: features.filter((f) => f.phase === 'advanced')
      },
      summary: {
        totalFeatures: features.length,
        completedFeatures: features.filter((f) => f.status === 'completed')
          .length,
        estimatedPrompts: features.reduce(
          (acc, f) => acc + f.estimatedPrompts,
          0
        )
      }
    }

    const blob = new Blob([JSON.stringify(projectData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentProject.name || 'project'}-feature-plan.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getPhaseProgress = (
    phase: 'foundation' | 'core' | 'advanced'
  ): number => {
    const phaseFeatures = features.filter((f) => f.phase === phase)
    const completedFeatures = phaseFeatures.filter(
      (f) => f.status === 'completed'
    )
    return phaseFeatures.length > 0
      ? (completedFeatures.length / phaseFeatures.length) * 100
      : 0
  }

  const handleProjectChange = (field: keyof Project, value: string): void => {
    setCurrentProject({ ...currentProject, [field]: value })
  }

  const handleNewFeatureChange = <K extends keyof NewFeature>(
    field: K,
    value: NewFeature[K]
  ): void => {
    setNewFeature({ ...newFeature, [field]: value })
  }

  const updateComponentAtIndex = (index: number, value: string): void => {
    const newComponents = [...newFeature.components]
    newComponents[index] = value
    setNewFeature({ ...newFeature, components: newComponents })
  }

  const removeComponentAtIndex = (index: number): void => {
    const newComponents = newFeature.components.filter((_, i) => i !== index)
    setNewFeature({ ...newFeature, components: newComponents })
  }

  const addNewComponent = (): void => {
    setNewFeature({ ...newFeature, components: [...newFeature.components, ''] })
  }

  const handleDependencyChange = (selectedOptions: HTMLSelectElement): void => {
    const selected = Array.from(
      selectedOptions.selectedOptions,
      (option) => option.value
    )
    setNewFeature({ ...newFeature, dependencies: selected })
  }

  const updateFeatureNotes = (featureId: string, notes: string): void => {
    setFeatures(features.map((f) => (f.id === featureId ? { ...f, notes } : f)))
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-6 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div className='p-3 bg-purple-600 rounded-lg'>
                <Code2 className='h-6 w-6 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>
                  Feature-by-Feature Builder
                </h1>
                <p className='text-gray-600'>
                  Systematic approach to building applications one feature at a
                  time
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              {/* Back to Home Button */}
              <Link
                href='/'
                className='flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'
              >
                <svg
                  className='h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  />
                </svg>
                <span className='hidden sm:inline'>Back to Home</span>
                <span className='sm:hidden'>Back</span>
              </Link>
              <button
                onClick={exportProjectPlan}
                disabled={features.length === 0}
                className='bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2'
              >
                <Download className='h-4 w-4' />
                <span>Export Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Project Setup */}
        <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>
            Project Configuration
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Project Name
              </label>
              <input
                type='text'
                value={currentProject.name}
                onChange={(e) => handleProjectChange('name', e.target.value)}
                placeholder='e.g., E-commerce Platform, Task Management App'
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Tech Stack
              </label>
              <input
                type='text'
                value={currentProject.techStack}
                onChange={(e) =>
                  handleProjectChange('techStack', e.target.value)
                }
                placeholder='e.g., React, Node.js, PostgreSQL, AWS'
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Architecture Pattern
              </label>
              <input
                type='text'
                value={currentProject.architecture}
                onChange={(e) =>
                  handleProjectChange('architecture', e.target.value)
                }
                placeholder='e.g., Clean Architecture, Microservices, MVC'
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Description
              </label>
              <input
                type='text'
                value={currentProject.description}
                onChange={(e) =>
                  handleProjectChange('description', e.target.value)
                }
                placeholder='Brief project description'
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
              />
            </div>
          </div>
        </div>

        {/* Phase Progress Overview */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {(['foundation', 'core', 'advanced'] as const).map((phase) => {
            const progress = getPhaseProgress(phase)
            const phaseFeatures = features.filter((f) => f.phase === phase)
            return (
              <div key={phase} className='bg-white rounded-lg shadow-sm p-6'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='text-lg font-semibold text-gray-900 capitalize'>
                    {phase} Phase
                  </h3>
                  <span className='text-sm text-gray-500'>
                    {phaseFeatures.length} features
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
                  <div
                    className='bg-purple-600 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className='text-sm text-gray-600'>
                  {Math.round(progress)}% complete
                </p>
              </div>
            )
          })}
        </div>

        {/* Phase Tabs */}
        <div className='flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8'>
          {(['foundation', 'core', 'advanced'] as const).map((phase) => (
            <button
              key={phase}
              onClick={() => setCurrentPhase(phase)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 capitalize ${
                currentPhase === phase
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {phase} Phase
              <span className='ml-2 text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded-full'>
                {features.filter((f) => f.phase === phase).length}
              </span>
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Feature Templates */}
          <div className='lg:col-span-2'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-gray-900'>
                {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}{' '}
                Features
              </h3>
              <button
                onClick={() => setShowAddFeature(true)}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2'
              >
                <Plus className='h-4 w-4' />
                <span>Custom Feature</span>
              </button>
            </div>

            {/* Predefined Templates */}
            <div className='space-y-4 mb-8'>
              <h4 className='text-lg font-semibold text-gray-800'>
                Recommended Templates
              </h4>
              {featureTemplates[currentPhase].map((template, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-sm border p-6'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <h4 className='text-lg font-semibold text-gray-900'>
                          {template.name}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            complexityColors[template.complexity].bg
                          } ${complexityColors[template.complexity].text}`}
                        >
                          {template.complexity}
                        </span>
                        <span className='text-xs text-gray-500'>
                          ~{template.estimatedPrompts} prompt
                        </span>
                      </div>
                      <p className='text-gray-600 mb-3'>
                        {template.description}
                      </p>
                      <div className='mb-3'>
                        <p className='text-sm font-medium text-gray-700 mb-1'>
                          Components:
                        </p>
                        <div className='flex flex-wrap gap-1'>
                          {template.components.map((component, i) => (
                            <span
                              key={i}
                              className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded'
                            >
                              {component}
                            </span>
                          ))}
                        </div>
                      </div>
                      {template.dependencies.length > 0 && (
                        <div>
                          <p className='text-sm font-medium text-gray-700 mb-1'>
                            Dependencies:
                          </p>
                          <div className='flex flex-wrap gap-1'>
                            {template.dependencies.map((dep, i) => (
                              <span
                                key={i}
                                className='text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded'
                              >
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        addFeatureFromTemplate(template, currentPhase)
                      }
                      className='ml-4 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md flex items-center space-x-2'
                    >
                      <Plus className='h-4 w-4' />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Added Features */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold text-gray-800'>
                Your Features
              </h4>
              {features
                .filter((f) => f.phase === currentPhase)
                .map((feature) => {
                  const StatusIcon = statusColors[feature.status].icon
                  return (
                    <div
                      key={feature.id}
                      className='bg-white rounded-lg shadow-sm border p-6'
                    >
                      <div className='flex items-start justify-between mb-4'>
                        <div className='flex-1'>
                          <div className='flex items-center space-x-3 mb-2'>
                            <h4 className='text-lg font-semibold text-gray-900'>
                              {feature.name}
                            </h4>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                complexityColors[feature.complexity].bg
                              } ${complexityColors[feature.complexity].text}`}
                            >
                              {feature.complexity}
                            </span>
                            <div
                              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                                statusColors[feature.status].bg
                              } ${statusColors[feature.status].text}`}
                            >
                              <StatusIcon className='h-3 w-3' />
                              <span className='capitalize'>
                                {feature.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                          <p className='text-gray-600 mb-3'>
                            {feature.description}
                          </p>
                          <div className='mb-3'>
                            <p className='text-sm font-medium text-gray-700 mb-1'>
                              Components:
                            </p>
                            <div className='flex flex-wrap gap-1'>
                              {feature.components.map((component, i) => (
                                <span
                                  key={i}
                                  className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded'
                                >
                                  {component}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2 ml-4'>
                          <select
                            value={feature.status}
                            onChange={(e) =>
                              updateFeatureStatus(
                                feature.id,
                                e.target.value as Feature['status']
                              )
                            }
                            className='text-xs border border-gray-300 rounded px-2 py-1'
                          >
                            <option value='pending'>Pending</option>
                            <option value='in_progress'>In Progress</option>
                            <option value='completed'>Completed</option>
                            <option value='blocked'>Blocked</option>
                          </select>
                          <button
                            onClick={() => setSelectedFeature(feature)}
                            className='p-2 text-gray-600 hover:text-purple-600'
                            title='View details'
                          >
                            <Edit3 className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() => deleteFeature(feature.id)}
                            className='p-2 text-gray-600 hover:text-red-600'
                            title='Delete feature'
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
                        </div>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='text-xs text-gray-500'>
                          Added:{' '}
                          {new Date(feature.dateAdded).toLocaleDateString()}
                        </div>
                        <button
                          onClick={() => copyPromptToClipboard(feature)}
                          className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs rounded flex items-center space-x-1'
                        >
                          <Copy className='h-3 w-3' />
                          <span>Copy Prompt</span>
                        </button>
                      </div>
                    </div>
                  )
                })}

              {features.filter((f) => f.phase === currentPhase).length ===
                0 && (
                <div className='text-center py-12 bg-white rounded-lg shadow-sm border'>
                  <Layers className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-500'>
                    No features added to this phase yet.
                  </p>
                  <p className='text-sm text-gray-400'>
                    Add features from templates or create custom ones.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Project Summary */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Project Summary
              </h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Total Features:</span>
                  <span className='font-medium'>{features.length}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Completed:</span>
                  <span className='font-medium text-green-600'>
                    {features.filter((f) => f.status === 'completed').length}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>In Progress:</span>
                  <span className='font-medium text-blue-600'>
                    {features.filter((f) => f.status === 'in_progress').length}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Estimated Prompts:</span>
                  <span className='font-medium'>
                    {features.reduce((acc, f) => acc + f.estimatedPrompts, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Development Tips */}
            <div className='bg-blue-50 rounded-lg p-6 border border-blue-200'>
              <h3 className='text-lg font-semibold text-blue-900 mb-4'>
                💡 Development Tips
              </h3>
              <ul className='text-sm text-blue-800 space-y-2'>
                <li>
                  • Complete foundation features before moving to core features
                </li>
                <li>
                  • Test each feature thoroughly before marking as completed
                </li>
                <li>
                  • Use dependency tracking to build features in the right order
                </li>
                <li>
                  • Each prompt should generate a complete, working feature
                </li>
                <li>
                  • Keep notes on any customizations needed for your specific
                  use case
                </li>
              </ul>
            </div>

            {/* Free Tier Optimization */}
            <div className='bg-green-50 rounded-lg p-6 border border-green-200'>
              <h3 className='text-lg font-semibold text-green-900 mb-4'>
                🎯 Free Tier Strategy
              </h3>
              <ul className='text-sm text-green-800 space-y-2'>
                <li>• Focus on 1 complete feature per prompt</li>
                <li>• Build foundation features first (auth, database)</li>
                <li>• Group related components together</li>
                <li>• Use detailed S.C.A.F.F. prompts for better results</li>
                <li>• Plan 3-5 features per day maximum</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Feature Modal */}
      {showAddFeature && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>
                Add Custom Feature
              </h3>

              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Feature Name *
                    </label>
                    <input
                      type='text'
                      value={newFeature.name}
                      onChange={(e) =>
                        handleNewFeatureChange('name', e.target.value)
                      }
                      placeholder='e.g., Real-time Chat System'
                      className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phase
                    </label>
                    <select
                      value={newFeature.phase}
                      onChange={(e) =>
                        handleNewFeatureChange(
                          'phase',
                          e.target.value as NewFeature['phase']
                        )
                      }
                      className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                    >
                      <option value='foundation'>Foundation</option>
                      <option value='core'>Core</option>
                      <option value='advanced'>Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Description *
                  </label>
                  <textarea
                    value={newFeature.description}
                    onChange={(e) =>
                      handleNewFeatureChange('description', e.target.value)
                    }
                    placeholder='Detailed description of what this feature should do...'
                    rows={3}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Complexity
                  </label>
                  <select
                    value={newFeature.complexity}
                    onChange={(e) =>
                      handleNewFeatureChange(
                        'complexity',
                        e.target.value as NewFeature['complexity']
                      )
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='low'>Low - Simple implementation</option>
                    <option value='medium'>Medium - Moderate complexity</option>
                    <option value='high'>High - Complex implementation</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Components/Parts
                  </label>
                  {newFeature.components.map((component, index) => (
                    <div
                      key={index}
                      className='flex items-center space-x-2 mb-2'
                    >
                      <input
                        type='text'
                        value={component}
                        onChange={(e) =>
                          updateComponentAtIndex(index, e.target.value)
                        }
                        placeholder='e.g., Chat interface, Message storage, Real-time updates'
                        className='flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                      />
                      {newFeature.components.length > 1 && (
                        <button
                          onClick={() => removeComponentAtIndex(index)}
                          className='p-2 text-red-600 hover:text-red-800'
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addNewComponent}
                    className='text-sm text-purple-600 hover:text-purple-800 flex items-center space-x-1'
                  >
                    <Plus className='h-3 w-3' />
                    <span>Add Component</span>
                  </button>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Dependencies
                  </label>
                  <select
                    multiple
                    value={newFeature.dependencies}
                    onChange={(e) => handleDependencyChange(e.target)}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                    size={3}
                  >
                    {features.map((feature) => (
                      <option key={feature.id} value={feature.name}>
                        {feature.name} ({feature.phase})
                      </option>
                    ))}
                  </select>
                  <p className='text-xs text-gray-500 mt-1'>
                    Hold Ctrl/Cmd to select multiple dependencies
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Custom Prompt Instructions (Optional)
                  </label>
                  <textarea
                    value={newFeature.customPrompt}
                    onChange={(e) =>
                      handleNewFeatureChange('customPrompt', e.target.value)
                    }
                    placeholder='Any specific requirements, constraints, or instructions for this feature...'
                    rows={3}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500'
                  />
                </div>
              </div>

              <div className='flex justify-end space-x-4 mt-6'>
                <button
                  onClick={() => setShowAddFeature(false)}
                  className='px-4 py-2 text-gray-600 hover:text-gray-800'
                >
                  Cancel
                </button>
                <button
                  onClick={addCustomFeature}
                  disabled={!newFeature.name || !newFeature.description}
                  className='bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg'
                >
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-bold text-gray-900'>
                  {selectedFeature.name}
                </h3>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  ✕
                </button>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                    Feature Details
                  </h4>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Description
                      </label>
                      <p className='text-gray-600'>
                        {selectedFeature.description}
                      </p>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Phase
                        </label>
                        <span className='capitalize text-gray-600'>
                          {selectedFeature.phase}
                        </span>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Complexity
                        </label>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            complexityColors[selectedFeature.complexity].bg
                          } ${
                            complexityColors[selectedFeature.complexity].text
                          }`}
                        >
                          {selectedFeature.complexity}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Components
                      </label>
                      <div className='flex flex-wrap gap-2'>
                        {selectedFeature.components.map((component, i) => (
                          <span
                            key={i}
                            className='text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full'
                          >
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedFeature.dependencies.length > 0 && (
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Dependencies
                        </label>
                        <div className='flex flex-wrap gap-2'>
                          {selectedFeature.dependencies.map((dep, i) => (
                            <span
                              key={i}
                              className='text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full'
                            >
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Status
                      </label>
                      <select
                        value={selectedFeature.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as Feature['status']
                          updateFeatureStatus(selectedFeature.id, newStatus)
                          setSelectedFeature({
                            ...selectedFeature,
                            status: newStatus
                          })
                        }}
                        className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                      >
                        <option value='pending'>Pending</option>
                        <option value='in_progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                        <option value='blocked'>Blocked</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                    Generated Prompt
                  </h4>
                  <div className='bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto'>
                    <pre className='text-green-400 text-sm whitespace-pre-wrap font-mono leading-relaxed'>
                      {generateFeaturePrompt(selectedFeature)}
                    </pre>
                  </div>

                  <div className='flex items-center justify-between mt-4'>
                    <button
                      onClick={() => copyPromptToClipboard(selectedFeature)}
                      className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2'
                    >
                      <Copy className='h-4 w-4' />
                      <span>Copy Prompt</span>
                    </button>

                    <div className='text-xs text-gray-500'>
                      Ready to use with Claude Desktop, API, or other AI tools
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Notes
                </label>
                <textarea
                  value={selectedFeature.notes || ''}
                  onChange={(e) => {
                    const notes = e.target.value
                    updateFeatureNotes(selectedFeature.id, notes)
                    setSelectedFeature({ ...selectedFeature, notes })
                  }}
                  placeholder='Add notes about implementation, issues, or customizations...'
                  rows={3}
                  className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                />
              </div>

              <div className='flex justify-end space-x-4 mt-6'>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className='px-4 py-2 text-gray-600 hover:text-gray-800'
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    deleteFeature(selectedFeature.id)
                    setSelectedFeature(null)
                  }}
                  className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2'
                >
                  <Trash2 className='h-4 w-4' />
                  <span>Delete Feature</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeatureByFeatureBuilder
