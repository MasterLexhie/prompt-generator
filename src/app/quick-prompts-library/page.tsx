'use client'
import React, { useState, useCallback, useMemo } from 'react'
import {
  Sparkles,
  Search,
  Copy,
  Download,
  Clock,
  Database,
  Globe,
  Code,
  Layers,
  Settings,
  Shield,
  TestTube,
  Zap
} from 'lucide-react'
import {
  QuickPrompt,
  PromptCategory,
  CategoryFilter,
  ComplexityFilter
} from '@/types'

// Static data - declared outside component for performance
const QUICK_PROMPTS: QuickPrompt[] = [
  // Database Migration Prompts
  {
    id: 'db-knex-migration',
    title: 'Knex.js Migration Setup',
    description:
      'Complete database migration flow with rollbacks and seed data',
    category: 'database',
    tags: ['knex', 'migration', 'postgresql', 'mysql'],
    complexity: 'intermediate',
    estimatedTime: '1 prompt',
    useCase: 'Setting up database version control and migration system',
    techStack: ['Node.js', 'Knex.js', 'PostgreSQL'],
    lastUpdated: '2024-01-15',
    prompt: `SITUATION: I'm building a Node.js application that needs a robust database migration system using Knex.js for PostgreSQL.

CHALLENGE: Create a complete database migration setup including:
- Knex configuration for multiple environments (dev, staging, prod)
- Migration file templates with proper up/down methods
- Rollback capabilities and safety checks
- Seed data system for initial data
- npm scripts for migration commands
- Error handling for failed migrations

AUDIENCE: Mid-level developers who need to maintain this migration system long-term.

FORMAT: Use modern JavaScript/TypeScript, include comprehensive comments explaining each step, follow Knex.js best practices, include example migration files.

FOUNDATIONS: Ensure migrations are idempotent, include proper error handling, add logging for migration tracking, implement safety checks for production rollbacks.`
  },
  {
    id: 'prisma-schema',
    title: 'Prisma Schema Design',
    description:
      'Complete Prisma schema with relationships and advanced features',
    category: 'database',
    tags: ['prisma', 'schema', 'relationships', 'typescript'],
    complexity: 'intermediate',
    estimatedTime: '1 prompt',
    useCase: 'Designing type-safe database schemas with complex relationships',
    techStack: ['Prisma', 'TypeScript', 'PostgreSQL'],
    lastUpdated: '2024-01-20',
    prompt: `SITUATION: I'm building a TypeScript application using Prisma ORM with PostgreSQL, requiring complex data relationships and type safety.

CHALLENGE: Create a comprehensive Prisma schema that includes:
- User authentication and authorization models
- Complex many-to-many relationships
- Enums and custom types
- Indexes for performance optimization
- Cascade operations and constraints
- Soft deletes implementation
- Audit fields (createdAt, updatedAt)

AUDIENCE: TypeScript developers who need maintainable, scalable database design.

FORMAT: Use Prisma schema language, include comments explaining relationships, follow naming conventions, provide example queries.

FOUNDATIONS: Implement proper data integrity, optimize for query performance, include proper indexing strategy, ensure referential integrity.`
  },

  // API Endpoint Prompts
  {
    id: 'rest-api-crud',
    title: 'RESTful API CRUD Operations',
    description:
      'Complete REST API with authentication, validation, and error handling',
    category: 'api',
    tags: ['rest', 'express', 'validation', 'authentication'],
    complexity: 'intermediate',
    estimatedTime: '1 prompt',
    useCase: 'Building production-ready REST API endpoints',
    techStack: ['Express.js', 'Node.js', 'JWT', 'Joi'],
    lastUpdated: '2024-01-18',
    prompt: `SITUATION: I'm building a Node.js REST API using Express.js that needs full CRUD operations with authentication and validation.

CHALLENGE: Create a complete REST API system including:
- Express router setup with middleware
- JWT authentication and authorization
- Input validation using Joi or similar
- CRUD operations (GET, POST, PUT, DELETE)
- Pagination and filtering
- Rate limiting and security middleware
- Comprehensive error handling
- API documentation structure

AUDIENCE: Backend developers building production APIs.

FORMAT: Use Express.js best practices, async/await patterns, modular route structure, include middleware for common functionality.

FOUNDATIONS: Implement proper security (helmet, cors, rate limiting), comprehensive input validation, detailed error responses, logging for debugging.`
  },
  {
    id: 'graphql-resolver',
    title: 'GraphQL Resolver Implementation',
    description:
      'Complete GraphQL resolvers with DataLoader and authentication',
    category: 'api',
    tags: ['graphql', 'resolver', 'dataloader', 'apollo'],
    complexity: 'advanced',
    estimatedTime: '1 prompt',
    useCase: 'Building efficient GraphQL APIs with optimal data fetching',
    techStack: ['GraphQL', 'Apollo Server', 'DataLoader'],
    lastUpdated: '2024-01-22',
    prompt: `SITUATION: I'm building a GraphQL API using Apollo Server that needs efficient data fetching and relationship handling.

CHALLENGE: Create a complete GraphQL resolver system including:
- Type definitions and schema design
- Resolver functions with proper error handling
- DataLoader implementation for N+1 query optimization
- Authentication and authorization in resolvers
- Input validation and sanitization
- Subscription setup for real-time features
- Context management and dependency injection

AUDIENCE: Advanced developers building scalable GraphQL applications.

FORMAT: Use Apollo Server v4 best practices, TypeScript for type safety, modular resolver structure, comprehensive error handling.

FOUNDATIONS: Implement proper security controls, optimize for performance with DataLoader, include comprehensive logging, handle edge cases gracefully.`
  },

  // Component Library Prompts
  {
    id: 'react-component-library',
    title: 'React Component Library',
    description:
      'Reusable component library with TypeScript, Storybook, and testing',
    category: 'component',
    tags: ['react', 'typescript', 'storybook', 'components'],
    complexity: 'advanced',
    estimatedTime: '1 prompt',
    useCase: 'Building scalable, reusable component systems',
    techStack: ['React', 'TypeScript', 'Storybook', 'Jest'],
    lastUpdated: '2024-01-25',
    prompt: `SITUATION: I'm creating a reusable React component library using TypeScript that needs to be well-documented and thoroughly tested.

CHALLENGE: Create a complete component library system including:
- Base components (Button, Input, Card, Modal, etc.)
- TypeScript interfaces for all props
- Storybook setup with comprehensive stories
- Jest and React Testing Library test suites
- CSS-in-JS or Tailwind styling system
- Build configuration for npm publishing
- Documentation with usage examples
- Accessibility (a11y) implementations

AUDIENCE: Frontend developers who will consume and contribute to the component library.

FORMAT: Use modern React patterns (hooks, functional components), TypeScript for type safety, comprehensive prop interfaces, modular file structure.

FOUNDATIONS: Implement proper accessibility standards (WCAG 2.1), comprehensive testing coverage, performance optimizations, consistent styling system.`
  },
  {
    id: 'vue-composition-api',
    title: 'Vue 3 Composition API Components',
    description: 'Modern Vue 3 components using Composition API and TypeScript',
    category: 'component',
    tags: ['vue3', 'composition-api', 'typescript', 'pinia'],
    complexity: 'intermediate',
    estimatedTime: '1 prompt',
    useCase: 'Building modern Vue 3 applications with Composition API',
    techStack: ['Vue 3', 'TypeScript', 'Pinia', 'Vite'],
    lastUpdated: '2024-01-20',
    prompt: `SITUATION: I'm building Vue 3 components using the Composition API with TypeScript and Pinia for state management.

CHALLENGE: Create a complete Vue 3 component system including:
- Composition API setup with reactive state
- TypeScript integration with proper typing
- Pinia store integration for state management
- Custom composables for reusable logic
- Props validation and emit typing
- Lifecycle hooks and watchers
- Template refs and component communication
- Error boundaries and loading states

AUDIENCE: Vue developers transitioning to Vue 3 and Composition API.

FORMAT: Use Vue 3 Composition API best practices, TypeScript for type safety, composable functions for reusability, modern Vue patterns.

FOUNDATIONS: Implement proper reactivity patterns, type-safe props and emits, performance optimizations with shallow refs, comprehensive error handling.`
  },

  // Testing & Deployment Prompts
  {
    id: 'jest-testing-suite',
    title: 'Comprehensive Jest Testing Suite',
    description: 'Complete testing setup with unit, integration, and e2e tests',
    category: 'testing',
    tags: ['jest', 'testing', 'coverage', 'mocking'],
    complexity: 'intermediate',
    estimatedTime: '1 prompt',
    useCase: 'Setting up professional testing infrastructure',
    techStack: ['Jest', 'Testing Library', 'Supertest'],
    lastUpdated: '2024-01-23',
    prompt: `SITUATION: I need a comprehensive testing setup using Jest for a Node.js/React application with high test coverage and professional practices.

CHALLENGE: Create a complete testing infrastructure including:
- Jest configuration for multiple environments
- Unit tests for utilities and pure functions
- Integration tests for API endpoints
- React component testing with Testing Library
- Mocking strategies for external dependencies
- Code coverage reporting and thresholds
- Test data factories and fixtures
- CI/CD integration setup

AUDIENCE: Development team implementing test-driven development practices.

FORMAT: Use Jest best practices, clear test descriptions, arrange-act-assert pattern, comprehensive mocking strategies.

FOUNDATIONS: Achieve high test coverage (>80%), implement proper mocking without over-mocking, include performance testing, ensure tests are maintainable and fast.`
  },
  {
    id: 'docker-deployment',
    title: 'Docker Deployment Configuration',
    description:
      'Production-ready Docker setup with multi-stage builds and orchestration',
    category: 'deployment',
    tags: ['docker', 'deployment', 'production', 'orchestration'],
    complexity: 'intermediate',
    estimatedTime: '1 prompt',
    useCase: 'Containerizing applications for production deployment',
    techStack: ['Docker', 'Docker Compose', 'NGINX'],
    lastUpdated: '2024-01-21',
    prompt: `SITUATION: I need to containerize a full-stack application using Docker with production-ready configuration and deployment strategy.

CHALLENGE: Create a complete Docker deployment setup including:
- Multi-stage Dockerfile for optimized builds
- Docker Compose for development and production
- NGINX reverse proxy configuration
- Environment variable management
- Health checks and monitoring
- Log aggregation and rotation
- Security best practices (non-root user, secrets)
- CI/CD pipeline integration

AUDIENCE: DevOps engineers and developers deploying to production environments.

FORMAT: Use Docker best practices, multi-stage builds for optimization, clear documentation for deployment processes.

FOUNDATIONS: Implement security best practices, optimize for image size and build speed, include proper health monitoring, ensure scalability considerations.`
  },

  // Security & Performance Prompts
  {
    id: 'security-middleware',
    title: 'Security Middleware Implementation',
    description: 'Comprehensive security middleware for web applications',
    category: 'security',
    tags: ['security', 'middleware', 'authentication', 'authorization'],
    complexity: 'advanced',
    estimatedTime: '1 prompt',
    useCase: 'Implementing robust security measures in web applications',
    techStack: ['Express.js', 'Helmet', 'JWT', 'bcrypt'],
    lastUpdated: '2024-01-19',
    prompt: `SITUATION: I'm building security middleware for a web application that handles sensitive user data and needs comprehensive protection.

CHALLENGE: Create a complete security middleware system including:
- Authentication with JWT and refresh tokens
- Authorization with role-based access control
- Input validation and sanitization
- Rate limiting and DDoS protection
- CSRF and XSS protection
- SQL injection prevention
- Security headers (helmet.js)
- Audit logging and monitoring

AUDIENCE: Security-conscious developers building production applications.

FORMAT: Use security best practices, layered security approach, comprehensive error handling without information leakage.

FOUNDATIONS: Follow OWASP security guidelines, implement defense in depth, include proper logging for security events, ensure compliance considerations.`
  },
  {
    id: 'performance-optimization',
    title: 'React Performance Optimization',
    description:
      'Complete React performance optimization techniques and monitoring',
    category: 'performance',
    tags: ['react', 'performance', 'optimization', 'monitoring'],
    complexity: 'advanced',
    estimatedTime: '1 prompt',
    useCase: 'Optimizing React applications for maximum performance',
    techStack: ['React', 'React DevTools', 'Web Vitals'],
    lastUpdated: '2024-01-24',
    prompt: `SITUATION: I need to optimize a React application that's experiencing performance issues with slow renders and poor user experience metrics.

CHALLENGE: Create a complete performance optimization system including:
- React.memo and useMemo implementation strategies
- Code splitting with React.lazy and Suspense
- Virtual scrolling for large lists
- Image optimization and lazy loading
- Bundle analysis and optimization
- Web Vitals monitoring and improvement
- Performance profiling setup
- Progressive loading strategies

AUDIENCE: React developers optimizing production applications for better user experience.

FORMAT: Use React performance best practices, include before/after examples, provide monitoring and measurement strategies.

FOUNDATIONS: Focus on Core Web Vitals (LCP, FID, CLS), implement progressive enhancement, include accessibility considerations in optimizations.`
  }
] as const

const CATEGORIES: PromptCategory[] = [
  {
    id: 'database',
    name: 'Database Migration',
    description: 'Database schemas, migrations, and ORM setup',
    icon: Database,
    color: 'blue',
    count: QUICK_PROMPTS.filter((p) => p.category === 'database').length
  },
  {
    id: 'api',
    name: 'API Development',
    description: 'REST, GraphQL, and API architecture patterns',
    icon: Globe,
    color: 'green',
    count: QUICK_PROMPTS.filter((p) => p.category === 'api').length
  },
  {
    id: 'component',
    name: 'Component Libraries',
    description: 'Reusable UI components and design systems',
    icon: Layers,
    color: 'purple',
    count: QUICK_PROMPTS.filter((p) => p.category === 'component').length
  },
  {
    id: 'testing',
    name: 'Testing & QA',
    description: 'Unit, integration, and end-to-end testing',
    icon: TestTube,
    color: 'orange',
    count: QUICK_PROMPTS.filter((p) => p.category === 'testing').length
  },
  {
    id: 'deployment',
    name: 'Deployment Scripts',
    description: 'CI/CD, containerization, and deployment automation',
    icon: Settings,
    color: 'indigo',
    count: QUICK_PROMPTS.filter((p) => p.category === 'deployment').length
  },
  {
    id: 'security',
    name: 'Security Implementation',
    description: 'Authentication, authorization, and security best practices',
    icon: Shield,
    color: 'red',
    count: QUICK_PROMPTS.filter((p) => p.category === 'security').length
  },
  {
    id: 'performance',
    name: 'Performance Optimization',
    description: 'Code optimization, monitoring, and performance tuning',
    icon: Zap,
    color: 'yellow',
    count: QUICK_PROMPTS.filter((p) => p.category === 'performance').length
  }
] as const

// Custom hooks for better organization
const usePromptFiltering = (
  prompts: QuickPrompt[],
  searchQuery: string,
  selectedCategory: CategoryFilter,
  complexityFilter: ComplexityFilter
) => {
  return useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesSearch =
        searchQuery === '' ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesCategory =
        selectedCategory === 'all' || prompt.category === selectedCategory
      const matchesComplexity =
        complexityFilter === 'all' || prompt.complexity === complexityFilter

      return matchesSearch && matchesCategory && matchesComplexity
    })
  }, [prompts, searchQuery, selectedCategory, complexityFilter])
}

const useClipboard = () => {
  const copyToClipboard = useCallback(async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }, [])

  return { copyToClipboard }
}

// Components
const ComplexityBadge: React.FC<{ complexity: QuickPrompt['complexity'] }> = ({
  complexity
}) => {
  const getComplexityColor = (level: string): string => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    } as const
    return colors[level as keyof typeof colors] || colors.intermediate
  }

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getComplexityColor(
        complexity
      )}`}
    >
      {complexity}
    </span>
  )
}

const CategoryButton: React.FC<{
  category: PromptCategory
  isSelected: boolean
  onClick: (categoryId: string) => void
}> = ({ category, isSelected, onClick }) => {
  const IconComponent = category.icon

  const getCategoryColor = (color: string): string => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
      orange: 'bg-orange-50 border-orange-200 text-orange-900',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-900',
      red: 'bg-red-50 border-red-200 text-red-900',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900'
    } as const
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const handleClick = useCallback(() => {
    onClick(category.id)
  }, [category.id, onClick])

  return (
    <button
      onClick={handleClick}
      className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
        isSelected
          ? getCategoryColor(category.color) + ' border-opacity-100'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className='flex flex-col items-center space-y-2'>
        <IconComponent className='h-5 w-5 sm:h-6 sm:w-6' />
        <span className='font-semibold text-xs sm:text-sm text-center leading-tight'>
          {category.name}
        </span>
        <span className='text-xs font-medium bg-gray-100 px-2 py-1 rounded-full'>
          {category.count}
        </span>
      </div>
      <p className='hidden lg:block text-xs text-gray-600 mt-2 text-center'>
        {category.description}
      </p>
    </button>
  )
}

const PromptCard: React.FC<{
  prompt: QuickPrompt
  onViewPrompt: (prompt: QuickPrompt) => void
  onCopyPrompt: (prompt: string) => void
  onDownload: (prompt: QuickPrompt) => void
}> = ({ prompt, onViewPrompt, onCopyPrompt, onDownload }) => {
  const handleViewPrompt = useCallback(() => {
    onViewPrompt(prompt)
  }, [prompt, onViewPrompt])

  const handleCopyPrompt = useCallback(() => {
    onCopyPrompt(prompt.prompt)
  }, [prompt.prompt, onCopyPrompt])

  const handleDownload = useCallback(() => {
    onDownload(prompt)
  }, [prompt, onDownload])

  const maxTags =
    typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3

  return (
    <div className='bg-white rounded-lg shadow-sm border p-4 sm:p-6 hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-start justify-between mb-3'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 flex-1 pr-2'>
          {prompt.title}
        </h3>
        <ComplexityBadge complexity={prompt.complexity} />
      </div>

      <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
        {prompt.description}
      </p>

      <div className='mb-4'>
        <p className='text-xs font-medium text-gray-700 mb-1'>Use Case:</p>
        <p className='text-xs text-gray-600 line-clamp-2'>{prompt.useCase}</p>
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 mb-3 space-y-1 sm:space-y-0 sm:space-x-4'>
        <div className='flex items-center'>
          <Clock className='h-3 w-3 mr-1' />
          <span>{prompt.estimatedTime}</span>
        </div>
        {prompt.techStack && (
          <div className='flex items-center'>
            <Code className='h-3 w-3 mr-1' />
            <span className='truncate'>
              {prompt.techStack.slice(0, 2).join(', ')}
              {prompt.techStack.length > 2 &&
                ` +${prompt.techStack.length - 2}`}
            </span>
          </div>
        )}
      </div>

      <div className='flex flex-wrap gap-1 mb-4'>
        {prompt.tags.slice(0, maxTags).map((tag) => (
          <span
            key={tag}
            className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded'
          >
            {tag}
          </span>
        ))}
        {prompt.tags.length > maxTags && (
          <span className='text-xs text-gray-500'>
            +{prompt.tags.length - maxTags} more
          </span>
        )}
      </div>

      <div className='flex gap-2'>
        <button
          onClick={handleViewPrompt}
          className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 sm:py-2 px-3 rounded text-sm font-medium transition-colors duration-200'
        >
          View Prompt
        </button>
        <button
          onClick={handleCopyPrompt}
          className='bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 sm:p-2 rounded transition-colors duration-200'
          title='Copy prompt'
          aria-label='Copy prompt to clipboard'
        >
          <Copy className='h-4 w-4' />
        </button>
        <button
          onClick={handleDownload}
          className='bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 sm:p-2 rounded transition-colors duration-200'
          title='Download prompt'
          aria-label='Download prompt as file'
        >
          <Download className='h-4 w-4' />
        </button>
      </div>
    </div>
  )
}

const PromptModal: React.FC<{
  prompt: QuickPrompt
  onClose: () => void
  onCopy: (text: string) => void
  onDownload: (prompt: QuickPrompt) => void
}> = ({ prompt, onClose, onCopy, onDownload }) => {
  const handleCopy = useCallback(() => {
    onCopy(prompt.prompt)
  }, [prompt.prompt, onCopy])

  const handleDownload = useCallback(() => {
    onDownload(prompt)
  }, [prompt, onDownload])

  const getComplexityColor = (complexity: string): string => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    } as const
    return colors[complexity as keyof typeof colors] || colors.intermediate
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto'>
        <div className='p-4 sm:p-6'>
          <div className='flex items-start justify-between mb-4 sm:mb-6'>
            <div className='flex-1 pr-4'>
              <h3 className='text-lg sm:text-2xl font-bold text-gray-900 mb-2'>
                {prompt.title}
              </h3>
              <p className='text-gray-600 text-sm sm:text-base'>
                {prompt.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 p-1'
              aria-label='Close modal'
            >
              ✕
            </button>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6'>
            <div className='lg:col-span-1 space-y-4'>
              <div>
                <h4 className='font-semibold text-gray-900 mb-2'>Details</h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Category:</span>
                    <span className='capitalize font-medium'>
                      {prompt.category.replace('-', ' ')}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Complexity:</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getComplexityColor(
                        prompt.complexity
                      )}`}
                    >
                      {prompt.complexity}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Time:</span>
                    <span className='font-medium'>{prompt.estimatedTime}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Updated:</span>
                    <span className='font-medium text-xs sm:text-sm'>
                      {new Date(prompt.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='font-semibold text-gray-900 mb-2'>Use Case</h4>
                <p className='text-sm text-gray-600'>{prompt.useCase}</p>
              </div>

              {prompt.techStack && (
                <div>
                  <h4 className='font-semibold text-gray-900 mb-2'>
                    Tech Stack
                  </h4>
                  <div className='flex flex-wrap gap-1'>
                    {prompt.techStack.map((tech) => (
                      <span
                        key={tech}
                        className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className='font-semibold text-gray-900 mb-2'>Tags</h4>
                <div className='flex flex-wrap gap-1'>
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='lg:col-span-2'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0'>
                <h4 className='font-semibold text-gray-900'>
                  S.C.A.F.F. Prompt
                </h4>
                <div className='flex gap-2'>
                  <button
                    onClick={handleCopy}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-2'
                  >
                    <Copy className='h-4 w-4' />
                    <span className='hidden sm:inline'>Copy Prompt</span>
                    <span className='sm:hidden'>Copy</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className='bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-2'
                  >
                    <Download className='h-4 w-4' />
                    <span className='hidden sm:inline'>Download</span>
                    <span className='sm:hidden'>Save</span>
                  </button>
                </div>
              </div>

              <div className='bg-gray-900 rounded-lg p-3 sm:p-4 max-h-72 sm:max-h-96 overflow-y-auto'>
                <pre className='text-green-400 text-xs sm:text-sm whitespace-pre-wrap font-mono leading-relaxed'>
                  {prompt.prompt}
                </pre>
              </div>

              <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
                <p className='text-xs sm:text-sm text-blue-800'>
                  <strong>💡 Usage Tip:</strong> Copy this prompt and paste it
                  into Claude Desktop, ChatGPT, or your preferred AI tool.
                  Modify the SITUATION section to match your specific project
                  context for best results.
                </p>
              </div>
            </div>
          </div>

          <div className='flex justify-end pt-4 border-t border-gray-200'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
const QuickPromptLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('all')
  const [complexityFilter, setComplexityFilter] =
    useState<ComplexityFilter>('all')
  const [selectedPrompt, setSelectedPrompt] = useState<QuickPrompt | null>(null)

  const { copyToClipboard } = useClipboard()
  const filteredPrompts = usePromptFiltering(
    QUICK_PROMPTS,
    searchQuery,
    selectedCategory,
    complexityFilter
  )

  // Event handlers with useCallback for performance
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value)
    },
    []
  )

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(event.target.value as CategoryFilter)
    },
    []
  )

  const handleComplexityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setComplexityFilter(event.target.value as ComplexityFilter)
    },
    []
  )

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId as CategoryFilter)
  }, [])

  const handleViewPrompt = useCallback((prompt: QuickPrompt) => {
    setSelectedPrompt(prompt)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedPrompt(null)
  }, [])

  const handleDownloadPrompt = useCallback((prompt: QuickPrompt) => {
    const content = `# ${prompt.title}

## Description
${prompt.description}

## Use Case
${prompt.useCase}

## Tech Stack
${prompt.techStack?.join(', ') || 'Not specified'}

## Complexity: ${prompt.complexity}
## Estimated Time: ${prompt.estimatedTime}

## Tags
${prompt.tags.join(', ')}

---

## Prompt

${prompt.prompt}

---
Generated from Vibe Coding Quick Prompt Library
Last Updated: ${prompt.lastUpdated}`

    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${prompt.title.toLowerCase().replace(/\s+/g, '-')}-prompt.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6'>
          <div className='flex items-center space-x-3 sm:space-x-4'>
            <div className='p-2 sm:p-3 bg-yellow-500 rounded-lg'>
              <Sparkles className='h-5 w-5 sm:h-6 sm:w-6 text-white' />
            </div>
            <div>
              <h1 className='text-xl sm:text-2xl font-bold text-gray-900'>
                Quick Prompt Library
              </h1>
              <p className='text-gray-600 text-sm sm:text-base'>
                Pre-built prompts for common development tasks
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8'>
        {/* Search and Filters */}
        <section className='bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder='Search prompts...'
                  className='w-full pl-10 pr-4 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                  aria-label='Search prompts by title, description, or tags'
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='px-3 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                aria-label='Filter by category'
              >
                <option value='all'>All Categories</option>
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <select
                value={complexityFilter}
                onChange={handleComplexityChange}
                className='px-3 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                aria-label='Filter by complexity level'
              >
                <option value='all'>All Levels</option>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
              </select>
            </div>
          </div>
        </section>

        {/* Categories Overview */}
        <section className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 mb-6 sm:mb-8'>
          {CATEGORIES.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={handleCategoryClick}
            />
          ))}
        </section>

        {/* Prompts Grid */}
        <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onViewPrompt={handleViewPrompt}
              onCopyPrompt={copyToClipboard}
              onDownload={handleDownloadPrompt}
            />
          ))}
        </section>

        {/* Empty State */}
        {filteredPrompts.length === 0 && (
          <div className='text-center py-12'>
            <Search className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              No prompts found
            </h3>
            <p className='text-gray-600 text-sm px-4'>
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </main>

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={handleCloseModal}
          onCopy={copyToClipboard}
          onDownload={handleDownloadPrompt}
        />
      )}
    </div>
  )
}

export default QuickPromptLibrary
