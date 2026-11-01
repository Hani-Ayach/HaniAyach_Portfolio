import { readFileSync, existsSync } from "node:fs";
import { profile } from "../content/profile";

const html = readFileSync("index.html", "utf8");
const doc = new DOMParser().parseFromString(html, "text/html");
const meta = (sel) => doc.querySelector(sel)?.getAttribute("content");

test("has a description and social preview tags", () => {
  expect(meta('meta[name="description"]')).toMatch(/full stack software engineer/i);
  expect(meta('meta[property="og:title"]')).toContain(profile.name);
  expect(meta('meta[property="og:image"]')).toMatch(/^https:\/\/.+\/og\.png$/);
  expect(meta('meta[name="twitter:card"]')).toBe("summary_large_image");
});

test("describes Hani as a Person with structured data", () => {
  const ld = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
  expect(ld).toMatchObject({
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    worksFor: { name: "Intalio" },
  });
  expect(ld.sameAs).toEqual([profile.socials.linkedin, profile.socials.github]);
});

test("ships the social image, robots, sitemap and SPA rewrites", () => {
  for (const f of ["public/og.png", "public/robots.txt", "public/sitemap.xml", "vercel.json", "public/_redirects"]) {
    expect(existsSync(f), f).toBe(true);
  }
});
