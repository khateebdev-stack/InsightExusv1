import servicesData from '@/content/services.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');
    if (!slug) return new Response(JSON.stringify({ error: 'missing slug' }), { status: 400 });

    const services = (servicesData as any).services || servicesData;
    const service = services.find((s: any) => s.slug === slug);
    if (!service) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 });

    const seo = service.seo || {};
    const img = seo.openGraph?.image || seo.openGraph?.images?.[0] || `/og-images/services/${service.slug}.png`;
    const absImage = img && img.startsWith('http') ? img : `${siteUrl}${img.startsWith('/') ? '' : '/'}${img}`;

    return new Response(
      JSON.stringify({
        slug: service.slug,
        title: seo.title || service.title,
        description: seo.description || service.shortDescription || service.description || '',
        openGraph: { images: [absImage] }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
