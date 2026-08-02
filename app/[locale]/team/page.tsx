import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

const members = [
  { key: "brintakis", image: "/images/team_brintakis.png" },
  { key: "kokotakis", image: "/images/team_kokotakis.png" },
  { key: "karatosidis", image: "/images/team_karatosidis.png" },
] as const;

export default function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("team");

  return (
    <PageShell title={t("title")} intro={t("intro")}>
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-3">
            {members.map((m, i) => (
              <Reveal key={m.key} delay={i * 0.1}>
                <Image
                  src={m.image}
                  alt={t(`members.${m.key}.name`)}
                  width={280}
                  height={280}
                  className="h-40 w-40 rounded-full bg-hairline md:h-48 md:w-48"
                />
                <h2 className="mt-6 text-xl font-bold">
                  {t(`members.${m.key}.name`)}
                </h2>
                <p className="mt-1 text-sm font-medium text-teal">
                  {t(`members.${m.key}.role`)}
                </p>
                <p className="mt-3 text-muted">{t(`members.${m.key}.does`)}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
