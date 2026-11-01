# How this site was built

This portfolio is a small project, but I built it the way I build production software: decide the structure first, write the tests before the code, and review every change.

## 1. Start from the problem

The old site hid its projects behind a "coming soon" page, had no work history, and loaded three separate 3D scenes. A recruiter spending 60 seconds on it learned almost nothing. So the goal was simple: in one minute, show what I build, where I've worked, how I think about architecture, and how to reach me.

## 2. Spec, then plan

Before writing code I wrote down:

- **What the site must say:** verified experience only. No invented numbers, and no internal details about the companies I've worked for (case studies are anonymized).
- **What it must do:** an interactive terminal, an experience timeline, case studies, an architecture page, and a contact form that works.
- **Constraints:** fast on phones, accessible (keyboard and screen readers, WCAG AA contrast), no secrets in the browser.

Then I broke the work into small steps. Each step names its files, its interfaces and the tests that prove it works.

## 3. Structure

- **One source of truth for content:** `src/content/profile.js` and `src/content/architecture.js`. Pages only render data, so updating my experience is a one-file change.
- **Pure logic, separated from UI:** the terminal's commands live in `src/terminal/commands.js` as plain functions (input in, output and an action out). The React component only handles typing, history and focus.
- **Lazy loading:** the case study and architecture pages, the diagram library and the 3D star field load only when needed. The first download is about 94 KB gzipped.
- **Graceful failure:** if WebGL is blocked, the 3D background simply disappears and the site keeps working.

## 4. Tests first

Every feature started as a failing test, then the code to make it pass. Some of the tests guard more than behavior:

- the content never mentions an employer inside a case study;
- no skill I only know from courses is listed as production experience;
- every text color meets WCAG AA contrast in both themes;
- every source file is valid UTF-8 (a real bug once broke the production build);
- the mobile menu traps focus, closes on Escape and returns focus to its button.

The footer shows the live test count from the latest build.

## 5. Review

When the build was done, the whole branch was reviewed with fresh eyes. The review turned up real issues: a WebGL failure that would blank the page, a keyboard trap in the terminal, a broken CV download path, and contrast that was too low in light mode. Each was fixed with a test that failed first.

## 6. Where AI fits

I used AI tools (Claude Code, GitHub Copilot) to speed up the repetitive parts: scaffolding, drafting tests, catching mistakes. The decisions were mine: the structure, what to claim and what to leave out, and every diff before it was merged. That's the same way I use AI at work: **AI accelerates. Engineering decides.**

## Stack

React 19 · Vite · Vitest + Testing Library · Bootstrap 5 · react-three-fiber (star field) · Mermaid (diagrams) · GitHub Actions + Lighthouse CI
