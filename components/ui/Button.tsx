"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { scrollToHash } from "@/lib/scroll";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-nera text-[#FFFFFF] shadow-[0_10px_24px_rgba(148,93,60,0.28)] hover:bg-nera-deep hover:text-[#FFFFFF]",
  secondary:
    "bg-white text-ink border border-black/8 hover:border-black/16 hover:bg-cream",
  ghost: "bg-transparent text-ink hover:text-nera",
  dark: "bg-ink text-[#FFFFFF] hover:bg-black hover:text-[#FFFFFF]",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  arrow?: boolean | "down";
  external?: boolean;
};

type ButtonProps = Common &
  (
    | { href: string; onClick?: never; type?: never; disabled?: never }
    | {
        href?: undefined;
        onClick?: () => void;
        type?: "button" | "submit";
        disabled?: boolean;
      }
  );

export function Button({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  arrow = false,
  external = false,
}: ButtonProps) {
  const lightText = variant === "primary" || variant === "dark";
  const classes = `relative z-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-70 ${variants[variant]} ${
    lightText ? "!text-[#FFFFFF] [&]:text-[#FFFFFF] [&_*]:text-[#FFFFFF] [&_svg]:stroke-[#FFFFFF]" : ""
  } ${className}`;

  const Arrow = external
    ? ArrowUpRight
    : arrow === "down"
      ? ArrowDown
      : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <Arrow className="h-4 w-4" strokeWidth={2} aria-hidden /> : null}
    </>
  );

  if (href) {
    const isHash = href.startsWith("#") || href.startsWith("/#");
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        scroll={isHash ? false : undefined}
        onClick={
          isHash
            ? (event) => {
                event.preventDefault();
                if (!scrollToHash(href)) return;
                const next = href.startsWith("/#") ? href : `/${href}`;
                window.history.replaceState(null, "", next);
              }
            : undefined
        }
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
