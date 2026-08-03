import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "/contact", "contact");
}

const members = [
  { key: "brintakis", image: "/images/team_brintakis.png" },
  { key: "kokotakis", image: "/images/team_kokotakis.png" },
  { key: "karatosidis", image: "/images/team_karatosidis.png" },
] as const;

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <PageShell title={t("title")} intro={t("intro")}>
      <section className="pb-24 md:pb-32">
        <Container className="grid gap-16 md:grid-cols-[3fr_2fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-teal">
                  {t("details.title")}
                </h2>
                <dl className="mt-4 flex flex-col gap-3 text-muted">
                  <div>
                    <dt className="text-sm font-medium text-ink">
                      {t("details.addressLabel")}
                    </dt>
                    <dd>{tFooter("address")}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-ink">
                      {t("details.phoneLabel")}
                    </dt>
                    <dd>
                      <a href="tel:+306981375791" className="hover:text-teal">
                        {tFooter("phone")}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-ink">
                      {t("details.emailLabel")}
                    </dt>
                    <dd>
                      <a
                        href="mailto:jbrintakis@aeromine.org"
                        className="hover:text-teal"
                      >
                        {tFooter("email")}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg bg-teal p-6 text-white">
                <h2 className="font-bold">{t("partnersTitle")}</h2>
                <p className="mt-2 text-white/80">{t("partnersBody")}</p>
              </div>
            </div>
          </Reveal>
        </Container>

        <Container className="mt-24">
          <Reveal>
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal">
              {t("teamTitle")}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {members.map((m, i) => (
              <Reveal key={m.key} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <Image
                    src={m.image}
                    alt={t(`members.${m.key}.name`)}
                    width={160}
                    height={160}
                    className="h-20 w-20 shrink-0 rounded-full bg-hairline"
                  />
                  <div>
                    <h3 className="font-bold">{t(`members.${m.key}.name`)}</h3>
                    <p className="mt-0.5 text-sm font-medium text-teal">
                      {t(`members.${m.key}.role`)}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {t(`members.${m.key}.does`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
