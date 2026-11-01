import { render, screen } from "@testing-library/react";
import ProofStrip from "./ProofStrip";

afterEach(() => vi.unstubAllGlobals());

const serve = (proof) =>
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => proof })));

test("shows tests passing and the build version", async () => {
  serve({ commit: "abc1234", tests: { total: 61, passed: 61 } });
  render(<ProofStrip />);
  expect(await screen.findByText(/61 tests passing/)).toBeInTheDocument();
  expect(screen.getByText("abc1234")).toBeInTheDocument();
});

test("never shows commit counts (no AI attribution in Hani's commits)", async () => {
  serve({ commit: "abc1234", commits: 12, aiAssistedCommits: 9, tests: { total: 61, passed: 61 } });
  render(<ProofStrip />);
  await screen.findByText(/61 tests passing/);
  expect(screen.queryByText(/commits/i)).toBeNull();
});

test("renders nothing when proof.json is missing", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false })));
  const { container } = render(<ProofStrip />);
  await new Promise((r) => setTimeout(r, 0));
  expect(container).toBeEmptyDOMElement();
});
