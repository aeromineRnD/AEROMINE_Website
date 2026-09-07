import Link from "next/link";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Link as LocaleLink } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { services, servicePath, findService } from "@/lib/services";
import { serviceMetadata } from "@/lib/metadata";
import { JsonLd, serviceSchema } from "@/components/seo/JsonLd";

type Step = { title: string; body: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug[locale] }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = findService(locale, slug);
  if (!service) return {};
  return serviceMetadata(locale, service);
}

export default function ServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);

  const service = findService(locale, slug);
  if (!service) notFound();

  const t = useTranslations("services");
  const tSectors = useTranslations("sectors");
  const item = `items.${service.key}`;
  const deliverables = t.raw(`${item}.deliverables`) as string[];
  const steps = t.raw(`${item}.process`) as Step[];

  return (
    <PageShell title={t(`${item}.h1`)} intro={t(`${item}.lead`)}>
      <JsonLd
        data={serviceSchema(
          t(`${item}.name`),
          t(`${item}.metaDescription`),
          servicePath(locale, service)
        )}
      />

      <section className="pb-24 md:pb-32">
        <Container className="flex flex-col gap-20">
          <Reveal>
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal">
              {t("labels.deliverables")}
            </h2>
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-lg">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aeromine-600"
                    aria-hidden
                  />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal">
              {t("labels.process")}
            </h2>
            <div className="mt-8 grid gap-10 md:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.title}>
                  <p className="text-sm font-bold uppercase tracking-widest text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-lg bg-ink p-8 text-white md:p-12">
              <h2 className="text-sm font-bold uppercase tracking-widest text-aeromine-500">
                {t("labels.formats")}
              </h2>
              <p className="mt-5 text-xl font-medium leading-relaxed md:text-2xl">
                {t(`${item}.formats`)}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal">
              {t("labels.related")}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.sectors.map((key) => (
                <LocaleLink
                  key={key}
                  href="/sectors"
                  className="rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium text-teal transition-colors hover:border-aeromine-500"
                >
                  {tSectors(`items.${key}.name`)}
                </LocaleLink>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-6 border-t border-hairline pt-12 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-3 max-w-xl text-muted">{t("cta.body")}</p>
              </div>
              <LocaleLink
                href="/contact"
                className="shrink-0 rounded bg-aeromine-500 px-7 py-4 text-center font-bold text-ink transition-colors hover:bg-aeromine-400"
              >
                {t("cta.button")}
              </LocaleLink>
            </div>
          </Reveal>

          <Reveal>
            <Link
              href={`/${locale}/services`}
              className="font-bold text-teal underline decoration-aeromine-500 decoration-2 underline-offset-4"
            >
              ← {t("labels.allServices")}
            </Link>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
