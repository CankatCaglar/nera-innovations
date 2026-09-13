import { SITE } from "@/lib/constants";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Nera on WhatsApp"
      className="fixed right-5 bottom-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
    >
      <BrandIcon name="WhatsApp" className="h-7 w-7" />
    </a>
  );
}
