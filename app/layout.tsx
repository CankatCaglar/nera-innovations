import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nera Innovations. Systems That Turn Marketing Into Sales",
    template: "%s · Nera Innovations",
  },
  description:
    "Nera connects social media, advertising, web, CRM, automation, AI tools and sales tracking into measurable growth systems.",
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} h-full antialiased`}
    >
      <body className={`${sans.className} min-h-full bg-background text-ink`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
