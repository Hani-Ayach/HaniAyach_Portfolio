import { render, screen } from "@testing-library/react";
import Notes from "./Notes";
import { profile } from "../content/profile";

test("shows every engineering note and links to LinkedIn", () => {
  render(<Notes />);
  profile.notes.forEach((n) => expect(screen.getByRole("heading", { name: n.title })).toBeInTheDocument());
  expect(screen.getByRole("link", { name: /read more on linkedin/i })).toHaveAttribute(
    "href",
    `${profile.socials.linkedin}recent-activity/all/`
  );
});
