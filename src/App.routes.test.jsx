import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { mockMatchMedia } from "./test/matchMedia";

vi.mock("@react-three/fiber", () => ({ Canvas: () => null }));

// The page is lazy-loaded; transform it up front so a busy test run measures
// scroll/focus behaviour, not how long the first import takes.
beforeAll(async () => {
  await import("./pages/AiWorkflow");
}, 30000);

beforeEach(() => {
  mockMatchMedia(["max-width"]);
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false })));
  window.scrollTo = vi.fn();
});
afterEach(() => vi.unstubAllGlobals());

test("opening another page scrolls to the top and focuses its heading", async () => {
  const user = userEvent.setup();
  window.history.pushState({}, "", "/");
  render(<App />);
  await user.click(screen.getByRole("link", { name: /^how i work with ai$/i }));
  const h1 = await screen.findByRole("heading", { level: 1, name: /AI accelerates/ }, { timeout: 5000 });
  await waitFor(() => {
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(h1).toHaveFocus();
  });
}, 15000);
