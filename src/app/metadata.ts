import homeData from '@/content/home.json';



export default function generateMetadata() {
  const seo = homeData.seo;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl },
    robots: seo.robots,
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      images: [seo.openGraph.image],
      siteName: seo.openGraph.siteName,
      type: seo.openGraph.type
    },
    twitter: {
      card: seo.twitter.card,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: [seo.twitter.image],
      creator: seo.twitter.creator
    },
    icons: {
      icon: '/logo2.png',
      shortcut: '/logo2.png',
      apple: '/logo2.png'
    }
  };
}
