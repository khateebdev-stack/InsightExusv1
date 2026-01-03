import React from 'react';

interface BadgeListProps {
  items: string[];
  variant?: 'default' | 'compact' | 'colored';
  className?: string;
}

export function BadgeList({ 
  items, 
  variant = 'default',
  className = '' 
}: BadgeListProps) {
  const badgeClasses = variant === 'colored'
    ? 'px-3 py-1.5 bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
    : variant === 'compact'
    ? 'px-2 py-1 text-xs bg-panel-5 text-slate-300 border border-panel-10'
    : 'px-4 py-2 bg-panel-5 text-slate-200 border border-panel-10';

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item, index) => (
        <span 
          key={index}
          className={`${badgeClasses} rounded-lg hover:border-accent-blue/40 transition-colors`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
