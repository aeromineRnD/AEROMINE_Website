import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";

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
  const notItems = t.raw("notItems") as string[];

  return (
    <PageShell title={t("title")} intro={t("intro")}>
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
              <h2 className="text-2xl font-bold text-aeromine-500 md:text-3xl">
                {t("notTitle")}
              </h2>
              <p className="mt-2 text-muted-on-ink">{t("notLead")}</p>
              <ul className="mt-8 flex max-w-3xl flex-col gap-4">
                {notItems.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-hairline-dark pl-4 text-muted-on-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
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
