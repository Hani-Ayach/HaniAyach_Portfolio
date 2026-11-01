import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { mockMatchMedia } from "../test/matchMedia";

vi.mock("@react-three/fiber", () => ({ Canvas: () => null }));
vi.mock("../terminal/Terminal", () => ({ default: () => null }));

test("a #hash in the URL scrolls that section into view", () => {
  mockMatchMedia(["max-width"]);
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false })));
  const spy = vi.fn();
  Element.prototype.scrollIntoView = spy;
  render(<MemoryRouter initialEntries={["/?subject=x#contact"]}><Home /></MemoryRouter>);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy.mock.contexts[0].id).toBe("contact");
  vi.unstubAllGlobals();
});
