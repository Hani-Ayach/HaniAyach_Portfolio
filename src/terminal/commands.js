// Pure command logic for hani.sh. No React here: input in, lines + optional action out.
import { yearsOfExperience, formatYears } from "../content/profile";
import { formatPeriod } from "../content/format";

export const COMMANDS = [
  "help", "whoami", "experience", "years", "stack", "work", "open",
  "patterns", "ai", "automate", "cv", "contact", "clear", "sudo",
];

const HELP = [
  ["whoami", "who I am"],
  ["experience", "where I've worked"],
  ["years", "years of professional experience"],
  ["stack", "what I work with, honestly tiered"],
  ["work", "list case studies"],
  ["open <slug>", "read a case study"],
  ["patterns", "Clean Architecture & design patterns I use"],
  ["ai", "how I work with AI"],
  ["automate", "watch an example Claude skill run"],
  ["cv", "download my CV"],
  ["contact", "get in touch"],
  ["clear", "clear the screen"],
  ["sudo hire-hani", "you know you want to"],
  ["help", "show this list"],
];

const out = (text) => ({ kind: "out", text });
const accent = (text) => ({ kind: "accent", text });
const err = (text) => ({ kind: "err", text });

const HANDLERS = {
  help: () => ({
    lines: [accent("Available commands:"), ...HELP.map(([c, d]) => out(`  ${c.padEnd(16)} ${d}`))],
  }),

  whoami: ({ profile }) => ({
    lines: [accent(`${profile.name} — ${profile.title}`), out(profile.tagline), out(profile.motto)],
  }),

  years: ({ profile, today }) => ({
    lines: [out(`${formatYears(yearsOfExperience(profile.experience, today))} of professional experience (since 2023)`)],
  }),

  experience: ({ profile }) => ({
    lines: profile.experience.map((e) =>
      out(`${e.company.padEnd(10)} ${e.role} · ${formatPeriod(e.start, e.end)}`)
    ),
  }),

  stack: ({ profile }) => ({
    lines: [
      out(`strong:     ${profile.skills.strong.join(", ")}`),
      out(`production: ${profile.skills.production.join(", ")}`),
      out(`learning:   ${profile.skills.learning.join(", ")}`),
    ],
  }),

  work: ({ profile }) => ({
    lines: [
      ...profile.caseStudies.map((c) => out(`  ${c.slug.padEnd(30)} ${c.title}`)),
      out('Type "open <slug>" to read one.'),
    ],
  }),

  open: ({ profile }, args) => {
    const slug = args[0];
    if (!slug) return { lines: [err("usage: open <slug>   (try: work)")] };
    const c = profile.caseStudies.find((x) => x.slug === slug);
    if (!c) return { lines: [err(`open: "${slug}" not found. Type "work" to list case studies.`)] };
    return { lines: [out(`Opening ${c.title}…`)], action: { type: "navigate", to: `/work/${c.slug}` } };
  },

  patterns: () => ({
    lines: [out("Opening architecture & design patterns…")],
    action: { type: "navigate", to: "/architecture" },
  }),

  ai: () => ({ lines: [out("Opening how I work with AI…")], action: { type: "navigate", to: "/ai-workflow" } }),

  automate: ({ profile }) => {
    const skill = profile.aiWorkflow.exampleSkill;
    return {
      lines: [
        out(`(example skill: ${skill.note})`),
        accent(`$ claude /${skill.name} "approval step with SLA reminder"`),
        ...skill.steps.map((s, i) => out(`  [${i + 1}/${skill.steps.length}] ${s}`)),
        accent("✔ Done. Waiting for human review of the diff."),
      ],
    };
  },

  cv: ({ profile }) =>
    profile.cvUrl
      ? { lines: [out("Downloading CV…")], action: { type: "download", href: profile.cvUrl } }
      : { lines: [out(`My CV is being updated. Email ${profile.email} and I'll send it right away.`)] },

  contact: ({ profile }) => ({
    lines: [out(`Email: ${profile.email}`), out("Opening the contact form…")],
    action: { type: "navigate", to: "/#contact" },
  }),

  clear: () => ({ lines: [], action: { type: "clear" } }),

  sudo: (_ctx, args) => {
    if (args.join(" ") === "hire-hani") {
      return {
        lines: [accent("[sudo] access granted. Great choice."), out("Opening contact form…")],
        action: { type: "navigate", to: `/?subject=${encodeURIComponent("Let's talk about a role").replace(/'/g, "%27")}#contact` },
      };
    }
    return { lines: [err('Permission denied. The only sudo I accept is "sudo hire-hani".')] };
  },
};

const EASTER_EGGS = {
  "dotnet new portfolio": [err("Template output already exists: you're looking at it.")],
  "ng serve": [out("✔ Compiled successfully."), out("** Angular Live Development Server is listening on localhost:4200 **"), out("…just kidding, this one is React. Frameworks are tools.")],
};

export function runCommand(input, ctx) {
  const raw = input.trim().replace(/\s+/g, " ");
  if (!raw) return { lines: [] };
  const lower = raw.toLowerCase();
  if (EASTER_EGGS[lower]) return { lines: EASTER_EGGS[lower] };

  const [name, ...args] = lower.split(" ");
  const handler = HANDLERS[name];
  if (!handler) return { lines: [err(`${name}: command not found. Type "help".`)] };
  return handler(ctx, args);
}

export function complete(prefix, ctx) {
  const lower = prefix.toLowerCase().trimStart();
  if (lower.startsWith("open ")) {
    const part = lower.slice(5);
    return ctx.profile.caseStudies.filter((c) => c.slug.startsWith(part)).map((c) => `open ${c.slug}`);
  }
  return COMMANDS.filter((c) => c.startsWith(lower)).sort();
}
