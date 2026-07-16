# SEO Optimizer — Backend

The backend API for **SEO Optimizer**, a web-based SEO analysis and optimization platform.

It provides authentication, website and page SEO auditing, technical SEO analysis, PageSpeed analysis, static SEO issue detection, and AI-powered SEO content assistance.

## Tech Stack

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
* Google PageSpeed Insights
* Google Gemini / AI service

## Features

### Authentication

* User registration
* User login
* Password hashing
* JWT authentication
* Protected API routes
* Request validation using Zod

### Website SEO Audit

The website audit engine can:

* Crawl a website
* Discover internal pages
* Analyze multiple pages
* Calculate SEO scores
* Detect SEO issues
* Classify issues by severity
* Generate recommendations

The crawler uses Playwright for browser-based page loading and Cheerio for HTML analysis.

### Page SEO Audit

Individual pages can be analyzed for:

* Page title
* Meta description
* Headings
* Images
* Links
* URL structure
* Technical SEO
* Canonical URL
* Robots directives
* Sitemap information
* Open Graph metadata
* Twitter metadata
* JSON-LD / Schema

### PageSpeed Analysis

The backend integrates with Google PageSpeed Insights and analyzes:

* Performance
* Accessibility
* Best Practices
* SEO
* First Contentful Paint
* Largest Contentful Paint
* Cumulative Layout Shift
* Total Blocking Time
* Speed Index

Both mobile and desktop analysis are supported.

### AI SEO Assistant

AI endpoints are available for:

* SEO chat
* SEO fix suggestions
* Forum post generation
* Forum reply generation
* Guest post generation
* Outreach email generation

---

## Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.config.ts
│   │
│   ├── constants/
│   │   ├── seoPenalty.ts
│   │   └── seoSectionScore.ts
│   │
│   ├── controllers/
│   │   ├── ai.controller.ts
│   │   ├── auth.controller.ts
│   │   └── seo.controller.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── guards.ts
│   │   └── validate.ts
│   │
│   ├── models/
│   │   └── user.model.ts
│   │
│   ├── routes/
│   │   ├── ai.route.ts
│   │   ├── auth.route.ts
│   │   └── seo.route.ts
│   │
│   ├── services/
│   │   ├── ai/
│   │   │   ├── ai.service.ts
│   │   │   ├── forum.service.ts
│   │   │   ├── guestPost.service.ts
│   │   │   ├── outReachEmail.service.ts
│   │   │   ├── prompts.ts
│   │   │   └── seo-fix.service.ts
│   │   │
│   │   ├── seo/
│   │   │   ├── crawler.service.ts
│   │   │   ├── deductScore.ts
│   │   │   ├── heading.service.ts
│   │   │   ├── image.service.ts
│   │   │   ├── issue.service.ts
│   │   │   ├── link.service.ts
│   │   │   ├── meta.service.ts
│   │   │   ├── page-audit.service.ts
│   │   │   ├── pagespeed.service.ts
│   │   │   ├── report.service.ts
│   │   │   ├── robots.service.ts
│   │   │   ├── schema.service.ts
│   │   │   ├── sitemap.service.ts
│   │   │   ├── technical.service.ts
│   │   │   ├── title.service.ts
│   │   │   ├── types.ts
│   │   │   ├── url.service.ts
│   │   │   └── website-audit.service.ts
│   │   │
│   │   └── auth.service.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── utils/
│   │   ├── apiResponse.ts
│   │   ├── asyncHandler.ts
│   │   ├── generateToken.ts
│   │   ├── logger.ts
│   │   └── uniqueId.ts
│   │
│   ├── validators/
│   │   ├── ai.validator.ts
│   │   ├── auth.validator.ts
│   │   └── website.validator.ts
│   │
│   └── index.ts
│
└── .env
```

---

## Architecture

The backend follows a layered architecture:

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Middleware
   │
   ├── Authentication
   ├── Validation
   ├── Rate Limiting
   └── Security
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ├── Authentication
   ├── SEO
   └── AI
   │
   ├───────────────┬───────────────┐
   ▼               ▼               ▼
MongoDB       Target Website   External APIs
                               │
                               └── PageSpeed / AI
```

## API Base URL

Development:

```text
http://localhost:5002/api
```

## API Endpoints

### Health

```http
GET /
```

```http
GET /health
```

### Authentication

```http
POST /api/auth/signup
POST /api/auth/signin
```

### SEO

```http
POST /api/seo/audit/website
POST /api/seo/audit/page
POST /api/seo/fix
POST /api/seo/analyze/pagespeed
```

### AI

```http
POST /api/ai/chat
POST /api/ai/seo-fix
POST /api/ai/forum/post
POST /api/ai/forum/reply
POST /api/ai/guest-post
POST /api/ai/outreach-email
```

The `/api/seo` and `/api/ai` routes are protected by JWT authentication.

---

## Example Requests

### Sign Up

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Sign In

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Website Audit

```json
{
  "url": "https://example.com"
}
```

### Page Audit

```json
{
  "url": "https://example.com/about"
}
```

### PageSpeed

```json
{
  "url": "https://example.com"
}
```

---

## Authentication

Protected requests require a JWT:

```http
Authorization: Bearer <token>
```

The frontend stores the token in a browser cookie and the Axios interceptor automatically adds it to API requests.

---

## Environment Variables

Create a `.env` file:

```env
PORT=5002
MONGO_URI=mongodb://localhost:27017/seo-optimizer
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
PAGESPEED_API_KEY=your_pagespeed_api_key
```

Do not commit `.env` to Git.

---

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Start the development server:

```bash
npm run dev
```

---

## Security

The API uses:

* Helmet
* CORS
* JWT authentication
* bcrypt password hashing
* Zod validation
* Express rate limiting
* Centralized error handling

The default rate limit is:

```text
100 requests / 15 minutes
```

---

## SEO Analysis Flow

```text
Website URL
    │
    ▼
Website Crawler
    │
    ▼
Discover Internal Pages
    │
    ▼
Page Analyzer
    │
    ├── Title
    ├── Meta
    ├── Heading
    ├── Images
    ├── Links
    ├── URL
    ├── Technical
    ├── Robots
    ├── Sitemap
    ├── Schema
    └── Open Graph
    │
    ▼
Issue Detection
    │
    ▼
Score Calculation
    │
    ▼
SEO Report
```

## Future Improvements

* Persistent audit history
* Website/project management
* Scheduled audits
* Keyword rank tracking
* Competitor analysis
* Broken-link detection
* Redirect analysis
* Historical SEO scores
* Backlink tracking
* Redis caching
* Background crawl jobs
* Automated SEO reports
* Notifications

## License

This project is currently intended for educational and development purposes.
