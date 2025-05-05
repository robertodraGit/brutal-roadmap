import { RoadmapItemProps } from "@/components/RoadmapItem";

// Sample initial data
export const initialRoadmapItems: Array<Omit<RoadmapItemProps, 'onUpdate' | 'onDelete'>> = [
  {
    id: '1',
    title: 'Q2 2025 - Token Extraction & Tailwind Config Generation',
    description: 'Start from the Figma project and generate the design system foundation in just a few clicks. Figma Plugin ALPHA: automatic extraction of colors, typography, spacing, and shadows. Figma Plugin BETA: translate extracted tokens into a ready-to-use tailwind.config.js file.',
    date: '2025-06-30',
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Q3 2025 - Base Component Generator',
    description: 'Transform the Tailwind config into a set of production-ready React + shadcn components. TideScript ALPHA: create-design-system automatically generates Button, Accordion, Chips, Input, etc. shadcn/ui integration: use of "atomic" components with pre-configured styling and variants.',
    date: '2025-09-30',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Q4 2025 - Interactive Playground & Documentation',
    description: 'Provide a web app to try, customize, and copy component code. TideScript BETA: live preview of components, customization panel (colors, spacing, typography). Snippet export: quick copy in JSX, CSS-in-JS, or HTML. Docs + Tutorial: step-by-step integration guide for Next.js, Vite, Gatsby, etc.',
    date: '2025-12-31',
    status: 'planned'
  },
  {
    id: '4',
    title: 'Q1 2026 - Library Expansion & Advanced Plugins',
    description: 'Dynamic theming: support for dark/light mode and runtime switching. Enrich the system with more complex components and custom automation tools. New components: Modal, Toast, Tooltip, Data Table, Navbar.',
    date: '2026-03-31',
    status: 'planned'
  },
  {
    id: '5',
    title: 'Q2 2026 - Enterprise & Customization',
    description: 'Scale the system for large teams and enterprise needs. Advanced theming: support for multiple design tokens and style branches. Version management: automatic changelog and config rollback. SDK & API: programmatic integration for CI/CD pipelines.',
    date: '2026-06-30',
    status: 'planned'
  },
  {
    id: '6',
    title: 'Beyond',
    description: 'Integration with Storybook. Support for additional frameworks (Vue, Svelte). Community plugins and extension marketplace. VS Code Plugin: autocomplete, snippets, and direct integration with your project.',
    date: '',
    status: 'planned'
  }
];