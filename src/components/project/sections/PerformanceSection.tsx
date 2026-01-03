import React from 'react';
import { SectionWrapper } from '../shared/SectionWrapper';

interface PerformanceMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

interface PerformanceSectionProps {
  data: {
    visibility?: boolean;
    beforeAfter: PerformanceMetric[];
    benchmarks?: string;
  };
  visible?: boolean;
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export function PerformanceSection({ 
  data,
  visible = true,
  variant = 'default',
  className = ''
}: PerformanceSectionProps) {
  if (!visible || !data || data.visibility === false) return null;

  const metricsToShow = variant === 'compact' 
    ? data.beforeAfter.slice(0, 3) 
    : data.beforeAfter;

  return (
    <SectionWrapper className={className}>
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
        Performance Impact
      </h2>

      {/* Before/After Grid */}
      <div className={`grid ${variant === 'compact' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
        {metricsToShow.map((metric, index) => (
          <div key={index} className="bg-panel-5 border border-panel-10 rounded-xl p-6 hover:border-accent-blue/30 transition-colors">
            <div className="text-sm text-slate-400 mb-3">{metric.metric}</div>
            
            {variant !== 'inline' && (
              <div className="space-y-2 mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-500">Before:</span>
                  <span className="text-slate-300">{metric.before}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-500">After:</span>
                  <span className="text-slate-200 font-semibold">{metric.after}</span>
                </div>
              </div>
            )}
            
            <div className="text-2xl font-bold text-accent-blue">
              {metric.improvement}
            </div>
          </div>
        ))}
      </div>

      {/* Benchmark */}
      {data.benchmarks && variant === 'default' && (
        <div className="mt-8 p-4 bg-accent-blue/5 border border-accent-blue/20 rounded-xl">
          <p className="text-slate-300 text-center">
            <span className="text-accent-blue font-semibold">Industry Benchmark: </span>
            {data.benchmarks}
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
