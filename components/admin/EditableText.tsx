"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type EditableTextProps = {
  value: string;
  onSave: (value: string) => Promise<void> | void;
  className?: string;
  displayClassName?: string;
  multiline?: boolean;
  placeholder?: string;
  enabled: boolean;
  renderDisplay?: (value: string) => ReactNode;
};

export function EditableText({
  value,
  onSave,
  className = "",
  displayClassName = "",
  multiline = false,
  placeholder = "Add text",
  enabled,
  renderDisplay,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (!editing) return;
    if (multiline) areaRef.current?.focus();
    else inputRef.current?.select();
  }, [editing, multiline]);

  async function commit() {
    const next = draft.trim();
    setEditing(false);
    if (next === value.trim()) return;
    setSaving(true);
    try {
      await onSave(next);
    } finally {
      setSaving(false);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.key === "Escape") {
      setDraft(value);
      setEditing(false);
    }
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      void commit();
    }
  }

  if (!enabled) {
    return <span className={displayClassName}>{renderDisplay ? renderDisplay(value) : value}</span>;
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        title="Click to edit"
        className={`block w-full rounded-xl text-left transition-shadow hover:ring-2 hover:ring-nera/25 hover:ring-offset-2 hover:ring-offset-transparent ${displayClassName} ${
          saving ? "opacity-60" : ""
        }`}
      >
        {value.trim() ? (
          renderDisplay ? renderDisplay(value) : value
        ) : (
          <span className="text-soft">{placeholder}</span>
        )}
      </button>
    );
  }

  const fieldClass = `w-full rounded-xl border border-nera/30 bg-white/90 px-3 py-2 outline-none ${className}`;

  if (multiline) {
    return (
      <textarea
        ref={areaRef}
        value={draft}
        rows={4}
        placeholder={placeholder}
        className={`${fieldClass} resize-none`}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => void commit()}
        onKeyDown={onKeyDown}
      />
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={draft}
      placeholder={placeholder}
      className={fieldClass}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={() => void commit()}
      onKeyDown={onKeyDown}
    />
  );
}
