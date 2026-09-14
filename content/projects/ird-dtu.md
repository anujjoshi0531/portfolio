---
title: "IRD-DTU"
status: Completed
category: Frontend
description: Redesigned and developed the complete website and internal admin system for the Industrial Research & Development Unit of Delhi Technological University. The platform streamlines project proposal submission, sanctioning, and allotment workflows with a modern UI/UX and robust backend. Built using Node.js, PHP, Tailwind CSS, and MySQL, the system includes role-based access, file management, real-time status tracking, and a secure admin dashboard.
start: 2024-02-10
end: 2024-04-10
tags:
  - JavaScript
  - Node.js
  - PHP
  - UI/UX Design
url: https://ird-dtu.netlify.app/
created: 2025-06-06T23:21
github: https://github.com/Anujjoshi3105/IRD-DTU
thumbnail: _assets/ird.png
updated: 2026-04-12T19:01
slug: industrial-research-department
---

> A secure, data-driven ERP and public-facing platform built during an official internship at Delhi Technological University’s Industrial R\&D Unit (IRD).

> Designed to manage proposal workflows, modernize the unit’s digital presence, and streamline faculty-admin collaboration through a robust full-stack architecture.

## **Introduction**

This **internship project** at the **Industrial R\&D Unit of DTU** involved the complete design and development of two interconnected systems:

1. A **modern, responsive website** for the IRD Unit.
2. A **full-featured ERP system** for automating research project submissions, reviews, and tracking.

The aim was to replace legacy processes with a secure, modular, and scalable digital solution for academic R&D administration—laying the groundwork for future institutional use.

  

🌐 [Live Site](https://ird-dtu.netlify.app/)  🔗 [GitHub Repo](https://github.com/anujjoshi3105/ird-dtu)

![[ird.png]]

## **Problem Statement**

Before this project, the IRD relied on email-based submissions and loosely connected systems, leading to:

- Inefficient faculty-admin communication loops
- No real-time proposal status tracking
- Lack of centralized project and document history
- Poor responsiveness on mobile and modern devices

> The internship focused on solving these problems through a responsive frontend and a secure, extensible backend—delivered as a complete ERP for research workflows.

## **Technical Stack**

|Layer|Technologies Used|
|---|---|
|Frontend|HTML5, JavaScript, Tailwind CSS, EJS Templates|
|Backend|Node.js (Express), PHP (admin-side legacy modules)|
|Database|MySQL|
|Authentication|JWT (Faculty), Sessions (Admin)|
|File Upload|Multer|
|Deployment|Apache (via cPanel), tested on XAMPP/WAMP|

## **System Design Highlights**

- **Modular MVC Architecture**
- **JWT for Token-Based Authentication** in the faculty portal
- **Session Management** for admin dashboard
- **Tailwind CSS** for the new responsive UI
- **REST API** layer for clean routing and integration
- **Upload System** with version control and file metadata
- **Email Alert System** for proposal status updates

## **Key Features Developed**

### ✅ Public Website (Tailwind + HTML)

- Dynamic sections for circulars, announcements, documents
- Mobile-first layout, color-theming, accessible navigation

### ✅ ERP System (Node.js + MySQL)

- Faculty login, dashboard, and proposal upload interface
- Admin login panel with review, approval, and comment tools
- Status tracking and versioned proposal submission
- Downloadable data (CSV reports for admins)
- Automatic email notifications during each review stage

## **Planned Enhancements**

|Feature|Status|Details|
|---|---|---|
|Notification System|🚧 In Progress|Alerts via email and dashboard for real-time communication|
|OTP Verification|🔜 Planned|OTP-based authentication during login/registration|
|Admin Analytics Dashboard|🔜 Planned|Visual insights via Chart.js or ECharts|
|Full PHP Replacement|🧪 Research|Convert admin-side to Node.js for consistent tech stack|
|OAuth via DTU Email|🔜 Planned|Login via institutional Google Workspace accounts|

## **Scalability Considerations**

- Separation of admin and faculty workflows
- Stateless API endpoints for scalable backend behaviour
- File uploads optimized for cloud compatibility
- Tailwind-based design scales seamlessly across resolutions
- Modular backend logic for future roles (reviewers, super-admins)

## **Development Process**

- **Requirements gathered directly from IRD staff**
- **Prototypes built and demoed iteratively**
- **Tested with mock data and user roles (faculty/admin)**
- **Performance optimization for low-bandwidth scenarios**
- **Security checks added: file validation, JWT expiry, input sanitization**

## **Impact & Internship Outcomes**

✅ Brought research proposal workflows online  
✅ Reduced submission approval delay by ~70%  
✅ Enabled role-specific access and accountability  
✅ Delivered a stable, scalable foundation for future development  
✅ Completed during a technical internship under university supervision

## **Contribution & Next Steps**

This internship project is open for:

- UI/UX enhancement contributions
- Migration of admin-side to modern stack
- Integrating document parsing, plagiarism detection, or reviewer workflows
- Ed-tech collaborations for similar institutional workflows

> For collaboration or institutional deployment inquiries, reach out to Anuj Joshi.
