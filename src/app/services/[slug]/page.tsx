import { ArrowLeft, CheckCircle, Code, Smartphone, Cloud, Cpu, Database, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import servicesData from '@/content/services.json';
import ShareButtons from '@/components/ui/ShareButtons';
import { notFound } from 'next/navigation';

const iconComponents: Record<string, any> = {
  Code,
  Smartphone,
  Cloud,
  Cpu,
  Database,
  Lock,
};

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ServiceSEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  seo?: ServiceSEO;
  sharing?: {
    buttons: any;
  };
  features?: string[];
  technologies?: string[];
  highlights?: { title: string; description: string }[];
  timeline?: { phase: string; duration: string; tasks: string[] }[];
  pricing?: { tier: string; price: string; timeline: string; features: string[]; highlighted?: boolean }[];
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesData.services.find(s => s.slug === slug) as unknown as Service | undefined;

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const seo = service.seo || {};
  const title = service.title || 'Service';
  const description = service.description || '';

  return {
    title: seo.title || `${title} | InsightExus`,
    description: seo.description || description,
    keywords: seo.keywords || [],
    openGraph: {
      title: seo.title || title,
      description: seo.description || description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title || title,
      description: seo.description || description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  const service = servicesData.services.find(s => s.slug === slug) as unknown as Service | undefined;

  if (!service) {
    notFound();
  }

  const IconComponent = iconComponents[service.icon];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightexus.com';
  const fullUrl = `${baseUrl}/services/${service.slug}`;
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-header">
      <div className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-3.5 sm:px-5 md:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link href="/services" className="inline-flex items-center text-[rgb(var(--accent-cyan))] hover:opacity-80 transition-colors text-xs sm:text-sm md:text-base">
            <ArrowLeft size={14} className="mr-1.5 sm:mr-2 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
            Back to Services
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 w-full">
            {IconComponent && (
              <div className="p-2 sm:p-3 md:p-4 bg-panel-5 rounded-lg sm:rounded-xl border border-panel-10 flex-shrink-0">
                <IconComponent className={`w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 ${service.iconColor}`} />
              </div>
            )}
            <div className="flex-1 w-full min-w-0 overflow-hidden">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-2 sm:mb-3 md:mb-4 leading-tight break-words">
                {service.title}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-secondary leading-relaxed break-words">
                {service.description}
              </p>
              <div className="mt-2 sm:mt-3 w-full overflow-x-auto">
                <ShareButtons url={fullUrl} title={service.title} text={service.seo?.description || service.description} buttonsConfig={service.sharing?.buttons} />
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-8 sm:mb-12 md:mb-16 w-full">
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-panel-5 border border-panel-10 rounded-lg sm:rounded-xl md:rounded-2xl mb-6 sm:mb-8 md:mb-12 w-full overflow-hidden">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-5 break-words text-primary">Key Features & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-[rgb(var(--accent-cyan))]">Features</h3>
                <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                  {service.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-2.5">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[rgb(var(--accent-cyan))] mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base text-secondary leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-[rgb(var(--accent-cyan))]">Technologies</h3>
                <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                  {service.technologies?.map((tech, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-2.5">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base text-secondary leading-snug">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {service.highlights && service.highlights.length > 0 && (
          <div className="mb-8 sm:mb-12 md:mb-16 w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 break-words text-primary">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-5 w-full">
              {service.highlights.map((highlight, idx) => (
                <div key={idx} className="p-4 sm:p-5 md:p-6 bg-panel-5 border border-panel-10 rounded-lg sm:rounded-xl">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 text-[rgb(var(--accent-cyan))]">{highlight.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-secondary leading-relaxed">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {service.timeline && service.timeline.length > 0 && (
          <div className="mb-8 sm:mb-12 md:mb-16 w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 break-words text-primary">Our Process</h2>
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3 w-full">
              {service.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[rgb(var(--accent-cyan))] to-purple-500 flex items-center justify-center font-bold text-white text-xs sm:text-sm md:text-base">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-panel-5 border border-panel-10 rounded-lg sm:rounded-xl flex-grow">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-1.5 md:mb-2 text-primary">{step.phase}</h3>
                    <p className="text-xs text-[rgb(var(--accent-cyan))] mb-1.5 sm:mb-2 md:mb-3">{step.duration}</p>
                    <ul className="space-y-0.5 sm:space-y-1">
                      {step.tasks?.map((task, i) => (
                        <li key={i} className="text-secondary text-xs sm:text-xs md:text-sm flex items-start gap-1.5">
                          <span className="flex-shrink-0">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {service.pricing && service.pricing.length > 0 && (
          <div className="mb-8 sm:mb-12 md:mb-16 w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 break-words text-primary">Pricing Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-5 w-full">
              {service.pricing.map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border ${tier.highlighted
                    ? 'bg-gradient-to-br from-[rgb(var(--accent-cyan))]/10 to-purple-500/10 border-[rgb(var(--accent-cyan))]'
                    : 'bg-panel-5 border-panel-10'
                    }`}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-primary">{tier.tier}</h3>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-[rgb(var(--accent-cyan))] mb-2">{tier.price}</p>
                  <p className="text-xs text-secondary mb-3 sm:mb-4">{tier.timeline}</p>
                  <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                    {tier.features?.map((feature, i) => (
                      <li key={i} className="text-secondary text-xs sm:text-sm flex items-start gap-1.5">
                        <span className="flex-shrink-0 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 py-6 sm:py-8 md:py-10 border-t border-panel-10 w-full">
          <div className="text-center px-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 break-words text-primary">Ready to Get Started?</h2>
            <p className="text-xs sm:text-sm md:text-base text-secondary mb-4 sm:mb-6 md:mb-8 leading-relaxed break-words">
              Let's discuss how {service.title.toLowerCase()} can help your business grow and succeed.
            </p>
            <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 justify-center w-full px-0">
              <Link href="/contact" className="block w-full">
                <Button size="lg" className="w-full text-xs sm:text-sm">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/services" className="block w-full">
                <Button size="lg" variant="outline" className="w-full text-xs sm:text-sm">
                  View Other Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
