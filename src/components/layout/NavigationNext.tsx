'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Search as SearchIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import Image from 'next/image';
import navigationData from '@/content/navigation.json';
import { SearchModal } from '../features/SearchModal';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const stored = (() => {
      try { return localStorage.getItem('theme'); } catch { return null; }
    })();
    const prefersLight = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = stored === 'light' || stored === 'dark' ? stored : (prefersLight ? 'light' : 'dark');
    root.dataset.theme = initial;
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      const root = document.documentElement;
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { }
      return next;
    });
  };

  const navLinks = navigationData.navbar.filter(link => link.visible);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-header-80 backdrop-blur-sm backdrop-saturate-50 border-panel-10 shadow-lg shadow-black/5' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto site-padding">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={navigationData.logo.path}
                alt={navigationData.logo.alt}
                width={32}
                height={32}
                className="rounded-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all"
              />
              <span className="text-xl font-bold text-gradient">Insightexus</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.path as any}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === link.path ? 'text-cyan-400' : 'text-secondary'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-md text-secondary hover:text-cyan-400 transition-colors"
              >
                <SearchIcon size={18} />
              </button>

              {navigationData.header?.themeToggle !== false && (
                <button
                  aria-label="Toggle theme"
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-secondary hover:text-primary"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              )}

              {navigationData.header?.contactButton?.visible && (
                <Link href={navigationData.header.contactButton.path as any}>
                  <Button variant={(navigationData.header.contactButton.variant || 'glass') as any} size="sm">{navigationData.header.contactButton.label || 'Contact'}</Button>
                </Link>
              )}

              {navigationData.header?.hireButton?.visible && (
                <Link href={navigationData.header.hireButton.path as any}>
                  <Button variant={(navigationData.header.hireButton.variant || 'primary') as any} size="sm">{navigationData.header.hireButton.label || 'Hire Us'}</Button>
                </Link>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-md text-secondary hover:text-cyan-400 transition-colors"
              >
                <SearchIcon size={20} />
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-secondary hover:text-primary p-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

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
                  <Link
                    key={link.name}
                    href={link.path as any}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-3 rounded-lg text-base font-medium ${pathname === link.path ? 'bg-panel-10 text-cyan-400' : 'text-secondary hover:bg-panel-5 hover:text-primary'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 grid grid-cols-2 gap-4">
                  {navigationData.header?.contactButton?.visible ? (
                    <Link href={navigationData.header.contactButton.path as any} className="w-full">
                      <Button variant={(navigationData.header.contactButton.variant || 'glass') as any} className="w-full">{navigationData.header.contactButton.label || 'Contact'}</Button>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {navigationData.header?.hireButton?.visible ? (
                    <Link href={navigationData.header.hireButton.path as any} className="w-full">
                      <Button variant={(navigationData.header.hireButton.variant || 'primary') as any} className="w-full">{navigationData.header.hireButton.label || 'Hire Us'}</Button>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
