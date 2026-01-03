import faqData from '@/content/faq.json';

export const metadata = {
    title: faqData.seo.title,
    description: faqData.seo.description,
    keywords: faqData.seo.keywords,
    alternates: { canonical: faqData.seo.canonicalUrl },
    openGraph: {
        title: faqData.seo.openGraph.title,
        description: faqData.seo.openGraph.description,
        images: [faqData.seo.openGraph.image],
        type: faqData.seo.openGraph.type
    },
    twitter: {
        card: faqData.seo.twitter.card,
        title: faqData.seo.twitter.title,
        description: faqData.seo.twitter.description,
        images: [faqData.seo.twitter.image]
    }
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
