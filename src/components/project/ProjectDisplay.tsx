import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { PerformanceSection } from './sections/PerformanceSection';
import { ROISection } from './sections/ROISection';

// Import other sections as they're created
// import { OverviewSection } from './sections/OverviewSection';
// import { ChallengeSection } from './sections/ChallengeSection';
// import { SolutionSection } from './sections/SolutionSection';
// ... etc

// Map of section IDs to their components
const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  performance: PerformanceSection,
  roi: ROISection,
  // Add other sections as they're created:
  // overview: OverviewSection,
  // challenge: ChallengeSection,
  // solution: SolutionSection,
  // implementation: ImplementationSection,
  // techStack: TechStackSection,
  // clientProfile: ClientProfileSection,
  // projectScope: ProjectScopeSection,
  // team: TeamSection,
  // userFeedback: UserFeedbackSection,
  // keySuccessFactors: KeySuccessSection,
  // lessonsLearned: LessonsSection,
  // futureRoadmap: RoadmapSection,
  // training: TrainingSection,
  // documentation: DocumentationSection,
  // support: SupportSection,
  // thirdPartyTools: ThirdPartyToolsSection,
  // testimonial: TestimonialSection,
  // cta: CTASection,
};

interface Project {
  slug: string;
  title: string;
  industry: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  displayLayout?: {
    enabled: boolean;
    sections: Array<{
      id: string;
      visible: boolean;
      order: number;
      variant?: string;
    }>;
  };
  [key: string]: any; // For section-specific data
}

interface ProjectDisplayProps {
  project: Project;
  className?: string;
}

export function ProjectDisplay({ project, className = '' }: ProjectDisplayProps) {
  const layout = project.displayLayout;

  // Fallback to basic display if layout not configured
  if (!layout?.enabled) {
    return (
      <div className={`project-display-default ${className}`}>
        <HeroSection
          title={project.title}
          industry={project.industry}
          budget={project.budget}
          timeline={project.timeline}
          services={project.services}
        />
        <PerformanceSection data={project.performance} />
        <ROISection data={project.roi} />
        {/* Add more default sections */}
      </div>
    );
  }

  // Filter visible sections and sort by order
  const visibleSections = layout.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className={`project-display ${className}`}>
      {visibleSections.map(section => {
        const SectionComponent = SECTION_COMPONENTS[section.id];
        
        if (!SectionComponent) {
          console.warn(`⚠️ Section component not found: ${section.id}`);
          return null;
        }

        // Prepare props based on section type
        const sectionProps = getSectionProps(section.id, project);

        return (
          <SectionComponent
            key={section.id}
            {...sectionProps}
            variant={section.variant || 'default'}
          />
        );
      })}
    </div>
  );
}

// Helper to map project data to section props
function getSectionProps(sectionId: string, project: Project) {
  switch (sectionId) {
    case 'hero':
      return {
        title: project.title,
        industry: project.industry,
        budget: project.budget,
        timeline: project.timeline,
        services: project.services,
      };
    
    case 'performance':
      return {
        data: project.performance,
      };
    
    case 'roi':
      return {
        data: project.roi,
      };
    
    // Add mappings for other sections as they're created
    
    default:
      // Generic fallback: pass the section data directly
      return {
        data: project[sectionId],
        project: project, // Pass full project for cross-references
      };
  }
}

// Export for use in other pages
export default ProjectDisplay;
