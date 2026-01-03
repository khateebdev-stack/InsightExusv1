import projectsJson from '../content/projects.json';

export interface ProjectMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface ProjectTestimonial {
  visibility: boolean;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Project {
  slug: string;
  visibility: boolean;
  title: string;
  industry: string;
  services: string[]; // service slugs
  description: string;
  challenge: string;
  solution: string;
  results: Record<string, string>;
  timeline: string;
  budget: string;
  metrics: ProjectMetric[];
  testimonial?: ProjectTestimonial;
}

const allProjects: Project[] = (projectsJson as any).projects || [];

export function getProjectsByService(serviceSlug: string): Project[] {
  return allProjects.filter(p => p.visibility && p.services.includes(serviceSlug));
}

export function getServiceClientMetrics(serviceSlug: string): ProjectMetric[] {
  const metrics: ProjectMetric[] = [];
  const seen = new Set<string>();
  for (const p of getProjectsByService(serviceSlug)) {
    for (const m of p.metrics || []) {
      const key = m.label.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        metrics.push(m);
      }
    }
  }
  return metrics.slice(0, 8);
}

export function getServiceTestimonials(serviceSlug: string): ProjectTestimonial[] {
  return getProjectsByService(serviceSlug)
    .map(p => p.testimonial)
    .filter((t): t is ProjectTestimonial => !!t && t.visibility);
}

export function getServiceCaseStudies(serviceSlug: string): Project[] {
  return getProjectsByService(serviceSlug);
}
