import React from 'react';
import { Zap, Layers, Code, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRight } from 'lucide-react';

export interface ValueProposition {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  link: string;
}

export interface ValuePropositionGridProps {
  title?: string;
  subtitle?: string;
  items?: ValueProposition[];
}

const defaultItems: ValueProposition[] = [
  {
    title: 'Startups & MVPs',
    description: 'Rapid prototyping and scalable foundations to get you to market fast.',
    icon: Zap,
    iconColor: 'text-yellow-400',
    link: '/solutions'
  },
  {
    title: 'Enterprise Systems',
    description: 'Robust, secure, and high-availability architectures for mission-critical loads.',
    icon: Layers,
    iconColor: 'text-cyan-400',
    link: '/solutions'
  },
  {
    title: 'Tech Partnership',
    description: 'Deep technical collaboration for teams needing architectural guidance.',
    icon: Code,
    iconColor: 'text-purple-400',
    link: '/recruiters'
  }
];

export function ValuePropositionGrid({
  title = 'Built for Every Scale',
  subtitle = "Whether you're a startup founder or an enterprise CTO, we adapt our engineering approach to your specific needs.",
  items = defaultItems
}: ValuePropositionGridProps) {
  return (
    <section className="py-6 md:py-8 relative">
      <div className="max-w-7xl mx-auto site-padding">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <GlassCard key={i} hoverEffect className="p-8" delay={i * 0.1}>
                <div className="w-12 h-12 rounded-xl bg-panel-5 flex items-center justify-center mb-6 border border-panel-10">
                  <Icon className={item.iconColor} size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {item.description}
                </p>
                <Link
                  href={item.link as any}
                  className="text-cyan-400 text-sm font-medium flex items-center hover:text-cyan-300 transition-colors"
                >
                  Learn more <ArrowRight size={14} className="ml-1" />
                </Link>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
