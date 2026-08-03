import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, softwareSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "/aeroview-os", "aeroviewOs");
}

const screenshots = [
  "/images/av_phasebar.png",
  "/images/av_stages.png",
  "/images/av_completion.png",
  "/images/av_milestones.png",
];

export default function AeroviewOsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("aeroviewOs");
  const features = t.raw("features") as { title: string; body: string }[];

  return (
    <PageShell title={t("title")} intro={t("intro")}>
      <JsonLd data={softwareSchema} />
      <section className="pb-24 md:pb-32">
        <Container className="flex flex-col gap-24">
          <Reveal>
            <p className="max-w-3xl text-xl font-medium leading-relaxed text-teal md:text-2xl">
              {t("positioning")}
            </p>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="border-t-2 border-aeromine-500 pt-5">
                  <h2 className="text-xl font-bold">{f.title}</h2>
                  <p className="mt-3 text-muted">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {screenshots.map((s) => (
                <div
                  key={s}
                  className="rounded-lg border border-hairline bg-white p-3"
                >
                  <Image
                    src={s}
                    alt="AeroVIEW OS"
                    width={720}
                    height={440}
                    className="w-full rounded"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-bold md:text-3xl">
              {t("stagesTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              {t("stagesBody")}
            </p>
          </Reveal>

          <Reveal>
            <div className="rounded-lg bg-ink p-8 text-white md:p-12">
              <h2 className="text-2xl font-bold md:text-3xl">
                {t("rolesTitle")}
              </h2>
              <div className="mt-10 grid gap-12 md:grid-cols-2">
                {(["company", "client"] as const).map((role) => (
                  <div key={role}>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-aeromine-500">
                      {t(`${role}.title`)}
                    </h3>
                    <ol className="mt-6 flex flex-col gap-5">
                      {(t.raw(`${role}.steps`) as string[]).map((step, i) => (
                        <li key={step} className="flex items-start gap-4">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-aeromine-500 text-sm font-bold text-ink">
                            {i + 1}
                          </span>
                          <span className="text-muted-on-ink">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="text-center">
            <Link
              href="/contact"
              className="inline-block rounded bg-aeromine-500 px-8 py-4 text-lg font-bold text-ink transition-colors hover:bg-aeromine-400"
            >
              {t("cta")}
            </Link>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
