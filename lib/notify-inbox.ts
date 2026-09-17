import nodemailer from "nodemailer";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";
import type { LeadPayload } from "@/lib/types";

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
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.trim();
  if (!user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `Nera Innovations <${user}>`,
    to: SITE.email,
    replyTo: lead.email,
    subject: leadEmailSubject(lead),
    text: leadEmailText(lead),
    html: leadEmailHtml(lead),
  });
  return true;
}

async function sendWithResend(lead: LeadPayload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const resend = new Resend(key);
  const from = process.env.LEAD_FROM_EMAIL || `Nera Innovations <${SITE.email}>`;
  const { error } = await resend.emails.send({
    from,
    to: SITE.email,
    replyTo: lead.email,
    subject: leadEmailSubject(lead),
    text: leadEmailText(lead),
    html: leadEmailHtml(lead),
  });
  if (error) throw new Error(error.message);
  return true;
}

export async function notifyInbox(lead: LeadPayload) {
  if (await sendWithGmail(lead)) return;
  if (await sendWithResend(lead)) return;
  throw new Error("No mail transport is configured.");
}
