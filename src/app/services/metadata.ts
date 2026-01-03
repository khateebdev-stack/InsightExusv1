import { Metadata } from 'next';
import servicesData from '@/content/services.json';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightexus.com';
  const services = (servicesData as any).services || [];

  const keywords = Array.from(new Set(services.flatMap((s: any) => s.seo?.keywords || []))).slice(0, 30);

  const ogImage = services[0]?.seo?.openGraph?.image || '/og-images/services/services-og.png';

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "InsightExus Services",
    "description": "Professional digital services including web, mobile, cloud, and data engineering.",
    "itemListElement": services.map((s: any, i: number) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${baseUrl}/services/${s.slug}`,
      "name": s.title
    }))
  };

  return {
    title: 'Services | InsightExus',
    description: 'Professional digital services: web, mobile, cloud, and data engineering delivered by InsightExus.',
    keywords,
    robots: 'index, follow',
    alternates: {
      canonical: `${baseUrl}/services`
    },
    openGraph: {
      title: 'Services | InsightExus',
      description: 'Explore our services: web development, mobile apps, cloud engineering, and more.',
      type: 'website',
      siteName: 'InsightExus',
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          alt: 'InsightExus services'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Services | InsightExus',
      description: 'Explore our services: web development, mobile apps, cloud engineering, and more.',
      images: [`${baseUrl}${ogImage}`],
      creator: '@insightexus'
    },
    other: {
      'application-ld+json': JSON.stringify(schema)
    }
  };
}
