import nodemailer from "nodemailer";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";
import type { LeadPayload } from "@/lib/types";

function firstEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return "";
}

function inboxAddress() {
  return firstEnv("LEAD_TO_EMAIL") || SITE.email;
}

export function leadEmailSubject(lead: LeadPayload) {
  if (lead.type === "growth-review") return "Nera Innovations: Growth Review request";
  if (lead.type === "resource") {
    return `Nera Innovations: Resource request (${lead.systemSlug || "system"})`;
  }
  return lead.subject
    ? `Nera Innovations: Contact — ${lead.subject}`
    : "Nera Innovations: Contact form";
}

export function leadEmailText(lead: LeadPayload) {
  return [
    `Form: ${lead.type}`,
    `Name: ${lead.fullName}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.website ? `Website: ${lead.website}` : "",
    lead.systemSlug ? `System: ${lead.systemSlug}` : "",
    lead.subject ? `Subject: ${lead.subject}` : "",
    lead.message ? `Message:\n${lead.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function leadEmailHtml(lead: LeadPayload) {
  const rows = [
    ["Form", lead.type],
    ["Name", lead.fullName],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Website", lead.website],
    ["System", lead.systemSlug],
    ["Subject", lead.subject],
    ["Message", lead.message],
  ].filter(([, value]) => Boolean(value));

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#6a615a;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#161311">${String(value).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("");

  return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5">${body}</table>`;
}

async function sendWithGmail(lead: LeadPayload) {
  const user = firstEnv("GMAIL_USER", "SMTP_USER", "MAIL_USER");
  const pass = firstEnv(
    "GMAIL_APP_PASSWORD",
    "GMAIL_PASSWORD",
    "GMAIL_PASS",
    "SMTP_PASS",
    "MAIL_PASS",
  ).replace(/\s+/g, "");
  if (!user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host: firstEnv("SMTP_HOST") || "smtp.gmail.com",
    port: Number(firstEnv("SMTP_PORT") || "465"),
    secure: firstEnv("SMTP_PORT") !== "587",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `Nera Innovations <${user}>`,
    to: inboxAddress(),
    replyTo: lead.email,
    subject: leadEmailSubject(lead),
    text: leadEmailText(lead),
    html: leadEmailHtml(lead),
  });
  return true;
}

async function sendWithResend(lead: LeadPayload) {
  const key = firstEnv("RESEND_API_KEY");
  if (!key) return false;

  const resend = new Resend(key);
  const from = firstEnv("LEAD_FROM_EMAIL") || `Nera Innovations <${SITE.email}>`;
  const { error } = await resend.emails.send({
    from,
    to: inboxAddress(),
    replyTo: lead.email,
    subject: leadEmailSubject(lead),
    text: leadEmailText(lead),
    html: leadEmailHtml(lead),
  });
  if (error) throw new Error(error.message);
  return true;
}

async function sendWithFormSubmit(lead: LeadPayload) {
  const to = inboxAddress();
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: lead.fullName,
      email: lead.email,
      _replyto: lead.email,
      _subject: leadEmailSubject(lead),
      message: leadEmailText(lead),
    }),
  });
  if (!response.ok) return false;
  const data = (await response.json().catch(() => null)) as { success?: string | boolean } | null;
  return data?.success === true || data?.success === "true";
}

export async function notifyInbox(lead: LeadPayload) {
  if (await sendWithGmail(lead)) return;
  if (await sendWithResend(lead)) return;
  if (await sendWithFormSubmit(lead)) return;
  throw new Error(
    "No mail transport is configured. Set GMAIL_USER and GMAIL_APP_PASSWORD on the host.",
  );
}
