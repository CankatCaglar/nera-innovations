import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAdminBucket } from "@/lib/firebase-admin";

const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const MAX_BYTES = 4.5 * 1024 * 1024;

function extension(type: string, filename: string) {
  if (type === "image/png") return "png";
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  const fromName = filename.split(".").pop()?.toLowerCase();
  return fromName === "jpeg" ? "jpg" : fromName || "png";
}

function publicStorageUrl(bucket: string, objectPath: string, token: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const slug = String(form.get("slug") ?? "system")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "") || "system";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Use PNG, JPG, WEBP or GIF" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image must be under 4.5MB" }, { status: 400 });
    }

    const ext = extension(file.type, file.name);
    const filename = `${slug}-${Date.now()}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const bucket = getAdminBucket();

    if (bucket) {
      const objectPath = `site-uploads/${filename}`;
      const token = randomUUID();
      await bucket.file(objectPath).save(bytes, {
        resumable: false,
        metadata: {
          contentType: file.type || `image/${ext}`,
          cacheControl: "public, max-age=31536000, immutable",
          metadata: { firebaseStorageDownloadTokens: token },
        },
      });
      return NextResponse.json({
        url: publicStorageUrl(bucket.name, objectPath, token),
      });
    }

    const dir = path.join(process.cwd(), "public", "images", "systems", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), bytes);
    return NextResponse.json({ url: `/images/systems/uploads/${filename}` });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json(
      {
        error:
          "Could not save the image. On a live host, set FIREBASE_STORAGE_BUCKET (or NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) and enable Storage in Firebase.",
      },
      { status: 503 },
    );
  }
}
