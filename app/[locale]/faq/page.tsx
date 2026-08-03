import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "/faq", "faq");
}

export default function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <PageShell title={t("title")} intro={t("intro")}>
      <JsonLd data={faqSchema(items)} />
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            {items.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i, 4) * 0.05}>
                <div className="border-b border-hairline pb-8">
                  <h2 className="text-xl font-bold">{item.q}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
