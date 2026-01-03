'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Cloud, Cpu, Database, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import servicesData from '@/content/services.json';

const iconComponents: Record<string, any> = {
  Code,
  Smartphone,
  Cloud,
  Cpu,
  Database,
  Lock,
};

export default function ServicesPage() {
  const services = servicesData.services.filter((service) => service.visibility === true);
  
  return (
    <div className="pt-24 pb-20 site-padding max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-primary mb-6"
        >
          Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Expertise
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-400 max-w-3xl mx-auto"
        >
          Comprehensive engineering services designed to take your project from
          concept to enterprise-scale reality.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComponent = iconComponents[service.icon];
          return (
            <GlassCard
              key={index}
              hoverEffect
              delay={index * 0.1}
              className="p-8 flex flex-col h-full"
            >
              <div className="mb-6 p-3 bg-panel-5 rounded-xl w-fit border border-panel-10">
                {IconComponent && (
                  <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                )}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-slate-400 mb-6 flex-grow">
                {service.shortDescription}
              </p>

              <div className="space-y-2 mb-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link href={`/services/${service.slug}` as any} className="mt-auto">
                <Button variant="outline" size="sm" className="w-full group">
                  Learn More{' '}
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </GlassCard>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center py-12 border-t border-panel-10"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-slate-400 mb-8">
          Let's discuss how we can help bring your vision to life.
        </p>
        <Link href="/contact">
          <Button size="lg">
            Get in Touch
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
