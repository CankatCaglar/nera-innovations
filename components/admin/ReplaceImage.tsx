"use client";

import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

export function ReplaceImage({
  enabled,
  slug,
  onUploaded,
  className = "",
}: {
  enabled: boolean;
  slug: string;
  onUploaded: (url: string) => Promise<void> | void;
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!enabled) return null;

  async function onFile(file?: File) {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const body = new FormData();
      body.set("file", file);
      body.set("slug", slug);
      const response = await fetch("/api/upload", { method: "POST", body });
      const text = await response.text();
      let data: { url?: string; error?: string } = {};
      try {
        data = text ? (JSON.parse(text) as { url?: string; error?: string }) : {};
      } catch {
        throw new Error(
          "Upload failed. On the live site, Firebase Storage must be enabled.",
        );
      }
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      await onUploaded(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => input.current?.click()}
        disabled={busy}
        className={`absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-ink/0 text-sm font-semibold text-white opacity-0 transition-all hover:bg-ink/45 hover:opacity-100 ${className}`}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-ink shadow-sm">
          <ImagePlus className="h-4 w-4 text-nera" strokeWidth={1.75} />
          {busy ? "Uploading..." : "Replace image"}
        </span>
      </button>
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          void onFile(file);
        }}
      />
      {error ? (
        <p className="absolute bottom-3 left-3 z-30 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-red-600 shadow-sm">
          {error}
        </p>
      ) : null}
    </>
  );
}
