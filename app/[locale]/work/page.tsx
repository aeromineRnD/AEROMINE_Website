import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { caseStudies } from "@/lib/caseStudies";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "/work", "work");
}

export default function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("work");

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
                  <p className="mt-4 text-lg text-muted">
                    {t(`items.${cs.key}.body`)}
                  </p>
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
    </PageShell>
  );
}
