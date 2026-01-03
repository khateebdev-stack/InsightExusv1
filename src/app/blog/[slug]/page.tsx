
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from 'lucide-react';
import blogData from '@/content/blog.json';
import { Button } from '@/components/ui/Button';

interface BlogPostSEO {
    title?: string;
    description?: string;
    keywords?: string[];
}

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    description: string;
    author: string;
    authorRole: string;
    authorImage?: string;
    publishDate: string;
    updatedDate?: string;
    category: string;
    tags?: string[];
    image?: string;
    readingTime?: string;
    featured?: boolean;
    content: string;
    seo?: BlogPostSEO;
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = blogData.posts.find((p) => p.slug === slug) as unknown as BlogPost | undefined;

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const seo = post.seo || {};

    return {
        title: seo.title || `${post.title} | InsightExus Blog`,
        description: seo.description || post.excerpt,
        keywords: seo.keywords || post.tags || [],
        openGraph: {
            title: seo.title || post.title,
            description: seo.description || post.excerpt,
            type: 'article',
            publishedTime: post.publishDate,
            modifiedTime: post.updatedDate,
            authors: [post.author],
            tags: post.tags,
            images: post.image ? [post.image] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.title || post.title,
            description: seo.description || post.excerpt,
            images: post.image ? [post.image] : [],
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = blogData.posts.find((p) => p.slug === slug) as unknown as BlogPost | undefined;

    if (!post) {
        notFound();
    }

    // Related posts (simple logic: same category)
    const relatedPosts = blogData.posts
        .filter(p => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3) as unknown as BlogPost[];

    return (
        <div className="pt-24 pb-20 bg-header min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden mb-12">
                {post.image && (
                    <div className="absolute inset-0">
                        {/* Using simple img tag for external/local images if Next/Image config not set up for all domains, 
                 but aiming for Image component usage where possible. 
                 Assuming local path from JSON. */}
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-40 blur-[2px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-bg))] via-[rgb(var(--color-bg))]/80 to-transparent" />
                    </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 text-center z-10">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="px-3 py-1 rounded-full bg-[rgb(var(--accent-cyan))]/20 text-[rgb(var(--accent-cyan))] text-sm font-medium border border-[rgb(var(--accent-cyan))]/30">
                                {post.category}
                            </span>
                            <span className="text-secondary text-sm flex items-center gap-1">
                                <Clock size={14} /> {post.readingTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-secondary">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-[rgb(var(--accent-cyan))]" />
                                <span className="font-medium text-primary">{post.author}</span>
                            </div>
                            <span className="text-secondary">•</span>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-[rgb(var(--accent-cyan))]" />
                                <span className="text-secondary">{new Date(post.publishDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-secondary hover:text-[rgb(var(--accent-cyan))] transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Content */}
                <article className="prose prose-lg prose-invert max-w-none prose-headings:text-primary prose-p:text-secondary prose-strong:text-primary prose-li:text-secondary prose-blockquote:text-secondary">
                    {/* Lead Paragraph */}
                    <p className="lead text-xl md:text-2xl text-secondary leading-relaxed font-light mb-12 border-l-4 border-[rgb(var(--accent-cyan))] pl-6">
                        {post.description}
                    </p>

                    {/* Main Content Placeholder - in a real app, this would be MDX */}
                    <div className="bg-panel-5 border border-panel-10 rounded-2xl p-8 md:p-12 mb-12">
                        <p className="text-secondary mb-6">
                            {post.content}
                        </p>
                        <div className="p-6 bg-panel-10 rounded-xl border border-dashed border-panel-20">
                            <p className="text-center text-muted italic">
                                [Full blog post content would be rendered here via Markdown/MDX]
                            </p>
                        </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-panel-10">
                            {post.tags.map(tag => (
                                <div key={tag} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-panel-5 border border-panel-10 text-secondary text-sm hover:border-[rgb(var(--accent-cyan))]/50 hover:text-[rgb(var(--accent-cyan))] transition-colors cursor-default">
                                    <Tag size={12} />
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                </article>

                {/* Author Bio */}
                <div className="bg-panel-5 border border-panel-10 rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[rgb(var(--accent-cyan))] to-blue-600 p-1 flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-header flex items-center justify-center overflow-hidden">
                            {post.authorImage ? (
                                <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                            ) : (
                                <User size={32} className="text-[rgb(var(--accent-cyan))]" />
                            )}
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-primary mb-1">{post.author}</h3>
                        <p className="text-[rgb(var(--accent-cyan))] text-sm mb-3">{post.authorRole}</p>
                        <p className="text-secondary text-sm">
                            Expert in digital transformation and enterprise architecture. Contributing key insights to the InsightExus technology blog.
                        </p>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="border-t border-panel-10 pt-16">
                        <h3 className="text-2xl font-bold text-primary mb-8">Related Articles</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((related: BlogPost) => (
                                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                                    <div className="bg-panel-5 border border-panel-10 rounded-xl overflow-hidden hover:border-[rgb(var(--accent-cyan))]/50 transition-all duration-300 h-full flex flex-col">
                                        {related.image && (
                                            <div className="h-40 overflow-hidden">
                                                <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                        <div className="p-5 flex flex-col flex-1">
                                            <span className="text-xs text-[rgb(var(--accent-cyan))] mb-2">{related.category}</span>
                                            <h4 className="text-primary font-bold mb-2 group-hover:text-[rgb(var(--accent-cyan))] transition-colors line-clamp-2">
                                                {related.title}
                                            </h4>
                                            <span className="text-xs text-muted mt-auto">{related.readingTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
