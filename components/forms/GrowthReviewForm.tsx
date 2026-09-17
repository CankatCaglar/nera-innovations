"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { sendLead } from "@/lib/send-lead";

const fieldClass =
  "w-full rounded-2xl border border-black/6 bg-white px-4 py-3.5 text-sm outline-none placeholder:text-soft focus:border-nera/50";

export function GrowthReviewForm() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    website: "",
    phone: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    setStatus("sending");
    setErrorMessage("");
    try {
      await sendLead({
        type: "growth-review",
        fullName: values.fullName,
        email: values.email,
        website: values.website,
        phone: values.phone,
        message: values.message,
      });
      setStatus("done");
      setValues({ fullName: "", email: "", website: "", phone: "", message: "" });
      setConsent(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[24px] bg-sand p-8">
        <p className="text-xl font-semibold tracking-tight">Your review request is in.</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          The team will write to you at the work email you left, usually within
          1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={values.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          placeholder="Full Name*"
          className={fieldClass}
        />
        <input
          required
          type="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="Business Email*"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
          placeholder="Website"
          className={fieldClass}
        />
        <input
          required
          type="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          placeholder="Phone number*"
          className={fieldClass}
        />
      </div>
      <div className="relative">
        <textarea
          value={values.message}
          maxLength={500}
          rows={6}
          onChange={(event) => update("message", event.target.value.slice(0, 500))}
          placeholder="Tell us about your current marketing or growth challenges. You can briefly share what you’d like to improve or any specific questions you have."
          className={`${fieldClass} resize-none pb-8`}
        />
        <span className="absolute right-4 bottom-3 text-[11px] text-soft">
          {values.message.length} / 500
        </span>
      </div>
      <label className="flex items-start gap-3 pt-1 text-sm leading-6 text-muted">
        <input
          required
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#945d3c]"
        />
        I agree to be contacted by the Nera team regarding my request.
      </label>
      {status === "error" ? (
        <p className="text-sm text-red-600">
          {errorMessage || "Something went wrong. Please try again."}
        </p>
      ) : null}
      <Button type="submit" className="w-full" arrow>
        {status === "sending" ? "Sending..." : "Submit Request"}
      </Button>
      <p className="text-center text-xs leading-5 text-soft">
        Our team will review your information and get back to you as soon as
        possible, usually within 1–2 business days.
      </p>
    </form>
  );
}
