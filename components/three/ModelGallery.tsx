import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ModelEmbed } from "./ModelEmbed";
import { liveModels } from "@/lib/models";

// Every card says whether it is a client site or a build of our own. That is
// WEBSITE_CONTEXT.md §13: the demos are proof the pipeline is subject-agnostic,
// and they stay an asset only as long as nobody can mistake one for a customer.
export function ModelGallery() {
  const t = useTranslations("models");

  return (
    <section className="border-t border-hairline-dark bg-ink py-24 text-white md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
            {t("galleryTitle")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-on-ink">
            {t("galleryLead")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {liveModels.map((m, i) => (
            <Reveal key={m.key} delay={(i % 2) * 0.08}>
              <ModelEmbed
                href={m.href}
                title={t(`items.${m.key}.name`)}
                poster={m.poster}
              />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold">{t(`items.${m.key}.name`)}</h3>
                <span className="rounded-full border border-hairline-dark px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-on-ink">
                  {m.deliveredForClient ? t("badgeClient") : t("badgeDemo")}
                </span>
              </div>
              <p className="mt-2 text-muted-on-ink">
                {t(`items.${m.key}.body`)}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
