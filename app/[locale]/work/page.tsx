import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { caseStudies } from "@/lib/caseStudies";
import { pageMetadata } from "@/lib/metadata";
import { ModelEmbed } from "@/components/three/ModelEmbed";
import { ModelGallery } from "@/components/three/ModelGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "/work", "work");
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-bold uppercase tracking-widest text-muted">
        {label}
      </dt>
      <dd className="mt-2">{value}</dd>
    </div>
  );
}

// `facts` carries only figures we can source: the parcel's scale and datum are
// on the drawing. Everything else stays empty until the founders supply real
// numbers. WEBSITE_CONTEXT.md 13 forbids estimating them, so the chips simply
// do not render rather than being filled with something plausible.
function facts(t: ReturnType<typeof useTranslations>, key: string) {
  return t.raw(`items.${key}.facts`) as string[];
}

export default function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("work");
  const tModels = useTranslations("models");

  return (
    <PageShell title={t("title")} intro={t("intro")}>
      <section className="pb-24 md:pb-32">
        <Container className="flex flex-col gap-24">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.key}>
              <article
                className={`grid items-center gap-10 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="flex flex-col gap-6">
                  {"demo" in cs ? (
                    <ModelEmbed
                      href={cs.demo}
                      title={t(`items.${cs.key}.name`)}
                      poster={cs.images[0]}
                    />
                  ) : null}
                  {cs.images.map((img) => (
                    <Image
                      key={img}
                      src={img}
                      alt={t(`items.${cs.key}.name`)}
                      width={880}
                      height={560}
                      className="w-full rounded-lg border border-hairline"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-teal">
                    {t(`items.${cs.key}.type`)}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                    {t(`items.${cs.key}.name`)}
                  </h2>

                  <p className="mt-5 text-sm font-bold uppercase tracking-widest text-muted">
                    {t("labels.challenge")}
                  </p>
                  <p className="mt-2 text-lg text-muted">
                    {t(`items.${cs.key}.challenge`)}
                  </p>

                  <dl className="mt-7 flex flex-col gap-5 border-t border-hairline pt-7">
                    <Row
                      label={t("labels.capture")}
                      value={t(`items.${cs.key}.capture`)}
                    />
                    <Row
                      label={t("labels.processing")}
                      value={t(`items.${cs.key}.processing`)}
                    />
                    <div>
                      <dt className="text-sm font-bold uppercase tracking-widest text-muted">
                        {t("labels.deliverables")}
                      </dt>
                      <dd className="mt-2">
                        <ul className="flex flex-col gap-1.5">
                          {(
                            t.raw(`items.${cs.key}.deliverables`) as string[]
                          ).map((d) => (
                            <li key={d} className="flex items-start gap-2.5">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aeromine-600"
                                aria-hidden
                              />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <Row
                      label={t("labels.applications")}
                      value={t(`items.${cs.key}.applications`)}
                    />
                  </dl>

                  {facts(t, cs.key).length > 0 && (
                    <div className="mt-7 flex flex-wrap gap-2">
                      {facts(t, cs.key).map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-hairline bg-paper px-3.5 py-1.5 text-sm font-medium text-teal"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {"demo" in cs ? (
                    <p className="mt-7 font-bold text-teal">
                      {tModels("caseStudyPrompt")}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <aside className="grid items-center gap-8 rounded-lg bg-ink p-8 text-white md:grid-cols-2 md:p-12">
              <Image
                src="/images/measure_accuracy.png"
                alt=""
                width={720}
                height={460}
                className="w-full rounded"
              />
              <p className="text-xl font-medium leading-snug text-aeromine-500 md:text-2xl">
                {t("accuracy")}
              </p>
            </aside>
          </Reveal>
        </Container>
      </section>

      <ModelGallery />
    </PageShell>
  );
}
