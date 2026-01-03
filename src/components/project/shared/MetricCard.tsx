import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export function MetricCard({ 
  label, 
  value, 
  unit = '', 
  variant = 'default',
  className = '' 
}: MetricCardProps) {
  const isCompact = variant === 'compact';
  const isInline = variant === 'inline';

  if (isInline) {
    return (
      <span className={`inline-flex items-baseline gap-1 ${className}`}>
        <span className="font-bold text-accent-blue">{value}{unit}</span>
        <span className="text-sm text-slate-400">{label}</span>
      </span>
    );
  }

  return (
    <div className={`
      ${isCompact ? 'p-4' : 'p-6'} 
      bg-panel-5 border border-panel-10 rounded-xl
      hover:border-accent-blue/30 transition-colors
      ${className}
    `}>
      <div className={`${isCompact ? 'text-2xl' : 'text-3xl'} font-bold text-accent-blue mb-2`}>
        {value}{unit}
      </div>
      <div className={`${isCompact ? 'text-sm' : 'text-base'} text-slate-300`}>
        {label}
      </div>
    </div>
  );
}
