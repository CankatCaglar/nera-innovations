import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readStoredContent, writeStoredContent } from "@/lib/store";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await readStoredContent());
}

export async function PUT(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const next = (await request.json()) as SiteContent;
  if (!next?.systems || !next?.locations) {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  await writeStoredContent(next);
  return NextResponse.json(next);
}
