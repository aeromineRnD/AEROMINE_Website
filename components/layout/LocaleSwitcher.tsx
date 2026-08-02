"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { clsx } from "clsx";

export function LocaleSwitcher({ onDark = false }: { onDark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "flex items-center gap-1 text-sm font-medium",
        onDark ? "text-muted-on-ink" : "text-muted"
      )}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden>/</span>}
          <Link
            href={pathname}
            locale={l}
            className={clsx(
              "uppercase transition-colors",
              l === locale
                ? onDark
                  ? "text-aeromine-500"
                  : "text-teal"
                : onDark
                  ? "hover:text-white"
                  : "hover:text-ink"
            )}
            aria-current={l === locale ? "true" : undefined}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
