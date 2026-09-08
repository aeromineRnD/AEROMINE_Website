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

// Real pixel dimensions, not a shared guess. next/image derives the aspect
// ratio from these, and a wrong pair squashes the image rather than letting it
// scale, because the default object-fit is `fill`.
//
// The first two run full width and carry the argument: what a client sees after
// logging in, then a real drone capture sitting in the platform as a dated
// phase. The other two sit beside each other underneath.
const screenshots = [
  { src: "/images/av-client-dashboard.png", width: 1843, height: 613, wide: true },
  { src: "/images/av-phase-drone-capture.png", width: 1268, height: 546, wide: true },
  { src: "/images/av-stage-progress.png", width: 1064, height: 694, wide: false },
  { src: "/images/av-phase-3d-model.png", width: 1591, height: 556, wide: false },
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
              {screenshots.map((s, i) => (
                <div
                  key={s.src}
                  className={`rounded-lg border border-hairline bg-white p-3 ${
                    s.wide ? "sm:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={(t.raw("screenshotAlts") as string[])[i]}
                    width={s.width}
                    height={s.height}
                    sizes={
                      s.wide
                        ? "(min-width: 1280px) 1160px, 100vw"
                        : "(min-width: 1280px) 580px, (min-width: 640px) 50vw, 100vw"
                    }
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
