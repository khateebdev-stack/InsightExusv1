import projectsData from '@/content/projects.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightexus.com';

export async function generateStaticParams() {
  const projects = projectsData.projects || projectsData;
  return projects.map((p: any) => ({ slug: p.slug }));
}

export default async function generateMetadata({ params }: { params: { slug: string } }) {
  const projects = projectsData.projects || projectsData;
  const project = projects.find((p: any) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project not found',
      description: ''
    };
  }

  const seo = project.seo || {};
  const title = seo.title || project.title || 'Project';
  const description = seo.description || project.excerpt || '';

  const imagePath = seo.openGraph?.images?.[0] || project.screenshots?.[0]?.src || `/og-images/projects/${project.slug}.png`;
  const absImage = imagePath && imagePath.startsWith('http') ? imagePath : `${siteUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [absImage],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absImage]
    }
  };
}
import { Metadata } from 'next';
import projectsData from '@/content/projects.json';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const projects = projectsData.projects as any[];
  const project = projects.find(p => p.slug === params.slug);

  if (!project || !project.seo) {
    return {
      title: 'Project Not Found | InsightExus',
      description: 'The requested project could not be found.'
    };
  }

  const seo = project.seo;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightexus.com';

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots,
    alternates: {
      canonical: seo.canonicalUrl
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      type: seo.openGraph.type,
      siteName: seo.openGraph.siteName,
      images: [
        {
          url: `${baseUrl}${seo.openGraph.image}`,
          alt: seo.openGraph.imageAlt
        }
      ]
    },
    twitter: {
      card: seo.twitter.card,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: [`${baseUrl}${seo.twitter.image}`],
      creator: seo.twitter.creator
    },
    other: {
      'application-ld+json': JSON.stringify(seo.schema)
    }
  };
}

export function generateStaticParams() {
  const projects = projectsData.projects as any[];
  return projects.map((project) => ({
    slug: project.slug
  }));
}
