import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { sectors } from "@/lib/sectors";

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
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold">
                      {t(`items.${s.key}.name`)}
                    </h2>
                    {!s.deliveredForClient && (
                      <span className="mt-1 shrink-0 rounded-full bg-aeromine-100 px-2.5 py-0.5 text-xs font-medium text-teal">
                        {t("demoBadge")}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-muted">
                    {t(`items.${s.key}.deliverable`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
