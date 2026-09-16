import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { getAdminDb } from "@/lib/firebase-admin";

type Payload = {
  type?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  website?: string;
  subject?: string;
  message?: string;
  systemSlug?: string;
};

function emailSubject(lead: {
  type: string;
  subject: string;
  systemSlug: string;
}) {
  if (lead.type === "growth-review") return "Nera Innovations: Growth Review request";
  if (lead.type === "resource") {
    return `Nera Innovations: Resource request (${lead.systemSlug || "system"})`;
  }
  return lead.subject
    ? `Nera Innovations: Contact — ${lead.subject}`
    : "Nera Innovations: Contact form";
}

function emailBody(lead: {
  type: string;
  fullName: string;
  email: string;
  phone: string;
  website: string;
  subject: string;
  message: string;
  systemSlug: string;
}) {
  return [
    `Type: ${lead.type}`,
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

async function notifyInbox(
  lead: {
    type: string;
    fullName: string;
    email: string;
    phone: string;
    website: string;
    subject: string;
    message: string;
    systemSlug: string;
  },
  request: Request,
) {
  const subject = emailSubject(lead);
  const message = emailBody(lead);
  const originHeader = request.headers.get("origin") || "";
  const local = /localhost|127\.0\.0\.1/.test(originHeader);
  const origin = local ? originHeader : SITE.url;
  const referer = local
    ? request.headers.get("referer") || `${origin}/contact`
    : `${SITE.url}/contact`;

  const response = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: referer,
    },
    body: JSON.stringify({
      name: lead.fullName,
      email: lead.email,
      _replyto: lead.email,
      _subject: subject,
      _template: "table",
      _captcha: false,
      phone: lead.phone,
      website: lead.website,
      type: lead.type,
      system: lead.systemSlug,
      subject,
      message,
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { success?: string | boolean; message?: string }
    | null;
  const text = String(payload?.message ?? "");
  const activating = /activat/i.test(text);
  const ok =
    activating ||
    payload?.success === true ||
    payload?.success === "true";

  if (!ok) {
    throw new Error(text || "FormSubmit delivery failed");
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  const fullName = body.fullName?.trim();
  const email = body.email?.trim();

  if (!fullName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lead = {
    type: body.type ?? "contact",
    fullName,
    email,
    phone: body.phone?.trim() ?? "",
    website: body.website?.trim() ?? "",
    subject: body.subject?.trim() ?? "",
    message: body.message?.trim() ?? "",
    systemSlug: body.systemSlug ?? "",
  };

  const db = getAdminDb();
  if (db) {
    await db.collection("leads").add({
      ...lead,
      createdAt: new Date().toISOString(),
    });
  }

  try {
    await notifyInbox(lead, request);
  } catch (error) {
    if (!db) {
      return NextResponse.json(
        { error: "Could not deliver the request" },
        { status: 502 },
      );
    }
    console.error("Lead email delivery failed", error);
  }

  return NextResponse.json({ ok: true });
}
