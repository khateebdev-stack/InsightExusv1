import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  variant?: 'default' | 'accent' | 'muted' | 'white';
}
export function TypewriterText({
  text,
  className = '',
  delay = 0,
  variant = 'default'
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
    const startTyping = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(startTyping, 50 + Math.random() * 30); // Randomize slightly for realism
      } else {
        setIsComplete(true);
      }
    };
    const initialDelay = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, delay]);
  // Choose gradient/text style based on variant
  const gradientClass = variant === 'accent'
    ? 'text-gradient-accent bg-clip-text text-transparent'
    : 'typewriter-gradient typewriter-shadow';
  const plainTextClass = variant === 'muted'
    ? 'text-secondary'
    : variant === 'white'
    ? 'text-primary'
    : '';

  return <span className={`${className} inline-block ${plainTextClass || gradientClass}`}>
      {displayedText}
      <motion.span animate={{
      opacity: [1, 0]
    }} transition={{
      duration: 0.8,
      repeat: Infinity,
      ease: 'linear'
    }} className={`inline-block w-[2px] h-[1em] typewriter-caret ml-1 align-middle ${isComplete ? 'hidden' : ''}`} />
    </span>;
}