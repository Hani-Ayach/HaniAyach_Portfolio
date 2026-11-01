import { profile } from "../content/profile";

export const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

// Resolves on success; throws on network failure, HTTP error or a rejected submission.
export async function sendMessage({ name, email, subject, message }) {
  const res = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, message, _subject: subject || `Portfolio message from ${name}`, _captcha: "false" }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (String(data.success) !== "true") throw new Error("Rejected");
}
