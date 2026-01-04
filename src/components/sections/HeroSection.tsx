import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Layers, Cpu, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { TypewriterText } from '../ui/TypewriterText';

export interface HeroSectionProps {
  badge?: string;
  statements?: string[];
  description?: string;
  ctaButtons?: Array<{
    label: string;
    link: string;
    variant?: 'default' | 'glass';
  }>;
  trustSignals?: Array<{
    icon: React.ReactNode;
    label: string;
    color: string;
  }>;
  showFloatingPanels?: boolean;
}

export function HeroSection({
  badge = "Enterprise-Grade Engineering",
  statements = [
    'Engineering Scalable Digital Systems',
    'From Idea to Enterprise-Grade Execution',
    'Architecting Web, Mobile, Cloud & AI Solutions'
  ],
  description = "A professional technology partner for startups and enterprises. We build high-performance systems that scale with your ambition.",
  ctaButtons = [
    { label: "Start a Project", link: "/contact", variant: "default" },
    { label: "Explore Services", link: "/services", variant: "glass" }
  ],
  trustSignals = [
    { icon: <Shield size={14} className="text-cyan-500 flex-shrink-0" />, label: "Enterprise Security", color: "cyan" },
    { icon: <Zap size={14} className="text-purple-500 flex-shrink-0" />, label: "High Performance", color: "purple" },
    { icon: <Layers size={14} className="text-blue-500 flex-shrink-0" />, label: "Scalable Architecture", color: "blue" }
  ],
  showFloatingPanels = true
}: HeroSectionProps) {
  const [statementIndex, setStatementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatementIndex(prev => (prev + 1) % statements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [statements.length]);

  return (
    <section className="relative pt-4 pb-8 md:pt-8 md:pb-12 lg:pt-12 lg:pb-20 md:min-h-[90vh] flex items-center justify-center site-padding overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* Left Column: Text */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs md:text-sm font-medium mb-4 md:mb-6 backdrop-blur-md">
              {badge}
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold leading-tight tracking-tight text-primary mb-4 md:mb-6 min-h-[80px] md:min-h-[110px] lg:min-h-[160px]">
              <TypewriterText
                key={statementIndex}
                text={statements[statementIndex]}
                className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
              />
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-400 max-w-xl leading-relaxed">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
          >
            {ctaButtons.map((btn, i) => (
              <Link key={i} href={btn.link as any} className="w-full sm:w-auto">
                <Button
                  size="md"
                  variant={btn.variant as any}
                  rightIcon={<ArrowRight size={16} />}
                  className="w-full sm:w-auto"
                >
                  {btn.label}
                </Button>
              </Link>
            ))}
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4 md:pt-8 border-t border-panel-10 flex flex-col md:flex-row gap-3 md:gap-8 text-slate-500 text-xs md:text-sm font-medium"
          >
            {trustSignals.map((signal, i) => (
              <div key={i} className="flex items-center gap-2">
                {signal.icon}
                <span>{signal.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Visual - Floating Panels */}
        {showFloatingPanels && (
          <div className="relative hidden md:block h-[300px] lg:h-[500px]">
            {/* Panel 1: Code */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-2 md:top-10 right-4 md:right-10 z-20 w-[calc(100%-2rem)] md:w-72"
            >
              <GlassCard className="w-full p-4 md:p-6 backdrop-blur-2xl bg-panel-10 border-panel-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Code size={20} />
                  </div>
                  <div className="h-2 w-24 bg-panel-20 rounded-full" />
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-panel-10 rounded-full" />
                  <div className="h-2 w-3/4 bg-panel-10 rounded-full" />
                  <div className="h-2 w-5/6 bg-panel-10 rounded-full" />
                </div>
              </GlassCard>
            </motion.div>

            {/* Panel 2: Computing */}
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-40 left-4 md:left-10 z-10 w-[calc(100%-2rem)] md:w-64"
            >
              <GlassCard className="w-full p-4 md:p-6 backdrop-blur-xl bg-purple-500/10 border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    <Cpu size={20} />
                  </div>
                  <div className="h-2 w-20 bg-panel-20 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-8 rounded bg-panel-5" />
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Panel 3: System Status */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-20 right-4 md:right-32 z-30 w-[calc(100%-2rem)] md:w-80"
            >
              <GlassCard className="w-full p-4 md:p-6 backdrop-blur-2xl bg-blue-500/10 border-blue-500/20">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <div className="text-sm font-medium text-primary">System Status</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div className="text-xs text-green-400">Operational</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>API Latency</span>
                      <span>24ms</span>
                    </div>
                    <div className="h-1 w-full bg-panel-10 rounded-full overflow-hidden">
                      <div className="h-full w-[24%] bg-green-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Uptime</span>
                      <span>99.99%</span>
                    </div>
                    <div className="h-1 w-full bg-panel-10 rounded-full overflow-hidden">
                      <div className="h-full w-[99%] bg-cyan-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
