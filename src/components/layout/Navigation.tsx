import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // initialize theme from localStorage (run once client-side)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) document.documentElement.dataset.theme = saved;
    } catch (e) { }
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [{
    name: 'Services',
    path: '/services'
  }, {
    name: 'Solutions',
    path: '/solutions'
  }, {
    name: 'Architecture',
    path: '/architecture'
  }, {
    name: 'Work',
    path: '/portfolio'
  }, {
    name: 'Company',
    path: '/about'
  }];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-header-80 backdrop-blur-sm backdrop-saturate-50 border-panel-10 shadow-lg shadow-black/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto site-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-primary font-bold text-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              I
            </div>
            <span className="text-xl font-bold text-gradient">
              Insightexus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link key={link.name} href={link.path as any} className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === link.path ? 'text-cyan-400' : 'text-secondary'}`}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              aria-label="Toggle theme"
              onClick={() => {
                const root = document.documentElement;
                const next = root.dataset.theme === 'light' ? 'dark' : 'light';
                root.dataset.theme = next;
                try { localStorage.setItem('theme', next); } catch (e) { }
              }}
              className="p-2 rounded-md text-secondary hover:text-primary"
            >
              {typeof document !== 'undefined' && document.documentElement?.dataset?.theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link href="/contact">
              <Button variant="glass" size="sm">
                Contact Us
              </Button>
            </Link>
            <Link href="/recruiters">
              <Button variant="primary" size="sm">
                Hire Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary hover:text-primary p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-header-95 backdrop-blur-xl border-b border-panel-10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map(link => (
                <Link key={link.name} href={link.path as any} className={`block px-3 py-3 rounded-lg text-base font-medium ${pathname === link.path ? 'bg-panel-10 text-cyan-400' : 'text-secondary hover:bg-panel-5 hover:text-primary'}`}>
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 grid grid-cols-2 gap-4">
                <Link href="/contact" className="w-full">
                  <Button variant="glass" className="w-full">
                    Contact
                  </Button>
                </Link>
                <Link href="/recruiters" className="w-full">
                  <Button variant="primary" className="w-full">
                    Hire Us
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}