"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { sendLead } from "@/lib/send-lead";
import type { LeadType } from "@/lib/types";

type Field = "fullName" | "email" | "phone" | "subject" | "message";

type LeadFormProps = {
  type: LeadType;
  fields: Field[];
  submitLabel: string;
  systemSlug?: string;
  successTitle?: string;
  successBody?: string;
};

const labels: Record<Field, string> = {
  fullName: "Full name",
  email: "Work email",
  phone: "Phone number",
  subject: "Subject",
  message: "Message",
};

export function LeadForm({
  type,
  fields,
  submitLabel,
  systemSlug,
  successTitle = "Received.",
  successBody = "We will get back to you shortly.",
}: LeadFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      await sendLead({
        type,
        systemSlug,
        fullName: values.fullName ?? "",
        email: values.email ?? "",
        phone: values.phone,
        subject: values.subject,
        message: values.message,
      });
      setStatus("done");
      setValues({});
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[28px] bg-sand p-8">
        <p className="text-xl font-semibold tracking-tight">{successTitle}</p>
        <p className="mt-2 text-sm leading-6 text-muted">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {fields.map((field) => {
        const shared = {
          required: true,
          "aria-required": true,
          name: field,
          value: values[field] ?? "",
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => setValues((current) => ({ ...current, [field]: event.target.value })),
          placeholder: `${labels[field]}*`,
          className:
            "w-full rounded-2xl border border-black/6 bg-white px-4 py-3.5 text-sm outline-none placeholder:text-soft focus:border-nera/50",
        };

        if (field === "message") {
          return (
            <textarea
              key={field}
              {...shared}
              rows={5}
              className={`${shared.className} resize-none`}
            />
          );
        }

        return (
          <input
            key={field}
            type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
            {...shared}
          />
        );
      })}
      {status === "error" ? (
        <p className="text-sm text-red-600">
          {errorMessage || "Something went wrong. Please try again."}
        </p>
      ) : null}
      <Button type="submit" className="w-full" arrow>
        {status === "sending" ? "Sending..." : submitLabel}
      </Button>
    </form>
  );
}
