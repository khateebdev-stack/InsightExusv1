import projectsData from '@/content/projects.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightexus.com';

export function generateMetadata() {
  const title = 'Projects | InsightExus';
  const description = 'Selected case studies and projects showcasing our work across industries.';
  const keywords = Array.from(new Set((projectsData.projects || projectsData).flatMap((p: any) => p.seo?.keywords || []))).slice(0, 40);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [`${siteUrl}/og-images/projects/og-projects.png`],
      siteName: 'InsightExus',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/twitter-images/projects/og-projects.png`]
    }
  };
}
