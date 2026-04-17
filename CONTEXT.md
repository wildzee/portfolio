# Portfolio Context - Md Afjal Khan

## Project Overview

This is a professional portfolio website for Md Afjal Khan, a Senior Product Designer and AI-SaaS Architect based in Dubai. The portfolio showcases enterprise-level product design work, AI integration expertise, and digital transformation initiatives.

## Professional Positioning

**Current Role**: Product Architect & Internal Digital Lead at Danway EME
**Expertise**: Enterprise digital transformation, AI/ML integration, B2B SaaS product development
**Location**: Dubai, UAE

## Key Projects

### 1. Danway EME - Workforce Intelligence Platform
**Role**: Product Architect & Internal Digital Lead
**Scale**: 5,000+ employees across 40 sites
**Impact**:
- 80% reduction in manual timesheet entry time
- Zero-error tolerance through algorithmic validation
- Eliminated 24-48 hour delay in site-to-SAP reporting
- MOHRE compliance-ready digital audit trail

**Technical Stack**: Next.js, TypeScript, Recharts, SAP Integration Architecture
**Live Demo**: https://danway-963f6ywqn-mdafjalkhan29-gmailcoms-projects.vercel.app

**Strategic Positioning**:
- Framed as internal digital transformation initiative
- Identified critical "Data Leak" between site operations and SAP payroll system
- Consultative discovery approach with Personnel Department, Site Managers, and Finance teams
- Sub-1-second load times (competitive advantage over legacy construction software)

### 2. Rasoi Pay
**Role**: Founder & Product Lead
**Description**: AI-powered B2B SaaS platform for restaurant management
**Features**:
- Agentic AI integration for menu optimization
- Real-time payment architectures
- Built from concept to production

**Live Site**: https://rasoipay.com/

### 3. Iqra App
**Role**: UX Lead & Co-Designer
**Scale**: 50,000+ users
**Features**:
- High-accessibility design
- Roman-Hindi localized user flows
- Mobile-first approach

## Technical Capabilities

### Product Strategy
- Service Design
- Design Systems Governance
- Conversion Rate Optimization (CRO)
- Heuristic Evaluation
- Stakeholder Management

### Design & UX
- Atomic Design Systems
- Advanced Prototyping
- User Journey Mapping
- Accessibility (WCAG 2.2)
- Interaction Design

### Technical Stack
- Next.js & TypeScript
- Firebase
- Agentic AI Integration
- AI/ML Logic Implementation
- Cursor AI
- Front-end Architecture
- SAP Integration Architecture

## Portfolio Website Structure

### Technology
- **Framework**: Next.js 15 with App Router + Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Motion Engine**: Framer Motion 12 (scroll-driven, spring physics, 60fps)
- **Motion Tokens**: `src/lib/motion.ts` — centralised easing/spring/duration constants
- **UI Interaction**: Custom Magnetic Cursor, ImageFollowCursor, SplitLines, ProcessStep
- **Icons**: Boxicons + Material Icons
- **Email**: EmailJS integration
- **Deployment**: Vercel

### Pages
1. **Homepage** (`/`)
   - Hero section with professional positioning
   - About section highlighting Product Architect role
   - Skills & Expertise organized by category
   - Work portfolio with three featured projects
   - Resume download section
   - Partnership & Consultations contact form

2. **Case Studies**
   - `/case-studies/rasoipay` - Rasoi Pay detailed case study
   - `/case-studies/danway` - Danway EME Workforce Intelligence Platform
   - `/case-studies/iqra` - Iqra App case study

### Design System
- **Primary Color**: #3CDA64 (Green)
- **Typography**: Syne (display) + system sans
- **Layout**: CSS Grid and Flexbox
- **Responsive**: Mobile-first approach

## Recent Updates (April 2026)

### Motion & UI/UX Upgrade (feature/motion-uiux)
Elevated portfolio to "$10k Framer-style" quality with scroll-driven animations and 12 targeted UI/UX fixes.

**New Components:**
- `src/lib/motion.ts` — Centralised motion tokens (easing, springs, durations) — single source of truth
- `src/app/components/ImageFollowCursor.tsx` — Project thumbnail that spring-follows cursor on Works hover
- `src/app/components/SplitLines.tsx` — Line-by-line scroll clip-reveal wrapper
- `src/app/components/ProcessStep.tsx` — Shared accordion step (replaces inline implementations in both case studies)

**Scroll Animations (homepage):**
- Hero heading scales 1→0.88 + fades as you scroll past it; CTA floats up; orbs scale out
- Works rows slide in from left with stagger as they enter viewport
- Image-under-cursor preview on Works hover (signature Framer effect)
- "About" heading clips in left-to-right; bio paragraphs reveal upward line by line
- Experience `+` icon rotates on click, turns green on hover
- Contact section: "Let's work together" heading scales in on scroll entry

**UI/UX Fixes:**
- Fixed "Let talk" typo → "Let's work together"
- "Book a Call" CTA moved into hamburger menu (was hidden on mobile)
- Work rows show `→` chevron on mobile (affordance was missing)
- Type scale tokens added to globals.css (clamp-based, 5-stop scale)
- Section spacing tokens added (`--section-y-sm`, `--section-y-lg`)
- Focus rings added (`*:focus-visible`) — WCAG AA compliant
- Grain overlay opacity reduced 50% on mobile for legibility
- Dark mode `@media (prefers-color-scheme: dark)` CSS fallback added
- ProcessStep unified across Rasoi Pay + Iqra case studies
- Case study prev/next navigation standardised (both pages consistent)
- "Oder Management" typo fixed → "Order Management" in Rasoi Pay gallery

## Recent Updates (March 2026)

### Premium Motion System Upgrade
Implemented a world-class motion design system inspired by "Antigravity" principles: Swiss precision, brutalist energy, and organic transitions.
- **Universal Page Transitions**: Seamless, app-like routing using `template.tsx` and custom easing (`easePremium`, `easeBrutal`).
- **Tactile Magnetic Components**: Physics-based `<Magnetic>` wrapper for interactive elements (buttons, nav links) utilizing `useSpring`.
- **Scroll-Driven Typography**: 
  - `KineticText`: Split-word typography reveal with stagger.
  - `TextReveal`: Robust block-level scroll reveal for long-form bio sections.
  - `ScrollHighlightText`: Apple-style horizontal skill light-up tied to scroll depth.
- **Parallax Experience**: Depth-of-field image scroll drift via `useScroll` and `useTransform`.
- **Vercel Deployment & Build Optimization**:
  - **Dependency Resolution**: Resolved peer dependency conflicts with React 19 and corrected Next.js version typo.
  - **Configuration Consolidation**: Merged `next.config.mjs` into `next.config.ts` for unified build settings.
  - **Edge Runtime Compatibility**: Refactored middleware to use standard Web APIs (`btoa`) for stable Vercel Edge deployments.
  - **ESLint/Type Audit**: 100% build pass rate achieved through systematic cleanup of unused variables and entities.

## Recent Updates (February 2026)

### Danway Case Study Enhancement
- Updated employee scale from 500+ to 5,000+ across 40 sites
- Refined role title to "Product Architect & Internal Digital Lead"
- Added MOHRE compliance and audit risk pain points
- Emphasized SAP integration throughout
- Added ROI metrics (80% reduction, zero-error tolerance)
- Integrated live demo link
- Reframed as "Workforce Intelligence Platform - Internal Digital Transformation Initiative"

### Strategic Messaging
- Positioned as solving critical "Data Leak" between site gate and SAP payroll
- Emphasized consultative discovery approach
- Highlighted sub-1-second load times as competitive advantage
- Added executive-level business intelligence focus
- Included compliance-ready digital audit trail

## Professional Goals

### Immediate
- Secure Product Architect or IT leadership role at Danway EME
- Deploy Workforce Intelligence Platform across all 40 sites
- Demonstrate ROI through pilot program

### Long-term
- Lead digital transformation of site operations
- Establish as tech-forward engineering firm
- Scale platform to handle enterprise-level operations

## Contact Information

- **LinkedIn**: https://www.linkedin.com/in/mdafjalkhan29/
- **GitHub**: https://github.com/wildzee
- **Twitter**: https://x.com/wild__zee

## Credentials

- Google-Certified Professional
- Founder of live SaaS product (Rasoi Pay)
- Enterprise experience with 5,000+ employee systems
- SAP integration architecture expertise
- Months of on-site experience at Danway EME

## Portfolio URLs

- **Portfolio Website**: https://portfolio-mdafjalkhan.vercel.app
- **Danway Demo**: https://danway-963f6ywqn-mdafjalkhan29-gmailcoms-projects.vercel.app
- **Rasoi Pay**: https://rasoipay.com/

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Required for EmailJS contact form:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## File Structure (current)

```
portfolio/
├── src/
│   ├── app/
│   │   ├── case-studies/
│   │   │   ├── rasoipay/page.tsx
│   │   │   ├── danway/page.tsx
│   │   │   └── iqra/page.tsx
│   │   ├── components/
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── ImageFollowCursor.tsx   ← new
│   │   │   ├── KineticText.tsx
│   │   │   ├── Magnetic.tsx
│   │   │   ├── ParallaxImage.tsx
│   │   │   ├── ProcessStep.tsx         ← new (shared)
│   │   │   ├── ScrollHighlightText.tsx
│   │   │   ├── ScrollingMarquee.tsx
│   │   │   ├── SplitLines.tsx          ← new
│   │   │   └── TextReveal.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       └── motion.ts                   ← new (motion tokens)
├── public/
│   ├── images/
│   ├── Rasoi_Pay/
│   ├── Iqra/
│   └── resume/
│       └── MdAfjalKhan_Resume_2026.pdf
├── CONTEXT.md
└── README.md
```

## Status

✅ Production Ready - Senior-level professional portfolio with enterprise case studies
✅ All case studies updated with strategic positioning
✅ Resume updated to Product Architect version
✅ Live demos integrated and functional
✅ Scroll animations + Framer-style motion system live (April 2026)
✅ 12 UI/UX fixes shipped — mobile CTA, focus rings, type scale, dark mode fallback
