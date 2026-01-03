'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Rocket, Building2, RefreshCw, ArrowRight } from 'lucide-react';

export default function SolutionsPage() {
  const solutions = [
    {
      icon: <Rocket className="w-10 h-10 text-yellow-400" />,
      title: 'Startup MVP',
      target: 'Founders & Early Stage',
      description: 'Go from idea to market-ready product in weeks, not months. We focus on core value, scalability, and user feedback loops.',
      features: ['Rapid Prototyping', 'Scalable Foundation', 'Cost-effective Stack', 'User Analytics']
    },
    {
      icon: <Building2 className="w-10 h-10 text-cyan-400" />,
      title: 'Enterprise Systems',
      target: 'Large Organizations',
      description: 'Mission-critical software for complex business processes. High availability, strict security compliance, and seamless integration.',
      features: ['SSO & Security', 'Legacy Integration', 'SLA Guarantees', 'Audit Logs']
    },
    {
      icon: <RefreshCw className="w-10 h-10 text-purple-400" />,
      title: 'Digital Transformation',
      target: 'Growing Businesses',
      description: 'Modernize legacy systems and automate manual workflows. We help established businesses become tech-forward competitors.',
      features: ['Cloud Migration', 'Process Automation', 'Data Digitization', 'Staff Training']
    }
  ];

  return (
    <div className="pt-24 pb-20 site-padding max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
          Tailored Solutions
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          We adapt our engineering approach to match your business stage and
          goals.
        </p>
      </div>

      <div className="space-y-12">
        {solutions.map((solution, index) => (
          <GlassCard key={index} className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-panel-5 rounded-xl border border-panel-10">
                    {solution.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      {solution.title}
                    </h2>
                    <p className="text-cyan-400 font-medium">
                      {solution.target}
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  {solution.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {solution.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-slate-400">
                      <div className="w-1.5 h-1.5 bg-panel-30 rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-panel-10 pt-8 md:pt-0 md:pl-8">
                <p className="text-slate-400 mb-6 text-sm md:text-right">
                  Ready to implement this solution for your business?
                </p>
                <Link href="/contact">
                  <Button rightIcon={<ArrowRight size={16} />}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
