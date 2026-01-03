'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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

export default function PortfolioGalleryPage() {
  const projects = (projectsData.projects || projectsData) as unknown as Project[];
  const industriesList = [...new Set(projects.map(p => p.industry))];
  const servicesList = Array.from(new Set(projects.flatMap(p => p.stack || [])));

  return (
    <div className="pt-32 pb-20 site-padding max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-primary to-purple-400 bg-clip-text text-transparent">
            Portfolio Gallery
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Visual collection of engineered solutions across industries. Each project represents our commitment to excellence.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 auto-rows-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {projects.map((project, index) => {
          const gridRow = index % 3 === 0 ? 'lg:row-span-2' : '';
          const gridCol = index % 5 === 4 ? 'lg:col-span-2' : '';

          return (
            <motion.div
              key={project.slug}
              className={`${gridRow} ${gridCol}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <div className="relative h-full rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br from-panel-5 to-panel-10 border border-panel-10 hover:border-primary/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />

                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="text-sm text-slate-400 p-4">
                      {project.title}
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/30 text-primary mb-3">
                        {project.industry}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    {project.results && Object.keys(project.results).length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(project.results).slice(0, 2).map(([key, value]) => {
                          const isPerfChange = value.includes('→');
                          const displayValue = isPerfChange ? value.split('→')[1].trim() : value;
                          return (
                            <span 
                              key={key}
                              className="text-xs bg-primary/30 text-cyan-300 px-2 py-1 rounded"
                            >
                              {displayValue}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Projects by Industry</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesList.map((industry, index) => {
            const industryProjects = projects.filter(p => p.industry === industry);
            return (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DepthCard className="p-8 text-center h-full">
                  <h3 className="text-xl font-bold mb-2">{industry}</h3>
                  <p className="text-slate-400 mb-6">
                    {industryProjects.length} project{industryProjects.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {industryProjects.map(p => (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="text-xs px-3 py-1 rounded-full bg-panel-5 hover:bg-primary/30 text-slate-300 hover:text-primary transition-all border border-panel-10 hover:border-primary/50"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </DepthCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <DepthCard className="p-8 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{projects.length}</div>
          <p className="text-slate-400">Projects Delivered</p>
        </DepthCard>
        <DepthCard className="p-8 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{industriesList.length}</div>
          <p className="text-slate-400">Industries Served</p>
        </DepthCard>
        <DepthCard className="p-8 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{servicesList.length}</div>
          <p className="text-slate-400">Technologies Used</p>
        </DepthCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-12 border-t border-panel-10"
      >
        <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
        <p className="text-slate-400 mb-8">
          Interested in what we can build together?
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/projects"
            className="px-8 py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-semibold transition-all border border-primary/50"
          >
            View All Projects
          </Link>
          <Link 
            href="/contact"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-primary hover:from-cyan-600 hover:to-primary text-white font-semibold transition-all"
          >
            Let's Talk
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
