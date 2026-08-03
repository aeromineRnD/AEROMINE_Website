import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";

// Bilingual by construction rather than via messages: this page can render
// while locale context is unsettled, so it must not depend on translations.
export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center bg-paper py-24">
      <Container>
        <p className="text-sm font-bold uppercase tracking-widest text-teal">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold md:text-5xl">
          Αυτή η σελίδα δεν υπάρχει.
        </h1>
        <p className="mt-2 text-xl text-muted">This page does not exist.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-aeromine-500 px-6 py-3 font-medium text-ink transition-colors hover:bg-aeromine-400"
        >
          Αρχική · Home
        </Link>
      </Container>
    </main>
  );
}
