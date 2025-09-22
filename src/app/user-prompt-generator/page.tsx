'use client'
import React, { useState } from 'react'
import {
  Copy,
  Download,
  RefreshCw,
  Code,
  Users,
  Settings,
  Shield,
  Target
} from 'lucide-react'

interface FormData {
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

const VibeCodePromptGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    // Situation fields
    projectType: '',
    techStack: '',
    architecture: '',
    existingPatterns: '',
    constraints: '',

    // Challenge fields
    taskDescription: '',
    inputs: '',
    outputs: '',
    performance: '',
    requirements: '',

    // Audience fields
    teamLevel: 'mid-level',
    techFamiliarity: '',
    maintenance: '',
    codebase: 'internal',

    // Format fields
    codingStyle: '',
    conventions: '',
    documentation: '',
    testing: '',
    structure: '',

    // Foundations fields
    security: '',
    errorHandling: '',
    accessibility: '',
    compliance: '',
    logging: '',

    // Advanced options
    promptType: 'standard',
    examples: '',
    constraints_advanced: '',
    testCases: ''
  })

  const [generatedPrompt, setGeneratedPrompt] = useState('')

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const generatePrompt = () => {
    let prompt = ''

    // Situation Section
    prompt += '**SITUATION:**\n'
    if (formData.projectType) prompt += `I'm building ${formData.projectType}`
    if (formData.techStack) prompt += ` using ${formData.techStack}`
    if (formData.architecture)
      prompt += `. The application follows ${formData.architecture}`
    if (formData.existingPatterns)
      prompt += `. Current codebase patterns include: ${formData.existingPatterns}`
    if (formData.constraints)
      prompt += `. Technical constraints: ${formData.constraints}`
    prompt += '.\n\n'

    // Challenge Section
    prompt += '**CHALLENGE:**\n'
    if (formData.taskDescription) prompt += `${formData.taskDescription}`
    if (formData.inputs) prompt += `. Expected inputs: ${formData.inputs}`
    if (formData.outputs) prompt += `. Expected outputs: ${formData.outputs}`
    if (formData.performance)
      prompt += `. Performance requirements: ${formData.performance}`
    if (formData.requirements)
      prompt += `. Additional requirements: ${formData.requirements}`
    prompt += '.\n\n'

    // Audience Section
    prompt += '**AUDIENCE:**\n'
    prompt += `This code will be maintained by ${formData.teamLevel} developers`
    if (formData.techFamiliarity) prompt += ` with ${formData.techFamiliarity}`
    if (formData.maintenance)
      prompt += `. Maintenance timeline: ${formData.maintenance}`
    prompt += `. This is ${formData.codebase} codebase`
    prompt += '.\n\n'

    // Format Section
    prompt += '**FORMAT:**\n'
    if (formData.codingStyle)
      prompt += `Use ${formData.codingStyle} coding style`
    if (formData.conventions)
      prompt += `. Follow ${formData.conventions} conventions`
    if (formData.documentation)
      prompt += `. Documentation: ${formData.documentation}`
    if (formData.testing) prompt += `. Testing: ${formData.testing}`
    if (formData.structure) prompt += `. Code structure: ${formData.structure}`
    prompt += '.\n\n'

    // Foundations Section
    prompt += '**FOUNDATIONS:**\n'
    const foundations = []
    if (formData.security) foundations.push(`Security: ${formData.security}`)
    if (formData.errorHandling)
      foundations.push(`Error handling: ${formData.errorHandling}`)
    if (formData.accessibility)
      foundations.push(`Accessibility: ${formData.accessibility}`)
    if (formData.compliance)
      foundations.push(`Compliance: ${formData.compliance}`)
    if (formData.logging) foundations.push(`Logging: ${formData.logging}`)

    if (foundations.length > 0) {
      prompt += foundations.join('. ') + '.'
    } else {
      prompt +=
        'Implement proper error handling, input validation, and follow security best practices.'
    }
    prompt += '\n\n'

    // Advanced sections based on prompt type
    if (formData.promptType === 'example-driven' && formData.examples) {
      prompt += '**EXAMPLES:**\n'
      prompt += `Here are examples of our existing code patterns:\n${formData.examples}\n\n`
    }

    if (
      formData.promptType === 'constraint-based' &&
      formData.constraints_advanced
    ) {
      prompt += '**CONSTRAINTS:**\n'
      prompt += `${formData.constraints_advanced}\n\n`
    }

    if (formData.promptType === 'test-driven' && formData.testCases) {
      prompt += '**TEST CASES:**\n'
      prompt += `The implementation should pass the following test cases:\n${formData.testCases}\n\n`
    }

    // Final instruction
    prompt +=
      '**INSTRUCTION:**\nGenerate complete, production-ready code that meets all the above requirements. Include comments explaining key decisions and provide any necessary setup instructions.'

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
    a.download = 'vibe-coding-prompt.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearForm = () => {
    setFormData({
      projectType: '',
      techStack: '',
      architecture: '',
      existingPatterns: '',
      constraints: '',
      taskDescription: '',
      inputs: '',
      outputs: '',
      performance: '',
      requirements: '',
      teamLevel: 'mid-level',
      techFamiliarity: '',
      maintenance: '',
      codebase: 'internal',
      codingStyle: '',
      conventions: '',
      documentation: '',
      testing: '',
      structure: '',
      security: '',
      errorHandling: '',
      accessibility: '',
      compliance: '',
      logging: '',
      promptType: 'standard',
      examples: '',
      constraints_advanced: '',
      testCases: ''
    })
    setGeneratedPrompt('')
  }

  return (
    <div className='max-w-[1440px] mx-auto p-6 bg-gray-50 min-h-screen'>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-3'>
            Vibe Coding Prompt Generator
          </h1>
          <p className='text-gray-600'>
            Generate professional S.C.A.F.F. structured prompts for AI-assisted
            coding
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Input Form */}
          <div className='space-y-8'>
            {/* Situation Section */}
            <div className='bg-blue-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Settings className='h-5 w-5 text-blue-600 mr-2' />
                <h3 className='text-lg font-semibold text-blue-900'>
                  Situation - Development Context
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Project Type *
                  </label>
                  <input
                    type='text'
                    value={formData.projectType}
                    onChange={(e) =>
                      handleInputChange('projectType', e.target.value)
                    }
                    placeholder='e.g., a React e-commerce web application'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Tech Stack *
                  </label>
                  <input
                    type='text'
                    value={formData.techStack}
                    onChange={(e) =>
                      handleInputChange('techStack', e.target.value)
                    }
                    placeholder='e.g., React 18, Node.js, PostgreSQL, Redis'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Architecture Pattern
                  </label>
                  <input
                    type='text'
                    value={formData.architecture}
                    onChange={(e) =>
                      handleInputChange('architecture', e.target.value)
                    }
                    placeholder='e.g., microservices architecture with Docker containers'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Existing Code Patterns
                  </label>
                  <textarea
                    value={formData.existingPatterns}
                    onChange={(e) =>
                      handleInputChange('existingPatterns', e.target.value)
                    }
                    placeholder='e.g., repository pattern, service layers, custom hooks for API calls'
                    rows={2}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>
            </div>

            {/* Challenge Section */}
            <div className='bg-green-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Target className='h-5 w-5 text-green-600 mr-2' />
                <h3 className='text-lg font-semibold text-green-900'>
                  Challenge - Specific Task
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Task Description *
                  </label>
                  <textarea
                    value={formData.taskDescription}
                    onChange={(e) =>
                      handleInputChange('taskDescription', e.target.value)
                    }
                    placeholder='e.g., Create a user authentication system with login, registration, and password reset functionality'
                    rows={3}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Expected Inputs
                    </label>
                    <input
                      type='text'
                      value={formData.inputs}
                      onChange={(e) =>
                        handleInputChange('inputs', e.target.value)
                      }
                      placeholder='e.g., email, password, user data'
                      className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Expected Outputs
                    </label>
                    <input
                      type='text'
                      value={formData.outputs}
                      onChange={(e) =>
                        handleInputChange('outputs', e.target.value)
                      }
                      placeholder='e.g., JWT token, user profile, success/error responses'
                      className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Performance Requirements
                  </label>
                  <input
                    type='text'
                    value={formData.performance}
                    onChange={(e) =>
                      handleInputChange('performance', e.target.value)
                    }
                    placeholder='e.g., response time < 200ms, handle 1000 concurrent users'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500'
                  />
                </div>
              </div>
            </div>

            {/* Audience Section */}
            <div className='bg-purple-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Users className='h-5 w-5 text-purple-600 mr-2' />
                <h3 className='text-lg font-semibold text-purple-900'>
                  Audience - Who Will Use This
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Team Experience Level
                  </label>
                  <select
                    value={formData.teamLevel}
                    onChange={(e) =>
                      handleInputChange('teamLevel', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                  >
                    <option value='junior'>Junior developers</option>
                    <option value='mid-level'>Mid-level developers</option>
                    <option value='senior'>Senior developers</option>
                    <option value='mixed'>Mixed experience team</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Technology Familiarity
                  </label>
                  <input
                    type='text'
                    value={formData.techFamiliarity}
                    onChange={(e) =>
                      handleInputChange('techFamiliarity', e.target.value)
                    }
                    placeholder='e.g., strong React knowledge but new to TypeScript'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Maintenance Timeline
                  </label>
                  <input
                    type='text'
                    value={formData.maintenance}
                    onChange={(e) =>
                      handleInputChange('maintenance', e.target.value)
                    }
                    placeholder='e.g., 3+ years, handed off to client team'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                  />
                </div>
              </div>
            </div>

            {/* Format Section */}
            <div className='bg-yellow-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Code className='h-5 w-5 text-yellow-600 mr-2' />
                <h3 className='text-lg font-semibold text-yellow-900'>
                  Format - Code Structure & Style
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Coding Style
                  </label>
                  <input
                    type='text'
                    value={formData.codingStyle}
                    onChange={(e) =>
                      handleInputChange('codingStyle', e.target.value)
                    }
                    placeholder='e.g., functional components with hooks, async/await'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Naming Conventions
                  </label>
                  <input
                    type='text'
                    value={formData.conventions}
                    onChange={(e) =>
                      handleInputChange('conventions', e.target.value)
                    }
                    placeholder='e.g., Airbnb style guide, camelCase for variables'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Documentation Requirements
                  </label>
                  <input
                    type='text'
                    value={formData.documentation}
                    onChange={(e) =>
                      handleInputChange('documentation', e.target.value)
                    }
                    placeholder='e.g., JSDoc comments, inline comments for complex logic'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Testing Requirements
                  </label>
                  <input
                    type='text'
                    value={formData.testing}
                    onChange={(e) =>
                      handleInputChange('testing', e.target.value)
                    }
                    placeholder='e.g., unit tests with Jest, integration tests'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                  />
                </div>
              </div>
            </div>

            {/* Foundations Section */}
            <div className='bg-red-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <Shield className='h-5 w-5 text-red-600 mr-2' />
                <h3 className='text-lg font-semibold text-red-900'>
                  Foundations - Security & Quality
                </h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Security Requirements
                  </label>
                  <textarea
                    value={formData.security}
                    onChange={(e) =>
                      handleInputChange('security', e.target.value)
                    }
                    placeholder='e.g., input validation, SQL injection prevention, HTTPS only'
                    rows={2}
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Error Handling
                  </label>
                  <input
                    type='text'
                    value={formData.errorHandling}
                    onChange={(e) =>
                      handleInputChange('errorHandling', e.target.value)
                    }
                    placeholder='e.g., graceful error handling, user-friendly error messages'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Accessibility
                  </label>
                  <input
                    type='text'
                    value={formData.accessibility}
                    onChange={(e) =>
                      handleInputChange('accessibility', e.target.value)
                    }
                    placeholder='e.g., WCAG 2.1 AA compliance, screen reader support'
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500'
                  />
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className='bg-gray-100 p-6 rounded-lg'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Advanced Prompt Options
              </h3>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Prompt Type
                  </label>
                  <select
                    value={formData.promptType}
                    onChange={(e) =>
                      handleInputChange('promptType', e.target.value)
                    }
                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500'
                  >
                    <option value='standard'>Standard S.C.A.F.F.</option>
                    <option value='example-driven'>
                      Example-Driven (show existing patterns)
                    </option>
                    <option value='constraint-based'>
                      Constraint-Based (specific limitations)
                    </option>
                    <option value='test-driven'>
                      Test-Driven (behavior through tests)
                    </option>
                  </select>
                </div>

                {formData.promptType === 'example-driven' && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Code Examples
                    </label>
                    <textarea
                      value={formData.examples}
                      onChange={(e) =>
                        handleInputChange('examples', e.target.value)
                      }
                      placeholder='Paste existing code patterns or examples here...'
                      rows={4}
                      className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 font-mono text-sm'
                    />
                  </div>
                )}

                {formData.promptType === 'constraint-based' && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Specific Constraints
                    </label>
                    <textarea
                      value={formData.constraints_advanced}
                      onChange={(e) =>
                        handleInputChange(
                          'constraints_advanced',
                          e.target.value
                        )
                      }
                      placeholder="e.g., Must not use external libraries beyond what's imported, Must be IE11 compatible"
                      rows={3}
                      className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500'
                    />
                  </div>
                )}

                {formData.promptType === 'test-driven' && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Test Cases
                    </label>
                    <textarea
                      value={formData.testCases}
                      onChange={(e) =>
                        handleInputChange('testCases', e.target.value)
                      }
                      placeholder='Write test cases that define the expected behavior...'
                      rows={4}
                      className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 font-mono text-sm'
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <div className='flex gap-4'>
              <button
                onClick={generatePrompt}
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center'
              >
                <RefreshCw className='h-5 w-5 mr-2' />
                Generate Prompt
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
                Generated Prompt
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
                  <Code className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <p>
                    Fill in the form and click "Generate Prompt" to see your
                    structured vibe coding prompt here
                  </p>
                </div>
              )}
            </div>

            {generatedPrompt && (
              <div className='mt-4 p-3 bg-green-900 bg-opacity-20 rounded-md'>
                <p className='text-green-300 text-sm'>
                  ✅ Prompt generated! Copy and paste this into your AI coding
                  assistant for best results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VibeCodePromptGenerator
