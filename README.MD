# SEO Optimizer

**SEO Optimizer** is a full-stack web application for analyzing, monitoring, and improving website SEO.

The platform combines a React/Vite dashboard with a Node.js/Express backend to provide website crawling, technical SEO auditing, PageSpeed analysis, SEO scoring, issue detection, AI-powered recommendations, and SEO workflow tools.

## Overview

```text
                         SEO Optimizer
                              │
                 ┌────────────┴────────────┐
                 │                         │
             Frontend                  Backend
                 │                         │
          React + Vite              Node + Express
          TypeScript                    TypeScript
          Tailwind CSS                  MongoDB
                 │                         │
                 └────────────┬────────────┘
                              │
                     REST API + JWT
                              │
                 ┌────────────┴────────────┐
                 │                         │
             SEO Engine                AI Services
                 │                         │
          Website Crawler            SEO Assistant
          Page Analyzer              SEO Fixes
          PageSpeed                  Forum Content
          SEO Scoring                Guest Posts
                                    Outreach Emails
```

---

## Main Features

### Website SEO Audit

Analyze an entire website and identify SEO issues across multiple pages.

### Page SEO Audit

Analyze individual pages for on-page and technical SEO factors.

### SEO Scoring

Generate SEO scores based on detected issues and section-level scoring rules.

### Technical SEO

Analyze:

* Canonical URLs
* Robots.txt
* Sitemap
* URLs
* HTTP-related page information
* Technical page properties

### On-Page SEO

Analyze:

* Page titles
* Meta descriptions
* Headings
* Images
* Internal links
* External links
* Open Graph
* Twitter metadata
* JSON-LD / Schema

### Google PageSpeed

Analyze website performance for:

* Mobile
* Desktop

Including Lighthouse categories and Core Web Vitals-related metrics.

### AI SEO Assistant

Generate:

* SEO recommendations
* SEO fix suggestions
* Forum posts
* Forum replies
* Guest posts
* Outreach emails

### Authentication

* User registration
* User login
* JWT authentication
* Protected API routes
* Protected dashboard routes

---

# Repository Structure

```text
SEO-Optimizer/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── index.ts
│   │
│   └── README.md
│
└── README.md
```

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Axios
* js-cookie

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt
* Zod
* Playwright
* Cheerio
* Helmet
* Express Rate Limit
* CORS

## External Services

* Google PageSpeed Insights
* Google Gemini / AI service

---

# Application Architecture

```text
                         User
                          │
                          ▼
                 React + Vite Frontend
                          │
                          │ REST API
                          │ JWT
                          ▼
                Node + Express Backend
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
         Auth API      SEO API       AI API
             │            │            │
             ▼            ▼            ▼
          MongoDB     SEO Engine    AI Services
                          │
                ┌─────────┴─────────┐
                │                   │
                ▼                   ▼
          Website Crawler       PageSpeed
                │
                ▼
          Target Websites
```

---

# Frontend

The frontend provides the user-facing dashboard.

## Frontend Routes

### Public

```text
/
 /signin
 /signup
```

### Protected

```text
/dashboard
/dashboard/keywords
/dashboard/content
/dashboard/outreach
/dashboard/serp
/dashboard/site-audit
/dashboard/backlinks
```

The dashboard routes are protected by `ProtectedRoute`.

For detailed frontend setup and architecture, see:

```text
frontend/README.md
```

---

# Backend

The backend provides the REST API consumed by the frontend.

## API Groups

```text
/api/auth
/api/seo
/api/ai
```

### Authentication

```text
POST /api/auth/signup
POST /api/auth/signin
```

### SEO

```text
POST /api/seo/audit/website
POST /api/seo/audit/page
POST /api/seo/fix
POST /api/seo/analyze/pagespeed
```

### AI

```text
POST /api/ai/chat
POST /api/ai/seo-fix
POST /api/ai/forum/post
POST /api/ai/forum/reply
POST /api/ai/guest-post
POST /api/ai/outreach-email
```

For detailed backend architecture and API documentation, see:

```text
backend/README.md
```

---

# SEO Audit Flow

The core website audit works approximately as follows:

```text
Enter Website URL
       │
       ▼
Validate URL
       │
       ▼
Start Crawler
       │
       ▼
Discover Internal Pages
       │
       ▼
Analyze Pages
       │
       ├── Titles
       ├── Meta
       ├── Headings
       ├── Images
       ├── Links
       ├── URLs
       ├── Technical SEO
       ├── Robots
       ├── Sitemap
       ├── Canonical
       ├── Open Graph
       └── Schema
       │
       ▼
Detect Issues
       │
       ▼
Calculate Scores
       │
       ▼
Generate SEO Report
       │
       ▼
Display in Dashboard
```

---

# AI Flow

```text
User
 │
 ▼
Frontend AI Assistant
 │
 ▼
POST /api/ai/*
 │
 ▼
Authentication
 │
 ▼
AI Controller
 │
 ▼
AI Service
 │
 ▼
AI Model
 │
 ▼
Generated Response
 │
 ▼
Frontend
```

---

# Getting Started

## Prerequisites

Install:

* Node.js
* npm
* MongoDB
* Git

Playwright browser binaries are also required by the backend.

---

## Clone Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

---

# Backend Setup

Move into the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create `.env`:

```env
PORT=5002
MONGO_URI=mongodb://localhost:27017/seo-optimizer
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
PAGESPEED_API_KEY=your_pagespeed_api_key
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5002
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:5002/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Running the Full Application

Run both applications:

```text
Terminal 1
──────────
cd backend
npm run dev
```

```text
Terminal 2
──────────
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

The frontend communicates with:

```text
http://localhost:5002/api
```

---

# Environment Variables

## Backend

```env
PORT=5002
MONGO_URI=...
JWT_SECRET=...
FRONTEND_URL=http://localhost:5173
PAGESPEED_API_KEY=...
```

## Frontend

```env
VITE_API_BASE_URL=http://localhost:5002/api
```

Never commit secrets or `.env` files to the repository.

---

# Security

The application uses several security mechanisms:

* JWT authentication
* bcrypt password hashing
* Zod validation
* Helmet security headers
* CORS
* API rate limiting
* Protected frontend routes
* Protected backend routes
* Centralized error handling

---

# Project Design

The project separates frontend presentation from backend business logic.

```text
frontend/
   │
   ├── UI
   ├── Routing
   ├── Authentication State
   └── API Communication
          │
          ▼
backend/
   │
   ├── Routes
   ├── Controllers
   ├── Middleware
   ├── Services
   ├── Models
   └── Utilities
```

The backend SEO engine is further divided into independent services, making individual SEO checks easier to maintain and extend.

---

# Current SEO Modules

The backend currently contains dedicated services for:

* Website crawling
* Page auditing
* SEO scoring
* Score deductions
* Title analysis
* Meta analysis
* Heading analysis
* Image analysis
* Link analysis
* URL analysis
* Technical SEO
* Robots.txt
* Sitemap
* Canonical URLs
* Schema / JSON-LD
* PageSpeed
* SEO issue detection
* Static SEO fixes

---

# Future Roadmap

Potential features for future versions:

* SEO project management
* Persistent audit reports
* Audit history
* Scheduled audits
* Keyword rank tracking
* Competitor analysis
* Backlink database
* Broken-link verification
* Redirect analysis
* Security header analysis
* Core Web Vitals history
* SEO report export
* Automated email reports
* Background crawl processing
* Redis caching
* Crawl queues
* Real-time crawl progress
* Advanced analytics

---

# Contributing

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Test the frontend and backend.
5. Commit your changes.

```bash
git commit -m "feat: add your feature"
```

6. Push the branch.

```bash
git push origin feature/your-feature
```

7. Open a pull request.

---

# License

This project is currently intended for educational and development purposes.

Add an appropriate license before distributing the project publicly.
