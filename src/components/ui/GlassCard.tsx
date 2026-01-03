'use client';

import React from 'react';
import { motion } from 'framer-motion';
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  delay?: number;
}
export function GlassCard({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  delay = 0
}: GlassCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5,
    delay
  }} whileHover={hoverEffect ? {
    y: -5,
    scale: 1.01,
    backgroundColor: 'rgba(var(--color-white), 0.08)',
    borderColor: 'rgba(var(--color-white), 0.25)'
  } : undefined} onClick={onClick} className={`
        relative overflow-hidden rounded-2xl
        bg-panel-5 backdrop-blur-xl
        border border-panel-10
        shadow-lg shadow-black/20
        transition-colors duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}>
    {/* Subtle gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

    {/* Content */}
    <div className="relative z-10  ">{children}</div>
  </motion.div>;
}