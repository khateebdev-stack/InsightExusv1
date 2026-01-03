import React from 'react';
import { SectionWrapper } from '../shared/SectionWrapper';

interface ROISectionProps {
  data: {
    visibility?: boolean;
    paybackPeriod: string;
    yearOneValue: string;
    threeYearProjection: string;
    costBreakdown?: {
      software: string;
      infrastructure: string;
      support: string;
    };
  };
  visible?: boolean;
  variant?: 'default' | 'compact' | 'highlight';
  className?: string;
}

export function ROISection({ 
  data,
  visible = true,
  variant = 'default',
  className = ''
}: ROISectionProps) {
  if (!visible || !data || data.visibility === false) return null;

  const isHighlight = variant === 'highlight';

  return (
    <SectionWrapper className={className}>
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
        Return on Investment
      </h2>

      {/* Key ROI Metrics */}
      <div className={`grid ${variant === 'compact' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'} gap-6 mb-8`}>
        <div className={`p-6 rounded-xl ${isHighlight ? 'bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border-2 border-accent-blue' : 'bg-panel-5 border border-panel-10'}`}>
          <div className="text-sm text-slate-400 mb-2">Payback Period</div>
          <div className="text-3xl font-bold text-accent-blue">{data.paybackPeriod}</div>
        </div>
        
        <div className="p-6 bg-panel-5 border border-panel-10 rounded-xl">
          <div className="text-sm text-slate-400 mb-2">Year 1 Value</div>
          <div className="text-3xl font-bold text-accent-blue">{data.yearOneValue}</div>
        </div>
        
        {variant !== 'compact' && (
          <div className="p-6 bg-panel-5 border border-panel-10 rounded-xl">
            <div className="text-sm text-slate-400 mb-2">3-Year Projection</div>
            <div className="text-3xl font-bold text-accent-blue">{data.threeYearProjection}</div>
          </div>
        )}
      </div>

      {/* Cost Breakdown */}
      {data.costBreakdown && variant === 'default' && (
        <div className="bg-panel-5 border border-panel-10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Cost Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Initial Development</span>
              <span className="text-slate-200 font-semibold">{data.costBreakdown.software}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Infrastructure (annual)</span>
              <span className="text-slate-200 font-semibold">{data.costBreakdown.infrastructure}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Support (optional, annual)</span>
              <span className="text-slate-200 font-semibold">{data.costBreakdown.support}</span>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
