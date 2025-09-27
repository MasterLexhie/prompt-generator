'use client'
import React, { useState, useCallback, useMemo } from 'react'
import {
  BookOpen,
  Target,
  Shield,
  Zap,
  Users,
  CheckCircle,
  AlertTriangle,
  Info,
  Star,
  TrendingUp,
  Code,
  Brain,
  GitBranch,
  Clock,
  Award,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Lightbulb,
  Settings,
  FileText,
  Database
} from 'lucide-react'
import {
  BestPractice,
  Technique,
  AntiPattern,
  CategoryFilter,
  DifficultyFilter,
  ActionableStep
} from '@/types'
import Link from 'next/link'

// Static data
const BEST_PRACTICES: BestPractice[] = [
  {
    id: 'prompt-engineering-fundamentals',
    title: 'Master Prompt Engineering Techniques',
    description:
      'Advanced techniques for crafting precise, effective prompts that generate high-quality code consistently',
    category: 'prompt-engineering',
    difficulty: 'essential',
    impact: 'high',
    icon: Brain,
    keyPrinciples: [
      'Use the S.C.A.F.F. framework for structured prompts',
      'Provide specific context and constraints',
      'Include examples of desired patterns',
      'Iterate and refine prompts based on results',
      'Maintain consistent terminology and style'
    ],
    commonMistakes: [
      'Vague or ambiguous requirements',
      'Missing project context',
      'No quality standards specified',
      'Skipping the iteration process',
      'Not learning from previous prompts'
    ],
    actionableSteps: [
      {
        id: 'step-1',
        title: 'Structure Every Prompt with S.C.A.F.F.',
        description:
          'Always use Situation, Challenge, Audience, Format, Foundations for consistent results',
        code: `// Template Structure:
SITUATION: [Project context, tech stack, existing code]
CHALLENGE: [Specific task, requirements, constraints]  
AUDIENCE: [Team skill level, maintenance timeline]
FORMAT: [Code style, patterns, documentation needs]
FOUNDATIONS: [Security, performance, testing requirements]`,
        tip: 'Save successful S.C.A.F.F. templates for reuse across similar projects'
      },
      {
        id: 'step-2',
        title: 'Include Concrete Examples',
        description:
          'Provide examples of existing code patterns or desired outcomes',
        code: `SITUATION: Building React components for our design system...

EXAMPLES: Here's how we've implemented similar components:
// Example of our existing pattern
const Button = ({ variant, children, ...props }) => {
  const className = \`btn btn-\${variant}\`;
  return <button className={className} {...props}>{children}</button>;
};

CHALLENGE: Create a Card component following this same pattern...`,
        tip: 'Examples are more powerful than lengthy descriptions'
      },
      {
        id: 'step-3',
        title: 'Specify Quality Criteria',
        description: 'Define what "good" looks like for your specific context',
        code: `FOUNDATIONS: 
- All functions must have TypeScript types
- Include error handling for all async operations
- Code coverage must be >80%
- Follow our ESLint configuration
- Include JSDoc comments for public APIs
- Performance: <100ms response time for API calls`,
        warning:
          'Generic quality statements are less effective than specific criteria'
      }
    ],
    examples: [
      {
        id: 'example-1',
        title: 'API Endpoint Creation',
        scenario: 'Need to create a REST API endpoint for user management',
        badExample: `// Bad prompt:
"Create an API endpoint for users"`,
        goodExample: `// Good prompt:
SITUATION: Building Express.js API with TypeScript, using Prisma ORM and PostgreSQL. Current auth system uses JWT tokens.

CHALLENGE: Create a complete user management endpoint (/api/users) with:
- GET /users (list with pagination)
- POST /users (create new user)  
- PUT /users/:id (update user)
- DELETE /users/:id (soft delete)

AUDIENCE: Mid-level backend developers, 3+ year maintenance

FORMAT: Express router, async/await, TypeScript interfaces, Prisma queries

FOUNDATIONS: JWT auth required, input validation with Joi, comprehensive error handling, audit logging`,
        explanation:
          'The good example provides complete context, specific requirements, and quality standards that lead to production-ready code.'
      }
    ],
    relatedPractices: ['code-quality-assurance', 'security-best-practices']
  },
  {
    id: 'iterative-refinement',
    title: 'Use Iterative Prompt Refinement',
    description:
      'Systematic approach to improving prompts through testing, analysis, and refinement cycles',
    category: 'prompt-engineering',
    difficulty: 'intermediate',
    impact: 'high',
    icon: TrendingUp,
    keyPrinciples: [
      'Start with basic requirements, then add specificity',
      'Test prompts on representative examples',
      'Analyze failure patterns and edge cases',
      'Refine based on actual output quality',
      'Document what works for future reuse'
    ],
    commonMistakes: [
      'Trying to perfect prompts on first attempt',
      'Not testing with edge cases',
      'Ignoring failure patterns',
      'Not documenting successful refinements',
      'Giving up after first unsuccessful attempt'
    ],
    actionableSteps: [
      {
        id: 'step-1',
        title: 'Create Baseline Prompt',
        description:
          'Start with basic S.C.A.F.F. structure covering core requirements',
        tip: 'Focus on the most critical requirements first, add complexity gradually'
      },
      {
        id: 'step-2',
        title: 'Test and Analyze Results',
        description:
          'Generate code and systematically evaluate quality, completeness, and correctness',
        code: `// Evaluation Checklist:
✓ Does it compile/run without errors?
✓ Meets all specified requirements? 
✓ Follows coding standards?
✓ Includes proper error handling?
✓ Has security considerations?
✓ Is maintainable and readable?
✓ Includes necessary tests?`,
        warning:
          "Don't skip the analysis step - it's where the learning happens"
      },
      {
        id: 'step-3',
        title: 'Refine Based on Gaps',
        description:
          'Add specific constraints, examples, or clarifications to address identified issues',
        code: `// Refinement Example:
Original: "Include error handling"
Refined: "Include comprehensive error handling with try-catch blocks, 
user-friendly error messages, and proper HTTP status codes. 
Log errors for debugging but don't expose sensitive information."`,
        tip: 'Each refinement should address specific gaps, not add generic improvements'
      }
    ],
    examples: [
      {
        id: 'example-1',
        title: 'Database Schema Refinement',
        scenario:
          'Creating a user schema that initially missed important constraints',
        badExample: `// Initial attempt result:
const userSchema = {
  name: String,
  email: String,
  password: String
}`,
        goodExample: `// After refinement:
const userSchema = {
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}`,
        explanation:
          'Refinement added validation rules, constraints, and audit fields that were missing from the initial result.'
      }
    ],
    relatedPractices: [
      'prompt-engineering-fundamentals',
      'code-quality-assurance'
    ]
  },
  {
    id: 'code-quality-assurance',
    title: 'Implement Code Quality Assurance',
    description:
      'Systematic approaches to ensure AI-generated code meets production standards and maintainability requirements',
    category: 'code-quality',
    difficulty: 'essential',
    impact: 'high',
    icon: Shield,
    keyPrinciples: [
      'Always review generated code before implementation',
      'Test functionality thoroughly in development environment',
      'Verify security implications and edge cases',
      'Ensure code follows project conventions',
      'Document any customizations or modifications'
    ],
    commonMistakes: [
      'Blindly trusting AI-generated code',
      'Skipping security review process',
      'Not testing edge cases',
      'Ignoring code style inconsistencies',
      'Failing to understand generated algorithms'
    ],
    actionableSteps: [
      {
        id: 'step-1',
        title: 'Establish Review Checklist',
        description:
          'Create standardized checklist for reviewing all AI-generated code',
        code: `// Code Review Checklist:
□ Functionality: Does it work as specified?
□ Security: No vulnerabilities or data exposure?
□ Performance: Efficient algorithms and queries?
□ Maintainability: Clear, readable, well-structured?
□ Testing: Includes appropriate test coverage?
□ Documentation: Adequate comments and docs?
□ Standards: Follows project coding conventions?
□ Dependencies: Uses approved libraries only?`,
        tip: 'Use this checklist for every piece of AI-generated code, no exceptions'
      },
      {
        id: 'step-2',
        title: 'Implement Staged Testing',
        description:
          'Test generated code in isolated environment before integration',
        code: `// Testing Approach:
1. Unit Tests: Test individual functions/methods
2. Integration Tests: Test with existing systems  
3. Edge Case Tests: Boundary conditions, error cases
4. Performance Tests: Load and stress testing
5. Security Tests: Input validation, auth checks`,
        warning:
          'Never deploy AI-generated code directly to production without thorough testing'
      },
      {
        id: 'step-3',
        title: 'Document AI Assistance',
        description: 'Track which code was AI-generated for future maintenance',
        code: `// Good documentation practice:
/**
 * User authentication middleware
 * Generated with Claude AI assistance on 2024-01-15
 * Customized for our JWT implementation
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object  
 * @param {NextFunction} next - Express next function
 */`,
        tip: "This helps future maintainers understand the code's origin and context"
      }
    ],
    examples: [
      {
        id: 'example-1',
        title: 'Security Vulnerability Detection',
        scenario: 'AI generated SQL query that was vulnerable to injection',
        badExample: `// Generated code (vulnerable):
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
db.query(query);`,
        goodExample: `// After security review (safe):
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [email]);`,
        explanation:
          'Code review caught SQL injection vulnerability and replaced with parameterized query.'
      }
    ],
    relatedPractices: ['security-best-practices', 'team-collaboration']
  },
  {
    id: 'security-best-practices',
    title: 'Apply Security Best Practices',
    description:
      'Essential security considerations when using AI-generated code in production systems',
    category: 'security',
    difficulty: 'essential',
    impact: 'high',
    icon: Shield,
    keyPrinciples: [
      'Never trust AI-generated code for security-critical functions',
      'Always validate and sanitize AI-generated input handling',
      'Review authentication and authorization logic carefully',
      'Ensure secrets and credentials are properly managed',
      'Test for common vulnerabilities (OWASP Top 10)'
    ],
    commonMistakes: [
      'Using AI-generated authentication without review',
      'Trusting AI for cryptographic implementations',
      'Not validating input sanitization code',
      'Assuming AI understands your security model',
      'Skipping penetration testing of AI-generated features'
    ],
    actionableSteps: [
      {
        id: 'step-1',
        title: 'Security-First Prompt Engineering',
        description: 'Always include security requirements in your prompts',
        code: `FOUNDATIONS: 
Security Requirements:
- Implement proper input validation and sanitization
- Use parameterized queries to prevent SQL injection
- Include authentication and authorization checks
- Follow OWASP security guidelines
- Implement rate limiting and abuse prevention
- Use secure password hashing (bcrypt, Argon2)
- Validate all user inputs on both client and server`,
        warning:
          'Generic security statements are insufficient - be specific about your requirements'
      },
      {
        id: 'step-2',
        title: 'Security Review Protocol',
        description:
          'Establish mandatory security review for AI-generated code',
        code: `// Security Review Checklist:
□ Input Validation: All inputs validated and sanitized?
□ SQL Injection: Parameterized queries used?
□ XSS Prevention: Output properly encoded?
□ Authentication: Proper auth checks implemented?
□ Authorization: Role-based access control working?
□ Secrets: No hardcoded credentials or keys?
□ Cryptography: Using established libraries only?
□ Error Handling: No sensitive info in error messages?`,
        tip: 'Have a security-focused team member review all AI-generated security code'
      },
      {
        id: 'step-3',
        title: 'Automated Security Testing',
        description:
          'Integrate security testing into your development pipeline',
        code: `// Security Testing Integration:
// Static analysis
npm run lint:security  
npm audit

// Dependency scanning  
npm install --package-lock-only
npm audit --audit-level moderate

// Runtime security testing
npm run test:security`,
        warning:
          "Automated tools catch common issues but don't replace manual security review"
      }
    ],
    examples: [
      {
        id: 'example-1',
        title: 'Authentication Implementation',
        scenario: 'AI generated login function with security issues',
        badExample: `// AI-generated (problematic):
function login(username, password) {
  const user = db.query(\`SELECT * FROM users WHERE username='\${username}'\`);
  if (user && user.password === password) {
    return { success: true, token: user.id };
  }
  return { success: false };
}`,
        goodExample: `// After security review:
async function login(username, password) {
  const user = await db.query('SELECT * FROM users WHERE username = ? AND active = 1', [username]);
  if (!user) return { success: false, message: 'Invalid credentials' };
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return { success: false, message: 'Invalid credentials' };
  
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return { success: true, token };
}`,
        explanation:
          'Fixed SQL injection, added password hashing, proper JWT implementation, and consistent error messages.'
      }
    ],
    relatedPractices: [
      'code-quality-assurance',
      'prompt-engineering-fundamentals'
    ]
  },
  {
    id: 'team-collaboration',
    title: 'Foster Team Collaboration',
    description:
      'Strategies for effective team collaboration when using AI-assisted development',
    category: 'team-collaboration',
    difficulty: 'intermediate',
    impact: 'medium',
    icon: Users,
    keyPrinciples: [
      'Share successful prompts and patterns across team',
      'Establish team conventions for AI-generated code',
      'Create shared prompt libraries and templates',
      'Document AI assistance in code reviews',
      'Train team members on effective prompting'
    ],
    commonMistakes: [
      'Working in isolation without sharing knowledge',
      'Inconsistent AI usage across team members',
      'Not documenting successful prompt patterns',
      'Lack of code review for AI-generated code',
      'Not establishing team AI usage guidelines'
    ],
    actionableSteps: [
      {
        id: 'step-1',
        title: 'Create Shared Prompt Library',
        description: 'Build team repository of tested, successful prompts',
        code: `// Team Prompt Library Structure:
/prompts
  /api-endpoints/
    - rest-crud.md
    - graphql-resolver.md
  /components/
    - react-component.md
    - vue-component.md
  /database/
    - migration.md
    - schema-design.md
  /testing/
    - unit-tests.md
    - integration-tests.md`,
        tip: 'Version control your prompt library and encourage team contributions'
      },
      {
        id: 'step-2',
        title: 'Establish AI Code Review Process',
        description: 'Create team standards for reviewing AI-generated code',
        code: `// AI Code Review Guidelines:
1. Label PR with "AI-assisted" tag
2. Include original prompt in PR description
3. Highlight any manual modifications made
4. Extra scrutiny for security-related code
5. Verify code matches team conventions
6. Test thoroughly before approval`,
        warning:
          'AI-generated code should get the same (or more) review scrutiny as human code'
      },
      {
        id: 'step-3',
        title: 'Knowledge Sharing Sessions',
        description:
          'Regular team sessions to share AI techniques and learnings',
        tip: 'Hold monthly "AI technique sharing" meetings to exchange successful patterns'
      }
    ],
    examples: [
      {
        id: 'example-1',
        title: 'Prompt Standardization',
        scenario:
          'Team was getting inconsistent results due to different prompting styles',
        badExample: `// Individual approaches (inconsistent):
Developer A: "Make a login component"
Developer B: "Create React component for user authentication with form validation"  
Developer C: [Uses full S.C.A.F.F. structure]`,
        goodExample: `// Team standard approach:
All developers use shared S.C.A.F.F. template:
- Standard system prompt for project
- Consistent SITUATION and FORMAT sections
- Shared code examples and patterns
- Common quality standards in FOUNDATIONS`,
        explanation:
          'Standardized approach leads to consistent code quality and faster development across the team.'
      }
    ],
    relatedPractices: [
      'code-quality-assurance',
      'prompt-engineering-fundamentals'
    ]
  }
]

const ADVANCED_TECHNIQUES: Technique[] = [
  {
    id: 'chain-of-thought',
    name: 'Chain-of-Thought Prompting',
    description: 'Guide AI through step-by-step reasoning for complex problems',
    category: 'prompt-crafting',
    useWhen:
      'Complex algorithms, multi-step processes, or architectural decisions',
    example: `CHALLENGE: Create a user registration system with email verification.

Think through this step by step:
1. First, what are the main components needed?
2. What's the flow from registration to verification?
3. What security considerations apply at each step?
4. How should errors be handled?

Now implement the complete system based on your analysis.`,
    benefits: [
      'Better architectural thinking',
      'More comprehensive solutions',
      'Fewer edge case gaps'
    ]
  },
  {
    id: 'constraint-based',
    name: 'Constraint-Based Prompting',
    description: 'Define specific limitations and requirements upfront',
    category: 'prompt-crafting',
    useWhen:
      'Working with legacy systems, specific performance requirements, or limited resources',
    example: `CONSTRAINTS:
- Must work with Internet Explorer 11
- Cannot use external dependencies
- Maximum bundle size: 50KB
- Must complete operations in <200ms
- Database queries limited to 3 per request

CHALLENGE: Create user dashboard with these constraints...`,
    benefits: [
      'Realistic solutions',
      'Performance-conscious code',
      'Compatibility assurance'
    ]
  },
  {
    id: 'progressive-disclosure',
    name: 'Progressive Disclosure',
    description:
      'Start simple, then gradually add complexity through conversation',
    category: 'iteration',
    useWhen:
      'Complex features, learning new technologies, or exploratory development',
    example: `Step 1: "Create basic user authentication"
Step 2: "Add password reset functionality"  
Step 3: "Add OAuth integration"
Step 4: "Add two-factor authentication"`,
    benefits: [
      'Manageable complexity',
      'Better learning',
      'Incremental testing'
    ]
  },
  {
    id: 'critique-and-improve',
    name: 'Critique and Improve Pattern',
    description: 'Ask AI to review and improve its own generated code',
    category: 'quality-assurance',
    useWhen:
      'Quality improvement, code optimization, or learning best practices',
    example: `[After getting initial code]

"Review the code you just generated and identify:
1. Potential security vulnerabilities
2. Performance optimization opportunities  
3. Code maintainability improvements
4. Missing error handling

Then provide an improved version addressing these issues."`,
    benefits: ['Higher quality code', 'Learning opportunity', 'Self-correction']
  }
]

const ANTI_PATTERNS: AntiPattern[] = [
  {
    id: 'vague-requirements',
    name: 'Vague Requirements',
    description:
      'Using unclear, ambiguous prompts that lead to generic solutions',
    whyProblematic:
      "Results in generic, unusable code that doesn't fit your specific needs",
    howToFix:
      'Use S.C.A.F.F. framework with specific context, requirements, and examples',
    example:
      '❌ "Create a login system" → ✅ "Create JWT-based login system for React app with Express backend, including rate limiting and password validation"'
  },
  {
    id: 'no-quality-standards',
    name: 'Missing Quality Standards',
    description:
      'Not specifying coding standards, testing requirements, or quality criteria',
    whyProblematic:
      'Generated code may not meet production standards or team conventions',
    howToFix:
      'Always include quality standards in FOUNDATIONS section of your prompts',
    example:
      '❌ No quality mention → ✅ "Include TypeScript types, 90% test coverage, ESLint compliance, and comprehensive error handling"'
  },
  {
    id: 'blind-trust',
    name: 'Blind Trust in AI Output',
    description:
      'Using AI-generated code without review, testing, or understanding',
    whyProblematic:
      'Can introduce bugs, security vulnerabilities, or maintenance nightmares',
    howToFix:
      'Always review, test, and understand generated code before implementation',
    example:
      '❌ Copy-paste without review → ✅ Code review checklist, security analysis, thorough testing'
  },
  {
    id: 'single-shot-prompting',
    name: 'Single-Shot Prompting',
    description:
      'Expecting perfect results from first prompt without iteration',
    whyProblematic: 'Misses opportunities for refinement and improvement',
    howToFix:
      'Use iterative refinement process to improve prompt quality over time',
    example:
      '❌ Accept first result → ✅ Analyze gaps, refine prompt, test again, document learnings'
  }
]

// Custom hooks
const usePracticeFiltering = (
  practices: BestPractice[],
  categoryFilter: CategoryFilter,
  difficultyFilter: DifficultyFilter
) => {
  return useMemo(() => {
    return practices.filter((practice) => {
      const matchesCategory =
        categoryFilter === 'all' || practice.category === categoryFilter
      const matchesDifficulty =
        difficultyFilter === 'all' || practice.difficulty === difficultyFilter
      return matchesCategory && matchesDifficulty
    })
  }, [practices, categoryFilter, difficultyFilter])
}

// Components
const ImpactBadge: React.FC<{ impact: BestPractice['impact'] }> = ({
  impact
}) => {
  const getImpactColor = (level: string): string => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    } as const
    return colors[level as keyof typeof colors] || colors.medium
  }

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(
        impact
      )}`}
    >
      {impact} impact
    </span>
  )
}

const DifficultyBadge: React.FC<{ difficulty: BestPractice['difficulty'] }> = ({
  difficulty
}) => {
  const getDifficultyColor = (level: string): string => {
    const colors = {
      essential: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-purple-100 text-purple-800',
      advanced: 'bg-orange-100 text-orange-800'
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

const PracticeCard: React.FC<{
  practice: BestPractice
  onLearnMore: (practice: BestPractice) => void
}> = ({ practice, onLearnMore }) => {
  const IconComponent = practice.icon

  const handleLearnMore = useCallback(() => {
    onLearnMore(practice)
  }, [practice, onLearnMore])

  const getCategoryColor = (category: string): string => {
    const colors = {
      'prompt-engineering': 'bg-blue-50 border-blue-200',
      'code-quality': 'bg-green-50 border-green-200',
      security: 'bg-red-50 border-red-200',
      'team-collaboration': 'bg-purple-50 border-purple-200'
    } as const
    return (
      colors[category as keyof typeof colors] || colors['prompt-engineering']
    )
  }

  return (
    <div
      className={`rounded-lg border-2 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${getCategoryColor(
        practice.category
      )}`}
      onClick={handleLearnMore}
    >
      <div className='flex items-start space-x-4 mb-4'>
        <div className='flex-shrink-0 p-3 bg-white rounded-lg shadow-sm'>
          <IconComponent className='h-6 w-6 text-gray-700' />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2'>
            <h3 className='text-lg font-semibold text-gray-900 line-clamp-2'>
              {practice.title}
            </h3>
            <div className='flex gap-2 flex-shrink-0'>
              <DifficultyBadge difficulty={practice.difficulty} />
              <ImpactBadge impact={practice.impact} />
            </div>
          </div>
          <p className='text-gray-600 text-sm line-clamp-3'>
            {practice.description}
          </p>
        </div>
      </div>

      <div className='space-y-3'>
        <div>
          <h4 className='text-sm font-medium text-gray-900 mb-2'>
            Key Principles:
          </h4>
          <ul className='text-xs text-gray-600 space-y-1'>
            {practice.keyPrinciples.slice(0, 3).map((principle, index) => (
              <li key={index} className='flex items-start'>
                <CheckCircle className='h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
                <span className='line-clamp-2'>{principle}</span>
              </li>
            ))}
            {practice.keyPrinciples.length > 3 && (
              <li className='text-xs text-gray-500 ml-5'>
                +{practice.keyPrinciples.length - 3} more principles
              </li>
            )}
          </ul>
        </div>

        <div className='pt-3 border-t border-gray-200'>
          <button className='w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2'>
            <BookOpen className='h-4 w-4' />
            <span>Learn Best Practices</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const TechniqueCard: React.FC<{ technique: Technique }> = ({ technique }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getCategoryIcon = (category: string) => {
    const icons = {
      'prompt-crafting': Brain,
      iteration: TrendingUp,
      'quality-assurance': Shield
    } as const
    return icons[category as keyof typeof icons] || Brain
  }

  const CategoryIcon = getCategoryIcon(technique.category)

  return (
    <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between'
      >
        <div className='flex items-center space-x-3'>
          <CategoryIcon className='h-5 w-5 text-indigo-600' />
          <div>
            <h4 className='font-semibold text-gray-900'>{technique.name}</h4>
            <p className='text-sm text-gray-600'>{technique.description}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className='h-5 w-5 text-gray-400' />
        ) : (
          <ChevronRight className='h-5 w-5 text-gray-400' />
        )}
      </button>

      {isExpanded && (
        <div className='p-4 border-t border-gray-200 bg-gray-50'>
          <div className='space-y-4'>
            <div>
              <h5 className='font-medium text-gray-900 mb-1'>When to Use:</h5>
              <p className='text-sm text-gray-600'>{technique.useWhen}</p>
            </div>

            <div>
              <h5 className='font-medium text-gray-900 mb-2'>Example:</h5>
              <div className='bg-white rounded p-3 border'>
                <pre className='text-sm text-gray-800 whitespace-pre-wrap font-mono'>
                  {technique.example}
                </pre>
              </div>
            </div>

            <div>
              <h5 className='font-medium text-gray-900 mb-2'>Benefits:</h5>
              <ul className='space-y-1'>
                {technique.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className='flex items-center text-sm text-gray-600'
                  >
                    <CheckCircle className='h-3 w-3 text-green-500 mr-2 flex-shrink-0' />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const AntiPatternCard: React.FC<{ antiPattern: AntiPattern }> = ({
  antiPattern
}) => {
  return (
    <div className='bg-red-50 border-2 border-red-200 rounded-lg p-4 sm:p-6'>
      <div className='flex items-start space-x-3 mb-4'>
        <AlertTriangle className='h-6 w-6 text-red-600 flex-shrink-0 mt-0.5' />
        <div>
          <h4 className='font-semibold text-red-900 mb-1'>
            {antiPattern.name}
          </h4>
          <p className='text-sm text-red-800'>{antiPattern.description}</p>
        </div>
      </div>

      <div className='space-y-3'>
        <div>
          <h5 className='font-medium text-red-900 mb-1'>
            Why This Is Problematic:
          </h5>
          <p className='text-sm text-red-700'>{antiPattern.whyProblematic}</p>
        </div>

        <div>
          <h5 className='font-medium text-red-900 mb-1'>How to Fix:</h5>
          <p className='text-sm text-red-700'>{antiPattern.howToFix}</p>
        </div>

        <div className='bg-white rounded-lg p-3 border border-red-300'>
          <h5 className='font-medium text-gray-900 mb-2'>Example:</h5>
          <p className='text-sm text-gray-700 font-mono'>
            {antiPattern.example}
          </p>
        </div>
      </div>
    </div>
  )
}

const ActionableStepCard: React.FC<{
  step: ActionableStep
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
          <div className='flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium'>
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

          {step.tip && (
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3'>
              <div className='flex items-start space-x-2'>
                <Lightbulb className='h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0' />
                <p className='text-blue-800 text-sm'>{step.tip}</p>
              </div>
            </div>
          )}

          {step.warning && (
            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
              <div className='flex items-start space-x-2'>
                <AlertTriangle className='h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0' />
                <p className='text-yellow-800 text-sm'>{step.warning}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Custom hook for navigation (framework agnostic)
const useNavigation = () => {
  const navigateHome = useCallback(() => {
    // Option 1: For React Router
    // navigate('/');

    // Option 2: For Next.js (when available)
    // router.push('/');

    // Option 3: Generic approach - can be customized
    if (typeof window !== 'undefined') {
      // You can replace this with your preferred navigation method
      window.location.href = '/'

      // Or use browser history if you prefer
      // window.history.back();

      // Or dispatch a custom event for your app's router to handle
      // window.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/' } }));
    }
  }, [])

  const navigateToTool = useCallback((toolPath: string) => {
    if (typeof window !== 'undefined') {
      // Replace with your preferred navigation method
      window.location.href = toolPath

      // Or for SPA routing:
      // window.dispatchEvent(new CustomEvent('navigate', { detail: { path: toolPath } }));
    }
  }, [])

  return { navigateHome, navigateToTool }
}

// Main Component
const VibeCodingBestPractices: React.FC = () => {
  const { navigateHome, navigateToTool } = useNavigation()
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>('all')
  const [selectedPractice, setSelectedPractice] = useState<BestPractice | null>(
    null
  )
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>(
    {}
  )
  const [activeTab, setActiveTab] = useState<
    'practices' | 'techniques' | 'antipatterns'
  >('practices')

  const filteredPractices = usePracticeFiltering(
    BEST_PRACTICES,
    categoryFilter,
    difficultyFilter
  )

  // Navigation handlers
  const handleNavigateHome = useCallback(() => {
    navigateHome()
  }, [navigateHome])

  const handleNavigateToTool = useCallback(
    (toolPath: string) => {
      navigateToTool(toolPath)
    },
    [navigateToTool]
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

  const handlePracticeSelect = useCallback((practice: BestPractice) => {
    setSelectedPractice(practice)
    setExpandedSteps({})
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedPractice(null)
  }, [])

  const toggleStep = useCallback((stepId: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
  }, [])

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3 sm:space-x-4'>
              <div className='p-2 sm:p-3 bg-red-600 rounded-lg'>
                <BookOpen className='h-5 w-5 sm:h-6 sm:w-6 text-white' />
              </div>
              <div>
                <h1 className='text-xl sm:text-2xl font-bold text-gray-900'>
                  Vibe Coding Best Practices
                </h1>
                <p className='text-gray-600 text-sm sm:text-base'>
                  Advanced techniques and methodologies for professional vibe
                  coding
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
        {/* Tab Navigation */}
        <div className='flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 sm:mb-8'>
          {[
            {
              id: 'practices' as const,
              label: 'Best Practices',
              count: BEST_PRACTICES.length
            },
            {
              id: 'techniques' as const,
              label: 'Advanced Techniques',
              count: ADVANCED_TECHNIQUES.length
            },
            {
              id: 'antipatterns' as const,
              label: 'Anti-Patterns',
              count: ANTI_PATTERNS.length
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              <span className='ml-2 text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded-full'>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Best Practices Tab */}
        {activeTab === 'practices' && (
          <>
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
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='all'>All Categories</option>
                    <option value='prompt-engineering'>
                      Prompt Engineering
                    </option>
                    <option value='code-quality'>Code Quality</option>
                    <option value='security'>Security</option>
                    <option value='team-collaboration'>
                      Team Collaboration
                    </option>
                  </select>
                </div>
                <div className='flex-1'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Difficulty
                  </label>
                  <select
                    value={difficultyFilter}
                    onChange={handleDifficultyChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500'
                  >
                    <option value='all'>All Levels</option>
                    <option value='essential'>Essential</option>
                    <option value='intermediate'>Intermediate</option>
                    <option value='advanced'>Advanced</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Practices Grid */}
            <section className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {filteredPractices.map((practice) => (
                <PracticeCard
                  key={practice.id}
                  practice={practice}
                  onLearnMore={handlePracticeSelect}
                />
              ))}
            </section>
          </>
        )}

        {/* Advanced Techniques Tab */}
        {activeTab === 'techniques' && (
          <section>
            <div className='mb-6'>
              <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2'>
                Advanced Prompting Techniques
              </h2>
              <p className='text-gray-600'>
                Sophisticated methods for getting better results from
                AI-assisted coding.
              </p>
            </div>
            <div className='space-y-4'>
              {ADVANCED_TECHNIQUES.map((technique) => (
                <TechniqueCard key={technique.id} technique={technique} />
              ))}
            </div>
          </section>
        )}

        {/* Anti-Patterns Tab */}
        {activeTab === 'antipatterns' && (
          <section>
            <div className='mb-6'>
              <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2'>
                Common Anti-Patterns
              </h2>
              <p className='text-gray-600'>
                Mistakes to avoid when doing vibe coding for better results and
                fewer problems.
              </p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {ANTI_PATTERNS.map((antiPattern) => (
                <AntiPatternCard
                  key={antiPattern.id}
                  antiPattern={antiPattern}
                />
              ))}
            </div>
          </section>
        )}

        {/* Quick Tips Section */}
        <section className='mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 sm:p-8'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6'>
            Quick Tips for Success
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            <div className='bg-white rounded-lg p-4 border border-red-200'>
              <div className='flex items-center space-x-3 mb-3'>
                <Target className='h-5 w-5 text-red-600' />
                <h3 className='font-semibold text-gray-900'>Start Specific</h3>
              </div>
              <p className='text-sm text-gray-600'>
                Detailed, specific prompts always outperform vague requests.
                Include context, examples, and constraints.
              </p>
            </div>

            <div className='bg-white rounded-lg p-4 border border-red-200'>
              <div className='flex items-center space-x-3 mb-3'>
                <TrendingUp className='h-5 w-5 text-red-600' />
                <h3 className='font-semibold text-gray-900'>
                  Iterate & Improve
                </h3>
              </div>
              <p className='text-sm text-gray-600'>
                First attempts rarely perfect. Analyze results, refine prompts,
                and build on what works.
              </p>
            </div>

            <div className='bg-white rounded-lg p-4 border border-red-200'>
              <div className='flex items-center space-x-3 mb-3'>
                <Shield className='h-5 w-5 text-red-600' />
                <h3 className='font-semibold text-gray-900'>Always Review</h3>
              </div>
              <p className='text-sm text-gray-600'>
                Never deploy AI-generated code without thorough review, testing,
                and security analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation CTA Section */}
        <section className='mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8'>
          <div className='text-center'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-4'>
              Ready to Start Vibe Coding?
            </h2>
            <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
              Now that you've learned the best practices, put them into action
              with our comprehensive toolkit. Choose your next step to begin
              professional AI-assisted development.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link
                href='/'
                className='w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2'
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  />
                </svg>
                <span>Back to Vibe Coding Toolkit</span>
              </Link>

              <div className='flex flex-col sm:flex-row gap-3'>
                <Link
                  href='/system-prompt-generator'
                  className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2'
                >
                  <Settings className='h-4 w-4' />
                  <span>System Prompts</span>
                </Link>

                <Link
                  href='/feature-builder'
                  className='w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2'
                >
                  <Code className='h-4 w-4' />
                  <span>Feature Builder</span>
                </Link>
              </div>
            </div>

            <div className='mt-6 pt-6 border-t border-gray-200'>
              <p className='text-sm text-gray-500'>
                <strong>Pro Tip:</strong> Start with the System Prompt Generator
                to establish your AI's behavior, then use the Feature Builder to
                systematically develop your application.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Practice Detail Modal */}
      {selectedPractice && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-4xl h-full sm:h-auto sm:max-h-[95vh] flex flex-col overflow-hidden'>
            <div className='flex-1 overflow-y-auto'>
              <div className='p-4 sm:p-6'>
                {/* Modal Header */}
                <div className='flex items-start justify-between mb-4 sm:mb-6'>
                  <div className='flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1 min-w-0 pr-4'>
                    <div className='p-3 bg-red-100 rounded-lg flex-shrink-0'>
                      <selectedPractice.icon className='h-6 w-6 text-red-600' />
                    </div>
                    <div className='min-w-0'>
                      <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2'>
                        {selectedPractice.title}
                      </h3>
                      <p className='text-gray-600 text-sm sm:text-base mb-3'>
                        {selectedPractice.description}
                      </p>
                      <div className='flex flex-wrap items-center gap-2'>
                        <DifficultyBadge
                          difficulty={selectedPractice.difficulty}
                        />
                        <ImpactBadge impact={selectedPractice.impact} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className='text-gray-400 hover:text-gray-600 p-2 flex-shrink-0'
                    aria-label='Close modal'
                  >
                    ✕
                  </button>
                </div>

                {/* Key Principles and Common Mistakes */}
                <div className='grid grid-cols-1 gap-6 mb-6 sm:mb-8'>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-3'>
                      Key Principles
                    </h4>
                    <ul className='space-y-2'>
                      {selectedPractice.keyPrinciples.map(
                        (principle, index) => (
                          <li
                            key={index}
                            className='flex items-start space-x-2'
                          >
                            <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                            <span className='text-sm text-gray-700'>
                              {principle}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className='font-semibold text-gray-900 mb-3'>
                      Common Mistakes
                    </h4>
                    <ul className='space-y-2'>
                      {selectedPractice.commonMistakes.map((mistake, index) => (
                        <li key={index} className='flex items-start space-x-2'>
                          <AlertTriangle className='h-4 w-4 text-red-500 mt-0.5 flex-shrink-0' />
                          <span className='text-sm text-gray-700'>
                            {mistake}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actionable Steps */}
                <div className='mb-6 sm:mb-8'>
                  <h4 className='font-semibold text-gray-900 mb-4'>
                    Actionable Steps
                  </h4>
                  <div className='space-y-3'>
                    {selectedPractice.actionableSteps.map((step, index) => (
                      <ActionableStepCard
                        key={step.id}
                        step={step}
                        stepNumber={index + 1}
                        isExpanded={expandedSteps[step.id] || false}
                        onToggle={() => toggleStep(step.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Examples */}
                {selectedPractice.examples &&
                  selectedPractice.examples.length > 0 && (
                    <div className='mb-6'>
                      <h4 className='font-semibold text-gray-900 mb-4'>
                        Examples
                      </h4>
                      <div className='space-y-4'>
                        {selectedPractice.examples.map((example) => (
                          <div
                            key={example.id}
                            className='border border-gray-200 rounded-lg overflow-hidden'
                          >
                            <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                              <h5 className='font-medium text-gray-900 mb-1'>
                                {example.title}
                              </h5>
                              <p className='text-sm text-gray-600'>
                                {example.scenario}
                              </p>
                            </div>
                            <div className='p-4'>
                              <div className='space-y-4'>
                                <div>
                                  <h6 className='font-medium text-red-900 mb-2'>
                                    ❌ Bad Example:
                                  </h6>
                                  <div className='bg-red-50 p-3 rounded border border-red-200'>
                                    <pre className='text-xs sm:text-sm text-red-800 whitespace-pre-wrap font-mono overflow-x-auto'>
                                      {example.badExample}
                                    </pre>
                                  </div>
                                </div>
                                <div>
                                  <h6 className='font-medium text-green-900 mb-2'>
                                    ✅ Good Example:
                                  </h6>
                                  <div className='bg-green-50 p-3 rounded border border-green-200'>
                                    <pre className='text-xs sm:text-sm text-green-800 whitespace-pre-wrap font-mono overflow-x-auto'>
                                      {example.goodExample}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                              <div className='mt-4 p-3 bg-blue-50 rounded border border-blue-200'>
                                <p className='text-sm text-blue-800'>
                                  <strong>Explanation:</strong>{' '}
                                  {example.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Modal Footer - Fixed at bottom on mobile */}
            <div className='flex-shrink-0 border-t border-gray-200 bg-white p-4'>
              <div className='flex justify-end'>
                <button
                  onClick={handleCloseModal}
                  className='w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200'
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

export default VibeCodingBestPractices
