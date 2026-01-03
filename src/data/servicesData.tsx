import { Code, Smartphone, Cloud, Cpu, Database, Lock } from 'lucide-react';
import servicesJson from '../content/services.json';

// Icon mapping for dynamic rendering
const iconComponents: Record<string, any> = {
  Code,
  Smartphone,
  Cloud,
  Cpu,
  Database,
  Lock,
};

export interface ServiceData {
  slug: string;
  visibility: boolean;
  icon: JSX.Element;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  features: string[];
  technologies: string[];
  highlights: { visibility: boolean; title: string; description: string }[];
  timeline: { visibility: boolean; phase: string; duration: string; tasks: string[] }[];
  pricing: {
    visibility: boolean;
    tier: string;
    price: string;
    timeline: string;
    features: string[];
    highlighted?: boolean;
  }[];
  process: { visibility: boolean; icon: string; title: string; description: string }[];
  testimonial: {
    visibility: boolean;
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  faq: { visibility: boolean; question: string; answer: string }[];
}

// Transform JSON data to include JSX icons
export const servicesData: Record<string, ServiceData> = {};

servicesJson.services.forEach((service: any) => {
  const IconComponent = iconComponents[service.icon];
  servicesData[service.slug] = {
    ...service,
    icon: IconComponent ? <IconComponent className={`w-16 h-16 ${service.iconColor}`} /> : <Code className="w-16 h-16 text-cyan-400" />,
  };
});

export function getServiceBySlug(slug: string): ServiceData | null {
  return servicesData[slug] || null;
}
