import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Contact from "./Contact";

const ENDPOINT = "https://formsubmit.co/ajax/hani.r.ayach@gmail.com";

afterEach(() => vi.unstubAllGlobals());

function setup(path = "/") {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={[path]}><Contact /></MemoryRouter>);
  return user;
}

async function fill(user) {
  await user.type(screen.getByLabelText(/your name/i), "Recruiter");
  await user.type(screen.getByLabelText(/email address/i), "r@company.com");
  await user.type(screen.getByLabelText(/message/i), "Let's talk");
}

test("posts the message as JSON to the formsubmit AJAX endpoint", async () => {
  const fetchMock = vi.fn(async () => ({ ok: true, json: async () => ({ success: "true" }) }));
  vi.stubGlobal("fetch", fetchMock);
  const user = setup();
  await fill(user);
  await user.click(screen.getByRole("button", { name: /send message/i }));

  expect(fetchMock).toHaveBeenCalledWith(ENDPOINT, expect.objectContaining({ method: "POST" }));
  const body = JSON.parse(fetchMock.mock.calls[0][1].body);
  expect(body).toMatchObject({ name: "Recruiter", email: "r@company.com", message: "Let's talk" });
  expect(await screen.findByRole("status")).toHaveTextContent(/message sent/i);
  expect(screen.getByLabelText(/your name/i)).toHaveValue("");
});

test("disables the button while sending", async () => {
  let resolve;
  vi.stubGlobal("fetch", vi.fn(() => new Promise((r) => (resolve = r))));
  const user = setup();
  await fill(user);
  await user.click(screen.getByRole("button", { name: /send message/i }));
  expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
  resolve({ ok: true, json: async () => ({ success: "true" }) });
  expect(await screen.findByRole("status")).toBeInTheDocument();
});

test.each([
  ["network error", () => Promise.reject(new Error("offline"))],
  ["server error", async () => ({ ok: false, json: async () => ({}) })],
  ["rejected by formsubmit", async () => ({ ok: true, json: async () => ({ success: "false" }) })],
])("on %s shows an error with a direct email fallback", async (_name, impl) => {
  vi.stubGlobal("fetch", vi.fn(impl));
  const user = setup();
  await fill(user);
  await user.click(screen.getByRole("button", { name: /send message/i }));
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/couldn't send/i);
  expect(alert.querySelector("a")).toHaveAttribute("href", "mailto:hani.r.ayach@gmail.com");
  expect(screen.queryByRole("status")).toBeNull();
});

test("pre-fills the subject from the URL", () => {
  setup("/?subject=Let%27s%20talk%20about%20a%20role");
  expect(screen.getByLabelText(/subject/i)).toHaveValue("Let's talk about a role");
});

test("picks up a subject that arrives after the form is already mounted", async () => {
  const { useNavigate } = await import("react-router-dom");
  const Go = () => {
    const navigate = useNavigate();
    return <button onClick={() => navigate("/?subject=Hello%20there#contact")}>go</button>;
  };
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={["/"]}><Go /><Contact /></MemoryRouter>);
  expect(screen.getByLabelText(/subject/i)).toHaveValue("");
  await user.click(screen.getByRole("button", { name: "go" }));
  expect(screen.getByLabelText(/subject/i)).toHaveValue("Hello there");
});
