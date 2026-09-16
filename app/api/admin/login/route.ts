import { NextResponse } from "next/server";
import {
  adminCookieOptions,
  credentialsMatch,
  makeAdminToken,
} from "@/lib/admin-auth";
import { firebaseApiKey } from "@/lib/firebase-admin";
import { signInWithFirebasePassword } from "@/lib/firebase-auth";

function signedIn() {
  const response = NextResponse.json({ ok: true });
  const cookie = adminCookieOptions();
  response.cookies.set(cookie.name, makeAdminToken(), cookie);
  return response;
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email ?? "";
  const password = body.password ?? "";

  if (credentialsMatch(email, password)) {
    return signedIn();
  }

  if (firebaseApiKey()) {
    try {
      const result = await signInWithFirebasePassword(email, password);
      if (result.ok) return signedIn();
      console.warn("Firebase Auth sign-in failed:", result.error);
    } catch (error) {
      console.warn("Firebase Auth sign-in error:", error);
    }
  }

  return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
}
