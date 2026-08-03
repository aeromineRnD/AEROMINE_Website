"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { clsx } from "clsx";

const navItems = [
  { key: "sectors", href: "/sectors" },
  { key: "work", href: "/work" },
  { key: "aeroviewOs", href: "/aeroview-os" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline-dark bg-ink/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo_white.svg"
            alt="Aeromine"
            width={44}
            height={44}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={clsx(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-aeromine-500"
                  : "text-muted-on-ink hover:text-white"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitcher onDark />
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={clsx(
              "h-0.5 w-5 bg-white transition-transform",
              open && "translate-y-1 rotate-45"
            )}
          />
          <span
            className={clsx(
              "h-0.5 w-5 bg-white transition-transform",
              open && "-translate-y-1 -rotate-45"
            )}
          />
        </button>
      </Container>

      {open && (
        <nav className="border-t border-hairline-dark bg-ink md:hidden">
          <Container className="flex flex-col gap-4 py-5">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={clsx(
                  "text-base font-medium",
                  pathname === item.href
                    ? "text-aeromine-500"
                    : "text-muted-on-ink"
                )}
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <LocaleSwitcher onDark />
          </Container>
        </nav>
      )}
    </header>
  );
}
