import { SITE } from "@/lib/constants";

export const AI_SUMMARY_PROMPT = `Summarize and analyze the key insights from "${SITE.url}". Briefly explain who Nera is for, what it does, the main benefits, and in what situations it is a good fit.`;

const encodedPrompt = encodeURIComponent(AI_SUMMARY_PROMPT);

export const AI_SUMMARY_PROVIDERS = [
  {
    name: "ChatGPT",
    icon: "ChatGPT",
    image: "/brand/chatgpt.png",
    href: `https://chatgpt.com/?q=${encodedPrompt}`,
  },
  {
    name: "Gemini",
    icon: "Google Gemini",
    href: `https://www.google.com/search?udm=50&aep=11&q=${encodedPrompt}`,
  },
] as const;
