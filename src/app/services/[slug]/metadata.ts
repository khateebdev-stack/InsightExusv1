import { Metadata } from 'next';
import servicesData from '@/content/services.json';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const services = (servicesData as any).services || [];
  const service = services.find((s: any) => s.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightexus.com';

  if (!service || !service.seo) {
    return {
      title: 'Service Not Found | InsightExus',
      description: 'The requested service could not be found.'
    };
  }

  const seo = service.seo;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots,
    alternates: {
      canonical: seo.canonicalUrl || `${baseUrl}/services/${service.slug}`
    },
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      type: seo.openGraph?.type || 'service',
      siteName: seo.openGraph?.siteName || 'InsightExus',
      images: [
        {
          url: `${baseUrl}${seo.openGraph?.image || seo.openGraph?.image || '/og-images/services/services-og.png'}`,
          alt: seo.openGraph?.imageAlt || service.title
        }
      ]
    },
    twitter: {
      card: seo.twitter?.card || 'summary_large_image',
      title: seo.twitter?.title || seo.title,
      description: seo.twitter?.description || seo.description,
      images: [`${baseUrl}${seo.twitter?.image || seo.openGraph?.image || '/twitter-images/services/services-twitter.png'}`],
      creator: seo.twitter?.creator || '@insightexus'
    },
    other: {
      'application-ld+json': JSON.stringify(seo.schema || {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": { "@type": "Organization", "name": "InsightExus" },
        "url": `${baseUrl}/services/${service.slug}`
      })
    }
  };
}

export function generateStaticParams() {
  const services = (servicesData as any).services || [];
  return services.map((s: any) => ({ slug: s.slug }));
}
