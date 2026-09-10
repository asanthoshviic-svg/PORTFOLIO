export interface Project {
  id: string;
  number: string;
  category: string;
  statusBadge: string;
  statusColor: 'emerald' | 'purple' | 'blue';
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  displayUrl: string;
  client?: string;
  badgeType: string;
  previewTitle: string;
  previewSubtitle: string;
  accentColor: string;
  theme: 'industrial' | 'editorial';
}

export interface SkillItem {
  name: string;
  detail: string;
  iconText?: string;
  tags?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  accentColor: string;
  dotColor: string;
  items?: SkillItem[];
  singleItem?: {
    shortName: string;
    fullName: string;
    subtitle: string;
    description: string;
    tags?: string[];
  };
  exploringBadge?: boolean;
}

export interface AiLabTool {
  name: string;
  category: string;
  version: string;
  accent: string;
  description: string;
}

export interface JourneyMilestone {
  id: string;
  dateOrCategory: string;
  type: 'milestone' | 'exploration' | 'shipped' | 'infrastructure' | 'frontier' | 'now' | 'roadmap';
  title: string;
  description: string;
  color: string;
  tags?: string[];
  isCurrent?: boolean;
}
