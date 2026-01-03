'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowRight, FileText, Briefcase, Code, Hash } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Mock data content (in a real app, this might come from a search index or API)
// We'll lazy-load the actual content JSONs if we can, or just keep a lightweight index
// For this scale, importing them directly is fine.

import blogData from '@/content/blog.json';
import projectsData from '@/content/projects.json';
import servicesData from '@/content/services.json';

// Normalize data structure for search
type SearchResultCheck = {
    type: 'blog' | 'project' | 'service';
    title: string;
    description: string;
    slug: string;
    tags?: string[];
    category?: string;
    features?: string[];
};

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('');
    const pathname = usePathname();

    // Reset search when route changes
    useEffect(() => {
        if (isOpen) {
            onClose();
        }
    }, [pathname]);

    const allContent: SearchResultCheck[] = useMemo(() => {
        const items: SearchResultCheck[] = [];

        // Index Blog
        blogData.posts.forEach((post) => {
            if (post.visibility) {
                items.push({
                    type: 'blog',
                    title: post.title,
                    description: post.excerpt || post.description,
                    slug: post.slug,
                    tags: post.tags,
                    category: post.category,
                });
            }
        });

        // Index Projects
        const projects = (projectsData as any).projects || [];
        projects.forEach((project: any) => {
            // Assume visibility check if exists, otherwise true
            items.push({
                type: 'project',
                title: project.title,
                description: project.description,
                slug: project.slug,
                tags: project.stack || [],
                category: project.industry,
            });
        });

        // Index Services
        const services = (servicesData as any).services || [];
        services.forEach((service: any) => {
            items.push({
                type: 'service',
                title: service.title,
                description: service.description,
                slug: service.slug,
                tags: service.features || [], // Map features to tags for search
                features: service.features || []
            });
        });

        return items;
    }, []);

    const filteredResults = useMemo(() => {
        if (!query) return [];

        const lowerQuery = query.toLowerCase();

        return allContent.filter(item => {
            const matchTitle = item.title.toLowerCase().includes(lowerQuery);
            const matchDesc = item.description.toLowerCase().includes(lowerQuery);
            const matchTags = item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
            const matchCategory = item.category?.toLowerCase().includes(lowerQuery);
            const matchFeatures = item.features?.some(feature => feature.toLowerCase().includes(lowerQuery));

            return matchTitle || matchDesc || matchTags || matchCategory || matchFeatures;
        }).slice(0, 5); // Limit to top 5
    }, [query, allContent]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: -20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-2xl bg-header border border-panel-20 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="flex items-center gap-3 p-4 border-b border-panel-10">
                        <Search className="text-secondary w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for services, projects, articles..."
                            className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-muted text-lg"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={onClose} className="p-1 hover:bg-panel-10 rounded-md text-secondary transition-colors">
                            <span className="sr-only">Close</span>
                            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono bg-panel-10 rounded border border-panel-20">ESC</kbd>
                            <X className="sm:hidden w-5 h-5" />
                        </button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {query === '' ? (
                            <div className="p-8 text-center text-secondary">
                                <p>Type to start searching...</p>
                            </div>
                        ) : filteredResults.length > 0 ? (
                            <div className="space-y-1">
                                {filteredResults.map((result, idx) => (
                                    <Link
                                        key={idx}
                                        href={result.type === 'blog' ? `/blog/${result.slug}` : result.type === 'project' ? `/projects/${result.slug}` : `/services/${result.slug}`}
                                        className="block p-3 rounded-xl hover:bg-panel-10 transition-colors group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-2 rounded-lg bg-panel-10 text-secondary group-hover:bg-[rgb(var(--accent-cyan))]/10 group-hover:text-[rgb(var(--accent-cyan))] transition-colors">
                                                {result.type === 'blog' && <FileText size={18} />}
                                                {result.type === 'project' && <Briefcase size={18} />}
                                                {result.type === 'service' && <Code size={18} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <h4 className="font-semibold text-primary group-hover:text-[rgb(var(--accent-cyan))] transition-colors truncate">
                                                        {result.title}
                                                    </h4>
                                                    <span className="text-xs font-mono text-secondary px-1.5 py-0.5 rounded border border-panel-20 uppercase">
                                                        {result.type}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-secondary line-clamp-1">
                                                    {result.description}
                                                </p>
                                            </div>
                                            <div className="mt-2.5 text-secondary group-hover:text-[rgb(var(--accent-cyan))] group-hover:translate-x-1 transition-all">
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-secondary">
                                <p>No results found for "{query}"</p>
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-panel-10 bg-panel-5 flex justify-between items-center text-xs text-secondary px-4">
                        <span>InsightExus Search</span>
                        <div className="flex gap-4">
                            {['Projects', 'Blog', 'Services'].map(filter => (
                                <span key={filter} className="flex items-center gap-1">
                                    <Hash size={10} /> {filter}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
