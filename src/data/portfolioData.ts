import { Project, SkillCategory, AiLabTool, JourneyMilestone } from '../types';

export const PERSONAL_INFO = {
  name: 'Santhosh A',
  role: 'B.Tech AI & Data Science Student & Builder',
  degree: 'B.Tech in Artificial Intelligence & Data Science',
  college: 'KGiSL Institute of Technology',
  graduationYear: '2030 (Expected)',
  status: 'B.Tech AI & DS • 1st Year',
  location: 'Thanjavur, Tamil Nadu',
  email: 'asanthoshviic@gmail.com',
  phone: '+91 9944821724',
  github: 'https://github.com/asanthoshviic-svg',
  githubHandle: 'asanthoshviic-svg',
  linkedin: 'https://www.linkedin.com/in/santhosh-anandan-230091336',
  linkedinHandle: 'linkedin.com/in/santhosh-anandan',
  headline: ['BUILDING.', 'LEARNING.', 'EXPLORING AI.'],
  subheadline: '"Turning curiosity into things that actually work."',
  bioSummary:
    "I'm Santhosh A, an Artificial Intelligence & Data Science student exploring AI, software development, and emerging technologies by building and shipping real projects. Still early, but hands-on.",
  aboutQuote: '"I don\'t just explore AI tools. I use them to build."',
  aboutStory: [
    "I'm Santhosh A, a first-year B.Tech Artificial Intelligence & Data Science student at KGiSL Institute of Technology. I am fascinated by understanding how modern AI can be combined with practical software development to craft useful digital solutions.",
    "Rather than waiting until final year, I've already experimented with building and deploying real websites, configuring custom business domains, leveraging cutting-edge AI development environments, and exploring emerging concepts such as Generative AI and autonomous Agentic workflows."
  ],
  stats: [
    { value: '01', label: 'YEAR', sub: 'B.Tech AI & DS Student actively building', color: 'text-blue-400' },
    { value: '02+', label: 'PROJECTS', sub: 'Built, connected with domains & deployed live', color: 'text-emerald-400' },
    { value: '2030', label: 'GRADUATION', sub: 'Expected completion at KGiSL Institute of Tech', color: 'text-purple-400' },
    { value: '∞', label: 'CURIOSITY', sub: 'Always testing, reading, breaking & improving', color: 'text-cyan-400' }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    accentColor: 'border-blue-500/40',
    dotColor: 'bg-blue-500',
    singleItem: {
      shortName: 'Py',
      fullName: 'Python',
      subtitle: 'Core foundational programming',
      description: 'Building fundamental problem-solving logic, basic data manipulation, and introductory algorithms in my 1st year coursework.',
      tags: ['Logic', 'Data Structures', 'Algorithms']
    }
  },
  {
    id: 'ai-genai',
    title: 'AI & Generative AI',
    accentColor: 'border-purple-500/40',
    dotColor: 'bg-purple-500',
    items: [
      { name: 'Google AI Studio', detail: 'Prompting & Models' },
      { name: 'Claude', detail: 'Development Assistant' },
      { name: 'Google Flow & Stitch', detail: 'AI Design Workflows' }
    ]
  },
  {
    id: 'development',
    title: 'Development & Deployment',
    accentColor: 'border-emerald-500/40',
    dotColor: 'bg-emerald-500',
    items: [
      { name: 'GitHub', detail: 'Repositories & CI/CD' },
      { name: 'Vercel', detail: 'Instant Cloud Deploys' },
      { name: 'Web Deployment', detail: 'Production Builds' }
    ]
  },
  {
    id: 'web-ops',
    title: 'Web Operations',
    accentColor: 'border-cyan-500/40',
    dotColor: 'bg-cyan-500',
    singleItem: {
      shortName: 'DNS',
      fullName: 'Domain Setup & DNS',
      subtitle: 'Hands-on live production routing',
      description: 'Hands-on experience purchasing, routing, pointing DNS records (A/CNAME), and deploying SSL certificates for custom client domains.',
      tags: ['DNS Records', 'Custom URL', 'HTTPS/SSL']
    }
  },
  {
    id: 'payments',
    title: 'Payments',
    accentColor: 'border-amber-500/40',
    dotColor: 'bg-amber-500',
    singleItem: {
      shortName: '₹',
      fullName: 'Cashfree',
      subtitle: 'Payment Gateway Integration',
      description: 'Configured checkout flows and explored merchant payment gateway testing for e-commerce experimentation.',
      tags: ['Web Checkout', 'Payment APIs', 'Merchant Testing']
    }
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    accentColor: 'border-purple-500',
    dotColor: 'bg-purple-400',
    exploringBadge: true,
    items: [
      { name: 'n8n', detail: 'Automation Node Workflows' },
      { name: 'OpenClaw', detail: 'AI Agent Orchestration' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'arun-hydraulics',
    number: '01',
    category: 'BUSINESS WEBSITE',
    statusBadge: 'LIVE ON CLIENT DOMAIN',
    statusColor: 'emerald',
    title: 'Arun Hydraulics',
    description:
      'A complete commercial business website designed, constructed, and deployed for Arun Hydraulics. Established their digital footprint with clean industrial branding, service catalogs, and custom domain routing.',
    tags: ['AI-Assisted Dev', 'Vercel', 'GitHub', 'Domain Deployment', 'Web Design'],
    liveUrl: 'https://www.arunhydraulics.co.in',
    displayUrl: 'https://www.arunhydraulics.co.in',
    client: 'Arun Hydraulics',
    badgeType: 'INDUSTRIAL MACHINERY & HYDRAULIC SOLUTIONS',
    previewTitle: 'ARUN HYDRAULICS',
    previewSubtitle: 'Precision Engineering • Hydraulic Cylinders • Seals • Custom Fabrication Services',
    accentColor: '#3b82f6',
    theme: 'industrial'
  },
  {
    id: 'the-golden-leaf',
    number: '02',
    category: 'WEB PROJECT',
    statusBadge: 'DEPLOYED ON VERCEL',
    statusColor: 'purple',
    title: 'The Golden Leaf',
    description:
      'A modern digital bookstore platform built to explore online storefront architecture, AI-assisted interface design, catalog browsing, and seamless purchasing flows with integrated payment pathways.',
    tags: ['AI-Assisted Dev', 'UI Design', 'Vercel', 'Cashfree', 'AI Tools'],
    liveUrl: 'https://thegoldenleaf.vercel.app/',
    displayUrl: 'https://thegoldenleaf.vercel.app',
    client: 'Curated Bookstore',
    badgeType: 'CURATED DIGITAL BOOKSTORE',
    previewTitle: 'THE GOLDEN LEAF',
    previewSubtitle: 'Modern literary discoveries • Digital storefront • Seamless cart & checkout testing',
    accentColor: '#f59e0b',
    theme: 'editorial'
  }
];

export const AI_LAB_TOOLS: AiLabTool[] = [
  {
    name: 'Google AI Studio',
    category: 'PROMPT LAB',
    version: 'Gemini 2.5 / 2.0',
    accent: 'blue',
    description:
      'Experimenting with AI models, system prompts, context windows, and testing generative capabilities for real applications.'
  },
  {
    name: 'Google Flow',
    category: 'CREATIVE FLOWS',
    version: 'Pipeline',
    accent: 'cyan',
    description:
      'Exploring AI-powered creative workflows, multimodal synthesis, and integrating design logic into generative loops.'
  },
  {
    name: 'Google Stitch',
    category: 'UI GENERATION',
    version: 'Interface',
    accent: 'indigo',
    description:
      'Experimenting with AI-assisted interface design, translating natural language prompts into responsive front-end compositions.'
  },
  {
    name: 'Claude',
    category: 'REASONING & CODE',
    version: 'Sonnet / Opus',
    accent: 'amber',
    description:
      'AI-assisted research, ideation, debugging, architecture planning, and accelerating front-end deployment experiments.'
  },
  {
    name: 'Gamma',
    category: 'PRESENTATIONS',
    version: 'Storytelling',
    accent: 'pink',
    description:
      'Structuring and generating AI-assisted visual decks, project documentation, and interactive presentation layouts.'
  },
  {
    name: 'n8n & OpenClaw',
    category: 'AGENTIC AUTOMATION',
    version: 'Active Learning',
    accent: 'purple',
    description:
      'Learning automation logic, autonomous agent orchestration, node-based workflows, and how LLMs can trigger external actions.'
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'step-1',
    dateOrCategory: '2026 • MILESTONE',
    type: 'milestone',
    title: 'Started B.Tech AI & DS',
    description: 'Joined KGiSL Institute of Technology to build formal foundations in Artificial Intelligence and Data Science.',
    color: '#3b82f6'
  },
  {
    id: 'step-2',
    dateOrCategory: 'EXPLORATION',
    type: 'exploration',
    title: 'Explored Generative AI',
    description: 'Began hands-on experimentation with modern LLMs, prompt engineering, Google AI Studio, and AI-assisted tooling.',
    color: '#a855f7'
  },
  {
    id: 'step-3',
    dateOrCategory: 'SHIPPED',
    type: 'shipped',
    title: 'Built Real Client & Web Projects',
    description: 'Constructed and launched the Arun Hydraulics business site and The Golden Leaf bookstore project.',
    color: '#10b981'
  },
  {
    id: 'step-4',
    dateOrCategory: 'INFRASTRUCTURE',
    type: 'infrastructure',
    title: 'Explored Production Deployment',
    description: 'Configured Vercel, managed GitHub repositories, and set up live custom DNS and domains.',
    color: '#06b6d4'
  },
  {
    id: 'step-5',
    dateOrCategory: 'FRONTIER',
    type: 'frontier',
    title: 'Agentic AI Exploration',
    description: 'Started testing workflow automations and multi-agent concepts using n8n and OpenClaw.',
    color: '#f59e0b'
  },
  {
    id: 'step-6',
    dateOrCategory: 'NOW',
    type: 'now',
    title: '"Learning. Building. Improving."',
    description: 'Strengthening Python fundamentals, building projects, and looking for early internship and collaborative opportunities.',
    color: '#10b981',
    isCurrent: true
  },
  {
    id: 'step-7',
    dateOrCategory: 'NEXT ROADMAP',
    type: 'roadmap',
    title: 'Upcoming Focus Areas',
    description: 'Deepening core knowledge across modern technologies and agentic architectures.',
    color: '#6b7280',
    tags: [
      'Python Mastery',
      'Software Dev Best Practices',
      'AI/ML Mathematical Foundations',
      'Modern Web Technologies',
      'Agentic AI Systems'
    ]
  }
];

export const EDUCATION = {
  degree: 'B.Tech in Artificial Intelligence & Data Science',
  college: 'KGiSL Institute of Technology',
  period: '2026 — 2030 (Expected)',
  statusBadge: 'FIRST YEAR',
  description:
    'Focusing on computer science fundamentals, Python programming, computational mathematics, statistical methods, and foundational AI principles.',
  grades: [
    { title: '12th Grade', score: '88.4%', badge: 'High Distinction', color: 'text-emerald-400' },
    { title: '10th Grade', score: '86%', badge: 'First Class', color: 'text-emerald-400' }
  ]
};
