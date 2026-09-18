import Image from "next/image";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { AI_SUMMARY_PROVIDERS } from "@/lib/ai-summary";

export function AiSummary() {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">AI Summary</p>
      <p className="mt-1.5 text-xs leading-5 text-muted">
        Ask ChatGPT or Gemini for
        <br />
        a briefing on Nera.
      </p>
      <div className="mt-4 flex gap-2.5">
        {AI_SUMMARY_PROVIDERS.map((provider) => (
          <a
            key={provider.name}
            href={provider.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Summarize Nera with ${provider.name}`}
            title={provider.name}
            className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-white text-ink/75 shadow-[0_8px_20px_rgba(22,19,17,0.06)] transition-colors hover:text-nera"
          >
            {"image" in provider && provider.image ? (
              <Image
                src={provider.image}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            ) : (
              <BrandIcon name={provider.icon} className="h-6 w-6" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
