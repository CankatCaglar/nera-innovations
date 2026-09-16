import { credentialsMatch } from "./admin-auth";
import { firebaseApiKey, getAdminAuth } from "./firebase-admin";

type AuthPayload = {
  idToken?: string;
  email?: string;
  error?: { message?: string };
};

type SignInResult =
  | { ok: true; email: string }
  | { ok: false; error: string };

async function signInRequest(apiKey: string, email: string, password: string) {
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
  const data = (await response.json()) as AuthPayload;
  return { ok: response.ok && Boolean(data.idToken && data.email), data };
}

async function ensureEnvAdminUser(email: string, password: string) {
  if (!credentialsMatch(email, password)) return;

  const auth = getAdminAuth();
  if (!auth) return;

  try {
    const user = await auth.getUserByEmail(email.trim());
    await auth.updateUser(user.uid, { password });
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "auth/user-not-found") {
      await auth.createUser({
        email: email.trim(),
        password,
        emailVerified: true,
      });
      return;
    }
    throw error;
  }
}

export async function signInWithFirebasePassword(
  email: string,
  password: string,
): Promise<SignInResult> {
  const apiKey = firebaseApiKey();
  if (!apiKey) {
    return { ok: false, error: "Firebase Auth is not configured." };
  }

  let result = await signInRequest(apiKey, email, password);
  if (!result.ok) {
    await ensureEnvAdminUser(email, password);
    for (let attempt = 0; attempt < 3 && !result.ok; attempt += 1) {
      if (attempt > 0) {
        await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
      }
      result = await signInRequest(apiKey, email, password);
    }
  }

  if (!result.ok || !result.data.idToken || !result.data.email) {
    return { ok: false, error: result.data.error?.message ?? "Invalid email or password." };
  }

  const auth = getAdminAuth();
  if (auth) {
    await auth.verifyIdToken(result.data.idToken);
  }

  const allow = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (allow && result.data.email.toLowerCase() !== allow) {
    return { ok: false, error: "This account is not allowed to sign in." };
  }

  return { ok: true, email: result.data.email };
}
