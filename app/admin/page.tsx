"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setError("Could not sign in. Check the email and password.");
        return;
      }
      window.location.assign("/");
    } catch {
      setError("Could not sign in.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <form onSubmit={onSubmit} className="card w-full max-w-md rounded-[28px] p-8">
        <p className="eyebrow">Nera Innovations</p>
        <h1 className="mt-3 text-2xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Sign in to edit the live site: featured systems, map pins and more.
        </p>
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
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}
