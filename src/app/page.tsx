'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Layers, Cpu, Shield, Zap, Smartphone, Cloud, Database, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { CTASection } from '@/components/sections/CTASection';
import heroData from '@/content/hero.json';
import servicesData from '@/content/services.json';
import benefitsData from '@/content/homepage-benefits.json';
import projectsData from '@/content/projects.json';
import techStackData from '@/content/tech-stack.json';
import processData from '@/content/process.json';
import testimonialsData from '@/content/testimonials.json';

const iconMap: Record<string, any> = {
  ArrowRight,
  Code,
  Layers,
  Cpu,
  Shield,
  Zap,
  Smartphone,
  Cloud,
  Database,
  Lock
};

export default function HomePage() {
  const hero = heroData.hero;
  const [statementIndex, setStatementIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const PrimaryIcon = iconMap[hero.buttons?.primary?.icon];

  useEffect(() => {
    if (hero.typewriterStatements.visible && hero.typewriterStatements.statements.length > 0) {
      const interval = setInterval(() => {
        setStatementIndex(prev => (prev + 1) % hero.typewriterStatements.statements.length);
      }, hero.typewriterStatements.intervalMs || 5000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const featuredTestimonials = testimonialsData.testimonials.filter((t: any) => t.visibility && t.featured);
    if (featuredTestimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % featuredTestimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!hero.visible) return null;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-40 lg:pb-24 min-h-screen md:min-h-[90vh] flex items-center justify-center site-padding overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-0 md:gap-6 lg:gap-12 items-center">
          {/* Left Column: Text */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {hero.badge.visible && (
                <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs md:text-sm font-medium mb-4 md:mb-6 backdrop-blur-md">
                  {hero.badge.text}
                </span>
              )}
              {hero.typewriterStatements.visible && hero.typewriterStatements.statements.length > 0 && (
                <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold leading-tight tracking-tight text-primary mb-4 md:mb-6 min-h-[80px] md:min-h-[110px] lg:min-h-[160px]">
                  <TypewriterText
                    key={statementIndex}
                    text={hero.typewriterStatements.statements[statementIndex]}
                  />
                </h1>
              )}
              {hero.description.visible && (
                <p className="text-base md:text-lg lg:text-xl text-slate-400 max-w-xl leading-relaxed">
                  {hero.description.text}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
            >
              {hero.buttons.visible && (
                <>
                  {hero.buttons.primary.visible && (
                    <Link href={hero.buttons.primary.link as any} className="w-full sm:w-auto">
                      <Button 
                        size="md" 
                        rightIcon={PrimaryIcon ? <PrimaryIcon size={16} /> : undefined} 
                        className="w-full sm:w-auto"
                      >
                        {hero.buttons.primary.label}
                      </Button>
                    </Link>
                  )}
                  {hero.buttons.secondary.visible && (
                    <Link href={hero.buttons.secondary.link as any} className="w-full sm:w-auto">
                      <Button variant="glass" size="md" className="w-full sm:w-auto">
                        {hero.buttons.secondary.label}
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </motion.div>

            {/* Trust Signals */}
            {hero.trustSignals.visible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4 md:pt-8 border-t border-panel-10 flex flex-col md:flex-row gap-3 md:gap-8 text-slate-500 text-xs md:text-sm font-medium"
              >
                {hero.trustSignals.items.filter((item: any) => item.visible).map((item: any, index: number) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <div key={index} className="flex items-center gap-2">
                      {Icon && <Icon size={14} className={`${item.iconColor} flex-shrink-0`} />}
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Right Column: Visual */}
          {hero.floatingCards.visible && (
            <div className="relative hidden md:block h-[300px] lg:h-[500px]">
              {hero.floatingCards.card1.visible && (
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-2 md:top-10 right-4 md:right-10 z-20 w-[calc(100%-2rem)] md:w-72"
                >
                  <GlassCard className="w-full p-4 md:p-6 backdrop-blur-2xl bg-panel-10 border-panel-20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${hero.floatingCards.card1.iconBg} ${hero.floatingCards.card1.iconColor}`}>
                        {(() => { const Icon = iconMap[hero.floatingCards.card1.icon]; return Icon ? <Icon size={20} /> : null; })()}
                      </div>
                      {hero.floatingCards.card1.content?.visible && (
                        <div>
                          <div className="text-sm font-semibold text-primary">{hero.floatingCards.card1.content.title}</div>
                          <div className="text-xs text-slate-500">{hero.floatingCards.card1.content.subtitle}</div>
                        </div>
                      )}
                    </div>
                    {hero.floatingCards.card1.content?.visible ? (
                      <div className="space-y-2">
                        {hero.floatingCards.card1.content.bullets?.filter((b: any) => b.visible).map((b: any, i: number) => (
                          <div key={i} className="flex items-center text-xs text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2" />
                            {b.text}
                          </div>
                        ))}
                        {hero.floatingCards.card1.content.cta?.visible && (
                          <div className="pt-3">
                            <Link href={hero.floatingCards.card1.content.cta.link as any} className="text-xs text-cyan-400 hover:text-cyan-300">
                              {hero.floatingCards.card1.content.cta.label}
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="h-2 w-full bg-panel-10 rounded-full" />
                        <div className="h-2 w-3/4 bg-panel-10 rounded-full" />
                        <div className="h-2 w-5/6 bg-panel-10 rounded-full" />
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}

              {hero.floatingCards.card2.visible && (
                <motion.div
                  animate={{ y: [0, 30, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-10 left-10 z-10 w-72"
                >
                  <GlassCard className="p-6 backdrop-blur-2xl bg-panel-5 border-panel-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${hero.floatingCards.card2.iconBg} ${hero.floatingCards.card2.iconColor}`}>
                        {(() => { const Icon = iconMap[hero.floatingCards.card2.icon]; return Icon ? <Icon size={20} /> : null; })()}
                      </div>
                      {hero.floatingCards.card2.content?.visible && (
                        <div>
                          <div className="text-sm font-semibold text-primary">{hero.floatingCards.card2.content.title}</div>
                          <div className="text-xs text-slate-500">{hero.floatingCards.card2.content.subtitle}</div>
                        </div>
                      )}
                    </div>
                    {hero.floatingCards.card2.content?.visible ? (
                      <div className="grid grid-cols-3 gap-3">
                        {hero.floatingCards.card2.content.metrics?.filter((m: any) => m.visible).map((m: any, i: number) => (
                          <div key={i} className="rounded-lg bg-panel-10 p-3 text-center">
                            <div className="text-sm font-bold text-cyan-400">{m.value}</div>
                            <div className="text-[10px] text-slate-500">{m.label}</div>
                          </div>
                        ))}
                        {hero.floatingCards.card2.content.cta?.visible && (
                          <div className="col-span-3 text-center pt-2">
                            <Link href={hero.floatingCards.card2.content.cta.link as any} className="text-xs text-purple-400 hover:text-purple-300">
                              {hero.floatingCards.card2.content.cta.label}
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-16 bg-panel-10 rounded-lg" />
                        <div className="h-16 bg-panel-10 rounded-lg" />
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Services/Solutions Overview Section */}
      <section className="w-full py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[rgba(var(--color-bg),1)] via-[rgba(var(--color-bg),0.92)] to-[rgba(var(--color-bg),1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
              Our Core Capabilities
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-3xl mx-auto px-4">
              Engineering solutions across the full technology stack, from cloud infrastructure to AI-powered applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {servicesData.services.filter((service: any) => service.visibility).slice(0, 6).map((service: any, idx: number) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/services/${service.slug}`}>
                    <div className="group relative h-full p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-panel-10 to-panel-5 border border-panel-20 md:hover:border-cyan-500/50 transition-all duration-300 md:hover:shadow-xl md:hover:shadow-cyan-500/10 cursor-pointer">
                      <div className="absolute top-0 left-0 w-1 h-0 md:group-hover:h-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-l-2xl transition-all duration-300" />
                      
                      <div className="mb-4">
                        {Icon && (
                          <div className={`inline-block p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 md:group-hover:bg-cyan-500/20 md:group-hover:border-cyan-500/40 transition-all ${service.iconColor}`}>
                            <Icon size={24} />
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 md:group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-secondary mb-4">
                        {service.shortDescription}
                      </p>

                      <div className="space-y-2 mb-4 md:mb-6">
                        {service.features && service.features.slice(0, 3).map((feature: string, fidx: number) => (
                          <div key={fidx} className="flex items-center gap-2 text-xs sm:text-sm text-secondary">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 md:pt-4 border-t border-panel-20 flex items-center gap-2 text-cyan-400 md:group-hover:text-cyan-300 transition-colors">
                        <span className="text-xs sm:text-sm font-medium">Explore Service</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
              {benefitsData.whyChooseUs.headline}
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-3xl mx-auto px-4">
              {benefitsData.whyChooseUs.subheadline}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-20">
            {benefitsData.stats.filter((stat: any) => stat.visibility).map((stat: any, idx: number) => {
              const Icon = iconMap[stat.icon];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-panel-10 to-panel-5 border border-panel-20 text-center group hover:border-cyan-500/30 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    {Icon && (
                      <div className="inline-block mb-3 p-2 rounded-lg bg-cyan-500/10">
                        <Icon size={20} className="text-cyan-400" />
                      </div>
                    )}
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-primary mb-1 text-sm sm:text-base">{stat.label}</div>
                    <div className="text-xs text-secondary">{stat.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {benefitsData.benefits.filter((benefit: any) => benefit.visibility).map((benefit: any, idx: number) => {
              const Icon = iconMap[benefit.icon];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  viewport={{ once: true }}
                  className="group p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-panel-10 via-panel-5 to-panel-10 border border-panel-20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {Icon && (
                      <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 group-hover:from-cyan-500/30 group-hover:to-blue-500/20 transition-all flex-shrink-0">
                        <Icon size={20} className="text-cyan-400 sm:w-6 sm:h-6" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-cyan-400 transition-colors">
                        {benefit.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-secondary mb-4 sm:mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  <div className="space-y-2">
                    {benefit.highlights.map((highlight: string, hidx: number) => (
                      <div key={hidx} className="flex items-center gap-2 text-xs sm:text-sm text-secondary group-hover:text-secondary transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="w-full py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[rgba(var(--color-bg),1)] via-[rgba(var(--color-bg),0.92)] to-[rgba(var(--color-bg),1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
              Featured Case Studies
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-3xl mx-auto px-4">
              Real-world transformations and measurable business impact across industries
            </p>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {projectsData.projects.filter((project: any) => project.visibility).slice(0, 3).map((project: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                viewport={{ once: true }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="group relative rounded-lg sm:rounded-2xl overflow-hidden border border-panel-20 hover:border-cyan-500/40 transition-all duration-300">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-panel-10 via-panel-5 to-panel-10 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative p-6 sm:p-8 md:p-12">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start mb-6 md:mb-8">
                        {/* Left: Title & Industry */}
                        <div className="md:col-span-1">
                          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
                            {project.industry}
                          </div>
                          <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-cyan-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm sm:text-base text-secondary leading-relaxed mb-6">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 font-medium text-sm sm:text-base">
                            <span>View Case Study</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {/* Middle: Challenge & Solution */}
                        <div className="md:col-span-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                            <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-panel-10 border border-panel-20">
                              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
                                Challenge
                              </h4>
                              <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                                {project.challenge}
                              </p>
                            </div>
                            <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-panel-10 border border-panel-20">
                              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                                Solution
                              </h4>
                              <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                                {project.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Results Grid */}
                      <div className="pt-6 md:pt-8 border-t border-panel-20">
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 md:mb-6">
                          Measurable Results
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                          {project.metrics && project.metrics.filter((m: any) => m.visibility).map((metric: any, midx: number) => (
                            <div key={midx} className="text-center">
                              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                                {metric.value}
                                <span className="text-sm sm:text-lg">{metric.unit}</span>
                              </div>
                              <div className="text-xs text-secondary">{metric.label}</div>
                            </div>
                          ))}
                          {project.results && (
                            <>
                              <div className="text-center">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                                  {project.results.deploymentFrequency}
                                </div>
                                <div className="text-xs text-secondary">Deployment Frequency</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                                  {project.results.pageLoadTime}
                                </div>
                                <div className="text-xs text-secondary">Page Load Time</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                                  {project.results.uptime}
                                </div>
                                <div className="text-xs text-secondary">Uptime SLA</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                                  {project.results.userSatisfaction}
                                </div>
                                <div className="text-xs text-secondary">User Rating</div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-10 md:mt-12"
          >
            <Link href="/projects">
              <Button size="lg" variant="glass">
                View All Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="w-full py-16 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
              {techStackData.techStack.headline}
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-3xl mx-auto px-4">
              {techStackData.techStack.subheadline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {techStackData.categories.filter((cat: any) => cat.visibility).map((category: any, idx: number) => {
              const Icon = iconMap[category.icon];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-panel-10 via-panel-5 to-panel-10 border border-panel-20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {Icon && (
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Icon size={20} className="sm:w-6 sm:h-6" />
                      </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-cyan-400 transition-colors">
                      {category.category}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-secondary mb-6">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.technologies.map((tech: any, tidx: number) => (
                      <motion.div
                        key={tidx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tidx * 0.05 }}
                        viewport={{ once: true }}
                        className="px-3 sm:px-4 py-2 rounded-lg bg-panel-10 border border-panel-20 group-hover:border-cyan-500/30 hover:bg-panel-20 transition-all cursor-default"
                      >
                        <span className="text-base sm:text-lg mr-2">{tech.icon}</span>
                        <span className="text-xs font-semibold text-secondary group-hover:text-primary transition-colors">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process/How We Work Section */}
      <section className="w-full py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[rgba(var(--color-bg),1)] via-[rgba(var(--color-bg),0.92)] to-[rgba(var(--color-bg),1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
              {processData.process.headline}
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-3xl mx-auto px-4">
              {processData.process.subheadline}
            </p>
          </motion.div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Desktop timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-cyan-500/50" />

            <div className="space-y-10 md:space-y-12">
              {processData.steps.filter((step: any) => step.visibility).map((step: any, idx: number) => {
                const Icon = iconMap[step.icon];
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                  >
                    {/* Desktop layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
                      {/* Left side for even, right for odd */}
                      <div className={isEven ? '' : 'lg:col-start-2'}>
                        <div className="group relative p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-panel-10 to-panel-5 border border-panel-20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                          <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-l-2xl transition-all duration-300" />

                          <div className="flex items-start gap-4 mb-4">
                            {Icon && (
                              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex-shrink-0">
                                <Icon size={24} className="text-cyan-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
                                  Step {step.step}
                                </span>
                                <span className="text-xs text-secondary font-semibold">{step.duration}</span>
                              </div>
                              <h3 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-cyan-400 transition-colors">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-sm sm:text-base text-secondary mb-6 leading-relaxed">
                            {step.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-panel-20">
                            {step.deliverables.map((deliverable: string, didx: number) => (
                              <div key={didx} className="flex items-center gap-2 text-xs sm:text-sm text-secondary">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex-shrink-0" />
                                <span>{deliverable}</span>
                              </div>
                            ))}
                          </div>

                          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                            Key Activities: {step.highlights}
                          </div>
                        </div>
                      </div>

                      {/* Empty space for alignment */}
                      <div className={isEven ? 'lg:col-start-2' : ''} />
                    </div>

                    {/* Mobile layout */}
                    <div className="lg:hidden relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30">
                      {/* <div className="absolute left-[-9px] sm:left-[-10px] top-0 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[rgba(var(--color-bg),1)]" /> */}

                      <div className="p-5 sm:p-6 rounded-lg sm:rounded-xl bg-gradient-to-br from-panel-10 to-panel-5 border border-panel-20">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          {Icon && (
                            <div className="p-2 rounded-lg bg-cyan-500/10">
                              <Icon size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
                            </div>
                          )}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
                              Step {step.step}
                            </span>
                            <span className="text-xs text-secondary font-semibold">{step.duration}</span>
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
                          {step.title}
                        </h3>
                        <p className="text-secondary text-xs sm:text-sm mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="space-y-2 text-xs text-secondary">
                          {step.deliverables.map((deliverable: string, didx: number) => (
                            <div key={didx} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />
                              <span>{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="w-full py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[rgba(var(--color-bg),1)] via-[rgba(var(--color-bg),0.92)] to-[rgba(var(--color-bg),1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
              {testimonialsData.hero.headline}
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-3xl mx-auto px-4">
              {testimonialsData.hero.subheadline}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-16">
            {testimonialsData.stats.items.map((stat: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-panel-10 border border-panel-20 text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-1">
                  {stat.number}
                  <span className="text-sm sm:text-lg text-secondary">{stat.unit}</span>
                </div>
                <div className="text-xs sm:text-sm text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              {testimonialsData.testimonials.filter((t: any) => t.visibility && t.featured).length > 0 && (
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="p-6 sm:p-8 md:p-12 rounded-lg sm:rounded-2xl bg-gradient-to-br from-panel-10 via-panel-5 to-panel-10 border border-panel-20 shadow-xl shadow-cyan-500/5"
                >
                  {(() => {
                    const featured = testimonialsData.testimonials.filter((t: any) => t.visibility && t.featured);
                    const testimonial = featured[activeTestimonial];
                    
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                        {/* Left: Quote and Author */}
                        <div className="md:col-span-2">
                          <div className="flex gap-1 sm:gap-2 mb-4">
                            {[...Array(Math.round(testimonial.rating || 5))].map((_, i) => (
                              <span key={i} className="text-lg sm:text-xl text-yellow-400">★</span>
                            ))}
                          </div>

                          <blockquote className="text-base sm:text-lg md:text-xl text-primary mb-6 leading-relaxed italic">
                            "{testimonial.quote}"
                          </blockquote>

                          <div className="mb-6">
                            <div className="font-bold text-primary text-base sm:text-lg mb-1">
                              {testimonial.author}
                            </div>
                            <div className="text-secondary text-xs sm:text-sm">
                              {testimonial.role} at {testimonial.company}
                            </div>
                            <div className="inline-block mt-3 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                              {testimonial.industry}
                            </div>
                          </div>

                          <div className="pt-6 border-t border-panel-20">
                            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                              Results Achieved
                            </div>
                            <p className="text-secondary text-xs sm:text-sm">{testimonial.result}</p>
                          </div>
                        </div>

                        {/* Right: Avatar placeholder */}
                        <div className="hidden md:flex flex-col items-center text-center">
                          <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 flex items-center justify-center mb-4">
                            <div className="text-3xl sm:text-4xl">👤</div>
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-primary">
                            {testimonial.author.split(' ')[0]}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>

            {/* Carousel Controls */}
            {testimonialsData.testimonials.filter((t: any) => t.visibility && t.featured).length > 1 && (
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
                {testimonialsData.testimonials.filter((t: any) => t.visibility && t.featured).map((_, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeTestimonial
                        ? 'bg-cyan-400 w-6 sm:w-8'
                        : 'bg-panel-20 hover:bg-panel-30'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* All Testimonials Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-10 md:mt-12"
          >
            <Link href="/testimonials">
              <Button size="lg" variant="glass">
                Read All Client Stories
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
