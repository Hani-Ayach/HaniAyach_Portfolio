// Single source of truth for everything the site says about Hani.
// Company work is anonymized: no client names, no code, only what Hani confirmed.

// Used in production, grouped for display. Mirrors the "Used in production" list on CV 2026 v4.
const PRODUCTION_GROUPS = [
  { group: "Languages", items: ["C#", "TypeScript", "JavaScript", "SQL", "Java"] },
  { group: "Backend & architecture", items: ["Modular monolith", "MediatR", "ASP.NET Core Identity", "JWT", "Policy-based authorization", "Swagger / OpenAPI", "Serilog", "AutoMapper", "FluentValidation", "RabbitMQ"] },
  { group: "Frontend", items: ["Angular", "RxJS", "NgRx / Signals", "React", "Vue", "Angular Material / PrimeNG", "Telerik UI", "Tailwind CSS", "Charts & dashboards", "Arabic RTL / i18n"] },
  { group: "Search, caching, real-time & jobs", items: ["Elasticsearch", "Redis", "SignalR", "Hangfire / Worker Services"] },
  { group: "Data", items: ["PostgreSQL / MySQL", "MongoDB", "Query optimization & indexing"] },
  { group: "Documents & files", items: ["Aspose", "Telerik document processing", "File storage"] },
  { group: "Testing & delivery", items: ["xUnit / NUnit", "Playwright", "Git", "Docker", "Docker Compose", "GitHub Actions", "IIS / Windows Server", "Agile / Scrum"] },
];

export const profile = {
  name: "Hani Ayach",
  title: "Full Stack Software Engineer",
  tagline:
    "Building enterprise web apps with .NET and modern JavaScript frameworks. I design the structure first; the framework is a tool.",
  keywords: [
    "ASP.NET Core",
    "C#",
    "SQL Server",
    "Angular",
    "React",
    "Vue",
    "TypeScript",
    "Clean Architecture",
    "AI-assisted delivery",
  ],
  motto: "AI accelerates. Engineering decides.",
  location: "Lebanon",
  email: "hani.r.ayach@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/hani-ayach-003997215/",
    github: "https://github.com/Hani-Ayach",
  },
  // Set to "/Hani_Ayach_CV.pdf" once the updated PDF is in public/. While null, CV links are hidden.
  cvUrl: null,

  experience: [
    {
      id: "intalio",
      company: "Intalio",
      role: "Professional Full Stack Developer",
      type: "full-time",
      start: "2025-11",
      end: null,
      summary:
        "Building features end to end for an enterprise workflow / BPM / case-management platform.",
      highlights: [
        "Deliver features end to end across the ASP.NET Core API, EF Core, SQL Server and the Angular UI; own bug fixing and maintenance of existing modules",
        "Work inside a Clean Architecture monolith with CQRS + MediatR: each business operation is a command or query with its own handler, keeping controllers thin and business rules in the domain",
        "Extend behavior with a Driver + Registry + Factory design: each new behavior is a driver class registered by key and resolved at runtime, so working code stays untouched (open/closed)",
        "Turned recurring development tasks into custom Claude Code skills, cutting time and effort so the focus stays on business rules and system design; every diff is reviewed before merge",
        "Modern Angular: standalone components, RxJS services, reactive forms with validation mirrored on the API, NgRx / Signals",
        "Playwright (Chromium) end-to-end tests for the flows users depend on",
        "Run the full system locally (applications + database) in containers with Docker Compose",
      ],
      stack: ["ASP.NET Core", "EF Core", "SQL Server", "MediatR", "Angular", "NgRx / Signals", "Playwright", "Docker Compose", "Claude Code"],
    },
    {
      id: "codewave",
      company: "CodeWave",
      role: "Full Stack Software Engineer",
      type: "full-time",
      start: "2025-04",
      end: "2025-10",
      summary: "Enterprise web applications on ASP.NET Core with Clean Architecture and a modular monolith.",
      highlights: [
        "Built and maintained enterprise applications on ASP.NET Core with Clean Architecture and a modular monolith, using Razor Pages, RESTful APIs and Telerik UI",
        "Integrated external systems into large-scale enterprise applications, keeping data in sync across multiple shared projects",
        "Managed data access and performance with EF Core and the repository pattern; built secure authentication and authorization with JWT-based identity",
        "Designed clean, maintainable front-end interfaces with straightforward integration to back-end systems",
        "Planned and delivered work in Agile sprints on Azure Boards; used AI tools to plan work and speed up delivery",
      ],
      stack: ["ASP.NET Core", "Razor Pages", "EF Core", "SQL Server", "Telerik UI", "JWT", "Azure Boards"],
    },
    {
      id: "antwork",
      company: "Antwork",
      role: "Full Stack Software Developer",
      type: "full-time",
      start: "2023-09",
      end: "2025-03",
      summary: "APIs, performance work and multi-framework front ends for business applications.",
      highlights: [
        "Cut API response time by 40% by filtering out unnecessary data and returning only the fields each screen needs",
        "Data-loading strategy: primary data displays instantly while secondary data loads on user interaction",
        "Improved database performance with SQL indexing, reducing query execution time",
        "Built and maintained tens of APIs for CRUD and complex business logic, including RESTful APIs serving both web front ends and mobile apps",
        "Secured sensitive endpoints with JWT authentication and role-based authorization",
        "Automated recurring reports with the Google Sheets API, saving hours every week",
        "UI components for data visualization in Angular, Vue and React; Android features in Java",
        "Kept code clean with Git best practices, ready for the CI/CD pipeline managed by the DevOps team",
      ],
      stack: ["ASP.NET API / MVC", "C#", "SQL Server", "Angular", "Vue", "React", "Google Sheets API", "Java (Android)", "IIS / Windows Server"],
    },
    {
      id: "mayfadoun",
      company: "Mayfadoun",
      role: "Full Stack Developer (Intern)",
      type: "internship",
      start: "2021-10",
      end: "2022-06",
      summary: "REST APIs, messaging and Angular components.",
      highlights: [
        "REST APIs with ASP.NET API (C#)",
        "RabbitMQ for asynchronous messaging, improving reliability",
        "Optimized SQL queries; built Angular front-end components",
      ],
      stack: ["ASP.NET API", "RabbitMQ", "SQL Server", "Angular"],
    },
  ],

  education: {
    degree: "BSc Computer Science",
    school: "Lebanese International University",
    period: "2020 – 2023",
    note: "GPA 3.8 · Honor Society",
  },

  certifications: [
    { name: "DevOps Engineer", issuer: "Simplilearn", date: "2024-10" },
    { name: "Container Orchestration using Kubernetes", issuer: "Simplilearn", date: "2024" },
    { name: "McKinsey Forward Program", issuer: "McKinsey Academy", date: "2024-04" },
  ],

  skills: {
    strong: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "Clean Architecture", "SOLID & design patterns"],
    productionGroups: PRODUCTION_GROUPS,
    production: PRODUCTION_GROUPS.flatMap((g) => g.items),
    learning: ["Kubernetes", "Terraform", "Ansible", "Jenkins", "Cloud (AWS / Azure)"],
  },

  caseStudies: [
    {
      slug: "workflow-features-end-to-end",
      title: "Workflow features, end to end",
      label: "Enterprise workflow platform",
      summary:
        "Shipping workflow and case-management features across API, database and Angular UI inside a Clean Architecture monolith.",
      context:
        "An enterprise workflow / BPM platform where every new feature touches the domain model, the API, the database and a rich Angular UI, and must not break existing processes.",
      role: "Full-stack developer owning features from the data model to the screen, plus bug fixing and maintenance.",
      architecture: `flowchart LR
  UI[Angular UI<br/>reactive forms · RxJS · NgRx/Signals] --> API[ASP.NET Core API]
  API --> APP[Application layer<br/>use cases]
  APP --> DOM[Domain]
  APP --> INF[Infrastructure<br/>EF Core]
  INF --> DB[(SQL Server)]
  E2E[Playwright E2E] -.-> UI`,
      decisions: [
        "Keep business rules in the domain and application layers so UI and database changes stay local",
        "Design new steps to be open for extension: add behavior through new classes, not by editing working ones",
        "Reactive forms with explicit validation mirrored on the API side",
        "End-to-end Playwright tests on the flows users depend on",
      ],
      results: [
        "Features delivered end to end, from data model to UI",
        "Recurring work packaged as Claude Code skills, freeing time for design and business rules",
      ],
      stack: ["ASP.NET Core", "EF Core", "SQL Server", "Angular", "RxJS", "NgRx / Signals", "Playwright"],
    },
    {
      slug: "external-systems-integration",
      title: "Integrating external systems",
      label: "Enterprise systems integration",
      summary:
        "Bringing data from external systems into enterprise applications and keeping it consistent across several projects.",
      context:
        "Large-scale enterprise systems built from several shared (abstract) projects needed data from external systems, kept in sync across those projects.",
      role: "Full-stack engineer working on the integration and synchronization logic and the screens that use it.",
      architecture: `flowchart LR
  EXT[External systems] --> ADP[Integration layer]
  ADP --> APP[Application services]
  APP --> M1[Module A]
  APP --> M2[Module B]
  M1 --> DB[(SQL Server)]
  M2 --> DB
  M1 --> UI[Razor Pages + Telerik UI]`,
      decisions: [
        "Keep integration logic in its own layer, separate from business modules (Clean Architecture, modular monolith)",
        "Data access through EF Core with the repository pattern",
        "Secured endpoints with JWT-based authentication and authorization",
      ],
      results: [
        "External systems integrated into large enterprise applications, with data kept in sync across multiple projects",
      ],
      stack: ["ASP.NET Core", "Clean Architecture", "Modular monolith", "EF Core", "Razor Pages", "Telerik UI"],
    },
    {
      slug: "api-response-time-40",
      title: "Cutting API response time by 40%",
      label: "Business applications · performance",
      summary: "Finding where the time went and removing it at every layer, from the SQL query to the UI.",
      context:
        "Key screens felt slow. Endpoints returned far more data than the UI needed, and some queries scanned whole tables.",
      role: "Full-stack developer who traced the slow endpoints, fixed them and measured the result.",
      architecture: `flowchart LR
  UI[UI: load primary data first] --> API[API: DTOs with only needed fields]
  API --> Q[Queries: no N+1, fewer round-trips]
  Q --> IDX[(SQL Server + indexes)]
  UI -. on interaction .-> API2[Secondary data endpoint]`,
      decisions: [
        "Trim payloads with DTOs and projections that return only the fields the screen uses",
        "Add indexes on the columns slow queries filter and join on",
        "Rewrite queries and remove N+1 patterns to cut database round-trips",
        "Load primary data first and defer secondary data until the user asks for it",
      ],
      results: [
        "API response time reduced by 40%, measured in browser DevTools before and after",
        "Faster, more responsive UI on the affected screens",
      ],
      stack: ["ASP.NET API", "EF Core / LINQ", "SQL Server", "Angular", "Vue", "React"],
    },
    {
      slug: "search-realtime-background-jobs",
      title: "Search, real-time and background processing",
      label: "Enterprise platform features",
      summary:
        "The features users feel but rarely see: finding records instantly, getting notified the moment something changes, and keeping data in sync without anyone pressing a button.",
      context:
        "Business users needed to search large sets of records and documents, see changes as they happened, and rely on data from external systems being up to date, while the database kept serving everyday traffic.",
      role: "Full-stack developer building the search, caching, notification and background-job pieces, from the API to the UI.",
      architecture: `flowchart LR
  UI[Web UI] -->|search| API[ASP.NET Core API]
  API --> ES[(Elasticsearch<br/>records & documents)]
  API --> RC[(Redis cache<br/>lookups)]
  API --> DB[(SQL database)]
  HF[Hangfire / Worker jobs] -->|sync| EXT[External systems]
  HF --> DB
  HF -->|scheduled emails & reports| MAIL[Email]
  API -->|SignalR| UI`,
      decisions: [
        "Search records and documents through Elasticsearch instead of heavy SQL LIKE queries",
        "Cache frequently read lookup data in Redis so it doesn't hit the database on every request",
        "Push live notifications to users with SignalR instead of making the UI poll",
        "Run syncs with external systems and scheduled emails/reports as background jobs (Hangfire / Worker Services), outside the request path",
      ],
      results: [
        "Fast search across records and documents",
        "Users see changes immediately through live notifications",
        "External data and scheduled reports handled automatically in the background",
      ],
      stack: ["ASP.NET Core", "Elasticsearch", "Redis", "SignalR", "Hangfire", "Worker Services"],
    },
    {
      slug: "ai-assisted-delivery",
      title: "AI-assisted delivery, engineer in charge",
      label: "How I deliver · across roles",
      summary:
        "Using Claude Code to plan and carry out recurring work and migrations faster, while design and review stay human.",
      context:
        "Framework and version upgrades, moving code between modules and schema migrations are repetitive, risky and slow when done by hand.",
      role: "Engineer who designs the change, lets AI do the repetitive steps, and reviews every diff against the business rules.",
      architecture: `flowchart LR
  REQ[Business requirement] --> DES[Design: structure + patterns]
  DES --> SKILL[Claude Code skill / plan]
  SKILL --> DIFF[Generated changes]
  DIFF --> REV[Read every diff + team review]
  REV --> OK{Meets business rules?}
  OK -- yes --> SHIP[Merge]
  OK -- no --> DES`,
      decisions: [
        "Package recurring tasks as custom Claude Code skills instead of repeating prompts",
        "AI plans and drafts; the engineer owns design decisions and patterns",
        "Every diff read and understood, then reviewed by the team, before merge",
      ],
      results: [
        "Recurring tasks and migrations (framework / version upgrades, moving code between modules, schema and data migrations) done with AI drafting and human review",
        "More time spent on business rules and system design instead of boilerplate",
      ],
      stack: ["Claude Code", "GitHub Copilot", "ChatGPT / Claude", ".NET", "Angular"],
    },
  ],

  aiWorkflow: {
    tools: [
      { name: "Claude Code", use: "Plans features, runs recurring tasks as custom skills, drives migrations step by step." },
      { name: "GitHub Copilot", use: "Inline completions for boilerplate while I write the code that matters." },
      { name: "ChatGPT / Claude chat", use: "Design discussions, second opinions on architecture, debugging ideas." },
    ],
    guardrails: [
      "I read and understand every diff. Nothing ships that I couldn't explain.",
      "Changes go through team code review like any other code.",
      "The result is checked against the business rules, not just against the compiler.",
    ],
    exampleSkill: {
      name: "add-workflow-step",
      note: "Illustrative, generic version. No company code.",
      steps: [
        "Read the requirement and the existing step contract",
        "Add a new step class implementing the step interface (open for extension, closed for modification)",
        "Register it in the step factory",
        "Scaffold the API endpoint, validation and the Angular reactive form",
        "Write the tests, then stop for my review",
      ],
    },
  },

  notes: [
    {
      title: "AI can accelerate development, but not replace engineering thinking",
      summary:
        "Architecture and design patterns come from years of solving problems. AI speeds up the work; the mindset still does the deciding.",
    },
    {
      title: "Programming is a way of thinking",
      summary: "Same task, same tools, different results: the difference is how you think through the problem.",
    },
    {
      title: "Don't start your dev journey with HTML and CSS",
      summary: "Start with one solid language, problem solving and data structures; any stack becomes reachable after that.",
    },
    {
      title: "The real skill is solving problems",
      summary: "Debugging isn't failure, it's the job: understand why, break it down, explore until it works.",
    },
  ],
};

function monthIndex(yyyyMm) {
  const [y, m] = yyyyMm.split("-").map(Number);
  return y * 12 + (m - 1);
}

// Whole years of full-time experience. Months are counted inclusively;
// a role with end === null runs to `today`.
export function yearsOfExperience(experience, today = new Date()) {
  const now = today.getFullYear() * 12 + today.getMonth();
  const months = experience
    .filter((e) => e.type === "full-time")
    .reduce((sum, e) => sum + ((e.end ? monthIndex(e.end) : now) - monthIndex(e.start) + 1), 0);
  return Math.floor(months / 12);
}

export function formatYears(years) {
  return `${years}+ ${years === 1 ? "year" : "years"}`;
}
