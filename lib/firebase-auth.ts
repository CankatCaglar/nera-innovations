import { firebaseApiKey, getAdminAuth } from "./firebase-admin";

type SignInResult =
  | { ok: true; email: string }
  | { ok: false; error: string };

export async function signInWithFirebasePassword(
  email: string,
  password: string,
): Promise<SignInResult> {
  const apiKey = firebaseApiKey();
  if (!apiKey) {
    return { ok: false, error: "Firebase Auth is not configured." };
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password,
        returnSecureToken: true,
      }),
    },
  );

  const data = (await response.json()) as {
    idToken?: string;
    email?: string;
    error?: { message?: string };
  };

  if (!response.ok || !data.idToken || !data.email) {
    return { ok: false, error: data.error?.message ?? "Invalid email or password." };
  }

  const auth = getAdminAuth();
  if (auth) {
    await auth.verifyIdToken(data.idToken);
  }

  const allow = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (allow && data.email.toLowerCase() !== allow) {
    return { ok: false, error: "This account is not allowed to sign in." };
  }

  return { ok: true, email: data.email };
}
