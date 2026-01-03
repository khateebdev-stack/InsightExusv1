import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import content from '@/content/404.json';

export const metadata = {
    title: content.seo.title,
    description: content.seo.description,
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-header flex items-center justify-center p-4">
            <div className="max-w-xl w-full text-center space-y-8">
                {/* Simple 404 Graphic/Text */}
                <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                    {content.hero.headline}
                </h1>

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-primary">
                        {content.hero.subheadline}
                    </h2>
                    <p className="text-secondary">
                        {/* Fallback description if JSON doesn't fully match recently edited version in memory vs disk */}
                        The page you are looking for does not exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {content.hero.ctaPrimary && (
                        <Link href={content.hero.ctaPrimary.href}>
                            <Button size="lg" className="w-full sm:w-auto">
                                {content.hero.ctaPrimary.text}
                            </Button>
                        </Link>
                    )}
                    {content.hero.ctaSecondary && (
                        <Link href={content.hero.ctaSecondary.href}>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                {content.hero.ctaSecondary.text}
                            </Button>
                        </Link>
                    )}
                </div>

                {content.suggestions && (
                    <div className="pt-8 border-t border-panel-10">
                        <p className="text-sm font-semibold text-secondary mb-4 uppercase tracking-wider">
                            {content.suggestions.title}
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            {content.suggestions.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="text-[rgb(var(--accent-cyan))] hover:text-[rgb(var(--accent-cyan))]/80 transition-colors text-sm"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
