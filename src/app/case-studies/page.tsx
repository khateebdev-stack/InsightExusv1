'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import projectsData from '@/content/projects.json';

interface Project {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Record<string, string>;
  stack: string[];
  clientProfile?: { companyName?: string };
  testimonial?: { quote: string; author: string; role: string; company: string };
}

export default function CaseStudiesPage() {
  const projects = (projectsData.projects || projectsData) as unknown as Project[];

  return (
    <div className="pt-32 pb-12 site-padding max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-primary mb-6"
        >
          Case{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Studies
          </span>
        </motion.h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Deep dives into complex engineering challenges we've solved across industries.
        </p>
      </div>

      <div className="space-y-20">
        {projects.map((project, index) => {
          const outcomeArray = Object.entries(project.results || {})
            .slice(0, 3)
            .map(([_, value]) => {
              if (typeof value === 'string' && value.includes('→')) {
                const after = value.split('→')[1]?.trim();
                return after || value;
              }
              return value;
            });

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-12 items-start"
            >
              <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <GlassCard className="p-2 overflow-hidden group">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-panel-5 to-panel-10 flex items-center justify-center">
                    <div className="absolute inset-0 gradient-from-header-to-transparent opacity-60 z-10" />
                    <div className="relative z-20 text-center px-6">
                      <div className="text-sm text-slate-400 font-medium">{project.title}</div>
                    </div>
                  </div>
                </GlassCard>

                <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                  {project.stack?.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-panel-5 border border-panel-10 text-secondary text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    {project.title}
                  </h2>
                  <p className="text-cyan-400 font-medium">{project.industry}</p>
                </div>

                <div className="space-y-6">
                  <GlassCard className="p-6 bg-red-500/5 border-red-500/20">
                    <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
                      <span className="w-1.5 h-6 bg-red-500 rounded-full mr-3" />
                      The Challenge
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {project.challenge}
                    </p>
                  </GlassCard>

                  <GlassCard className="p-6 bg-blue-500/5 border-blue-500/20">
                    <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
                      <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3" />
                      The Solution
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {project.solution}
                    </p>
                  </GlassCard>

                  {outcomeArray.length > 0 && (
                    <GlassCard className="p-6 bg-green-500/5 border-green-500/20">
                      <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                        <span className="w-1.5 h-6 bg-green-500 rounded-full mr-3" />
                        Key Outcomes
                      </h3>
                      <ul className="space-y-3">
                        {outcomeArray.map((item, i) => (
                          <li key={i} className="flex items-start text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  )}
                </div>

                <Link
                  href={`/projects/${project.slug}` as any}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-primary transition-colors group"
                >
                  View Full Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <GlassCard className="inline-block p-8 md:p-12 max-w-3xl">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Have a complex challenge?
          </h3>
          <p className="text-slate-400 mb-8">
            We thrive on solving the problems others can't.
          </p>
          <Link href="/contact">
            <Button size="lg">Discuss Your Architecture</Button>
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
