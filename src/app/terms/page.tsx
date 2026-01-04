import { Metadata } from 'next';
import termsData from '@/content/terms.json';

export const metadata: Metadata = {
    title: termsData.seo.title,
    description: termsData.seo.description,
    openGraph: {
        title: termsData.seo.openGraph.title,
        description: termsData.seo.openGraph.description,
        type: 'website',
    },
};

export default function TermsOfServicePage() {
    const { hero, sections } = termsData;

    return (
        <div className="pt-24 pb-20 bg-slate-950 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{hero.headline}</h1>
                    <p className="text-lg text-slate-400 mb-4">{hero.subheadline}</p>
                    <p className="text-sm text-slate-500">Last Updated: {hero.updatedOn}</p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {sections.map((section: any, idx) => (
                        <section key={idx} className="bg-panel-5 border border-panel-10 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>

                            {section.content && (
                                <p className="text-slate-300 leading-relaxed mb-4">
                                    {section.content}
                                </p>
                            )}

                            {section.items && (
                                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                                    {section.items.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
