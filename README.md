# InsightExus Platform

## Overview
This is a high-performance, engineering-focused portfolio and services platform built with **Next.js 14**. It acts as a comprehensive showcase for technical capabilities, architectural philosophy, and service offerings, designed to generate high-quality leads and attract top-tier talent.

## Purpose & Strategy
This platform is not just a brochure; it is a lead generation and trust-building engine.
- **Lead Generation**: Optimized CTAs, friction-free contact forms, and strategic content placement (Case Studies, Architecture) to convert visitors.
- **Trust & Authority**: Deep-dive technical pages (Architecture, Detailed Services) prove expertise before a sales call happens.
- **Recruitment**: Dedicated sections to attract engineers by showcasing culture and technical depth.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Semantic Theme Variables (`src/index.css`)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **CMS**: File-based JSON architecture (`src/content/*.json`)

## Project Structure
```bash
/src
  /app           # Next.js App Router pages
  /components    # React components
    /features    # Complex features (SearchModal, etc.)
    /ui          # Reusable UI atoms (Buttons, Cards)
  /content       # JSON Data Sources (CMS)
  /lib           # Utilities
/public          # Static assets (images, icons)
```

## Content Management (JSON CMS)
The website's content is decoupled from the code. You can update text, images, and features by editing the JSON files in `src/content/`.

### Core Data Files:

1.  **`architecture.json`**
    *   **Controls**: The `/architecture` page.
    *   **Usage**: Defines layers, components, and principles shown in the System Blueprint visualization.
    *   **Update**: Edit this to change the "layers" or "tech stack" shown in the interactive diagram.

2.  **`services.json`**
    *   **Controls**: `/services` listing and `/services/[slug]` details.
    *   **Usage**: Add new services, change pricing tiers, technical specifications, and features.
    *   **Note**: Ensure `slug` is unique and URL-friendly (e.g., `web-development`).

3.  **`projects.json`**
    *   **Controls**: `/projects` portfolio.
    *   **Usage**: Add case studies, project stats, tech stacks used, and gallery images.

4.  **`blog.json`**
    *   **Controls**: `/blog` and `/blog/[slug]`.
    *   **Usage**: Write blog posts here. The system automatically renders them. Use markdown-like structure for content where supported.

### How to Update Content
1.  Open the relevant `.json` file in VS Code.
2.  Modify the text or values. **Be careful with JSON syntax** (commas, quotes, brackets).
3.  Save the file.
4.  The website will auto-update in development mode.
5.  Re-deploy (commit & push) to see changes live.

## Key Pages & Features

### 1. System Architecture (`/architecture`)
*   **Purpose**: To "wow" technical clients (CTOs, Tech Leads) by visually demonstrating how we build scalable, secure systems.
*   **Design**: Uses a "System Blueprint" aesthetic with interactive connections relative to the JSON data.
*   **Impact**: Differentiates us from generic agencies by showing *how* we think, not just what we do.

### 2. Services Details
*   **Purpose**: To answer "Can they do X?" and "How much?" upfront.
*   **Features**: Includes pricing tiers, timelines, and technology checklists.

### 3. Integrated Search (`Cmd+K`)
*   **Purpose**: To allow users to instantly find specific services or tech stacks (e.g., searching "React" finds relevant services and projects).
*   **Logic**: Indicated in `SearchModal.tsx`, indexing all JSON files.

## Theme System
The site uses a semantic variable system in `src/index.css`.
*   **Colors**: defined as `--color-bg`, `--text-primary`, etc.
*   **Dark/Light Mode**: Toggles primarily via CSS variables.
*   **Guideline**: When building new components, use classes like `bg-header`, `text-primary`, `border-panel-20` instead of hardcoded `slate-900`.

## Developer Guide

### Setup
1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run locally**:
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000`.

### Handover Notes
*   **Documentation**: Historical requirement docs and module breakdowns have been renamed to `.txt` files (e.g., `PROJECT_REQUIREMENTS_AND_SOLUTIONS.txt`) and are ignored by git to keep the repo clean. Refer to them locally if you need deep historical context.
*   **Modifying Logic**: Most page logic is in `src/app`. Complex UI logic (like the Architecture flow) is in the page component itself, driven by the JSON data.

---
**Maintained by**: InsightExus Engineering Team
