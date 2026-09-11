"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isFirebaseConfigured()) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24">
        <h1 className="text-3xl font-semibold">Admin needs Firebase</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Add your Firebase web config to <code>.env.local</code>, enable Email/Password
          authentication, and create an admin user. The public site already works
          with the built-in content.
        </p>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const auth = getFirebaseAuth();
    if (!auth) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch {
      setError("Could not sign in. Check the email and password.");
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form onSubmit={onSubmit} className="card w-full rounded-[28px] p-8">
        <p className="eyebrow">Nera Innovations</p>
        <h1 className="mt-3 text-2xl font-semibold">Admin sign in</h1>
        <input
          className="mt-6 w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="mt-3 w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        <div className="mt-5">
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
