import React from 'react';
import { motion } from 'framer-motion';
interface DepthCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  hoverEffect?: boolean;
}
export function DepthCard({
  children,
  className = '',
  delay = 0,
  onClick,
  hoverEffect = true
}: DepthCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: '-50px'
  }} transition={{
    duration: 0.5,
    delay: delay,
    type: 'spring',
    stiffness: 100
  }} whileHover={hoverEffect ? {
    y: -10,
    scale: 1.02,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  } : undefined} onClick={onClick} className={`bg-panel-5 rounded-xl shadow-xl overflow-hidden
        border border-panel-10 relative z-10
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}>
      {children}
    </motion.div>;
}