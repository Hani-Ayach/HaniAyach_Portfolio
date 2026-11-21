import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Canonical from "./Canonical";
import { SITE_URL } from "../content/site";

const canonical = () => document.head.querySelector('link[rel="canonical"]')?.getAttribute("href");

function renderAt(entry) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Canonical />
    </MemoryRouter>
  );
}

afterEach(() => document.head.querySelectorAll('link[rel="canonical"]').forEach((l) => l.remove()));

test("the home page's official address is the site root", () => {
  renderAt("/");
  expect(canonical()).toBe(`${SITE_URL}/`);
});

test.each(["/architecture", "/ai-workflow", "/work/api-response-time-40"])("%s gives its own address", (path) => {
  renderAt(path);
  expect(canonical()).toBe(`${SITE_URL}${path}`);
});

test("query strings, hashes and trailing slashes are not part of the address", () => {
  renderAt("/architecture/?ref=linkedin#facade");
  expect(canonical()).toBe(`${SITE_URL}/architecture`);
});

test("only one canonical tag exists", () => {
  renderAt("/architecture");
  expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
});
