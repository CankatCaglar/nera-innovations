import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "nera_admin";

function secret() {
  const value = process.env.ADMIN_SECRET?.trim();
  if (!value) {
    throw new Error("ADMIN_SECRET is not set");
  }
  return value;
}

function expectedEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
}

function expectedPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function credentialsMatch(email: string, password: string) {
  const allowed = expectedEmail();
  const passwordValue = expectedPassword();
  if (!allowed || !passwordValue) return false;
  return (
    safeEqual(email.trim().toLowerCase(), allowed) &&
    safeEqual(password, passwordValue)
  );
}

export function makeAdminToken() {
  const payload = `ok.${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function tokenIsValid(token?: string | null) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  return safeEqual(sign(payload), parts[2]);
}

export async function isAdminRequest() {
  const store = await cookies();
  return tokenIsValid(store.get(COOKIE)?.value);
}

export function adminCookieOptions() {
  return {
    name: COOKIE,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14,
  };
}
