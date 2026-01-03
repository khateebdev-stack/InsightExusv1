'use client';

import architectureData from '@/content/architecture.json';
import { Layers, Shield, Zap, Database, Globe, Lock, ArrowDown, Cpu, Network, Server, Share2, CircleDot } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  Layers,
  Shield,
  Zap,
  Database,
  Globe,
  Lock,
  Cpu,
  Network,
  Server,
  Share2,
  CircleDot
};

const getTheme = (color: string) => {
  switch (color) {
    case 'cyan': return {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500',
      glow: 'shadow-cyan-500/20',
      gradient: 'from-cyan-500',
    };
    case 'purple': return {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500',
      glow: 'shadow-purple-500/20',
      gradient: 'from-purple-500',
    };
    case 'blue': return {
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500',
      glow: 'shadow-blue-500/20',
      gradient: 'from-blue-500',
    };
    default: return {
      text: 'text-primary',
      border: 'border-white/10',
      bg: 'bg-white',
      glow: 'shadow-white/5',
      gradient: 'from-white',
    };
  }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function ArchitecturePage() {
  const { hero, layers, principles, strategy } = architectureData;

  return (
    <div className="min-h-screen bg-header pt-24 pb-20 overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-panel-10 border border-panel-20 text-xs font-mono text-[rgb(var(--accent-cyan))]"
          >
            <span className="w-2 h-2 rounded-full bg-[rgb(var(--accent-cyan))] animate-pulse" />
            SYSTEM_BLUEPRINT_V2.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight"
          >
            {hero.titlePrefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--accent-cyan))] to-blue-600">
              {hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      {/* Architecture Interaction Design - Circuit Flow */}
      <section className="container mx-auto px-4 mb-24 relative z-10">
        <div className="max-w-6xl mx-auto relative">

          {/* Main Vertical Spine */}
          <div className="absolute left-6 md:left-[35%] top-4 bottom-12 w-0.5 bg-panel-20">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--accent-cyan))] via-purple-500 to-blue-500 opacity-50" />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-16 md:space-y-24"
          >
            {layers.map((layer, index) => {
              const theme = getTheme(layer.color);
              return (
                <motion.div key={index} variants={item} className="relative flex flex-col md:flex-row gap-8 md:gap-16">

                  {/* Layer Node on Spine */}
                  <div className=" sm:visible hidden absolute left-[1.15rem] md:left-[35%] md:-translate-x-1/2 top-8 md:top-8 w-4 h-4 rounded-full bg-header border-4 border-panel-20 z-20 channel-node">
                    <div className={`absolute inset-0 rounded-full ${theme.bg} opacity-20 animate-ping`} />
                    <div className={`absolute inset-0.5 rounded-full ${theme.bg}`} />
                  </div>

                  {/* Left Side: Header & Metadata (Desktop Right Align) */}
                  <div className="pl-16 md:pl-0 md:w-[35%] md:text-right md:pr-12 pt-4 relative">
                    <div className="md:hidden absolute left-6 top-10 w-8 h-px bg-gradient-to-r from-panel-20 to-transparent" /> {/* Mobile Horz Line */}

                    <span className={`text-xs font-bold font-mono tracking-widest mb-2 block ${theme.text}`}>
                      LAYER 0{index + 1}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">{layer.name}</h2>
                    <p className="text-sm text-secondary hidden md:block max-w-xs ml-auto">
                      {index === 0 ? "User Interface & Edge" : index === 1 ? "Business Logic & Integration" : "Persistence & Security"}
                    </p>
                  </div>

                  {/* Right Side: Components Grid */}
                  <div className="pl-16 md:pl-0 md:w-[65%] relative">
                    {/* Desktop Horizontal Connection */}
                    <div className={`hidden md:block absolute left-0 top-10 w-12 h-px bg-gradient-to-r ${theme.gradient} to-transparent opacity-50`} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {layer.components.map((comp, cIdx) => {
                        const Icon = iconMap[comp.icon];
                        return (
                          <div
                            key={cIdx}
                            className={`group p-5 rounded-2xl bg-panel-5 border border-panel-10 hover:${theme.border} transition-all duration-300 relative overflow-hidden`}
                          >
                            {/* Holographic Glow */}
                            <div className={`sm:visible hidden absolute -top-10 -right-10 w-32 h-32 ${theme.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                            <div className="flex items-start gap-4 relative z-10">
                              <div className={`p-3 rounded-xl bg-panel-10 group-hover:bg-panel-20 transition-colors ${theme.text}`}>
                                {Icon ? <Icon size={24} /> : <CircleDot size={24} />}
                              </div>
                              <div>
                                <h3 className="text-base font-bold text-primary mb-1 group-hover:text-white transition-colors">
                                  {comp.title}
                                </h3>
                                <p className="text-xs text-secondary leading-relaxed group-hover:text-slate-300">
                                  {comp.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Principles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-panel-5 to-panel-10 border border-panel-20 p-8 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-32 bg-[rgb(var(--accent-cyan))]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-[rgb(var(--accent-cyan))]/10 rounded-xl text-[rgb(var(--accent-cyan))]">
                <Cpu size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">{principles.title}</h2>
                <p className="text-sm text-secondary">Core engineering values</p>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {principles.items.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-panel-5/50 border border-panel-10 hover:border-[rgb(var(--accent-cyan))]/30 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[rgb(var(--accent-cyan))]/10 text-[rgb(var(--accent-cyan))] text-xs font-mono">
                    {i + 1}
                  </span>
                  <span className="text-secondary font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Strategy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-panel-5 to-panel-10 border border-panel-20 p-8 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                <Network size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">{strategy.title}</h2>
                <p className="text-sm text-secondary">DevOps & Infrastructure</p>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {strategy.items.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-panel-5/50 border border-panel-10 hover:border-purple-500/30 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
                    <ArrowDown size={14} />
                  </div>
                  <span className="text-secondary font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
