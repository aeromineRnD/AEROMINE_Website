import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { sectors } from "@/lib/sectors";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, servicesSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "/sectors", "sectors");
}

const chipClass =
  "inline-flex items-center gap-1.5 rounded-full border border-hairline px-3.5 py-1.5 text-sm font-medium text-teal transition-colors hover:border-aeromine-500 hover:bg-aeromine-50";

export default function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("sectors");

  return (
    <PageShell title={t("title")} intro={t("intro")}>
      <JsonLd
        data={servicesSchema(sectors.map((s) => t(`items.${s.key}.name`)))}
      />
      <section className="pb-24 md:pb-32">
        <Container>
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest text-teal">
              {t("whereWeWork")}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-lg border border-hairline bg-white p-6">
                  <h2 className="text-xl font-bold">
                    {t(`items.${s.key}.name`)}
                  </h2>
                  <p className="mt-3 text-muted">
                    {t(`items.${s.key}.deliverable`)}
                  </p>
                  {s.demos.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {s.demos.map((demo) =>
                        demo.external ? (
                          <a
                            key={demo.href}
                            href={demo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={chipClass}
                          >
                            {demo.label}
                            <span aria-hidden>↗</span>
                          </a>
                        ) : (
                          <Link
                            key={demo.href}
                            href={demo.href}
                            className={chipClass}
                          >
                            {demo.label}
                            <span aria-hidden>→</span>
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
