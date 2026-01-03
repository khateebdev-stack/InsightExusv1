import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

export interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButton?: {
    label: string;
    link: string;
  };
  secondaryButton?: {
    label: string;
    link: string;
  };
  variant?: 'default' | 'gradient' | 'minimal';
}

export function CTASection({
  title = 'Ready to Build the Future?',
  description = "Let's discuss your project requirements and how we can engineer the perfect solution.",
  primaryButton = { label: 'Schedule Consultation', link: '/contact' },
  secondaryButton = { label: 'View Our Work', link: '/portfolio' }
}: CTASectionProps) {
  return (
    <section className="pt-4 pb-10 md:pt-8 lg:pt-12 pb-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none" />
      <div className="max-w-5xl mx-auto site-padding text-center relative z-10">
        <GlassCard className="p-6 md:p-12 lg:p-16 border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-cyan-900/20">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6">
            {title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Link href={primaryButton.link as any}>
              <Button size="lg" className="w-full sm:w-auto">
                {primaryButton.label}
              </Button>
            </Link>
            <Link href={secondaryButton.link as any}>
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                {secondaryButton.label}
              </Button>
            </Link>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
