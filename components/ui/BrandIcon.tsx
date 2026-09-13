import { getBrandMark } from "@/lib/brands";

export function BrandIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const mark = getBrandMark(name);

  if (!mark) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-ink text-[10px] font-bold text-white ${className}`}
        aria-hidden
      >
        {name.slice(0, 1).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-current ${className}`}
      role="img"
      aria-label={mark.title}
    >
      <path d={mark.path} />
    </svg>
  );
}
