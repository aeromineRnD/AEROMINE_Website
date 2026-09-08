import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";

// FAQ lives here rather than in the header. It is a page people go looking for
// once they are already interested, and in the main nav it competes with the
// pages that carry the sale.
const footerLinks = [
  { key: "services", href: "/services" },
  { key: "sectors", href: "/sectors" },
  { key: "work", href: "/work" },
  { key: "aeroviewOs", href: "/aeroview-os" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-ink text-muted-on-ink">
      <Container className="grid gap-10 py-16 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* Same reasoning as the header: the wordmark beside it is text. */}
            <Image
              src="/brand/logo_gold.svg"
              alt=""
              width={72}
              height={72}
              className="h-16 w-16"
            />
            <span className="text-xl font-bold uppercase tracking-[0.16em] text-white">
              Aeromine
            </span>
          </div>
          <p className="text-sm">{t("companyLine")}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p>{t("address")}</p>
          <a href="tel:+306981375791" className="hover:text-white">
            {t("phone")}
          </a>
          <a
            href="mailto:jbrintakis@aeromine.org"
            className="hover:text-white"
          >
            {t("email")}
          </a>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <a
            href="https://www.linkedin.com/company/aeromine-info"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            {t("linkedin")}
          </a>
          <a
            href="https://github.com/aeromineRnD"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            {t("github")}
          </a>
          <Link href="/contact" className="mt-4 inline-block w-fit rounded bg-aeromine-500 px-4 py-2 font-medium text-ink transition-colors hover:bg-aeromine-400">
            {t("cta")}
          </Link>
        </div>
      </Container>

      <div className="border-t border-hairline-dark">
        <Container className="flex flex-wrap gap-x-7 gap-y-3 py-6 text-sm">
          {footerLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="hover:text-white"
            >
              {tNav(item.key)}
            </Link>
          ))}
        </Container>
      </div>
    </footer>
  );
}
