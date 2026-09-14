---
title: "Society of Robotics - DTU"
status: Completed
category: Frontend
description: Developed a dynamic and interactive website for the Society of Robotics, DTU. Leveraged GSAP and Framer Motion to craft smooth animations, transitions, and engaging scroll-based effects. The platform highlights the club’s projects, events, team, and initiatives with a focus on user experience and modern design aesthetics.
start: 2024-02-10
end: 2024-06-11
tags:
  - Framer Motion
  - Gsap
  - Nextjs
  - UI/UX Design
url: https://srdtu.netlify.app/
created: 2025-06-06T23:21
github: https://github.com/Anujjoshi3105/srdtu
thumbnail: _assets/srdtu.png
updated: 2026-04-12T19:02
slug: society-of-robotics
---

> This platform isn’t just a website—it’s a scalable digital foundation for student-led innovation. It demonstrates how technical communities can operate like modern software teams by combining clean design, robust tooling, and a clear development workflow.

## **Introduction**

The **SR-DTU Platform** is the digital backbone of the Society of Robotics at Delhi Technological University. It was architected to unify the society’s activities, increase public visibility, and simplify internal collaboration—built with developer-first best practices to ensure long-term maintainability.

🌐 [Live Site](https://srdtu.netlify.app/) 🔗 [Github](https://github.com/Anujjoshi3105/srdtu)

  

![[srdtu.png]]

## **Problem Statement**

Before this platform, SR-DTU operated through fragmented communication and documentation:

- Events were promoted via chat apps, with no searchable or archived listing.
- Projects lacked public visibility—making it harder for members to showcase contributions or gain recognition.
- Team coordination was dependent on informal tools like WhatsApp and spreadsheets, leading to inefficiencies.
- No central system existed to represent the society’s structure, achievements, or roadmap.

> These challenges stifled collaboration, reduced transparency, and made it hard to scale or onboard new members.

## **Technical Stack**

|Layer|Technologies Used|
|---|---|
|Frontend|React, Next.js (App Router)|
|Styling|Tailwind CSS, semantic HTML, A11y standards|
|Architecture|Atomic Design, modular routing, mobile-first design|
|Deployment|Netlify + GitHub (CI/CD, previews, branch deploys)|
|Optimization|Static Site Generation (SSG), SEO tags, sitemap.xml|
|Tooling|ESLint, Prettier, Husky, GitHub, VS Code|

## **System Architecture**

The platform is designed with modularity, maintainability, and developer experience at its core:

- **Component System:** Built using atomic design methodology (atoms → molecules → organisms), enabling reusability and scalability.
- **Routing:** Clean, human-readable URLs using Next.js App Router (`/events`, `/projects`, etc.).
- **Rendering Strategy:** Fully statically rendered (SSG) for maximum speed and zero server costs.
- **Responsive Design:** Tailwind’s utility classes provide a mobile-first approach with adaptive layouts.
- **Accessibility:** Includes keyboard navigation, screen-reader support, proper heading hierarchy, and `aria` labels.

## **Core Modules and Features**

Each page or feature is built as a standalone module, allowing future additions with minimal code changes.

### 1. **Homepage**

- Brief intro and mission
- CTAs linking to events, projects, and team sections

### 2. **Events**

- Timeline-based layout for past and upcoming events
- Supports descriptions, images, and external links

### 3. **Projects**

- Cards with project title, contributors, links (GitHub/demo), tech stack
- Useful for showcasing both group and solo contributions

### 4. **Team**

- Auto-sorted photo grid (Executive → Core → Associate)
- Includes member bios and contact links

### 5. **Contact**

- Links to society’s email, LinkedIn, GitHub
- Ready for form integration

### 6. **Gallery (Planned)**

- Visual archive sorted by event/type
- Photo/video carousel with lightbox functionality

### 7. **SEO & Social**

- Dynamic Open Graph (OG) tags for link previews
- Static `sitemap.xml` and `robots.txt` for indexability

## **Design & Development Decisions**

### Why Next.js?

- File-system routing makes development intuitive
- Supports static and dynamic rendering when needed
- Excellent developer tooling and ecosystem

### Why Tailwind CSS?

- Enforces consistent spacing, colors, and typography
- Mobile-first, utility-first design = faster development
- Minimizes need for custom styles or class conflicts

### Why Netlify?

- Atomic deploys and previews for every Git branch
- Built-in form handling, environment variables, and CDN
- GitHub-integrated CI/CD with minimal setup

### Why Static Site Generation (SSG)?

- Fast load times and reduced hosting costs
- Ideal for content that changes infrequently
- Easy to integrate with future CMS or APIs

### Why Focus on Accessibility?

- Improves usability for all users
- Compliant with A11y standards and WCAG guidelines
- Benefits search engines and screen reader tools

## **Impact & Outcomes**

The platform drastically improved how SR-DTU operates and presents itself:

✅ Unified project, event, and team listings in a single place  
✅ Improved discoverability with SEO-optimized static pages  
✅ Enabled professional showcasing of student work  
✅ Simplified future contributions via Git-based modular code  
✅ Lowered coordination overhead through centralized workflows

> It didn’t just upgrade a website—it laid the foundation for a digitally mature, scalable student organization.

## **Planned Enhancements**

|Feature|Description|
|---|---|
|DTU SSO Integration|Role-based login system using institutional emails|
|Admin Dashboard|Internal UI for managing content (projects, events, gallery)|
|CMS Integration|Allow non-developers to update news, tutorials, or announcements|
|GitHub Submissions|Project submission form with GitHub PRs integration|
|Workshop Archive|Indexed collection of past workshops, filters by year/topic|
|Tag-based Gallery|Visual archive organized by type or occasion|
|Internal Kanban Board|Task tracking system for ongoing projects and roles|

## **Contributing & Community**

The project is open-source, encouraging contributions and knowledge sharing:

- All code and issues are hosted on GitHub
- Clear contribution guidelines (PR formatting, commit naming, etc.)
- Modular folder structure makes it easy to add new features
- Open to contributions in: features, design, performance, A11y, and documentation

> This platform marks the beginning of a developer-driven, student-owned ecosystem at DTU.
