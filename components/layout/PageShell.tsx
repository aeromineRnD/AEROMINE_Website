import { Container } from "./Container";

export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    // pt-20 clears the fixed header, which is h-20. Keep the two in step.
    <main className="pt-20">
      <section className="py-20 md:py-28">
        <Container>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>
          )}
        </Container>
      </section>
      {children}
    </main>
  );
}
