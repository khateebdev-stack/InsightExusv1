import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ 
  children, 
  className = '', 
  id 
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`py-12 md:py-16 lg:py-20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {children}
      </div>
    </motion.section>
  );
}
