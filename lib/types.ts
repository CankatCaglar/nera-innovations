export type SystemKind = "external" | "app" | "micro";

export type SystemFeature = {
  title: string;
  body: string;
  points?: string[];
};

export type SystemFaq = {
  question: string;
  answer: string;
};

export type System = {
  id: string;
  name: string;
  slug: string;
  kind: SystemKind;
  tag?: string;
  tagline: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  appUrl: string;
  featured: boolean;
  order: number;
  icon: string;
  logo?: string;
  image?: string;
  features: SystemFeature[];
  faqs: SystemFaq[];
  resourceTitle: string;
  resourceDescription: string;
  resourceFileUrl?: string;
};

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  accent: string;
  icon: string;
  order: number;
};

export type Partner = {
  id: string;
  name: string;
  label: string;
  order: number;
};

export type MapLocation = {
  id: string;
  country: string;
  company: string;
  x: number;
  y: number;
  order: number;
};

export type LeadType = "contact" | "growth-review" | "resource";

export type Lead = {
  id: string;
  type: LeadType;
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  systemSlug?: string;
  createdAt: string;
};

export type SiteContent = {
  systems: System[];
  projects: Project[];
  partners: Partner[];
  locations: MapLocation[];
};
