import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { services, servicePath } from "@/lib/services";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { sectors } from "@/lib/sectors";
import { caseStudies } from "@/lib/caseStudies";
import { featuredModel } from "@/lib/models";
import { ModelEmbed } from "@/components/three/ModelEmbed";

type Block = { title: string; body: string };
type Step = { name: string; body: string };
type Row = { model: string; twin: string };

export function ProblemSection() {
  const t = useTranslations("home.problem");
  const reasons = t.raw("reasons") as Block[];

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t("lead")}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <div className="border-t-2 border-aeromine-500 pt-5">
                <h3 className="text-xl font-bold">{r.title}</h3>
                <p className="mt-3 text-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <blockquote className="max-w-3xl text-2xl font-medium leading-snug text-teal md:text-3xl">
            {t("quote")}
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}

export function EngineSection() {
  const t = useTranslations("home.engine");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-on-ink">
            {t("lead")}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <p className="text-sm font-bold uppercase tracking-widest text-aeromine-500">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl font-bold">{s.name}</h3>
              <p className="mt-3 text-muted-on-ink">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function DifferentiatorSection() {
  const t = useTranslations("home.diff");
  const rows = t.raw("rows") as Row[];

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-1/2 border-b border-hairline pb-4 text-sm font-bold uppercase tracking-widest text-muted">
                  {t("modelHeader")}
                </th>
                <th className="w-1/2 border-b border-hairline pb-4">
                  <span className="inline-block rounded bg-aeromine-500 px-2.5 py-1 text-sm font-bold uppercase tracking-widest text-ink">
                    {t("twinHeader")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.model}>
                  <td className="border-b border-hairline py-4 pr-8 text-muted">
                    {row.model}
                  </td>
                  <td className="border-b border-hairline py-4 font-medium text-teal">
                    {row.twin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}

// Sits after the twin comparison on purpose. The twin is what wins the argument
// on this page; the service list is what a visitor clicks once they are sold on
// it, and what carries the search terms people actually type.
export function ServicesTeaser({ locale }: { locale: Locale }) {
  const t = useTranslations("home.servicesTeaser");
  const tServices = useTranslations("services");

  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t("lead")}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 0.06}>
              <NextLink
                href={servicePath(locale, s)}
                className="flex h-full flex-col rounded-lg border border-hairline p-6 transition-colors hover:border-aeromine-500 hover:bg-aeromine-50"
              >
                <h3 className="text-lg font-bold">
                  {tServices(`items.${s.key}.name`)}
                </h3>
                <p className="mt-3 text-sm text-muted">
                  {tServices(`items.${s.key}.card`)}
                </p>
              </NextLink>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <NextLink
            href={`/${locale}/services`}
            className="font-bold text-teal underline decoration-aeromine-500 decoration-2 underline-offset-4 hover:decoration-aeromine-600"
          >
            {t("cta")} →
          </NextLink>
        </Reveal>
      </Container>
    </section>
  );
}

export function SectorsTeaser() {
  const t = useTranslations("home.sectorsTeaser");
  const tSectors = useTranslations("sectors");

  return (
    <section className="border-t border-hairline bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t("lead")}</p>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          {sectors.map((s) => (
            <span
              key={s.key}
              className="rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium text-teal"
            >
              {tSectors(`items.${s.key}.name`)}
            </span>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <Link
            href="/sectors"
            className="font-bold text-teal underline decoration-aeromine-500 decoration-2 underline-offset-4 hover:decoration-aeromine-600"
          >
            {t("cta")} →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

export function WorkTeaser() {
  const t = useTranslations("home.workTeaser");
  const tWork = useTranslations("work");

  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.key} delay={i * 0.08}>
              <Link href="/work" className="group block">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={cs.images[0]}
                    alt={tWork(`items.${cs.key}.name`)}
                    width={720}
                    height={480}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-sm uppercase tracking-widest text-aeromine-500">
                  {tWork(`items.${cs.key}.type`)}
                </p>
                <h3 className="mt-1 text-xl font-bold">
                  {tWork(`items.${cs.key}.name`)}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            href="/work"
            className="font-bold text-aeromine-500 underline decoration-2 underline-offset-4 hover:text-aeromine-400"
          >
            {t("cta")} →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

// The one section a prospect can act on without reading anything: a real site,
// live, in the tab they already have open. Loads only when clicked.
export function FeaturedModelSection() {
  const t = useTranslations("home.featuredModel");
  const tModels = useTranslations("models");

  return (
    <section className="border-t border-hairline-dark bg-ink py-24 text-white md:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-muted-on-ink">{t("body")}</p>
          <Link
            href="/work"
            className="mt-8 inline-block font-bold text-aeromine-500 underline decoration-2 underline-offset-4 hover:text-aeromine-400"
          >
            {t("cta")} →
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <ModelEmbed
            href={featuredModel.href}
            title={tModels(`items.${featuredModel.key}.name`)}
            poster={featuredModel.poster}
          />
        </Reveal>
      </Container>
    </section>
  );
}

export function AeroviewTeaser() {
  const t = useTranslations("home.aeroview");

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-muted">{t("body")}</p>
          <Link
            href="/aeroview-os"
            className="mt-8 inline-block rounded bg-aeromine-500 px-6 py-3 font-bold text-ink transition-colors hover:bg-aeromine-400"
          >
            {t("cta")}
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-lg border border-hairline bg-white p-3 shadow-sm">
            <Image
              src="/images/av_phasebar.png"
              alt="AeroVIEW OS"
              width={720}
              height={420}
              className="w-full rounded"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FastSection() {
  const t = useTranslations("home.fast");
  const cols = t.raw("cols") as Block[];

  return (
    <section className="bg-teal py-24 text-white md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {cols.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <h3 className="text-xl font-bold text-aeromine-500">{c.title}</h3>
              <p className="mt-3 text-white/80">{c.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <blockquote className="max-w-3xl text-2xl font-medium leading-snug md:text-3xl">
            {t("quote")}
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}

export function HowSection() {
  const t = useTranslations("home.how");
  const steps = t.raw("steps") as Block[];

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <p className="flex h-10 w-10 items-center justify-center rounded-full bg-aeromine-500 font-bold text-ink">
                {i + 1}
              </p>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CtaSection() {
  const t = useTranslations("home.cta");

  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <Container className="text-center">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-on-ink">
            {t("body")}
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded bg-aeromine-500 px-8 py-4 text-lg font-bold text-ink transition-colors hover:bg-aeromine-400"
          >
            {t("button")}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
