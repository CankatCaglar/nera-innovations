import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { notifyInbox } from "@/lib/notify-inbox";
import type { Lead, LeadType } from "@/lib/types";

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

function createdAtValue(value: unknown) {
  if (typeof value === "string" && value) return value;
  if (value && typeof value === "object" && "toDate" in value) {
    const date = (value as { toDate: () => Date }).toDate();
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }
  return new Date().toISOString();
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json({ error: "Firebase is not configured" }, { status: 503 });
  }

  const snap = await db.collection("leads").get();
  const leads: Lead[] = snap.docs
    .map((item) => {
      const data = item.data();
      return {
        id: item.id,
        type: (data.type as LeadType) || "contact",
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        phone: data.phone,
        website: data.website,
        subject: data.subject,
        message: data.message,
        systemSlug: data.systemSlug,
        createdAt: createdAtValue(data.createdAt),
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 200);

  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  const type = body.type ?? "contact";
  const fullName = body.fullName?.trim();
  const email = body.email?.trim();
  const subject = body.subject?.trim();
  const message = body.message?.trim();

  if (!fullName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (type === "contact" && (!subject || !message)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json({ error: "Could not save the request" }, { status: 503 });
  }

  const lead = {
    type,
    fullName,
    email,
    phone: body.phone?.trim() ?? "",
    website: body.website?.trim() ?? "",
    subject: subject ?? "",
    message: message ?? "",
    systemSlug: body.systemSlug ?? "",
    createdAt: new Date().toISOString(),
  };

  await db.collection("leads").add(lead);

  try {
    await notifyInbox(lead);
  } catch (error) {
    console.error("Lead email delivery failed", error);
  }

  return NextResponse.json({ ok: true });
}
