'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import aboutData from '@/content/about.json';

export default function AboutPage() {
  const { hero, mission, vision, values, history, team, expertise, cta } = aboutData;

  return (
    <main className="w-full bg-header text-primary">
      {/* Hero Section */}
      {hero.visibility && (
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--color-bg),0.35)] via-[rgba(var(--color-bg),0.85)] to-[rgba(var(--color-bg),1)]" />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 text-center max-w-5xl mx-auto"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-primary leading-tight">
                {hero.headline}
              </h1>
              <p className="text-xl text-secondary max-w-3xl leading-relaxed mx-auto">
                {hero.subheadline}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Mission & Vision Section */}
      <section className="w-full bg-gradient-to-b from-[rgba(var(--color-bg),1)] via-[rgba(var(--color-bg),0.92)] to-[rgba(var(--color-bg),1)] py-20">
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Mission */}
            {mission.visibility && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-4xl">{mission.icon}</span>
                  <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
                </div>
                <p className="text-lg text-secondary leading-relaxed">
                  {mission.description}
                </p>
              </motion.div>
            )}

            {/* Vision */}
            {vision.visibility && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-4xl">{vision.icon}</span>
                  <h2 className="text-3xl font-bold text-primary">Our Vision</h2>
                </div>
                <p className="text-lg text-secondary leading-relaxed">
                  {vision.description}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      {values.visibility && (
        <section className="w-full py-20">
          <div className="w-full max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold text-primary mb-2">
                {values.headline}
              </h2>
              <p className="text-secondary">
                Principles that define who we are and how we serve our clients
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.items.filter((item: any) => item.visibility).map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="group p-6 rounded-lg bg-panel-10 border border-panel-10 hover:border-cyan-500/50 hover:bg-panel-20 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Journey/Timeline Section */}
      {history.visibility && (
        <section className="w-full bg-gradient-to-b from-[rgba(var(--color-bg),1)] via-[rgba(var(--color-bg),0.9)] to-[rgba(var(--color-bg),1)] py-20">
          <div className="w-full max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-primary mb-4">
                {history.headline}
              </h2>
              <p className="text-secondary text-lg max-w-3xl mx-auto">
                {history.description}
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Timeline vertical line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-cyan-500/50" />
              
              <div className="space-y-12">
                {history.milestones.filter((item: any) => item.visibility).map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                  >
                    {/* Desktop layout - alternating sides */}
                    <div className={`hidden md:grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 0 ? '' : 'md:grid-flow-dense'}`}>
                      {/* Year badge - left side for even, right for odd */}
                      <div className={`flex ${idx % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12 md:col-start-2'}`}>
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-sm">
                          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            {item.year}
                          </div>
                        </div>
                      </div>
                      
                      {/* Content card */}
                      <div className={`${idx % 2 === 0 ? 'pl-12' : 'pr-12 md:col-start-1 md:row-start-1'}`}>
                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-panel-10 to-panel-5 border border-panel-20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-cyan-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-secondary leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mobile layout - simple stacked */}
                    <div className="md:hidden">
                      <div className="relative pl-8 border-l-2 border-cyan-500/30">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[rgba(var(--color-bg),1)]" />
                        
                        <div className="mb-3">
                          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400">
                            {item.year}
                          </span>
                        </div>
                        
                        <div className="p-6 rounded-xl bg-gradient-to-br from-panel-10 to-panel-5 border border-panel-20">
                          <h3 className="text-xl font-bold text-primary mb-2">
                            {item.title}
                          </h3>
                          <p className="text-secondary text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop center dot */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 ring-4 ring-[rgba(var(--color-bg),1)] shadow-lg shadow-cyan-500/50" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team.visibility && (
        <section className="w-full py-20">
          <div className="w-full max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold text-primary mb-2">
                {team.headline}
              </h2>
              {team.description && (
                <p className="text-secondary">
                  {team.description}
                </p>
              )}
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {team.stats.map((stat: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg bg-panel-10 border border-panel-10 text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-semibold text-primary mb-1">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <div className="text-xs text-secondary">
                      {stat.description}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Team Highlights */}
            {team.highlights && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {team.highlights.filter((h: any) => h.visibility).map((highlight: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-lg bg-panel-20 border border-panel-10"
                  >
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-secondary text-sm">
                      {highlight.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Expertise Section */}
      {expertise.visibility && (
        <section className="w-full bg-gradient-to-b from-[rgba(var(--color-bg),1)] via-[rgba(var(--color-bg),0.9)] to-[rgba(var(--color-bg),1)] py-20">
          <div className="w-full max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold text-primary mb-2">
                {expertise.headline}
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertise.areas.map((area: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg bg-panel-10 border border-panel-10 hover:border-cyan-500/50 transition-all"
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {area.count}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {area.title}
                  </h3>
                  <p className="text-sm text-secondary">
                    {area.unit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta.visibility && (
        <section className="w-full py-20">
          <div className="w-full max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  {cta.headline}
                </h2>
                <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                  {cta.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href={cta.primaryCta.href}>
                  <Button size="lg">
                    {cta.primaryCta.text}
                  </Button>
                </Link>
                {cta.secondaryCta && (
                  <Link href={cta.secondaryCta.href}>
                    <Button variant="secondary" size="lg">
                      {cta.secondaryCta.text}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
