'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { DepthCard } from '@/components/ui/DepthCard';
import projectsData from '@/content/projects.json';

interface Project {
  slug: string;
  title: string;
  industry: string;
  description: string;
  results?: Record<string, string>;
  stack?: string[];
}

export default function ProjectsPage() {
  const projects = (projectsData.projects || projectsData) as unknown as Project[];
  const industriesList = [...new Set(projects.map(p => p.industry))];
  const techCount = Array.from(new Set(projects.flatMap(p => p.stack || []))).length;

  return (
    <div className="pt-32 pb-20 site-padding max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-primary to-purple-400 bg-clip-text text-transparent">
            Our Projects
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Comprehensive portfolio of engineered solutions across industries
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <DepthCard className="p-8 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{projects.length}</div>
          <p className="text-slate-400">Projects Delivered</p>
        </DepthCard>
        <DepthCard className="p-8 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{industriesList.length}</div>
          <p className="text-slate-400">Industries Served</p>
        </DepthCard>
        <DepthCard className="p-8 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{techCount}</div>
          <p className="text-slate-400">Technologies</p>
        </DepthCard>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {projects.map((project, index) => {
          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <GlassCard 
                  className="p-0 flex flex-col h-full overflow-hidden group cursor-pointer"
                  hoverEffect
                  delay={index * 0.1}
                >
                  <div className="h-48 bg-gradient-to-br from-panel-5 to-panel-10 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                    />
                    <div className="relative z-10 text-center">
                      <div className="text-sm text-slate-400">
                        {project.title}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="inline-block mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {project.industry}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
                      {project.description}
                    </p>

                    {project.results && Object.keys(project.results).length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {Object.entries(project.results).slice(0, 2).map(([key, value]) => {
                          const isPerfChange = value.includes('→');
                          const displayValue = isPerfChange ? value.split('→')[1].trim() : value;
                          return (
                            <div key={key} className="text-center p-3 rounded-lg bg-panel-5 border border-panel-10">
                              <div className="text-primary font-bold text-lg">{displayValue}</div>
                              <div className="text-slate-500 text-xs mt-1 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {project.stack && project.stack.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {project.stack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-panel-5 text-secondary border border-panel-10">
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 3 && (
                          <span className="text-xs px-2 py-1 text-slate-500">
                            +{project.stack.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-12 border-t border-panel-10"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-slate-400 mb-8">
          Let's discuss how we can help you achieve your goals.
        </p>
        <Link href="/contact">
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-primary hover:from-cyan-600 hover:to-primary text-white font-semibold transition-all inline-flex items-center gap-2">
            Get in Touch
            <ArrowRight size={16} />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
