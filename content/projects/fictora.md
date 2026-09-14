---
title: "Fictora"
status: Completed
category: Full Stack
description: Fictora is an entertainment discovery platform built with Next.js and the TMDB API, offering a rich interface to explore movies with detailed info, search, theming, and responsive design. Future updates will expand content to anime (Jikan API) and books (Google Books API), evolving into an all-in-one hub for media enthusiasts.
start: 2024-02-10
end: 2024-04-10
tags:
  - Nextjs
  - Shadcn
  - TMDB
url: https://fictora.netlify.app/
created: 2025-06-07T22:39
github: https://github.com/Anujjoshi3105/fictora
thumbnail: _assets/fictora.png
updated: 2026-04-12T19:01
slug: fictora
---

> A unified, data-enriched platform for discovering movies, anime, and books—designed for the modern media explorer.

> Fictora combines entertainment discovery with responsive frontend engineering and real-time APIs to create a seamless, personalized user experience—one that’s scalable, accessible, and content-rich.

## **Introduction**

**Fictora** is an interactive discovery platform that unites **movies**, **TV shows**, **anime**, and **books** under one immersive interface. Initially developed with a focus on movies via the TMDB API, the project is expanding to include data from **Jikan** (anime) and **Google Books** APIs.

The platform is modular, fast, and designed with long-term content scalability in mind. Whether you’re a movie buff, anime fan, or bookworm, Fictora curates and contextualizes content from across formats.

🌐 [Live Site](https://fictora.netlify.app/)  🔗 [GitHub Repo](https://github.com/anujjoshi3105/fictora)

  

![[fictora.png]]

## **Problem Statement**

Modern content discovery is fragmented across platforms. Each format—movies, anime, books—has separate ecosystems with inconsistent UX and limited personalization.

- Users juggle multiple apps for content exploration
- Cross-format recommendation is nearly absent
- Minimal personalization or feedback loops
- Limited consideration of UI accessibility and theming

> Fictora addresses these issues by providing a unified, theme-aware, and extensible discovery engine that adapts to the user's content preferences.

## **Technical Stack**

|Layer|Technologies|
|---|---|
|Frontend|React (Next.js App Router), TypeScript|
|Styling|Tailwind CSS, Responsive Theming|
|Forms & UX|Context API, Planned Redux integration|
|Animations|Framer Motion|
|APIs|TMDB (active), Jikan & Google Books (planned)|
|Deployment|Vercel|

## **Architecture & Design Highlights**

- **Modular Page Architecture**: Pages and layouts follow Next.js App Router convention for flexibility
- **Client-Side State Management**: Lightweight context-based flow for responsiveness and performance
- **Search with Auto-complete**: Real-time results powered by TMDB’s search endpoints
- **Theme-aware Design**: Light and dark modes with system preference compatibility
- **Zero Authentication**: Read-only browsing experience, scalable for future user auth and personalization

## **Core Features**

### **🎬 Movie Discovery Interface**

- Pulls trending, popular, and search-based results
- Detailed views for cast, ratings, trailers, genres, and more

### **🔎 Search-Driven Navigation**

- Autocomplete interface with debounced API hits
- Instant redirection to detailed content pages

### **📱 Responsive and Accessible UI**

- Built mobile-first with Tailwind CSS utilities
- Keyboard-friendly and theming-compliant

### **🌐 API-First Expansion Plan**

- TMDB fully integrated
- Jikan (anime) and Google Books (novels) in pipeline
- Unified interface for multi-format exploration

![[image.png]]

## **Planned Enhancements**

|Feature|Status|Description|
|---|---|---|
|Anime Integration|🚧 In Progress|Jikan API-based anime search, season updates, and character data|
|Book Integration|🔜 Planned|Author bios, review scores, and recommendations via Google Books|
|TV Shows|🔜 Planned|Episode tracking and air date highlights|
|User Profiles|🔜 Planned|Watchlists, history, and favorites|
|Recommendation Engine|🔜 Planned|Personalized suggestions based on activity|
|Reviews & Ratings|🔜 Planned|User-submitted feedback on content|
|Social Sharing|🔜 Planned|Share titles with summaries and posters|
|Multi-language Support|🔜 Planned|i18n layer for global accessibility|
|PWA Support|🧪 Research|Offline caching and installability|

## **Scalability Considerations**

- Stateless rendering for performance
- Lazy-load image handling via Next.js
- Isolated data adapters for each content type
- Responsive grid and card-based layout architecture

## **Folder Structure**

```
fictora/
├── app/                   // Next.js App Router structure
│   ├── layout.tsx        // Root layout
│   ├── page.tsx          // Landing
│   ├── search/           // Search UI
│   ├── movie/            // Dynamic movie pages
├── components/           // Reusable UI elements
├── lib/                  // API handlers, utility functions
├── styles/               // Tailwind config and globals
├── public/               // Static assets
└── types/                // TypeScript interfaces
```

## **Development Process**

Fictora was built with performance-first principles and extensibility as the core directive:

- **Next.js App Router**: Modular routing and layout inheritance
- **API Abstraction Layer**: Centralized TMDB functions for easy replacement
- **Tailwind CSS**: Clean utility-first styling and theme toggling
- **Framer Motion**: Subtle interface animations for smooth user experience
- **TypeScript Everywhere**: Type-safe API consumption and prop management

## **Impact & Vision**

✅ Provides a content discovery experience that bridges media formats  
✅ Lightweight and performant even on mobile networks  
✅ Zero-login exploration to reduce friction  
✅ Architecture supports plug-and-play integration for future APIs

> Fictora is more than a movie viewer. It’s the starting point of a unified entertainment discovery ecosystem—built for scale, personalization, and accessibility.

## **Contributing & Future Use**

This project is open to contributions in both development and API integration. Ideal areas for contribution:

- Integration of anime and book APIs
- UI/UX polish, accessibility audits
- Backend setup for user persistence (watchlists, ratings)
- ML-powered recommendation engine design

> For collaborations or extension into research/ed-tech, contact Anuj Joshi.
