"use client";

import { RotateCcw } from "lucide-react";

export function RestoreOriginal({
  show,
  onRestore,
  label = "Restore original",
}: {
  show: boolean;
  onRestore: () => void;
  label?: string;
}) {
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onRestore}
      title="Replace this with the original version"
      className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-nera/80 hover:text-nera"
    >
      <RotateCcw className="h-3 w-3" strokeWidth={2} />
      {label}
    </button>
  );
}
