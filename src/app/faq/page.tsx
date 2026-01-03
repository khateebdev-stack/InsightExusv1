'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check } from 'lucide-react';
import faqData from '@/content/faq.json';

// Types
interface FAQ {
    visibility: boolean;
    question: string;
    answer: string;
}

interface Category {
    visibility: boolean;
    category: string;
    icon: string;
    faqs: FAQ[];
}

interface Hero {
    visibility: boolean;
    headline: string;
    subheadline: string;
}

interface StillHaveQuestions {
    visibility: boolean;
    headline: string;
    description: string;
    cta: {
        text: string;
        href: string;
    };
    alternativeContact: string;
}

interface FAQData {
    hero: Hero;
    categories: Category[];
    stillHaveQuestions: StillHaveQuestions;
}

export default function FAQPage() {
    const data = faqData as any as FAQData;
    const { hero, categories, stillHaveQuestions } = data;

    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [openQuestionIndex, setOpenQuestionIndex] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const activeCategory = categories[activeCategoryIndex];

    return (
        <main className="min-h-screen bg-header text-primary w-full overflow-x-hidden">

            {/* Compact Hero Section */}
            {hero.visibility && (
                <section className="relative w-full px-4 pt-24 md:pt-32 pb-6 text-center overflow-hidden">
                    {/* Background Glow - strictly contained */}
                    <div className="absolute top-0 sm:visible hidden left-1/2 -translate-x-1/2 w-[200%] h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgb(var(--accent-cyan))]/10 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-3">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight px-2"
                        >
                            {hero.headline}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-secondary text-sm sm:text-lg leading-relaxed max-w-xl mx-auto px-2"
                        >
                            {hero.subheadline}
                        </motion.p>
                    </div>
                </section>
            )}

            {/* Filter Navigation */}
            <section className="px-4 pb-6 sticky top-16 z-30 bg-header/95 backdrop-blur-xl border-b border-panel-10 sm:border-none sm:bg-transparent sm:static w-full">
                <div className="max-w-3xl mx-auto w-full">

                    {/* MOBILE: Custom Dropdown for Premium UI */}
                    <div className="sm:hidden relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between bg-panel-10 border border-panel-20 rounded-xl px-4 py-3 text-primary font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-cyan))]/50 transition-all"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">{activeCategory.icon}</span>
                                <span>{activeCategory.category}</span>
                            </span>
                            <ChevronDown className={`w-5 h-5 text-secondary transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-header border border-panel-20 rounded-xl shadow-2xl z-50 overflow-hidden py-1"
                                >
                                    {categories.map((cat, idx) => {
                                        if (!cat.visibility) return null;
                                        const isSelected = activeCategoryIndex === idx;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setActiveCategoryIndex(idx);
                                                    setOpenQuestionIndex(null);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${isSelected
                                                    ? 'bg-[rgb(var(--accent-cyan))]/10 text-[rgb(var(--accent-cyan))]'
                                                    : 'text-secondary hover:bg-panel-10 hover:text-primary'
                                                    }`}
                                            >
                                                <span className="text-xl">{cat.icon}</span>
                                                <span className="font-medium">{cat.category}</span>
                                                {isSelected && <Check className="ml-auto w-4 h-4" />}
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Overlay to close dropdown when clicking outside */}
                        {isDropdownOpen && (
                            <div
                                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
                                onClick={() => setIsDropdownOpen(false)}
                                style={{ top: 'unset' }} // Quick fix to not cover header if needed, but inset-0 is safer
                            />
                        )}
                    </div>

                    {/* DESKTOP: Pills Layout */}
                    <div className="hidden sm:flex flex-wrap gap-2 justify-center">
                        {categories.map((cat, idx) => {
                            if (!cat.visibility) return null;
                            const isActive = activeCategoryIndex === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setActiveCategoryIndex(idx);
                                        setOpenQuestionIndex(null);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isActive
                                        ? 'bg-[rgb(var(--accent-cyan))] text-white border-[rgb(var(--accent-cyan))] shadow-md shadow-cyan-500/20'
                                        : 'bg-panel-10 border-transparent text-secondary hover:bg-panel-20 hover:text-primary'
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.category}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Questions List (Central Feed) */}
            <section className="px-4 pb-16 max-w-3xl mx-auto min-h-[400px] w-full">
                <motion.div
                    key={activeCategoryIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                >
                    {activeCategory.faqs.map((faq, idx) => {
                        if (!faq.visibility) return null;
                        const uniqueId = `${activeCategoryIndex}-${idx}`;
                        const isOpen = openQuestionIndex === uniqueId;

                        return (
                            <div
                                key={uniqueId}
                                className={`rounded-xl border transition-all duration-200 w-full overflow-hidden ${isOpen
                                    ? 'bg-panel-10 border-[rgb(var(--accent-cyan))]/30'
                                    : 'bg-panel-5 border-panel-10'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenQuestionIndex(isOpen ? null : uniqueId)}
                                    className="w-full text-left px-4 py-4 flex items-start justify-between gap-3"
                                >
                                    <h3 className={`text-sm sm:text-lg font-semibold leading-snug transition-colors ${isOpen ? 'text-[rgb(var(--accent-cyan))]' : 'text-primary'
                                        }`}>
                                        {faq.question}
                                    </h3>
                                    <span className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[rgb(var(--accent-cyan))]' : 'text-secondary'}`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                        >
                                            <div className="px-4 pb-4 pt-0">
                                                <div className="h-px w-full bg-panel-20 mb-3" />
                                                <p className="text-secondary leading-relaxed text-sm">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>
            </section>

            {/* CTA Section */}
            {stillHaveQuestions?.visibility && (
                <section className="px-4 pb-16 w-full">
                    <div className="max-w-xl mx-auto w-full">
                        <div className="text-center p-6 rounded-2xl bg-panel-5 border border-panel-10">
                            <h2 className="text-lg font-bold mb-2">{stillHaveQuestions.headline}</h2>
                            <p className="text-secondary mb-4 text-sm">{stillHaveQuestions.description}</p>

                            <div className="flex flex-col gap-3">
                                <Link
                                    href={stillHaveQuestions.cta.href}
                                    className="w-full py-3 rounded-xl bg-[rgb(var(--accent-cyan))] text-white font-bold text-sm"
                                >
                                    {stillHaveQuestions.cta.text}
                                </Link>
                                {stillHaveQuestions.alternativeContact && (
                                    <div className="flex items-center justify-center gap-2 text-secondary text-xs">
                                        <span>{stillHaveQuestions.alternativeContact.replace('Or email us at ', 'Email: ')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </main>
    );
}
