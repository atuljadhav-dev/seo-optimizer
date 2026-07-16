# SEO Optimizer — Frontend

The frontend application for **SEO Optimizer**, a web-based SEO analysis dashboard.

The application provides a dashboard for website SEO audits, keyword analysis, content optimization, SERP tracking, backlink analysis, email outreach, and AI-powered SEO assistance.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- js-cookie

## Features

### Authentication

- Sign in
- Sign up
- Protected dashboard routes
- JWT token handling
- Automatic authorization headers

### SEO Dashboard

The dashboard contains dedicated modules for:

- SEO overview
- Keyword analysis
- Content optimization
- Email outreach
- SERP tracking
- Site audit
- Backlink analysis

### AI Assistant

The dashboard includes an AI assistant for interacting with the backend SEO AI services.

### API Integration

API communication is centralized through Axios.

The frontend automatically reads the authentication token from the browser cookie and sends it with protected API requests.

---

## Project Structure

```text
frontend/
└── src/
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    │
    ├── components/
    │   ├── AIAssistant.tsx
    │   └── ProtectedRoute.tsx
    │
    ├── layouts/
    │   └── DashboardLayout.tsx
    │
    ├── pages/
    │   ├── auth/
    │   │   ├── SignIn.tsx
    │   │   └── SignUp.tsx
    │   │
    │   ├── dashboard/
    │   │   ├── Overview.tsx
    │   │   ├── Keywords.tsx
    │   │   ├── ContentOptimizer.tsx
    │   │   ├── SerpTracker.tsx
    │   │   ├── SiteAudit.tsx
    │   │   └── LinkAnalyzer.tsx
    │   │
    │   └── offpage/
    │       └── EmailOutreach.tsx
    │
    ├── services/
    │   └── api.ts
    │
    ├── App.tsx
    ├── App.css
    ├── index.css
    └── main.tsx
```

---

## Application Routes

### Public Routes

| Route     | Page         |
| --------- | ------------ |
| `/`       | Landing page |
| `/signin` | Sign in      |
| `/signup` | Sign up      |

### Protected Routes

| Route                   | Page              |
| ----------------------- | ----------------- |
| `/dashboard`            | SEO Overview      |
| `/dashboard/keywords`   | Keyword Analysis  |
| `/dashboard/content`    | Content Optimizer |
| `/dashboard/outreach`   | Email Outreach    |
| `/dashboard/serp`       | SERP Tracker      |
| `/dashboard/site-audit` | Site Audit        |
| `/dashboard/backlinks`  | Backlink Analyzer |

Unauthenticated users cannot access protected dashboard routes.

---

## Routing

The application uses React Router.

The route structure is:

```text
/
├── /signin
├── /signup
│
└── /dashboard
    ├── /keywords
    ├── /content
    ├── /outreach
    ├── /serp
    ├── /site-audit
    └── /backlinks
```

`ProtectedRoute` wraps dashboard pages and checks whether the user has a valid authentication token.

---

## API Configuration

API configuration is centralized in:

```text
src/services/api.ts
```

The default backend URL is:

```text
http://localhost:5002/api
```

Configure another backend using:

```env
VITE_API_BASE_URL=http://localhost:5002/api
```

Example production configuration:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

---

## Axios Authentication

The Axios instance automatically reads the token from the `token` cookie.

```text
React Component
      │
      ▼
Axios API Client
      │
      ▼
Read token cookie
      │
      ▼
Authorization: Bearer <token>
      │
      ▼
Backend API
```

This avoids manually adding the authentication header to every request.

---

## Getting Started

### Prerequisites

Install:

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:5002/api
```

### Start Development Server

```bash
npm run dev
```

Vite normally starts at:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Frontend Architecture

```text
React Application
       │
       ▼
React Router
       │
       ├── Public Pages
       │
       └── Protected Pages
               │
               ▼
        Dashboard Layout
               │
       ┌───────┴────────┐
       ▼                ▼
 Feature Pages       AI Assistant
       │                │
       └───────┬────────┘
               ▼
          Axios Client
               │
               ▼
        Backend REST API
```

---

## Dashboard Modules

### Overview

Provides the main SEO dashboard and website performance information.

### Keywords

Provides the interface for keyword-related SEO analysis.

### Content Optimizer

Provides tools for improving website content from an SEO perspective.

### SERP Tracker

Provides the interface for tracking search engine rankings.

### Site Audit

Connects to the backend website auditing functionality.

### Backlinks

Provides the interface for backlink and link analysis.

### Email Outreach

Provides the interface for SEO outreach workflows.

### AI Assistant

Provides an interface for communicating with the backend AI SEO assistant.

---

## Backend Integration

The frontend communicates with these backend API groups:

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

---

## Development Guidelines

### Components

Reusable components belong in:

```text
src/components/
```

### Pages

Feature-specific pages belong in:

```text
src/pages/
```

### API Services

API communication should remain inside:

```text
src/services/
```

### Layouts

Shared dashboard UI belongs in:

```text
src/layouts/
```

---

## Environment Variables

| Variable            | Description          |
| ------------------- | -------------------- |
| `VITE_API_BASE_URL` | Backend API base URL |

Only variables prefixed with `VITE_` are exposed to client-side code.

Do not put private secrets or API keys in frontend environment variables.

---

## Production

Build the application:

```bash
npm run build
```

Vite generates the production files inside:

```text
dist/
```

The generated application can be deployed to a static hosting platform such as Vercel, Netlify, or Cloudflare Pages.

## Future Improvements

- Real-time SEO audit progress
- Audit history
- SEO charts
- Keyword position history
- Competitor dashboard
- Advanced backlink reports
- Website project management
- Notifications
- Exportable SEO reports
- Improved landing page
- Advanced responsive dashboard

## License

This project is currently intended for educational and development purposes.
