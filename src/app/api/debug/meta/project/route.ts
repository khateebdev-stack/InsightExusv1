import projectsData from '@/content/projects.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');
    if (!slug) return new Response(JSON.stringify({ error: 'missing slug' }), { status: 400 });

    const projects = (projectsData as any).projects || projectsData;
    const project = projects.find((p: any) => p.slug === slug);
    if (!project) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 });

    const seo = project.seo || {};
    const imagePath = seo.openGraph?.images?.[0] || project.screenshots?.[0]?.src || `/og-images/projects/${project.slug}.png`;
    const absImage = imagePath && imagePath.startsWith('http') ? imagePath : `${siteUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;

    return new Response(
      JSON.stringify({
        slug: project.slug,
        title: seo.title || project.title,
        description: seo.description || project.excerpt || project.description || '',
        openGraph: { images: [absImage] }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
