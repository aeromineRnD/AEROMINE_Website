import Link from "next/link";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { services, servicePath } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, servicesSchema } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "/services", "services");
}

export default function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("services");

  return (
    <PageShell title={t("index.title")} intro={t("index.intro")}>
      <JsonLd
        data={servicesSchema(services.map((s) => t(`items.${s.key}.name`)))}
      />
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.key} delay={(i % 2) * 0.06}>
                <Link
                  href={servicePath(locale, s)}
                  className="group flex h-full flex-col rounded-lg border border-hairline bg-white p-7 transition-colors hover:border-aeromine-500"
                >
                  <h2 className="text-xl font-bold">
                    {t(`items.${s.key}.name`)}
                  </h2>
                  <p className="mt-3 text-muted">{t(`items.${s.key}.card`)}</p>
                  <span className="mt-6 font-bold text-teal underline decoration-aeromine-500 decoration-2 underline-offset-4">
                    {t("labels.readMore")} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
