// Script to update all projects with comprehensive schema and layout config
// Run: node updateProjects.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read existing projects
const projectsPath = path.join(__dirname, 'src', 'content', 'projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// Default layout configuration
const defaultLayout = {
  enabled: true,
  sections: [
    { id: "hero", visible: true, order: 1 },
    { id: "overview", visible: true, order: 2 },
    { id: "challenge", visible: true, order: 3 },
    { id: "solution", visible: true, order: 4 },
    { id: "performance", visible: true, order: 5 },
    { id: "roi", visible: true, order: 6 },
    { id: "implementation", visible: true, order: 7 },
    { id: "techStack", visible: true, order: 8 },
    { id: "clientProfile", visible: true, order: 9 },
    { id: "projectScope", visible: true, order: 10 },
    { id: "team", visible: true, order: 11 },
    { id: "userFeedback", visible: true, order: 12 },
    { id: "keySuccessFactors", visible: true, order: 13 },
    { id: "lessonsLearned", visible: false, order: 14 },
    { id: "futureRoadmap", visible: true, order: 15 },
    { id: "training", visible: true, order: 16 },
    { id: "documentation", visible: true, order: 17 },
    { id: "support", visible: true, order: 18 },
    { id: "thirdPartyTools", visible: true, order: 19 },
    { id: "testimonial", visible: true, order: 20 },
    { id: "cta", visible: true, order: 21 }
  ]
};

// Template data for missing fields
const getEnrichedProject = (project) => {
  return {
    ...project,
    
    // Add visibility to metrics if missing
    metrics: (project.metrics || []).map(m => ({
      ...m,
      visibility: m.visibility !== undefined ? m.visibility : true
    })),
    
    // Client Profile (if missing)
    clientProfile: project.clientProfile || {
      visibility: true,
      companySize: "Enterprise",
      revenue: "Contact for details",
      locations: "Multiple locations",
      existingSystems: ["Legacy systems"]
    },
    
    // Project Scope (if missing)
    projectScope: project.projectScope || {
      visibility: true,
      geographicScope: "Global",
      usersImpacted: "Thousands of users",
      systemsIntegrated: project.stack?.slice(0, 3) || [],
      dataVolume: "High volume data processing"
    },
    
    // Implementation (if missing)
    implementation: project.implementation || {
      visibility: true,
      phases: [
        {
          name: "Discovery",
          duration: "2-3 weeks",
          deliverables: ["Requirements", "Architecture design"],
          milestones: ["Kickoff", "Design approval"]
        },
        {
          name: "Development",
          duration: "60% of timeline",
          deliverables: ["Core features", "Testing"],
          milestones: ["MVP", "QA pass"]
        },
        {
          name: "Deployment",
          duration: "2 weeks",
          deliverables: ["Production release", "Documentation"],
          milestones: ["Go-live", "Handover"]
        }
      ],
      methodology: "Agile with 2-week sprints",
      riskMitigation: [
        "Regular stakeholder reviews",
        "Comprehensive testing",
        "Rollback procedures"
      ]
    },
    
    // Training (if missing)
    training: project.training || {
      visibility: true,
      sessions: "Comprehensive training program",
      materials: ["Documentation", "Video tutorials", "Hands-on workshops"],
      certification: "Team certification on new system"
    },
    
    // Documentation (if missing)
    documentation: project.documentation || {
      visibility: true,
      technical: ["Architecture diagrams", "API documentation", "Deployment guides"],
      business: ["ROI reports", "Performance metrics", "Executive summaries"],
      endUser: ["User guides", "FAQs", "Support documentation"]
    },
    
    // Support (if missing)
    support: project.support || {
      visibility: true,
      warranty: "60-90 day warranty",
      maintenance: "Optional maintenance packages available",
      sla: "P1: 4-hour response, P2: next business day",
      knowledgeTransfer: "Full codebase handover and training"
    },
    
    // ROI (if missing)
    roi: project.roi || {
      visibility: true,
      paybackPeriod: "6-12 months",
      yearOneValue: "Significant cost savings and efficiency gains",
      threeYearProjection: "3-5x ROI over 3 years",
      costBreakdown: {
        software: project.budget || "$100K",
        infrastructure: "$10-20K/year",
        support: "$20-30K/year (optional)"
      }
    },
    
    // Performance (if missing)
    performance: project.performance || {
      visibility: true,
      beforeAfter: (project.metrics || []).slice(0, 4).map(m => ({
        metric: m.label,
        before: "Baseline",
        after: m.value + (m.unit || ''),
        improvement: m.value
      })),
      benchmarks: `Industry-leading performance in ${project.industry}`
    },
    
    // User Feedback (if missing)
    userFeedback: project.userFeedback || {
      visibility: true,
      adoptionRate: "High adoption rate",
      satisfactionScore: "4.5+/5.0",
      quotes: [
        `"Excellent results achieved with ${project.title}"`,
        `"The team delivered beyond expectations"`
      ]
    },
    
    // Key Success Factors (if missing)
    keySuccessFactors: project.keySuccessFactors || {
      visibility: true,
      factors: [
        "Strong technical expertise",
        "Clear communication with stakeholders",
        "Agile methodology enabling flexibility",
        "Comprehensive testing and quality assurance"
      ]
    },
    
    // Lessons Learned (if missing)
    lessonsLearned: project.lessonsLearned || {
      visibility: false,
      technical: [
        "Technical architecture decisions that paid off",
        "Technology choices that improved efficiency",
        "Performance optimizations discovered during development"
      ],
      operational: [
        "Project management approaches that worked well",
        "Stakeholder communication strategies",
        "Team collaboration insights"
      ]
    },
    
    // Future Roadmap (if missing)
    futureRoadmap: project.futureRoadmap || {
      visibility: true,
      planned: [
        "Feature enhancements based on user feedback",
        "Scalability improvements",
        "Integration with additional systems",
        "Advanced analytics and reporting"
      ],
      scalability: "Architecture designed for future growth"
    },
    
    // Third Party Tools (if missing)
    thirdPartyTools: project.thirdPartyTools || {
      visibility: true,
      vendors: project.stack?.slice(0, 5) || ["Various enterprise tools"]
    },
    
    // Display Layout
    displayLayout: project.displayLayout || defaultLayout
  };
};

// Update all projects
const updatedProjects = {
  projects: projects.projects.map(getEnrichedProject)
};

// Write back to file
fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2));

console.log('✅ All projects updated with comprehensive schema and layout config!');
console.log(`📊 Total projects: ${updatedProjects.projects.length}`);
console.log('📝 Each project now has:');
console.log('   - clientProfile, projectScope, implementation');
console.log('   - training, documentation, support');
console.log('   - roi, performance, userFeedback');
console.log('   - keySuccessFactors, lessonsLearned, futureRoadmap');
console.log('   - thirdPartyTools, displayLayout');
