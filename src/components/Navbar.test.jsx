import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import ThemeProvider from "../contexts/ThemeContext";
import { profile } from "../content/profile";

function setup() {
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </ThemeProvider>
  );
  const toggle = screen.getByRole("button", { name: /open menu/i });
  return { user, toggle };
}

test("menu button opens a dialog with every link and moves focus into it", async () => {
  const { user, toggle } = setup();
  expect(screen.queryByRole("dialog")).toBeNull();
  await user.click(toggle);
  const menu = screen.getByRole("dialog", { name: /menu/i });
  expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");
  for (const name of ["Experience", "Work", "Architecture", "AI Workflow", "Contact"]) {
    expect(within(menu).getByRole("link", { name })).toBeInTheDocument();
  }
  expect(within(menu).getAllByRole("link")[0]).toHaveFocus();
});

test("Escape closes the menu and returns focus to the menu button", async () => {
  const { user, toggle } = setup();
  await user.click(toggle);
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(screen.getByRole("button", { name: /open menu/i })).toHaveFocus();
});

test("choosing a link closes the menu", async () => {
  const { user, toggle } = setup();
  await user.click(toggle);
  await user.click(within(screen.getByRole("dialog")).getByRole("link", { name: /architecture/i }));
  expect(screen.queryByRole("dialog")).toBeNull();
});

test("tapping outside the menu closes it", async () => {
  const { user, toggle } = setup();
  await user.click(toggle);
  await user.click(screen.getByTestId("menu-backdrop"));
  expect(screen.queryByRole("dialog")).toBeNull();
});

test("the page behind does not scroll while the menu is open", async () => {
  const { user, toggle } = setup();
  await user.click(toggle);
  expect(document.body.style.overflow).toBe("hidden");
  await user.keyboard("{Escape}");
  expect(document.body.style.overflow).toBe("");
});

test("the menu also offers the theme switch and ways to reach Hani", async () => {
  const { user, toggle } = setup();
  await user.click(toggle);
  const menu = screen.getByRole("dialog");
  expect(within(menu).getByRole("button", { name: /switch to (light|dark) theme/i })).toBeInTheDocument();
  expect(within(menu).getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", profile.socials.linkedin);
  expect(within(menu).getByRole("link", { name: /github/i })).toHaveAttribute("href", profile.socials.github);
  expect(within(menu).getByRole("link", { name: /email/i })).toHaveAttribute("href", `mailto:${profile.email}`);
});
