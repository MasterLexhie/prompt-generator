'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Brain,
  Target,
  Code2,
  Sparkles,
  ArrowRight,
  Settings,
  Zap,
  BookOpen,
  ChevronRight,
  Monitor
} from 'lucide-react'
import type { ColorClass, ColorScheme, Route } from '@/types'

const promptRoutes: Route[] = [
  {
    id: 'system-prompt',
    title: 'System Prompt Generator',
    description:
      'Create consistent AI behavior for professional vibe coding sessions',
    icon: <Brain className='h-8 w-8' />,
    color: 'blue' as ColorScheme,
    features: [
      'Define AI personality and expertise level',
      'Set coding standards and quality requirements',
      'Configure security and best practices',
      'Establish team context and communication style'
    ],
    useCase:
      'Set once per project to establish consistent code quality and standards',
    path: '/system-prompt-generator',
    isAvailable: true
  },
  {
    id: 'user-prompt',
    title: 'S.C.A.F.F. User Prompt Generator',
    description:
      'Generate structured prompts for specific coding tasks and features',
    icon: <Target className='h-8 w-8' />,
    color: 'green',
    features: [
      'Situation, Challenge, Audience, Format, Foundations framework',
      'Example-driven and constraint-based options',
      'Test-driven development support',
      'Production-ready code specifications'
    ],
    useCase: 'Use for each feature or component you want to build',
    path: '/user-prompt-generator',
    isAvailable: true
  },
  {
    id: 'feature-builder',
    title: 'Feature-by-Feature Builder',
    description:
      'Systematic approach to building applications one feature at a time',
    icon: <Code2 className='h-8 w-8' />,
    color: 'purple',
    features: [
      'Progressive feature development',
      'Integration planning between features',
      'Free tier optimization strategies',
      'Complete feature implementation'
    ],
    useCase: 'Plan and execute full application development systematically',
    path: '/feature-builder',
    isAvailable: true
  },
  {
    id: 'quick-prompts',
    title: 'Quick Prompt Library',
    description: 'Pre-built prompts for common development tasks and patterns',
    icon: <Sparkles className='h-8 w-8' />,
    color: 'yellow',
    features: [
      'Database migration setups',
      'API endpoint creation',
      'Component library development',
      'Testing and deployment scripts'
    ],
    useCase: 'Rapidly generate code for common development patterns',
    path: '/quick-prompts-library',
    isAvailable: true
  },
  {
    id: 'integration-guide',
    title: 'Tool Integration Guide',
    description:
      'Learn how to integrate vibe coding with your development workflow',
    icon: <Settings className='h-8 w-8' />,
    color: 'indigo',
    features: [
      'Claude Desktop + VS Code setup',
      'API integration examples',
      'Cursor IDE configuration',
      'Workflow optimization tips'
    ],
    useCase: 'Setup and optimize your vibe coding development environment',
    path: '/integration-guide',
    isAvailable: false
  },
  {
    id: 'best-practices',
    title: 'Vibe Coding Best Practices',
    description:
      'Advanced techniques and strategies for professional vibe coding',
    icon: <BookOpen className='h-8 w-8' />,
    color: 'red',
    features: [
      'Prompt engineering techniques',
      'Code quality assurance',
      'Security best practices',
      'Team collaboration strategies'
    ],
    useCase: 'Master advanced vibe coding techniques and methodologies',
    path: '/best-practices',
    isAvailable: false
  }
]

const colorClasses: Record<ColorScheme, ColorClass> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    icon: 'text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700',
    accent: 'bg-blue-100'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    icon: 'text-green-600',
    button: 'bg-green-600 hover:bg-green-700',
    accent: 'bg-green-100'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-900',
    icon: 'text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700',
    accent: 'bg-purple-100'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-900',
    icon: 'text-yellow-600',
    button: 'bg-yellow-600 hover:bg-yellow-700',
    accent: 'bg-yellow-100'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-900',
    icon: 'text-indigo-600',
    button: 'bg-indigo-600 hover:bg-indigo-700',
    accent: 'bg-indigo-100'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    icon: 'text-red-600',
    button: 'bg-red-600 hover:bg-red-700',
    accent: 'bg-red-100'
  }
} as const

const PromptRoutesPage = () => {
  const router = useRouter()
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='flex items-center space-x-4 mb-4'>
            <div className='p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg'>
              <Code2 className='h-8 w-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Vibe Coding Toolkit
              </h1>
              <p className='text-gray-600'>
                Professional AI-assisted development tools and generators
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='flex items-center space-x-3 bg-blue-50 p-4 rounded-lg'>
              <Monitor className='h-6 w-6 text-blue-600' />
              <div>
                <div className='text-lg font-semibold text-blue-900'>
                  System Prompts
                </div>
                <div className='text-sm text-blue-600'>
                  Consistent AI behavior
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-3 bg-green-50 p-4 rounded-lg'>
              <Target className='h-6 w-6 text-green-600' />
              <div>
                <div className='text-lg font-semibold text-green-900'>
                  S.C.A.F.F. Framework
                </div>
                <div className='text-sm text-green-600'>
                  Structured user prompts
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-3 bg-purple-50 p-4 rounded-lg'>
              <Zap className='h-6 w-6 text-purple-600' />
              <div>
                <div className='text-lg font-semibold text-purple-900'>
                  Production Ready
                </div>
                <div className='text-sm text-purple-600'>
                  Enterprise-grade code
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* Workflow Steps */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            Complete Vibe Coding Workflow
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='flex items-start space-x-4'>
              <div className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
                1
              </div>
              <div>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  Set System Prompt
                </h3>
                <p className='text-gray-600 text-sm'>
                  Define AI personality, coding standards, and quality
                  requirements once per project.
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-4'>
              <div className='flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold'>
                2
              </div>
              <div>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  Generate Feature Prompts
                </h3>
                <p className='text-gray-600 text-sm'>
                  Use S.C.A.F.F. framework to create detailed prompts for each
                  application feature.
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-4'>
              <div className='flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold'>
                3
              </div>
              <div>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  Build & Integrate
                </h3>
                <p className='text-gray-600 text-sm'>
                  Generate production-ready code and integrate features
                  systematically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Route Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {promptRoutes.map((route) => (
            <div
              key={route.id}
              className={`block ${colorClasses[route.color].bg} ${
                colorClasses[route.color].border
              } border-2 rounded-xl p-6 transition-all duration-200 ${
                route.isAvailable
                  ? 'hover:shadow-lg'
                  : 'opacity-70 cursor-not-allowed'
              } group`}
            >
              {route.isAvailable ? (
                <Link
                  href={route.path}
                  className='block'
                  onClick={() => setSelectedRoute(route)}
                >
                  <div className='contents'>
                    <div className='flex items-start justify-between mb-4'>
                      <div
                        className={`${
                          colorClasses[route.color].icon
                        } group-hover:scale-110 transition-transform duration-200`}
                      >
                        {route.icon}
                      </div>
                      <ChevronRight className='h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' />
                    </div>
                    <h3
                      className={`text-xl font-bold ${
                        colorClasses[route.color].text
                      } mb-2`}
                    >
                      {route.title}
                    </h3>
                    <p className='text-gray-600 mb-4'>{route.description}</p>
                    <div
                      className={`${
                        colorClasses[route.color].accent
                      } rounded-lg p-3 mb-4`}
                    >
                      <div className='text-sm font-medium text-gray-700 mb-2'>
                        Key Features:
                      </div>
                      <ul className='text-sm text-gray-600 space-y-1'>
                        {route.features.map((feature, index) => (
                          <li key={index} className='flex items-center'>
                            <div className='w-1 h-1 bg-gray-400 rounded-full mr-2'></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='mb-4'>
                      <div className='text-sm font-medium text-gray-700 mb-1'>
                        Best Used For:
                      </div>
                      <div className='text-sm text-gray-600'>
                        {route.useCase}
                      </div>
                    </div>
                    <div
                      className={`w-full ${
                        colorClasses[route.color].button
                      } text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group`}
                    >
                      <span>Open {route.title}</span>
                      <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform duration-200' />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className='cursor-not-allowed'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className={`${colorClasses[route.color].icon}`}>
                      {route.icon}
                    </div>
                    <ChevronRight className='h-5 w-5 text-gray-400' />
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      colorClasses[route.color].text
                    } mb-2`}
                  >
                    {route.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{route.description}</p>
                  <div
                    className={`${
                      colorClasses[route.color].accent
                    } rounded-lg p-3 mb-4`}
                  >
                    <div className='text-sm font-medium text-gray-700 mb-2'>
                      Key Features:
                    </div>
                    <ul className='text-sm text-gray-600 space-y-1'>
                      {route.features.map((feature, index) => (
                        <li key={index} className='flex items-center'>
                          <div className='w-1 h-1 bg-gray-400 rounded-full mr-2'></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='mb-4'>
                    <div className='text-sm font-medium text-gray-700 mb-1'>
                      Best Used For:
                    </div>
                    <div className='text-sm text-gray-600'>{route.useCase}</div>
                  </div>
                  <div
                    className={`w-full ${
                      colorClasses[route.color].button
                    } text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 opacity-50`}
                  >
                    <span>Coming Soon</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Route Details */}
        {selectedRoute && (
          <div className='mt-12 bg-white rounded-xl shadow-lg p-8'>
            <div className='flex items-center space-x-4 mb-6'>
              <div className={`${colorClasses[selectedRoute.color].icon}`}>
                {selectedRoute.icon}
              </div>
              <div>
                <h3 className='text-2xl font-bold text-gray-900'>
                  {selectedRoute.title}
                </h3>
                <p className='text-gray-600'>{selectedRoute.description}</p>
              </div>
            </div>

            <div className='bg-gray-50 rounded-lg p-6'>
              <h4 className='font-semibold text-gray-900 mb-3'>
                Implementation Guide:
              </h4>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                  </div>
                  <div>
                    <div className='font-medium text-gray-900'>
                      Navigate to the tool
                    </div>
                    <div className='text-sm text-gray-600'>
                      Click the button above or navigate to{' '}
                      <code className='bg-gray-200 px-2 py-1 rounded text-xs'>
                        {selectedRoute.path}
                      </code>
                    </div>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                  </div>
                  <div>
                    <div className='font-medium text-gray-900'>
                      Configure your settings
                    </div>
                    <div className='text-sm text-gray-600'>
                      Fill in the required fields based on your project
                      requirements
                    </div>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <div className='w-2 h-2 bg-purple-600 rounded-full'></div>
                  </div>
                  <div>
                    <div className='font-medium text-gray-900'>
                      Generate and use
                    </div>
                    <div className='text-sm text-gray-600'>
                      Generate your prompt and use it with Claude Desktop, API,
                      or other AI tools
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedRoute(null)}
              className='mt-6 text-gray-500 hover:text-gray-700 transition-colors duration-200'
            >
              ← Back to all tools
            </button>
          </div>
        )}

        {/* Footer */}
        <div className='mt-16 text-center'>
          <div className='bg-white rounded-lg p-8 shadow-sm'>
            <h3 className='text-xl font-bold text-gray-900 mb-4'>
              Ready to Start Vibe Coding?
            </h3>
            <p className='text-gray-600 mb-6'>
              Begin with the System Prompt Generator to establish your AI's
              behavior, then use the S.C.A.F.F. User Prompt Generator for each
              feature you want to build.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              {promptRoutes
                .filter((route) => route.isAvailable)
                .slice(0, 2)
                .map((route) => (
                  <Link
                    key={route.id}
                    href={route.path}
                    className={`${
                      colorClasses[route.color].button
                    } text-white py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
                  >
                    {route.icon}
                    <span>
                      {route.id === 'system-prompt'
                        ? 'Start with System Prompt'
                        : 'Generate User Prompts'}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptRoutesPage
