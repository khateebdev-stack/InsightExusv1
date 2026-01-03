import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightexus.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/projects',
        '/architecture',
        '/solutions',
        '/portfolio-gallery',
        '/recruiters',
        '/testimonials',
        '/case-studies',
        '/portfolio',
        '/blog',
        '/contact',
        '/faq',
        '/privacy-policy',
        '/terms',
        '/cookie-policy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Blog Posts
    // Using direct import or fs read depending on how data is structured. 
    // Since we have json files, let's read them.
    // We'll trust the structure matches what we've seen (blog.json, projects.json, services.json)

    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const blogFilePath = path.join(process.cwd(), 'src/content/blog.json');
        const blogContent = await fs.readFile(blogFilePath, 'utf8');
        const blogData = JSON.parse(blogContent);
        blogRoutes = blogData.posts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedDate || post.publishDate),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Error generating blog sitemap', error);
    }

    let projectRoutes: MetadataRoute.Sitemap = [];
    try {
        const projectsFilePath = path.join(process.cwd(), 'src/content/projects.json');
        const projectsContent = await fs.readFile(projectsFilePath, 'utf8');
        const projectsData = JSON.parse(projectsContent);
        // Handlign potential structure diff (array vs object with projects array)
        const projectsList = Array.isArray(projectsData) ? projectsData : projectsData.projects || [];

        projectRoutes = projectsList.map((project: any) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }));
    } catch (error) {
        console.error('Error generating project sitemap', error);
    }

    let serviceRoutes: MetadataRoute.Sitemap = [];
    try {
        const servicesFilePath = path.join(process.cwd(), 'src/content/services.json');
        const servicesContent = await fs.readFile(servicesFilePath, 'utf8');
        const servicesData = JSON.parse(servicesContent);
        const servicesList = servicesData.services || [];

        serviceRoutes = servicesList.map((service: any) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        }));
    } catch (error) {
        console.error('Error generating service sitemap', error);
    }

    return [...routes, ...blogRoutes, ...projectRoutes, ...serviceRoutes];
}
