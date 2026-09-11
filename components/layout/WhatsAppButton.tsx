import { SITE } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Nera on WhatsApp"
      className="fixed right-5 bottom-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M12.04 2.5A9.45 9.45 0 0 0 2.6 11.9a9.3 9.3 0 0 0 1.3 4.76L2.5 21.5l5-1.33A9.5 9.5 0 1 0 12.04 2.5zm0 17.3a7.85 7.85 0 0 1-4-.1l-.29-.1-2.96.79.79-2.88-.19-.3a7.84 7.84 0 1 1 6.65 2.59zm4.55-5.87c-.25-.13-1.47-.72-1.7-.8s-.39-.13-.56.12-.64.8-.79.97-.29.19-.54.06a6.4 6.4 0 0 1-1.88-1.16 7 7 0 0 1-1.3-1.62c-.13-.23 0-.36.1-.48s.25-.29.37-.45.16-.26.25-.43.04-.32-.02-.45-.56-1.35-.77-1.85-.4-.42-.56-.43h-.48a.92.92 0 0 0-.67.32 2.8 2.8 0 0 0-.88 2.08 4.86 4.86 0 0 0 1.02 2.58 11.1 11.1 0 0 0 4.25 3.77 14 14 0 0 0 1.38.51 3.3 3.3 0 0 0 1.52.1 2.5 2.5 0 0 0 1.64-1.16 2 2 0 0 0 .14-1.16c-.06-.1-.23-.16-.48-.29z" />
      </svg>
    </a>
  );
}
