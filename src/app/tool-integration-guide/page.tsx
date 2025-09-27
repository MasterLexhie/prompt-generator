'use client'
import React, { useState, useCallback, useMemo } from 'react'
import {
  Settings,
  Monitor,
  Code,
  Terminal,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Copy,
  ChevronDown,
  ChevronRight,
  Smartphone,
  Laptop,
  Cloud,
  Zap,
  GitBranch,
  BookOpen,
  Target,
  Layers
} from 'lucide-react'
import {
  IntegrationTool,
  SetupStep,
  WorkflowTip,
  CategoryFilter,
  DifficultyFilter
} from '@/types'
import Link from 'next/link'

// Static data
const INTEGRATION_TOOLS: IntegrationTool[] = [
  {
    id: 'claude-desktop-vscode',
    name: 'Claude Desktop + VS Code',
    description:
      'Side-by-side setup for maximum productivity with AI assistance and full IDE capabilities',
    category: 'ai-tools',
    difficulty: 'beginner',
    estimatedSetupTime: '5-10 minutes',
    icon: Monitor,
    features: [
      'Full conversation context retention',
      'File upload and analysis',
      'Side-by-side workflow',
      'Copy-paste integration',
      'Multiple conversation threads'
    ],
    pros: [
      'No API costs for basic usage',
      'Full Claude conversation capabilities',
      'Easy to set up and use',
      'Great for iterative development',
      'Excellent for learning and exploration'
    ],
    cons: [
      'Manual copy-paste required',
      'Context switching between apps',
      'No direct file integration',
      'Limited automation possibilities'
    ],
    bestFor: [
      'Individual developers',
      'Learning and experimentation',
      'Complex problem solving',
      'Code reviews and analysis',
      'Prototyping and exploration'
    ],
    requirements: [
      'Claude Desktop app installed',
      'VS Code or preferred IDE',
      'Dual monitor setup (recommended)',
      'Claude account (free or paid)'
    ],
    setupSteps: [
      {
        id: 'step-1',
        title: 'Download and Install Claude Desktop',
        description:
          'Get the official Claude Desktop application from Anthropic',
        additionalInfo:
          'Available for Windows, macOS, and Linux. Free account includes generous usage limits.'
      },
      {
        id: 'step-2',
        title: 'Set Up Your Workspace',
        description: 'Arrange windows for optimal workflow',
        additionalInfo:
          'Recommended: Claude Desktop on left monitor, VS Code on right monitor. Or split single screen 50/50.'
      },
      {
        id: 'step-3',
        title: 'Configure Your System Prompt',
        description:
          'Use the System Prompt Generator to create consistent AI behavior',
        additionalInfo:
          'Paste your generated system prompt at the start of each new Claude conversation for consistent results.'
      },
      {
        id: 'step-4',
        title: 'Create Your Workflow',
        description: 'Establish a consistent development process',
        code: `// Example workflow:
// 1. Start new conversation with system prompt
// 2. Use S.C.A.F.F. prompts for features
// 3. Copy generated code to VS Code
// 4. Test and iterate
// 5. Use Claude for debugging and optimization`,
        additionalInfo:
          'Keep important conversations pinned for easy reference throughout your project.'
      }
    ],
    codeExamples: [
      {
        id: 'example-1',
        title: 'System Prompt Setup',
        description: 'Example system prompt for consistent behavior',
        language: 'markdown',
        code: `# CORE IDENTITY
You are a senior full-stack developer specializing in React, Node.js, and TypeScript.
You write production-ready code following best practices.

# CODING PHILOSOPHY  
You prefer functional programming patterns and modern ES6+ syntax.
Always include comprehensive error handling and detailed comments.

# RESPONSE FORMAT
- Generate complete, working code
- Include setup/installation instructions
- Explain key decisions and tradeoffs
- Suggest improvements when beneficial`
      }
    ],
    officialDocs: 'https://docs.claude.com',
    communityResources: [
      'Claude Community Discord',
      'Reddit r/Claude',
      'Stack Overflow Claude tag'
    ]
  },
  {
    id: 'cursor-ide',
    name: 'Cursor IDE',
    description:
      'AI-native code editor with built-in Claude integration and context awareness',
    category: 'ides',
    difficulty: 'beginner',
    estimatedSetupTime: '10-15 minutes',
    icon: Code,
    features: [
      'Built-in Claude access',
      'File context awareness',
      'Inline code suggestions',
      'Chat interface within IDE',
      'VS Code compatibility'
    ],
    pros: [
      'Native AI integration',
      'No manual copy-paste needed',
      'Automatic file context',
      'Familiar VS Code interface',
      'Excellent for rapid development'
    ],
    cons: [
      'Subscription-based pricing',
      'Requires internet connection',
      'Learning curve for AI features',
      'May become dependent on AI assistance'
    ],
    bestFor: [
      'Professional development teams',
      'Rapid prototyping',
      'AI-assisted coding workflows',
      'Teams wanting seamless integration',
      'Developers comfortable with subscriptions'
    ],
    requirements: [
      'Cursor IDE subscription',
      'Anthropic API key',
      'Stable internet connection',
      'Modern computer (8GB+ RAM recommended)'
    ],
    setupSteps: [
      {
        id: 'step-1',
        title: 'Download and Install Cursor',
        description: 'Get Cursor IDE from cursor.sh',
        additionalInfo:
          'Free trial available. Cursor is built on VS Code, so your extensions and settings will work.'
      },
      {
        id: 'step-2',
        title: 'Get Anthropic API Key',
        description: 'Sign up for Anthropic API access',
        code: `// Get your API key from:
// https://console.anthropic.com/
// 
// Store securely - never commit to version control`,
        warning:
          'API usage has costs. Monitor your usage to avoid unexpected charges.'
      },
      {
        id: 'step-3',
        title: 'Configure Claude Integration',
        description: 'Set up Claude in Cursor settings',
        code: `{
  "claude.apiKey": "your-api-key-here",
  "claude.model": "claude-3-sonnet-20240229",
  "claude.maxTokens": 4000
}`,
        additionalInfo:
          'Go to Settings > Extensions > Claude to configure your preferences.'
      },
      {
        id: 'step-4',
        title: 'Set Up Project Context',
        description: 'Configure Cursor to understand your project structure',
        additionalInfo:
          'Use the .cursorignore file to exclude large files and node_modules from AI context.'
      }
    ],
    codeExamples: [
      {
        id: 'example-1',
        title: 'Cursor Rules Configuration',
        description: 'Set up coding standards in .cursorrules file',
        language: 'markdown',
        code: `# Cursor Rules for This Project

## Tech Stack
- React 18 with TypeScript
- Tailwind CSS for styling
- Next.js 14 with App Router

## Coding Standards
- Use functional components with hooks
- Prefer TypeScript strict mode
- Include comprehensive error handling
- Write self-documenting code with clear names

## File Structure
- Components in /components
- Pages in /app directory (Next.js 13+)
- Utils in /lib directory
- Types in /types directory`
      }
    ],
    officialDocs: 'https://cursor.sh/docs',
    communityResources: [
      'Cursor Discord Community',
      'YouTube tutorials',
      'GitHub discussions'
    ]
  },
  {
    id: 'claude-api',
    name: 'Claude API Integration',
    description:
      'Direct API integration for custom tools, automation, and team workflows',
    category: 'api',
    difficulty: 'advanced',
    estimatedSetupTime: '30-60 minutes',
    icon: Cloud,
    features: [
      'Full programmatic control',
      'Custom tool integration',
      'Team workflow automation',
      'Scalable usage',
      'Advanced customization'
    ],
    pros: [
      'Maximum flexibility and control',
      'Can build custom interfaces',
      'Excellent for team automation',
      'Programmatic conversation management',
      'Integration with existing systems'
    ],
    cons: [
      'Requires programming knowledge',
      'API costs based on usage',
      'More complex setup',
      'Need to handle errors and rate limits',
      'Requires infrastructure management'
    ],
    bestFor: [
      'Development teams',
      'Custom tool builders',
      'Automated workflows',
      'Integration with existing systems',
      'High-volume usage scenarios'
    ],
    requirements: [
      'Anthropic API key and credits',
      'Programming knowledge (Python/JavaScript)',
      'Understanding of REST APIs',
      'Server or hosting environment'
    ],
    setupSteps: [
      {
        id: 'step-1',
        title: 'Get API Access',
        description: 'Sign up for Anthropic API and get credentials',
        additionalInfo:
          'Visit console.anthropic.com to get your API key. Add credits to your account for usage.'
      },
      {
        id: 'step-2',
        title: 'Install SDK',
        description: 'Install the official Anthropic SDK',
        code: `# Python
pip install anthropic

# Node.js  
npm install anthropic-sdk

# Or using fetch API directly
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your-api-key'
  },
  body: JSON.stringify({...})
});`,
        additionalInfo:
          'You can use the official SDKs or make direct HTTP requests to the Anthropic API.'
      },
      {
        id: 'step-3',
        title: 'Basic Implementation',
        description: 'Set up your first API call',
        code: `// Using fetch API directly
const callClaude = async (prompt) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user", 
          content: prompt
        }
      ]
    })
  });
  
  const data = await response.json();
  return data.content[0].text;
};`,
        warning:
          'Never hardcode API keys. Use environment variables or secure key management.'
      },
      {
        id: 'step-4',
        title: 'Error Handling & Rate Limits',
        description: 'Implement proper error handling and respect rate limits',
        code: `const callClaudeWithRetry = async (prompt, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      
      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit - wait and retry
          const waitTime = Math.pow(2, i) * 1000; // Exponential backoff
          console.log(\`Rate limit hit, waiting \${waitTime}ms...\`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        } else if (response.status === 401) {
          throw new Error('Invalid API key');
        } else {
          throw new Error(\`API error: \${response.status}\`);
        }
      }
      
      const data = await response.json();
      return data.content[0].text;
      
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(\`Attempt \${i + 1} failed, retrying...\`);
    }
  }
};`,
        additionalInfo:
          'Implement retry logic with exponential backoff for production usage.'
      }
    ],
    codeExamples: [
      {
        id: 'example-1',
        title: 'Vibe Coding Automation Script',
        description: 'Automate feature generation with conversation context',
        language: 'javascript',
        code: `class VibeCodingAssistant {
  constructor(apiKey, systemPrompt) {
    this.anthropic = new Anthropic({ apiKey });
    this.systemPrompt = systemPrompt;
    this.conversationHistory = [];
  }

  async generateFeature(scaffPrompt, projectContext = {}) {
    const messages = [
      { role: "user", content: this.systemPrompt },
      ...this.conversationHistory,
      { 
        role: "user", 
        content: this.buildContextualPrompt(scaffPrompt, projectContext)
      }
    ];

    const completion = await this.anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4000,
      messages
    });

    const response = completion.content[0].text;
    
    // Update conversation history
    this.conversationHistory.push(
      { role: "user", content: scaffPrompt },
      { role: "assistant", content: response }
    );

    return response;
  }

  buildContextualPrompt(scaffPrompt, context) {
    const contextInfo = Object.entries(context)
      .map(([key, value]) => \`\${key}: \${value}\`)
      .join('\\n');
    
    return \`\${contextInfo}

\${scaffPrompt}\`;
  }
}`
      }
    ],
    officialDocs: 'https://docs.anthropic.com/claude/reference',
    communityResources: [
      'API Documentation',
      'Community Examples on GitHub',
      'Stack Overflow discussions'
    ]
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot + Claude Strategy',
    description:
      'Hybrid approach using Copilot for autocomplete and Claude for architecture decisions',
    category: 'workflow',
    difficulty: 'intermediate',
    estimatedSetupTime: '15-20 minutes',
    icon: GitBranch,
    features: [
      'AI-powered autocomplete',
      'Context-aware suggestions',
      'Multi-language support',
      'IDE integration',
      'Learning from your codebase'
    ],
    pros: [
      'Excellent autocomplete experience',
      'Learns from your coding patterns',
      'Great for routine coding tasks',
      'Integrated with popular IDEs',
      'Good for maintaining coding flow'
    ],
    cons: [
      'Limited architectural reasoning',
      'Subscription required',
      'May suggest outdated patterns',
      'Less effective for complex problems',
      'Can create dependency on suggestions'
    ],
    bestFor: [
      'Daily coding tasks',
      'Autocompletion and snippets',
      'Routine development work',
      'Teams already using GitHub',
      'Developers wanting coding assistance'
    ],
    requirements: [
      'GitHub Copilot subscription',
      'VS Code, JetBrains, or supported IDE',
      'GitHub account',
      'Active internet connection'
    ],
    setupSteps: [
      {
        id: 'step-1',
        title: 'Subscribe to GitHub Copilot',
        description: 'Get Copilot subscription from GitHub',
        additionalInfo:
          'Available as individual or business subscription. Free for verified students and open-source maintainers.'
      },
      {
        id: 'step-2',
        title: 'Install IDE Extension',
        description: 'Install Copilot extension in your preferred IDE',
        code: `// VS Code: Install "GitHub Copilot" extension
// JetBrains: Install via Plugin Marketplace
// Vim/Neovim: Use copilot.vim plugin`,
        additionalInfo:
          'Extensions available for most popular editors and IDEs.'
      },
      {
        id: 'step-3',
        title: 'Configure Copilot Settings',
        description: 'Customize Copilot behavior for your workflow',
        code: `{
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false
  },
  "github.copilot.inlineSuggest.enable": true,
  "github.copilot.suggestions.count": 3
}`,
        additionalInfo:
          'Adjust settings based on your preferences and security requirements.'
      },
      {
        id: 'step-4',
        title: 'Establish Hybrid Workflow',
        description: 'Create workflow combining Copilot and Claude',
        additionalInfo:
          'Use Copilot for day-to-day coding, Claude Desktop for architecture decisions, complex problems, and code review.'
      }
    ],
    codeExamples: [
      {
        id: 'example-1',
        title: 'Hybrid Workflow Example',
        description: 'How to effectively combine Copilot and Claude',
        language: 'markdown',
        code: `# Hybrid Workflow: Copilot + Claude

## Daily Coding (Use Copilot)
- Function implementations
- Unit test writing
- Routine CRUD operations
- Styling and markup
- Basic error handling

## Architecture & Complex Problems (Use Claude)
- System design decisions
- Complex algorithm implementation
- Code architecture review
- Performance optimization strategies
- Security implementation planning

## Weekly Review (Use Claude)
- Code quality assessment
- Refactoring recommendations  
- Technical debt identification
- Best practice alignment`
      }
    ],
    officialDocs: 'https://docs.github.com/copilot',
    communityResources: [
      'GitHub Community Discussions',
      'Copilot Best Practices Guide',
      'VS Code Copilot Tips'
    ]
  }
]

const WORKFLOW_TIPS: WorkflowTip[] = [
  {
    id: 'tip-1',
    title: 'Start with System Prompts',
    description:
      "Always begin new projects by setting up a comprehensive system prompt that defines your AI assistant's behavior, coding standards, and project context.",
    icon: Settings,
    category: 'productivity'
  },
  {
    id: 'tip-2',
    title: 'Use Feature-by-Feature Development',
    description:
      'Break your application into discrete features and use S.C.A.F.F. prompts to build each one completely before moving to the next.',
    icon: Layers,
    category: 'productivity'
  },
  {
    id: 'tip-3',
    title: 'Maintain Conversation Context',
    description:
      'Keep important AI conversations active throughout your project. Reference previous implementations when building related features.',
    icon: BookOpen,
    category: 'quality'
  },
  {
    id: 'tip-4',
    title: 'Document Your Prompt Library',
    description:
      'Save successful prompts and system configurations for reuse across projects. Build your own library of proven patterns.',
    icon: Target,
    category: 'collaboration'
  },
  {
    id: 'tip-5',
    title: 'Test AI-Generated Code Thoroughly',
    description:
      'Always review and test generated code before committing. Use AI assistance for testing strategies and edge case identification.',
    icon: CheckCircle,
    category: 'quality'
  },
  {
    id: 'tip-6',
    title: 'Combine Multiple AI Tools',
    description:
      'Use different AI tools for different purposes: Claude for architecture, Copilot for autocomplete, specialized tools for specific domains.',
    icon: Zap,
    category: 'productivity'
  }
]

// Custom hooks
const useToolFiltering = (
  tools: IntegrationTool[],
  categoryFilter: CategoryFilter,
  difficultyFilter: DifficultyFilter
) => {
  return useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        categoryFilter === 'all' || tool.category === categoryFilter
      const matchesDifficulty =
        difficultyFilter === 'all' || tool.difficulty === difficultyFilter
      return matchesCategory && matchesDifficulty
    })
  }, [tools, categoryFilter, difficultyFilter])
}

// Components
const DifficultyBadge: React.FC<{
  difficulty: IntegrationTool['difficulty']
}> = ({ difficulty }) => {
  const getDifficultyColor = (level: string): string => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    } as const
    return colors[level as keyof typeof colors] || colors.intermediate
  }

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
        difficulty
      )}`}
    >
      {difficulty}
    </span>
  )
}

const SetupStepCard: React.FC<{
  step: SetupStep
  stepNumber: number
  isExpanded: boolean
  onToggle: () => void
}> = ({ step, stepNumber, isExpanded, onToggle }) => {
  const [codeCopied, setCodeCopied] = useState(false)

  const copyCode = useCallback(async () => {
    if (step.code) {
      try {
        await navigator.clipboard.writeText(step.code)
        setCodeCopied(true)
        setTimeout(() => setCodeCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy code:', err)
      }
    }
  }, [step.code])

  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden'>
      <button
        onClick={onToggle}
        className='w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between'
      >
        <div className='flex items-center space-x-3'>
          <div className='flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium'>
            {stepNumber}
          </div>
          <h4 className='font-semibold text-gray-900'>{step.title}</h4>
        </div>
        {isExpanded ? (
          <ChevronDown className='h-5 w-5 text-gray-400' />
        ) : (
          <ChevronRight className='h-5 w-5 text-gray-400' />
        )}
      </button>

      {isExpanded && (
        <div className='p-4 border-t border-gray-200 bg-white'>
          <p className='text-gray-700 mb-3'>{step.description}</p>

          {step.code && (
            <div className='relative mb-3'>
              <div className='bg-gray-900 rounded-lg p-3 overflow-x-auto'>
                <pre className='text-green-400 text-sm font-mono whitespace-pre-wrap'>
                  {step.code}
                </pre>
              </div>
              <button
                onClick={copyCode}
                className='absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded text-xs flex items-center space-x-1'
              >
                <Copy className='h-3 w-3' />
                <span>{codeCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          )}

          {step.additionalInfo && (
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3'>
              <div className='flex items-start space-x-2'>
                <Info className='h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0' />
                <p className='text-blue-800 text-sm'>{step.additionalInfo}</p>
              </div>
            </div>
          )}

          {step.warning && (
            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
              <div className='flex items-start space-x-2'>
                <AlertCircle className='h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0' />
                <p className='text-yellow-800 text-sm'>{step.warning}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const ToolCard: React.FC<{
  tool: IntegrationTool
  onLearnMore: (tool: IntegrationTool) => void
}> = ({ tool, onLearnMore }) => {
  const IconComponent = tool.icon

  const handleLearnMore = useCallback(() => {
    onLearnMore(tool)
  }, [tool, onLearnMore])

  return (
    <div className='bg-white rounded-lg shadow-sm border p-4 sm:p-6 hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-start space-x-4 mb-4'>
        <div className='flex-shrink-0 p-3 bg-indigo-100 rounded-lg'>
          <IconComponent className='h-6 w-6 text-indigo-600' />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between mb-2'>
            <h3 className='text-lg font-semibold text-gray-900 truncate'>
              {tool.name}
            </h3>
            <DifficultyBadge difficulty={tool.difficulty} />
          </div>
          <p className='text-gray-600 text-sm line-clamp-2'>
            {tool.description}
          </p>
        </div>
      </div>

      <div className='space-y-3 mb-4'>
        <div>
          <h4 className='text-sm font-medium text-gray-900 mb-1'>
            Key Features:
          </h4>
          <ul className='text-xs text-gray-600 space-y-1'>
            {tool.features.slice(0, 3).map((feature, index) => (
              <li key={index} className='flex items-center'>
                <CheckCircle className='h-3 w-3 text-green-500 mr-2 flex-shrink-0' />
                {feature}
              </li>
            ))}
            {tool.features.length > 3 && (
              <li className='text-xs text-gray-500'>
                +{tool.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className='text-sm font-medium text-gray-900 mb-1'>Best For:</h4>
          <div className='flex flex-wrap gap-1'>
            {tool.bestFor.slice(0, 2).map((use, index) => (
              <span
                key={index}
                className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'
              >
                {use}
              </span>
            ))}
            {tool.bestFor.length > 2 && (
              <span className='text-xs text-gray-500'>
                +{tool.bestFor.length - 2} more
              </span>
            )}
          </div>
        </div>

        <div className='flex items-center text-xs text-gray-500'>
          <Terminal className='h-3 w-3 mr-1' />
          <span>Setup time: {tool.estimatedSetupTime}</span>
        </div>
      </div>

      <button
        onClick={handleLearnMore}
        className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200'
      >
        View Setup Guide
      </button>
    </div>
  )
}

const WorkflowTipCard: React.FC<{ tip: WorkflowTip }> = ({ tip }) => {
  const IconComponent = tip.icon

  const getCategoryColor = (category: string): string => {
    const colors = {
      productivity: 'bg-green-50 border-green-200 text-green-900',
      quality: 'bg-blue-50 border-blue-200 text-blue-900',
      collaboration: 'bg-purple-50 border-purple-200 text-purple-900'
    } as const
    return colors[category as keyof typeof colors] || colors.productivity
  }

  return (
    <div
      className={`p-4 rounded-lg border-2 ${getCategoryColor(tip.category)}`}
    >
      <div className='flex items-start space-x-3'>
        <div className='flex-shrink-0'>
          <IconComponent className='h-5 w-5' />
        </div>
        <div>
          <h4 className='font-semibold mb-2'>{tip.title}</h4>
          <p className='text-sm opacity-90'>{tip.description}</p>
        </div>
      </div>
    </div>
  )
}

// Main Component
const ToolIntegrationGuide: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>('all')
  const [selectedTool, setSelectedTool] = useState<IntegrationTool | null>(null)
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>(
    {}
  )

  const filteredTools = useToolFiltering(
    INTEGRATION_TOOLS,
    categoryFilter,
    difficultyFilter
  )

  // Event handlers
  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategoryFilter(event.target.value as CategoryFilter)
    },
    []
  )

  const handleDifficultyChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setDifficultyFilter(event.target.value as DifficultyFilter)
    },
    []
  )

  const handleToolSelect = useCallback((tool: IntegrationTool) => {
    setSelectedTool(tool)
    setExpandedSteps({})
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedTool(null)
  }, [])

  const toggleStep = useCallback((stepId: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
  }, [])

  const openExternalLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3 sm:space-x-4'>
              <div className='p-2 sm:p-3 bg-indigo-600 rounded-lg'>
                <Settings className='h-5 w-5 sm:h-6 sm:w-6 text-white' />
              </div>
              <div>
                <h1 className='text-xl sm:text-2xl font-bold text-gray-900'>
                  Tool Integration Guide
                </h1>
                <p className='text-gray-600 text-sm sm:text-base'>
                  Setup and optimize your vibe coding development environment
                </p>
              </div>
            </div>

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
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8'>
        {/* Filters */}
        <section className='bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500'
              >
                <option value='all'>All Categories</option>
                <option value='ai-tools'>AI Tools</option>
                <option value='ides'>IDEs & Editors</option>
                <option value='workflow'>Workflow Tools</option>
                <option value='api'>API Integration</option>
              </select>
            </div>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Difficulty
              </label>
              <select
                value={difficultyFilter}
                onChange={handleDifficultyChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500'
              >
                <option value='all'>All Levels</option>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
              </select>
            </div>
          </div>
        </section>

        {/* Integration Tools Grid */}
        <section className='mb-12'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6'>
            Integration Options
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onLearnMore={handleToolSelect}
              />
            ))}
          </div>
        </section>

        {/* Workflow Optimization Tips */}
        <section className='mb-12'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6'>
            Workflow Optimization Tips
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {WORKFLOW_TIPS.map((tip) => (
              <WorkflowTipCard key={tip.id} tip={tip} />
            ))}
          </div>
        </section>

        {/* Quick Start Recommendations */}
        <section className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 sm:p-8'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-4'>
            Quick Start Recommendations
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-white rounded-lg p-6 border border-indigo-200'>
              <div className='flex items-center space-x-3 mb-4'>
                <Smartphone className='h-6 w-6 text-green-600' />
                <h3 className='font-semibold text-gray-900'>Beginner</h3>
              </div>
              <p className='text-gray-600 text-sm mb-4'>
                Start with Claude Desktop + VS Code for a simple, no-cost setup
                that provides immediate value.
              </p>
              <button
                onClick={() => handleToolSelect(INTEGRATION_TOOLS[0])}
                className='text-indigo-600 hover:text-indigo-700 text-sm font-medium'
              >
                View Setup Guide →
              </button>
            </div>

            <div className='bg-white rounded-lg p-6 border border-indigo-200'>
              <div className='flex items-center space-x-3 mb-4'>
                <Laptop className='h-6 w-6 text-blue-600' />
                <h3 className='font-semibold text-gray-900'>Professional</h3>
              </div>
              <p className='text-gray-600 text-sm mb-4'>
                Upgrade to Cursor IDE for native AI integration and seamless
                workflow automation.
              </p>
              <button
                onClick={() => handleToolSelect(INTEGRATION_TOOLS[1])}
                className='text-indigo-600 hover:text-indigo-700 text-sm font-medium'
              >
                View Setup Guide →
              </button>
            </div>

            <div className='bg-white rounded-lg p-6 border border-indigo-200'>
              <div className='flex items-center space-x-3 mb-4'>
                <Cloud className='h-6 w-6 text-purple-600' />
                <h3 className='font-semibold text-gray-900'>Enterprise</h3>
              </div>
              <p className='text-gray-600 text-sm mb-4'>
                Build custom integrations with the Claude API for team workflows
                and automation.
              </p>
              <button
                onClick={() => handleToolSelect(INTEGRATION_TOOLS[2])}
                className='text-indigo-600 hover:text-indigo-700 text-sm font-medium'
              >
                View Setup Guide →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto'>
            <div className='p-4 sm:p-6'>
              {/* Modal Header */}
              <div className='flex items-start justify-between mb-6'>
                <div className='flex items-center space-x-4'>
                  <div className='p-3 bg-indigo-100 rounded-lg'>
                    <selectedTool.icon className='h-6 w-6 text-indigo-600' />
                  </div>
                  <div>
                    <h3 className='text-xl sm:text-2xl font-bold text-gray-900'>
                      {selectedTool.name}
                    </h3>
                    <p className='text-gray-600'>{selectedTool.description}</p>
                    <div className='flex items-center space-x-4 mt-2'>
                      <DifficultyBadge difficulty={selectedTool.difficulty} />
                      <span className='text-sm text-gray-500'>
                        Setup time: {selectedTool.estimatedSetupTime}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className='text-gray-400 hover:text-gray-600 p-1'
                  aria-label='Close modal'
                >
                  ✕
                </button>
              </div>

              {/* Tool Overview */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-3'>
                    Key Features
                  </h4>
                  <ul className='space-y-2'>
                    {selectedTool.features.map((feature, index) => (
                      <li key={index} className='flex items-start space-x-2'>
                        <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                        <span className='text-sm text-gray-700'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold text-gray-900 mb-3'>
                    Requirements
                  </h4>
                  <ul className='space-y-2'>
                    {selectedTool.requirements.map((req, index) => (
                      <li key={index} className='flex items-start space-x-2'>
                        <Info className='h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0' />
                        <span className='text-sm text-gray-700'>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-3'>
                    Advantages
                  </h4>
                  <ul className='space-y-2'>
                    {selectedTool.pros.map((pro, index) => (
                      <li key={index} className='flex items-start space-x-2'>
                        <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                        <span className='text-sm text-gray-700'>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold text-gray-900 mb-3'>
                    Considerations
                  </h4>
                  <ul className='space-y-2'>
                    {selectedTool.cons.map((con, index) => (
                      <li key={index} className='flex items-start space-x-2'>
                        <AlertCircle className='h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0' />
                        <span className='text-sm text-gray-700'>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Setup Steps */}
              <div className='mb-8'>
                <h4 className='font-semibold text-gray-900 mb-4'>
                  Setup Steps
                </h4>
                <div className='space-y-3'>
                  {selectedTool.setupSteps.map((step, index) => (
                    <SetupStepCard
                      key={step.id}
                      step={step}
                      stepNumber={index + 1}
                      isExpanded={expandedSteps[step.id] || false}
                      onToggle={() => toggleStep(step.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Code Examples */}
              {selectedTool.codeExamples &&
                selectedTool.codeExamples.length > 0 && (
                  <div className='mb-8'>
                    <h4 className='font-semibold text-gray-900 mb-4'>
                      Code Examples
                    </h4>
                    <div className='space-y-4'>
                      {selectedTool.codeExamples.map((example) => (
                        <div
                          key={example.id}
                          className='border border-gray-200 rounded-lg overflow-hidden'
                        >
                          <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                            <h5 className='font-medium text-gray-900'>
                              {example.title}
                            </h5>
                            <p className='text-sm text-gray-600'>
                              {example.description}
                            </p>
                          </div>
                          <div className='relative'>
                            <pre className='bg-gray-900 p-4 overflow-x-auto'>
                              <code className='text-green-400 text-sm font-mono whitespace-pre-wrap'>
                                {example.code}
                              </code>
                            </pre>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(example.code)
                              }
                              className='absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded text-xs flex items-center space-x-1'
                            >
                              <Copy className='h-3 w-3' />
                              <span>Copy</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Resources */}
              <div className='mb-6'>
                <h4 className='font-semibold text-gray-900 mb-4'>
                  Additional Resources
                </h4>
                <div className='flex flex-col sm:flex-row gap-4'>
                  {selectedTool.officialDocs && (
                    <button
                      onClick={() =>
                        openExternalLink(selectedTool.officialDocs!)
                      }
                      className='flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm'
                    >
                      <ExternalLink className='h-4 w-4' />
                      <span>Official Documentation</span>
                    </button>
                  )}

                  {selectedTool.communityResources &&
                    selectedTool.communityResources.length > 0 && (
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>
                          Community Resources:
                        </p>
                        <ul className='text-sm text-gray-600 space-y-1'>
                          {selectedTool.communityResources.map(
                            (resource, index) => (
                              <li
                                key={index}
                                className='flex items-center space-x-2'
                              >
                                <ExternalLink className='h-3 w-3' />
                                <span>{resource}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className='flex justify-end pt-4 border-t border-gray-200'>
                <button
                  onClick={handleCloseModal}
                  className='px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolIntegrationGuide
