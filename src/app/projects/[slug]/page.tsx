import { Metadata } from 'next';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { SocialShare } from '@/components/ui/SocialShare';
import {
  ArrowLeft, CheckCircle, Users, TrendingUp, Zap, Target, Lightbulb,
  Play, Download, Image as ImageIcon, Boxes, Activity, Shield
} from 'lucide-react';
import projectsData from '@/content/projects.json';

interface Metric {
  label: string;
  value: string;
  unit: string;
  visibility: boolean;
}

interface Testimonial {
  visibility: boolean;
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface PerformanceMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
  visible: boolean;
}

interface Screenshot {
  url: string;
  title: string;
  description: string;
  visible: boolean;
}

interface ProjectSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  robots?: string;
  openGraph?: any;
  twitter?: any;
  schema?: any;
}

interface Project {
  slug: string;
  title: string;
  industry: string;
  description: string;
  timeline?: string;
  budget?: string;
  challenge?: string;
  solution?: string;
  outcomes?: string[];
  results?: Record<string, string>;
  stack?: string[];
  metrics?: Metric[];
  deliverables?: string[];
  team?: string;
  testimonial?: Testimonial;
  clientProfile?: {
    visibility: boolean;
    companySize: string;
    revenue: string;
    locations: string;
    existingSystems: string[];
  };
  projectScope?: {
    visibility: boolean;
    geographicScope: string;
    usersImpacted: string;
    systemsIntegrated: string[];
    dataVolume: string;
  };
  implementation?: {
    visibility: boolean;
    phases: Array<{ name: string; duration: string; deliverables: string[] }>;
    methodology: string;
    riskMitigation: string[];
  };
  training?: {
    visibility: boolean;
    sessions: string;
    materials: string[];
    sla: string;
    knowledgeTransfer: string;
  };
  roi?: {
    visibility: boolean;
    paybackPeriod: string;
    yearOneValue: string;
    threeYearProjection: string;
    costBreakdown: Record<string, string>;
  };
  performance?: {
    visibility: boolean;
    beforeAfter: PerformanceMetric[];
    benchmarks: string;
  };
  userFeedback?: {
    visibility: boolean;
    adoptionRate: string;
    satisfactionScore: string;
    quotes: string[];
  };
  keySuccessFactors?: {
    visibility: boolean;
    factors: string[];
  };
  futureRoadmap?: {
    visibility: boolean;
    upcomingFeatures: string[];
    scalingPlans: string[];
  };
  features?: {
    visibility: boolean;
    items: Feature[];
  };
  screenshots?: {
    visibility: boolean;
    images: Screenshot[];
  };
  media?: {
    visibility: boolean;
    demoVideo?: {
      visible: boolean;
      url: string;
      thumbnail: string;
      title: string;
      duration: string;
    };
    caseStudyPdf?: {
      visible: boolean;
      url: string;
      title: string;
    };
  };
  seo?: ProjectSEO;
  sharing?: {
    enabled: boolean;
    buttons: any;
    customMessage: string;
  };
  links?: {
    live?: string;
    github?: string;
  };
  displayLayout?: {
    enabled: boolean;
    sections: Array<{
      id: string;
      visible: boolean;
      order: number;
    }>;
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = (projectsData.projects || projectsData) as unknown as Project[];
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | InsightExus',
      description: 'The requested project could not be found.',
    };
  }

  const seo = project.seo || {};

  return {
    title: seo.title || `${project.title} | InsightExus`,
    description: seo.description || project.description,
    keywords: seo.keywords || [],
    alternates: {
      canonical: seo.canonicalUrl || `https://insightexus.com/projects/${project.slug}`,
    },
    openGraph: {
      title: seo.openGraph?.title || project.title,
      description: seo.openGraph?.description || project.description,
      images: seo.openGraph?.image ? [seo.openGraph.image] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitter?.title || project.title,
      description: seo.twitter?.description || project.description,
      images: seo.twitter?.image ? [seo.twitter.image] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const projects = (projectsData.projects || projectsData) as unknown as Project[];
  const project = projects.find(p => p.slug === slug) as unknown as Project;

  if (!project) {
    return (
      <div className="pt-32 pb-20 site-padding max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Project Not Found</h1>
        <p className="text-slate-400 mb-8">The project you're looking for doesn't exist.</p>
        <Link href="/projects">
          <Button>View All Projects</Button>
        </Link>
      </div>
    );
  }

  // Get visibility settings from displayLayout
  const getVisibility = (sectionId: string): boolean => {
    if (!project.displayLayout || !project.displayLayout.sections) return true;
    const section = project.displayLayout.sections.find((s: any) => s.id === sectionId);
    return section ? section.visible : true;
  };

  return (
    <div className="pt-32 pb-20 site-padding max-w-7xl mx-auto">
      <Link href="/projects" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 group">
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </Link>

      {/* Hero Section */}
      <div className="mb-16">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/30 text-primary mb-4">
          {project.industry}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
          {project.title}
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl">
          {project.description}
        </p>
        {(project.timeline || project.budget) && (
          <div className="flex gap-8 mt-6 text-slate-400">
            {project.timeline && <div><span className="text-cyan-400">Timeline:</span> {project.timeline}</div>}
            {project.budget && <div><span className="text-cyan-400">Budget:</span> {project.budget}</div>}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {project.metrics && project.metrics.some(m => m.visibility) && getVisibility('metrics') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Key Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.metrics.filter(m => m.visibility).map((metric, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {metric.value}
                  <span className="text-sm text-slate-400 ml-1">{metric.unit}</span>
                </div>
                <div className="text-sm text-slate-400">{metric.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Challenge & Solution */}
      <div className="mb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {project.challenge && getVisibility('challenge') && (
            <GlassCard className="p-8 bg-gradient-to-br from-red-900/10 to-red-900/5 border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-red-400" size={24} />
                <h2 className="text-2xl font-bold text-red-400">The Challenge</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">{project.challenge}</p>
            </GlassCard>
          )}

          {project.solution && getVisibility('solution') && (
            <GlassCard className="p-8 bg-gradient-to-br from-blue-900/10 to-blue-900/5 border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-blue-400" size={24} />
                <h2 className="text-2xl font-bold text-blue-400">Our Solution</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">{project.solution}</p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Performance Metrics Before/After */}
      {project.performance?.visibility && getVisibility('performance') && project.performance.beforeAfter && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Performance Improvements</h2>
          <div className="space-y-4">
            {project.performance.beforeAfter.map((perf, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-300 mb-2">{perf.metric}</p>
                    <div className="flex items-center gap-4">
                      <div className="text-slate-500">
                        <span className="text-sm">Before: </span>
                        <span className="font-mono">{perf.before}</span>
                      </div>
                      <TrendingUp className="text-cyan-400" size={20} />
                      <div className="text-cyan-400">
                        <span className="text-sm">After: </span>
                        <span className="font-mono font-bold">{perf.after}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{perf.improvement}</div>
                    <div className="text-xs text-slate-500">improvement</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          {project.performance.benchmarks && (
            <p className="text-slate-400 mt-4 text-sm">{project.performance.benchmarks}</p>
          )}
        </div>
      )}

      {/* Results */}
      {project.results && Object.keys(project.results).length > 0 && getVisibility('results') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Results & Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(project.results).map(([key, value]) => {
              const isPerfChange = typeof value === 'string' && value.includes('→');
              const displayValue = isPerfChange ? value.split('→')[1].trim() : value;

              return (
                <GlassCard key={key} className="p-6 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {displayValue}
                  </div>
                  <div className="text-sm text-slate-400">{key}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Deliverables */}
      {project.deliverables && project.deliverables.length > 0 && getVisibility('deliverables') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Deliverables</h2>
          <GlassCard className="p-8">
            <ul className="space-y-3">
              {project.deliverables.map((item, i) => (
                <li key={i} className="flex items-start text-slate-300">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      )}

      {/* Tech Stack */}
      {project.stack && project.stack.length > 0 && getVisibility('techStack') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Technology Stack</h2>
          <GlassCard className="p-8">
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg bg-panel-5 border border-panel-10 text-slate-300 hover:border-primary/50 hover:text-primary transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Client Profile */}
      {project.clientProfile?.visibility && getVisibility('clientProfile') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Client Profile</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Company Size</p>
              <p className="text-lg font-semibold text-primary">{project.clientProfile.companySize}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Locations</p>
              <p className="text-lg font-semibold text-primary">{project.clientProfile.locations}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Revenue</p>
              <p className="text-lg font-semibold text-primary">{project.clientProfile.revenue}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Existing Systems</p>
              <div className="flex flex-wrap gap-2">
                {project.clientProfile.existingSystems.map((sys, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-panel-5 text-xs text-slate-400">
                    {sys}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Project Scope */}
      {project.projectScope?.visibility && getVisibility('projectScope') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Project Scope</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Geographic Scope</p>
              <p className="text-lg font-semibold text-primary">{project.projectScope.geographicScope}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Users Impacted</p>
              <p className="text-lg font-semibold text-primary">{project.projectScope.usersImpacted}</p>
            </GlassCard>
            <GlassCard className="p-6 md:col-span-2">
              <p className="text-slate-400 text-sm mb-3">Data Volume</p>
              <p className="text-slate-300">{project.projectScope.dataVolume}</p>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Implementation */}
      {project.implementation?.visibility && getVisibility('implementation') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Implementation Approach</h2>
          <GlassCard className="p-8 mb-6">
            <p className="text-slate-300 mb-4"><span className="text-cyan-400 font-semibold">Methodology:</span> {project.implementation.methodology}</p>
            <div className="mb-4">
              <p className="text-cyan-400 font-semibold mb-3">Risk Mitigation:</p>
              <ul className="space-y-2">
                {project.implementation.riskMitigation.map((risk, i) => (
                  <li key={i} className="text-slate-300 flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
          <div className="space-y-4">
            {project.implementation.phases.map((phase, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-cyan-400">{phase.name}</h3>
                  <span className="text-sm text-slate-400 bg-panel-5 px-3 py-1 rounded">{phase.duration}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">Deliverables:</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables.map((d, j) => (
                      <span key={j} className="px-2 py-1 rounded text-xs bg-panel-5 text-slate-300">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Team */}
      {project.team && getVisibility('team') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Team</h2>
          <GlassCard className="p-8">
            <div className="flex items-center gap-3">
              <Users className="text-cyan-400" size={24} />
              <p className="text-lg text-slate-300">{project.team}</p>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Training & Support */}
      {project.training?.visibility && getVisibility('training') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Training & Support</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Sessions</p>
              <p className="text-slate-300">{project.training.sessions}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Knowledge Transfer</p>
              <p className="text-slate-300">{project.training.knowledgeTransfer}</p>
            </GlassCard>
            <GlassCard className="p-6 md:col-span-2">
              <p className="text-slate-400 text-sm mb-2">Support SLA</p>
              <p className="text-slate-300">{project.training.sla}</p>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ROI Analysis */}
      {project.roi?.visibility && getVisibility('roi') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">ROI Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Payback Period</p>
              <p className="text-2xl font-bold text-green-400">{project.roi.paybackPeriod}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">3-Year Projection</p>
              <p className="text-2xl font-bold text-green-400">{project.roi.threeYearProjection}</p>
            </GlassCard>
          </div>
          <GlassCard className="p-6">
            <p className="text-cyan-400 font-semibold mb-4">Year One Value</p>
            <p className="text-slate-300 mb-6">{project.roi.yearOneValue}</p>
            <p className="text-cyan-400 font-semibold mb-3">Cost Breakdown</p>
            <div className="space-y-2">
              {Object.entries(project.roi.costBreakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between text-slate-300">
                  <span>{key}:</span>
                  <span className="font-mono">{value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* User Feedback */}
      {project.userFeedback?.visibility && getVisibility('userFeedback') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">User Feedback</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Adoption Rate</p>
              <p className="text-lg font-semibold text-primary">{project.userFeedback.adoptionRate}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-slate-400 text-sm mb-2">Satisfaction Score</p>
              <p className="text-lg font-semibold text-primary">{project.userFeedback.satisfactionScore}</p>
            </GlassCard>
          </div>
          {project.userFeedback.quotes && project.userFeedback.quotes.length > 0 && (
            <div className="space-y-4">
              {project.userFeedback.quotes.map((quote, i) => (
                <GlassCard key={i} className="p-6 border-l-2 border-cyan-400">
                  <p className="text-slate-300 italic">{quote}</p>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Testimonial */}
      {project.testimonial?.visibility && getVisibility('testimonial') && (
        <div className="mb-16">
          <GlassCard className="p-8 bg-gradient-to-br from-purple-900/10 to-cyan-900/10 border-purple-500/20">
            <p className="text-xl text-slate-300 mb-6 italic">{project.testimonial.quote}</p>
            <div>
              <p className="font-semibold text-primary">{project.testimonial.author}</p>
              <p className="text-sm text-slate-400">{project.testimonial.role}</p>
              <p className="text-sm text-slate-400">{project.testimonial.company}</p>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Key Success Factors */}
      {project.keySuccessFactors?.visibility && getVisibility('keySuccessFactors') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Key Success Factors</h2>
          <GlassCard className="p-8">
            <ul className="space-y-3">
              {project.keySuccessFactors.factors.map((factor, i) => (
                <li key={i} className="flex items-start text-slate-300">
                  <Zap className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  {factor}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      )}

      {/* Future Roadmap */}
      {project.futureRoadmap?.visibility && getVisibility('futureRoadmap') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Future Roadmap</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.futureRoadmap.upcomingFeatures && project.futureRoadmap.upcomingFeatures.length > 0 && (
              <GlassCard className="p-6">
                <h3 className="font-semibold text-cyan-400 mb-4">Upcoming Features</h3>
                <ul className="space-y-2">
                  {project.futureRoadmap.upcomingFeatures.map((feature, i) => (
                    <li key={i} className="text-slate-300 flex items-start">
                      <span className="text-cyan-400 mr-2">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
            {project.futureRoadmap.scalingPlans && project.futureRoadmap.scalingPlans.length > 0 && (
              <GlassCard className="p-6">
                <h3 className="font-semibold text-cyan-400 mb-4">Scaling Plans</h3>
                <ul className="space-y-2">
                  {project.futureRoadmap.scalingPlans.map((plan, i) => (
                    <li key={i} className="text-slate-300 flex items-start">
                      <span className="text-cyan-400 mr-2">→</span>
                      {plan}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      {project.features?.visibility && getVisibility('features') && project.features.items.some(f => f.visible) && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.features.items.filter(f => f.visible).map((feature, i) => {
              const iconMap: Record<string, any> = {
                Boxes, Activity, TrendingUp, Shield, Zap, Target, CheckCircle
              };
              const FeatureIcon = iconMap[feature.icon] || CheckCircle;

              return (
                <GlassCard key={i} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <FeatureIcon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Screenshots Gallery */}
      {project.screenshots?.visibility && getVisibility('screenshots') && project.screenshots.images.some(img => img.visible) && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Project Screenshots</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.screenshots.images.filter(img => img.visible).map((screenshot, i) => (
              <GlassCard key={i} className="p-0 overflow-hidden group cursor-pointer">
                <div className="relative h-48 bg-panel-5 flex items-center justify-center">
                  <ImageIcon className="text-slate-600" size={48} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-sm text-white">{screenshot.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary">{screenshot.title}</h3>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Demo Video */}
      {project.media?.visibility && project.media.demoVideo?.visible && getVisibility('media') && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Demo Video</h2>
          <GlassCard className="p-0 overflow-hidden">
            <div className="relative aspect-video bg-panel-5 flex items-center justify-center group cursor-pointer">
              <Play className="text-cyan-400 group-hover:scale-110 transition-transform" size={64} />
              <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-sm text-white">
                {project.media.demoVideo.duration}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">{project.media.demoVideo.title}</h3>
              <p className="text-slate-400 text-sm">Click to watch the full demonstration</p>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Case Study Download */}
      {project.media?.visibility && project.media.caseStudyPdf?.visible && (
        <div className="mb-16">
          <GlassCard className="p-8 text-center bg-gradient-to-br from-purple-900/10 to-cyan-900/10">
            <Download className="mx-auto text-cyan-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-primary mb-2">Full Case Study</h3>
            <p className="text-slate-400 mb-6">Download the complete project documentation</p>
            <Button size="lg" leftIcon={<Download size={20} />}>
              {project.media.caseStudyPdf.title}
            </Button>
          </GlassCard>
        </div>
      )}

      {/* Social Sharing */}
      {project.sharing?.enabled && (
        <div className="mb-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">Share This Project</h2>
            <p className="text-slate-400">Help others discover this transformation story</p>
          </div>
          <div className="flex justify-center">
            <SocialShare
              url={`/projects/${project.slug}`}
              title={project.title}
              description={project.description}
              buttons={project.sharing.buttons}
              customMessage={project.sharing.customMessage}
            />
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <div className="pt-12 border-t border-panel-10 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Interested in Similar Work?</h2>
        <p className="text-slate-400 mb-8">
          Let's discuss how we can help with your project.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/projects">
            <Button variant="outline">View More Projects</Button>
          </Link>
          <Link href="/contact">
            <Button>Start a Project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
