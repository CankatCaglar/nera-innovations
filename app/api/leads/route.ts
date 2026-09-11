import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";

type Payload = {
  type?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  systemSlug?: string;
};

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
    subject: body.subject?.trim() ?? "",
    message: body.message?.trim() ?? "",
    systemSlug: body.systemSlug ?? "",
  };

  const subject =
    lead.type === "growth-review"
      ? "Nera Innovations: Growth Review"
      : lead.type === "resource"
        ? `Nera Innovations: Resource request (${lead.systemSlug || "system"})`
        : `Nera Innovations: Contact${lead.subject ? `: ${lead.subject}` : ""}`;

  try {
    await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        email,
        phone: lead.phone,
        subject,
        message: [
          `Type: ${lead.type}`,
          lead.systemSlug ? `System: ${lead.systemSlug}` : "",
          lead.subject ? `Subject: ${lead.subject}` : "",
          lead.phone ? `Phone: ${lead.phone}` : "",
          lead.message ? `Message: ${lead.message}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        _subject: subject,
      }),
    });
  } catch {
    // Firestore still holds the lead when email delivery is unavailable.
  }

  return NextResponse.json({ ok: true });
}
