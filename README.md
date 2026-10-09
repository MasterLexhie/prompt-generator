# Prompt Workflow Builder

A focused tool for creating structured prompts for software-development work.

It currently provides two workflows:

1. **System Prompt Builder** — define project context, coding standards, constraints, and expected AI behaviour.
2. **S.C.A.F.F. Feature Prompt Builder** — turn a feature request into a clear implementation prompt.

The application does not call an LLM or autonomously generate code. It helps developers create clearer inputs for their chosen AI coding assistant.

## Features

### System Prompt Builder

Create a reusable prompt that establishes:

- AI role and level of expertise
- Project context and technical stack
- Coding standards and quality expectations
- Security considerations and implementation constraints
- Communication and response preferences

### S.C.A.F.F. Feature Prompt Builder

Structure a feature request using the S.C.A.F.F. framework:

- **Situation** — relevant product and codebase context
- **Challenge** — the specific problem to solve
- **Audience** — the intended user or consumer
- **Format** — the expected deliverable and response structure
- **Foundations** — constraints, standards, and acceptance criteria

## Example: S.C.A.F.F. in Practice

**Input**

> Add CSV export to the analytics dashboard.

**Structured prompt**

> **Situation:** We have a React and TypeScript analytics dashboard that displays campaign metrics from an existing REST API.
>
> **Challenge:** Add a CSV export action for the currently filtered dashboard data.
>
> **Audience:** Internal marketing users who need to analyze data in spreadsheet tools.
>
> **Format:** Implement the UI action, export utility, loading and error states, and tests. Explain the changed files and how the feature is verified.
>
> **Foundations:** Preserve active filters, use TypeScript, avoid adding a dependency unless necessary, handle an empty result set, and keep the export client-side.

## Not Implemented

The following ideas are intentionally outside the current scope:

- Feature-planning workflow
- Prompt library
- Tool-integration guides
- AI model integration
- Autonomous code generation

## Getting Started

### Prerequisites

- Node.js 18 or later

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Typical Workflow

1. Create a system prompt to establish the project context and engineering expectations.
2. Use the S.C.A.F.F. builder to turn a feature idea into a structured implementation prompt.
3. Copy the resulting prompt into the AI coding assistant of your choice.
4. Review and adapt generated output before integrating it into your codebase.

## Tech Stack

- [Next.js](https://nextjs.org)
- React
- TypeScript
- Tailwind CSS
- Lucide Icons

## Project Status

This is an actively maintained, focused prompt-workflow tool. Its purpose is to improve prompt clarity for software-development tasks—not to replace engineering review or independently generate production code.

## Contributing

Contributions are welcome. Please open an issue to discuss a proposed change before submitting a pull request.
