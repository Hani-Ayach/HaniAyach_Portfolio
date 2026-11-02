import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { profile } from "../content/profile";

afterEach(() => vi.unstubAllGlobals());

test("footer shows the copyright and the three contact links", () => {
  render(<Footer />);
  expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} ${profile.name}`))).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", profile.socials.linkedin);
  expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", profile.socials.github);
  expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", `mailto:${profile.email}`);
});

test("footer has no motto and no build line", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ commit: "abc1234", tests: { total: 5, passed: 5 } }) })));
  render(<Footer />);
  await new Promise((r) => setTimeout(r, 0));
  expect(screen.queryByText(profile.motto)).toBeNull();
  expect(screen.queryByText(/tests passing/)).toBeNull();
});
