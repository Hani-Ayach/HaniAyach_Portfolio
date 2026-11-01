import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import Terminal from "./Terminal";
import { profile } from "../content/profile";

const Where = () => {
  const l = useLocation();
  return <output data-testid="where">{l.pathname + l.search + l.hash}</output>;
};

function setup() {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="*" element={<><Terminal /><Where /></>} />
      </Routes>
    </MemoryRouter>
  );
  return { user, input: screen.getByRole("textbox", { name: /terminal input/i }), log: screen.getByRole("log") };
}

test("boots with a hint and a polite live log", () => {
  const { log } = setup();
  expect(log).toHaveAttribute("aria-live", "polite");
  expect(log).toHaveTextContent(/type "help"/i);
});

test("running a command echoes it and prints output", async () => {
  const { user, input, log } = setup();
  await user.type(input, "whoami{Enter}");
  expect(log).toHaveTextContent("$ whoami");
  expect(log).toHaveTextContent(profile.title);
  expect(input).toHaveValue("");
});

test("ArrowUp recalls previous commands", async () => {
  const { user, input } = setup();
  await user.type(input, "years{Enter}");
  await user.type(input, "stack{Enter}");
  await user.keyboard("{ArrowUp}");
  expect(input).toHaveValue("stack");
  await user.keyboard("{ArrowUp}");
  expect(input).toHaveValue("years");
  await user.keyboard("{ArrowDown}{ArrowDown}");
  expect(input).toHaveValue("");
});

test("Tab completes a unique match and lists several", async () => {
  const { user, input, log } = setup();
  await user.type(input, "who");
  await user.keyboard("{Tab}");
  expect(input).toHaveValue("whoami");
  expect(input).toHaveFocus();
  await user.clear(input);
  await user.type(input, "c");
  await user.keyboard("{Tab}");
  expect(log).toHaveTextContent(/clear\s+contact\s+cv/);
});

test("clear empties the log", async () => {
  const { user, input, log } = setup();
  await user.type(input, "help{Enter}");
  await user.type(input, "clear{Enter}");
  expect(within(log).queryByText(/available commands/i)).toBeNull();
});

test("navigation commands move the router", async () => {
  const { user, input } = setup();
  await user.type(input, `open ${profile.caseStudies[0].slug}{Enter}`);
  expect(screen.getByTestId("where")).toHaveTextContent(`/work/${profile.caseStudies[0].slug}`);
});

test("command chips run commands without typing", async () => {
  const { user, log } = setup();
  await user.click(screen.getByRole("button", { name: "experience" }));
  expect(log).toHaveTextContent("$ experience");
  expect(log).toHaveTextContent("Intalio");
});

test("Tab leaves the input when nothing completes (no keyboard trap)", async () => {
  const { user, input } = setup();
  await user.type(input, "xyz");
  await user.tab();
  expect(input).not.toHaveFocus();
});

test("Tab leaves the input when the command is already complete", async () => {
  const { user, input } = setup();
  await user.type(input, "whoami");
  await user.tab();
  expect(input).not.toHaveFocus();
});

test("Shift+Tab always moves focus backwards", async () => {
  const { user, input } = setup();
  await user.type(input, "wh");
  await user.tab({ shift: true });
  expect(input).not.toHaveFocus();
  expect(input).toHaveValue("wh");
});
