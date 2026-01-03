'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowRight, Briefcase, Image, Code } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-20 site-padding max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
          Our Work
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Explore our engineering capabilities through detailed case studies,
          technical projects, and visual galleries.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Link href="/case-studies" className="block h-full">
          <GlassCard hoverEffect className="p-8 h-full flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={32} />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3">Case Studies</h2>
            <p className="text-slate-400 mb-8">
              Deep dives into complex problems, architectural decisions, and
              business outcomes.
            </p>
            <span className="mt-auto text-purple-400 font-medium flex items-center">
              View Studies{' '}
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </span>
          </GlassCard>
        </Link>

        <Link href="/projects" className="block h-full">
          <GlassCard
            hoverEffect
            className="p-8 h-full flex flex-col items-center text-center group"
            delay={0.1}
          >
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Code size={32} />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3">
              Technical Projects
            </h2>
            <p className="text-slate-400 mb-8">
              Open source tools, SaaS platforms, and technical implementations.
            </p>
            <span className="mt-auto text-cyan-400 font-medium flex items-center">
              View Projects{' '}
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </span>
          </GlassCard>
        </Link>

        <Link href="/portfolio-gallery" className="block h-full">
          <GlassCard
            hoverEffect
            className="p-8 h-full flex flex-col items-center text-center group"
            delay={0.2}
          >
            <div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
              <Image size={32} />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3">
              Visual Gallery
            </h2>
            <p className="text-slate-400 mb-8">
              A visual showcase of UI/UX design, mobile apps, and web
              interfaces.
            </p>
            <span className="mt-auto text-pink-400 font-medium flex items-center">
              View Gallery{' '}
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </span>
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
