---
title: "NicoGauge"
status: Completed
category: Full Stack
description: A Next.js-based platform that evaluates cigarette addiction levels using neuromarketing-driven questionnaires. It computes a personalized NeuroMarketing Index through an interactive form to help users understand and control their dependency patterns.
start: 2024-02-10
end: 2024-06-11
tags:
  - Nextjs
  - Zod
url: https://nicogauge.vercel.app/
created: 2025-06-07T22:39
github: https://github.com/Anujjoshi3105/nicogauge
thumbnail: _assets/nicogauge.png
updated: 2026-04-12T19:01
slug: nicogauge
---

> A neuroscience-inspired, data-driven tool designed to decode user susceptibility to cigarette addiction and marketing stimuli.
> 
> Nico Gauge blends cognitive behavioural science with modern web technologies to deliver impactful, personalized insights—all through a private-by-design user interface.

## **Introduction**

**NicoGauge** is a cognitive analytics platform developed as part of a **Symbiosis Market Research freelance project**. It combines the precision of behavioral scoring with the elegance of modern frontend engineering to evaluate nicotine dependency and the effects of neuromarketing on consumer psychology.

Tailored for research environments and lifestyle analysis, NicoGauge is an interactive, responsive, and insight-driven application—empowering users with a personal **Neuro Marketing Index** to promote informed decision-making.

🌐 [Live Site](https://nicogauge.vercel.app/)  🔗 [GitHub Repo](https://github.com/Anujjoshi3105/nicogauge)

![[nicogauge.png]]

## **Problem Statement**

Public health awareness tools often lack engagement, clarity, and behavioural relevance. Most platforms:

- Focus only on static self-reporting without personalization
- Ignore the **neuromarketing** dimension of addiction
- Don't offer intelligent feedback loops
- Compromise on user privacy with unnecessary data collection

> NicoGauge reimagines the addiction-awareness journey by blending psychometrics, personalization, and ethical design principles.

## **Technical Stack**

|Layer|Technologies|
|---|---|
|Frontend|Next.js (App Router), TypeScript|
|Styling|Tailwind CSS, Theme-aware Responsive UI|
|Forms & UX|React Hook Form, Zod Validation, Framer Motion|
|Scoring Engine|Custom Logic in `/lib`, future-ready for ML extension|
|Data Handling|Local Storage-based Privacy Model|
|Deployment|Vercel|

## **Architecture & Design Highlights**

- **Form-centric Flow**: Multi-step questionnaire mapped to cognitive and behavioral parameters
- **Scoring Logic**: Weighted rubric system reflecting frequency, craving triggers, emotional states, and ad susceptibility
- **Dynamic Result Mapping**: Tailored feedback with category labels—**Low**, **Moderate**, or **High Dependency**
- **No Login Required**: Seamless experience with zero friction or tracking
- **Private-by-Design**: All data processed client-side; optional result persistence via browser storage

## **Core Features**

### **🧠 Neuro Marketing Index Engine**

- Converts structured form inputs into a personalized addiction score
- Accounts for both physical and psychological dependency vectors

### **📊 Dynamic Questionnaire**

- UX-optimized multi-step form built with React Hook Form
- Animations and transitions via Framer Motion enhance user engagement

### **📱 Fully Responsive UI**

- Mobile-first, keyboard-friendly, and accessible
- Theming compatible with system dark/light preferences

### **🔐 Privacy-First Philosophy**

- No external API calls
- No authentication or user tracking
- Optional Local Storage save for re-evaluation

## **Scoring Rubric (Simplified)**

|Category|Weightage|Parameters|
|---|---|---|
|Frequency of Use|High|Daily/Weekly usage patterns|
|Trigger Sensitivity|Medium|Emotional, social, stress factors|
|Ad Stimulus Impact|Medium|Neuromarketing recall & influence|
|Readiness to Quit|High|Intent and previous attempts|

Scores are aggregated and mapped to one of three ranges:

- 🟢 **Low Dependency**
- 🟡 **Moderate Dependency**
- 🔴 **High Dependency**

## **Folder Structure**

```
nicogauge/
├── pages/
│   ├── index.tsx         // Landing Page
│   ├── form.tsx          // Questionnaire Flow
│   └── result.tsx        // Personalized Score Output
├── components/           // UI, Input Elements, Layout
├── lib/                  // Scoring Functions and Utilities
├── styles/               // Tailwind Config and Global Styles
└── public/               // Static Assets and Icons
```

## **Development Process**

This freelance project was delivered with rapid iteration and research-backed feature alignment. Key development decisions:

- **Next.js App Router** for cleaner routing and file-based structure
- **TypeScript** for strong type safety across form and logic layers
- **React Hook Form + Zod** for scalable and composable form control
- **Framer Motion** for intuitive user interaction
- **Tailwind** for responsive and consistent visual design

## **Planned Enhancements**

|Feature|Status|Description|
|---|---|---|
|Exportable Reports|🚧 In Progress|Downloadable PDF reports of scores|
|ML Scoring Integration|🧠 Future|AI model to refine dependency predictions|
|Multi-language Support|🌍 Planned|Expand accessibility with i18n support|
|Longitudinal Tracking|📈 Future|Track scores over time (with optional login)|

## **Impact & Outcomes**

✅ Provided a novel framework for addiction awareness using neuromarketing

✅ Successfully deployed and demoed for behavioural research exploration

✅ Lightweight, fast, and user-centric design

✅ Positioned for use in academic research and public health studies

> NicoGauge isn’t just an awareness tool—it’s a stepping stone toward responsible, tech-assisted self-evaluation.

## **Contributing & Research Use**

While the project is scoped for freelance delivery, it is open for research extensions:

- 🧪 Integration with ML or survey tools
- 🔍 Behavioral pattern analysis modules
- 📚 Long-term health tracking frameworks

> For collaboration or academic licensing, contact Anuj Joshi.
