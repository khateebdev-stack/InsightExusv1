import solutionsData from '@/content/solutions.json';

export function generateMetadata() {
  const seo = solutionsData.seo;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      images: [seo.openGraph.image],
      type: seo.openGraph.type
    },
    twitter: {
      card: seo.twitter.card,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: [seo.twitter.image]
    }
  };
}
