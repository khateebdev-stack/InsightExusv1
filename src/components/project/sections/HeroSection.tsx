import React from 'react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { BadgeList } from '../shared/BadgeList';

interface HeroSectionProps {
  title: string;
  industry: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  visible?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function HeroSection({ 
  title,
  industry,
  budget,
  timeline,
  services = [],
  visible = true,
  variant = 'default',
  className = ''
}: HeroSectionProps) {
  if (!visible) return null;

  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <SectionWrapper className={className}>
      <div className={`${isFeatured ? 'text-center' : ''}`}>
        {/* Title */}
        <h1 className={`
          ${isCompact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} 
          font-bold mb-4 
          ${isFeatured ? 'bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent' : 'text-white'}
        `}>
          {title}
        </h1>

        {/* Industry */}
        <div className="flex items-center gap-4 mb-6 text-slate-300">
          <span className="px-3 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded-lg text-accent-blue">
            {industry}
          </span>
          {budget && (
            <span className="text-sm">
              <span className="text-slate-500">Budget:</span> <strong>{budget}</strong>
            </span>
          )}
          {timeline && (
            <span className="text-sm">
              <span className="text-slate-500">Timeline:</span> <strong>{timeline}</strong>
            </span>
          )}
        </div>

        {/* Services */}
        {!isCompact && services.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-2">Services</h3>
            <BadgeList items={services} variant="colored" />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
