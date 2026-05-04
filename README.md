<div align="center">

# ⚡ SpawnApps.dev — AI Application Builder

**Generate. Preview. Deploy. In seconds.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%202.5-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

<br/>

**SpawnApps.dev** is a powerful, AI-orchestrated runtime engine that generates fully functional, professionally designed web applications from a single natural language prompt. Describe your idea, and the engine instantly scaffolds a live, navigable application — no code required.

Live: https://spawnapps.dev

<br/>

[**🚀 Deploy to Vercel**](#-deploy-to-vercel-one-click) · [**📦 Download as Next.js ZIP**](#-download-as-nextjs-project) · [**🛠 Run Locally**](#-getting-started-local-development) · [**📖 Architecture**](#-architecture-overview)

</div>

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Supported App Templates](#-supported-app-templates)
4. [How It Works](#-how-it-works)
5. [Deploy to Vercel (One-Click)](#-deploy-to-vercel-one-click)
6. [Download as Next.js Project](#-download-as-nextjs-project)
7. [Getting Started (Local Development)](#-getting-started-local-development)
   - [Prerequisites](#prerequisites)
   - [Installation](#1-clone--install)
   - [Environment Variables](#2-environment-variables)
   - [Database Migration](#3-database-migration)
   - [Run Dev Server](#4-run-development-server)
8. [Using the App](#-using-the-app)
   - [Providing Your Gemini API Key](#providing-your-gemini-api-key)
   - [Generating an App](#generating-an-app)
9. [Configuration Schema Reference](#-configuration-schema-reference)
10. [Prompt Engineering Guide](#-prompt-engineering-guide)
11. [Architecture Overview](#-architecture-overview)
12. [Project Structure](#-project-structure)
13. [Upcoming Features](#-upcoming-features)
14. [Contributing](#-contributing)
15. [License](#-license)

---

## 🌐 Overview

Spawn.dev bridges the gap between idea and working software. Under the hood, a multi-step AI pipeline interprets your natural language description, structures it into a typed JSON configuration, and hands that config off to a **dynamic runtime renderer** that hydrates one of 10+ premium Next.js templates with AI-generated mock data — all in a matter of seconds.

The result is a fully navigable, multi-page web application with real UI components, realistic data, and professional design — instantly available in your browser, ready to deploy or export.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **Natural Language to App** | Describe your idea in plain English. The AI figures out the rest. |
| 🎨 **10+ Premium Templates** | Hand-crafted, domain-specific layouts from SaaS dashboards to real estate explorers. |
| 🚀 **One-Click Vercel Deploy** | Push your generated app directly to production on Vercel via API integration. |
| 📦 **Next.js ZIP Export** | Download the full, runnable Next.js project as a ZIP archive for local editing. |
| 🔑 **Settings & BYOK** | Centralized settings page for Gemini API Keys and Vercel Tokens. |
| 💾 **Intelligent Caching** | Generated configs are cached in PostgreSQL via Prisma for instant reloading. |
| 📱 **Fully Responsive** | Every template is optimized for desktop, tablet, and mobile out of the box. |
| 🔐 **Authentication Ready** | Full user management via Clerk — login, sessions, and secure data handling. |
| 🗺️ **Multi-Page Navigation** | Dynamic routing handles complex multi-page app structures automatically. |
| ⚡ **Vite-like Speed** | Near-instant generation and rendering using Next.js 15+ and React 19. |

---

## 🧩 Supported App Templates

The runtime engine selects and populates one of the following premium templates based on your prompt's detected intent:

| Template Key | App Type | Features |
|---|---|---|
| `SaaSDashboard` | B2B / Analytics | KPI metrics, charts, activity tables, sidebar nav |
| `EcommerceStore` | Online Retail | Product grids, filters, cart, checkout flow |
| `SocialFeed` | Social Platform | Infinite scroll timeline, likes, comments, stories |
| `JobBoard` | Recruitment | Job listing cards, role filters, application modal |
| `CollegeDiscovery` | EdTech | Institution cards, ranking tables, program details |
| `RealEstateExplorer` | Property | Map view, image galleries, pricing, agent contact |
| `BookingSystem` | Services / Travel | Calendar picker, availability slots, booking confirmation |
| `EventTicketing` | Events / Entertainment | Neon-themed event timeline, ticket tiers, purchase flow |
| `BlogPlatform` | Publishing / Content | Rich-text reader, author bio, tag filtering, related posts |
| `PortfolioGallery` | Creative / Agency | Masonry grid, project detail modal, contact form |

> **Adding custom templates:** Drop a new component in `src/lib/runtime/componentRegistry.ts` and it becomes available to the AI immediately.

---

## 🔄 How It Works

```
User Prompt
    │
    ▼
┌─────────────────────────────────────────┐
│         Prompt Engineering Layer        │
│   Formats user input into a structured  │
│   system prompt for the AI model        │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│        Google Gemini 2.5 Flash          │
│   Outputs a strictly typed JSON config  │
│   (pages array, types, entities, meta)  │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         Config Validation & Cache       │
│  Validates schema, stores in Postgres   │
│  via Prisma. Cache hit → skip AI call   │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│            AppRenderer                  │
│  Intercepts /apps/[appId] routes,       │
│  resolves page `type` → Component via   │
│  the Component Registry                 │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│      Dynamic Template + Mock Data       │
│  Component rendered with AI-generated   │
│  content, live navigation, responsive   │
│  layout, and real UI interactions       │
└─────────────────────────────────────────┘
```

---

## 🚀 Deploy to Vercel (One-Click)

Spawn.dev features **direct Vercel deployment** — push your generated app to production without leaving the browser.

### How to Deploy

1. **Generate your app** from the dashboard (see [Generating an App](#generating-an-app)).
2. In the app preview, click the **"Deploy to Vercel"** button in the top action bar.
3. You will be prompted to **authorize Spawn.dev** to connect to your Vercel account (one-time OAuth flow).
4. Choose your preferred **Vercel team/scope** and **project name**.
5. Click **Confirm Deploy**. The engine:
   - Compiles the generated configuration and template code into a deployable Next.js project.
   - Creates a new Vercel project via the Vercel API.
   - Initiates a deployment. A live URL (e.g., `your-app.vercel.app`) is returned within ~60 seconds.
6. Your live URL is saved to the app detail page for future reference.

### Requirements for Vercel Deployment
- A free or paid [Vercel account](https://vercel.com/signup).
- Vercel OAuth authorization (prompted on first deploy).
- No additional configuration is needed — environment variables and build settings are injected automatically.

> **Note:** Deployed apps use AI-generated mock data by default. To connect a live database, see the [Upcoming Features](#-upcoming-features) section on Persistent State Management.

---

## 📦 Download as Next.js Project

Not deploying to Vercel? You can **export your generated app as a fully runnable Next.js ZIP archive** and host it anywhere.

### How to Download

1. **Generate your app** from the dashboard.
2. In the app preview, click the **"Download Project"** button in the top action bar.
3. A `.zip` file will download containing a complete Next.js project, pre-configured with:
   - Your AI-generated page configuration baked in as static data.
   - All referenced template components from the Spawn.dev component library.
   - `package.json`, `tailwind.config.js`, `next.config.js`, and TypeScript config.
   - A `.env.example` file listing any variables you may need to configure.
4. Unzip, run `npm install && npm run dev`, and your app is running locally in seconds.

### What's Included in the ZIP

```
your-app-name/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Entry redirect
│   │   └── [generated pages]/  # One folder per page in your config
│   ├── components/
│   │   └── templates/           # The specific template(s) used by your app
│   └── lib/
│       └── appConfig.ts         # Your generated JSON config, baked in as a constant
├── public/
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

> **Tip:** The downloaded project has zero dependency on Spawn.dev's backend. It is a fully self-contained Next.js application you own completely.

---

## 🛠 Getting Started (Local Development)

### Prerequisites

Make sure you have the following installed and available:

- **Node.js** v18.x or later — [Download](https://nodejs.org/)
- **PostgreSQL** (v14+) — [Download](https://www.postgresql.org/download/) or use a hosted service like [Supabase](https://supabase.com/) or [Neon](https://neon.tech/)
- **Clerk Account** — [Sign up free](https://clerk.com/) (for authentication)
- **Google Gemini API Key** — [Get one free](https://aistudio.google.com/app/apikey) (for AI generation)

---

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Vineetpandey0/App-Builder.git

# Navigate into the project directory
cd App-Builder

# Install all dependencies
npm install
```

---

### 2. Environment Variables

Create a `.env` file in the root of the project by copying the example:

```bash
cp .env.example .env
```

Then open `.env` and fill in your credentials:

```env
# ─────────────────────────────────────────
# DATABASE
# ─────────────────────────────────────────
# Your PostgreSQL connection string.
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
DATABASE_URL="postgresql://user:password@localhost:5432/spawn_dev"

# ─────────────────────────────────────────
# AUTHENTICATION (Clerk)
# ─────────────────────────────────────────
# Found in your Clerk dashboard → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: Customize Clerk redirect paths
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ─────────────────────────────────────────
# AI CONFIGURATION
# ─────────────────────────────────────────
# Fallback Gemini API key used when a user hasn't provided their own.
# Get one free at: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY="AIzaSy..."

# ─────────────────────────────────────────
# DEPLOYMENT (Optional — for Vercel Deploy feature)
# ─────────────────────────────────────────
# Your Vercel API token for one-click deployment.
# Create one at: https://vercel.com/account/tokens
VERCEL_API_TOKEN=""

# ─────────────────────────────────────────
# APP URL (Required for production)
# ─────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> **Security Note:** Never commit your `.env` file to version control. It is already listed in `.gitignore`.

---

### 3. Database Migration

Initialize the database schema using Prisma:

```bash
# Push the Prisma schema to your database (creates all tables)
npx prisma db push

# Optional: Open Prisma Studio to inspect your database visually
npx prisma studio
```

If you make changes to `prisma/schema.prisma` in the future, run `npx prisma db push` again to sync.

---

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the Spawn.dev builder.

Other useful commands:

```bash
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript type checking
```

---

## 🎮 Using the App

### Providing Your API Keys

Spawn.dev supports **Bring Your Own Key (BYOK)** for both Google Gemini and Vercel.

1. Log in to the application.
2. Click on the **User Profile** section in the **Sidebar Footer**.
3. Select **"Settings"** from the popup menu.
4. In the **"API Keys"** tab:
   - Paste your **Gemini API Key** to enable AI generation.
   - Paste your **Vercel API Token** to enable one-click deployments.
5. Your keys are securely stored in your **browser cookies** and used for all subsequent requests.

> **Privacy:** Your API keys are stored client-side in cookies and are never stored on Spawn.dev's permanent servers.

---

### Generating an App

1. After signing in, navigate to the **Dashboard** and click **"New App"**.
2. Enter a natural language description of your application concept in the prompt box.

   **Examples of strong prompts:**
   - `"A SaaS analytics platform for tracking e-commerce conversion funnels"`
   - `"A luxury vacation rental marketplace for mountain cabins in Colorado"`
   - `"A job board for remote-first engineering roles at tech startups"`
   - `"A portfolio site for an architectural photography studio in Tokyo"`
   - `"A booking platform for yoga and meditation classes in London"`

3. Click **"Generate"**. The engine will:
   - Send your prompt to Gemini for structured configuration generation.
   - Validate and store the configuration in the database.
   - Redirect you to the **live preview** at `/apps/[appId]`.

4. Use the **top navigation bar** of your generated app to explore all generated pages.
5. From the preview, use the action bar to:
   - **Deploy to Vercel** — go live instantly.
   - **Download ZIP** — export as a self-contained Next.js project.
   - **Regenerate** — re-run the AI with the same prompt for a different result.

---

## 📐 Configuration Schema Reference

Behind the scenes, the AI generates a strictly typed JSON configuration object. You can also craft this manually for API or database injection.

### Full Schema

```json
{
  "name": "Luxury Miami Real Estate",
  "description": "A high-end property discovery platform for luxury homes.",
  "theme": "light",
  "pages": [
    {
      "path": "/home",
      "label": "Home",
      "type": "landing",
      "entity": "website"
    },
    {
      "path": "/properties",
      "label": "Properties",
      "type": "real_estate",
      "entity": "listings"
    },
    {
      "path": "/admin",
      "label": "Admin",
      "type": "saas_dashboard",
      "entity": "user"
    }
  ]
}
```

### Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | Display name of the generated application |
| `description` | `string` | ❌ | Short summary of the app's purpose |
| `theme` | `"light" \| "dark"` | ❌ | UI color scheme (defaults to `"light"`) |
| `pages` | `Page[]` | ✅ | Array of page definitions (minimum 1) |
| `pages[].path` | `string` | ✅ | URL path, must start with `/` |
| `pages[].label` | `string` | ✅ | Navigation label shown in the app's top bar |
| `pages[].type` | `TemplateKey` | ✅ | Must exactly match a key in `componentRegistry.ts` |
| `pages[].entity` | `string` | ✅ | Domain entity the page represents (e.g., `"listings"`, `"user"`) |

### Valid `type` Values

```
landing · saas_dashboard · ecommerce · social_feed · job_board
college_discovery · real_estate · booking · event_ticketing
blog_platform · portfolio_gallery
```

> **Important:** The `type` value must exactly match a registered key in `src/lib/runtime/componentRegistry.ts`. Unrecognized types will cause a fallback render.

---

## 💡 Prompt Engineering Guide

To get the best results from Spawn.dev's AI engine, follow these guidelines when crafting your prompt:

### ✅ Effective Prompts

| Strategy | Example |
|---|---|
| **Be specific about the domain** | "A job board for remote DevOps engineers" (not just "a job board") |
| **Include the target audience** | "A booking platform for personal trainers serving busy professionals" |
| **Mention geography when relevant** | "A real estate explorer for luxury condos in Dubai" |
| **Reference a visual style** | "A dark-themed SaaS dashboard for a cybersecurity startup" |
| **Name the core entities** | "A marketplace for vintage camera equipment with listings, sellers, and auctions" |

### ❌ Prompts to Avoid

- Too vague: `"Make me an app"` → Use a domain-specific description
- Too technical: `"Build a CRUD app with REST endpoints"` → Describe the *product*, not the implementation
- Contradictory: `"A social media platform but also an e-commerce store"` → Pick a primary domain

### 🔁 Iterating

If a generation doesn't match your vision:
- Click **Regenerate** to re-run the AI with the same prompt.
- Refine your prompt with more detail and generate again.
- Different runs of the same prompt will produce varied configurations due to AI temperature.

---

## 🏗 Architecture Overview

Spawn.dev is a full-stack Next.js 14 application using the App Router. Here is a breakdown of each layer:

### Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 15+ (App Router) | React 19, Server Components, Streaming |
| **UI Library** | Tailwind CSS 4 + Shadcn UI | Premium, utility-first design system |
| **AI Integration** | `@google/genai` (Gemini 2.5 Flash) | Context-aware application configuration generation |
| **Database** | PostgreSQL + Prisma ORM | Data persistence and configuration caching |
| **Authentication** | Clerk | Secure user authentication and session management |
| **Deployment** | Vercel API | Automated project creation and deployment |

### Request Flow

```
Browser
  │
  ▼
Next.js App Router
  ├─ /dashboard                → Dashboard & App creation UI
  ├─ /api/app/create-app       → POST: AI configuration & App creation
  ├─ /api/apps/[appId]/deploy  → POST/DELETE: Vercel deployment management
  ├─ /api/apps/[appId]/export  → GET: ZIP project generation
  │     ├─ Reads user's Gemini key from cookies (or fallback env key)
  │     ├─ Sends structured prompt to Gemini 2.5 Flash
  │     ├─ Validates returned JSON config
  │     └─ Persists to PostgreSQL via Prisma
  │
  └─ /apps/[appId]/[...path]  → AppRenderer (Server Component)
        ├─ Fetches config from DB by appId
        ├─ Matches current path → page config
        ├─ Resolves page `type` → Component from Registry
        └─ Renders component with AI-generated props
```

### Component Registry Pattern

```typescript
// src/lib/runtime/componentRegistry.ts
import { SaaSDashboard } from "@/components/templates/SaaSDashboard";
import { RealEstateExplorer } from "@/components/templates/RealEstateExplorer";
// ...

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  saas_dashboard: SaaSDashboard,
  real_estate: RealEstateExplorer,
  // Add new templates here — they become available to the AI immediately
};
```

---

## 📁 Project Structure

```
App-Builder/
├── prisma/
│   └── schema.prisma              # Database schema
├── src/
│   ├── app/
│   │   ├── (builder)/             # Main dashboard & builder workspace
│   │   ├── api/
│   │   │   ├── app/               # App creation & listing endpoints
│   │   │   └── apps/              # Deployment & Export endpoints
│   │   └── apps/[appId]/          # Dynamic App Runtime Renderer
│   ├── components/
│   │   ├── builder/               # Builder UI components (TopNav, Sidebar, Settings)
│   │   ├── runtime/               # 10+ premium app templates
│   │   └── ui/                    # Shadcn UI primitives
│   ├── hooks/                     # Custom hooks (useAppActions, etc.)
│   └── lib/                       # Database, AI, and Utility logic
├── next.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🔮 Upcoming Features

We're actively building the next generation of Spawn.dev. Here's what's on the roadmap:

| Feature | Status | Description |
|---|---|---|
| 🐙 **GitHub Repository Export** | 🔨 In Progress | Push generated code directly to a new GitHub repo |
| 🧩 **Custom Component Injection** | 📅 Planned | Upload your own React components to the engine |
| 🔄 **Persistent State Management** | 📅 Planned | Connect generated apps to live PostgreSQL instances |
| 🎨 **Theme Customization Panel** | 📅 Planned | Visual panel for adjusting colors, fonts, and radii |
| 🤝 **Team Collaboration** | 📅 Planned | Share apps with team members and manage permissions |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository and create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes, following the existing code style (ESLint + Prettier are configured).
3. If adding a new template, register it in `src/lib/runtime/componentRegistry.ts`.
4. Run `npm run lint` and `npm run type-check` to verify no errors.
5. **Open a Pull Request** with a clear description of what you've added or changed.

### Adding a New Template

```bash
# 1. Create your component
touch src/components/templates/MyNewTemplate.tsx

# 2. Register it in the component registry
# src/lib/runtime/componentRegistry.ts
#   my_new_type: MyNewTemplate,

# 3. That's it — the AI can now select your template!
```

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for full details.

---

<div align="center">

Built with ❤️ by the **spawn.dev** team.

[⭐ Star on GitHub](https://github.com/Vineetpandey0/App-Builder) · [🐛 Report a Bug](https://github.com/Vineetpandey0/App-Builder/issues) · [💡 Request a Feature](https://github.com/Vineetpandey0/App-Builder/issues)

</div>