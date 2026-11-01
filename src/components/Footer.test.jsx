import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

afterEach(() => vi.unstubAllGlobals());

test("footer carries the build proof strip", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => ({
    ok: true,
    json: async () => ({ commit: "abc1234", tests: { total: 5, passed: 5 } }),
  })));
  render(<Footer />);
  expect(await screen.findByText(/5 tests passing/)).toBeInTheDocument();
});
