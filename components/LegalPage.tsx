import type { Metadata } from "next";
import Link from "next/link";
import { legalDocs, type LegalDoc } from "@/content/legal";
import { legalEntity } from "@/content/site";
import { Icon } from "./Icon";
import { Navbar } from "./Navbar";
import { FloatingWhatsApp, Footer, T } from "./Sections";
import { Container, Label } from "./ui";

export function legalMetadata(doc: LegalDoc): Metadata {
  return {
    title: doc.title, // " | WeMakeIt" added by the layout title template
    description: doc.description,
    alternates: { canonical: `/${doc.slug}` },
  };
}

/** Shared layout for the Privacy, Terms and Refund pages. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = legalDocs.filter((d) => d.slug !== doc.slug);
  return (
    <>
      <Navbar />
      <main id="main" className="pb-24 pt-28 sm:pt-32">
        <Container>
          <header className="max-w-3xl border-b border-line pb-10">
            <Label>Legal</Label>
            <h1 className="anim-rise font-display text-5xl leading-[1.02] tracking-tight text-fg sm:text-6xl">{doc.title}</h1>
            <p className="anim-rise mt-4 text-sm text-muted" style={{ "--d": "100ms" } as React.CSSProperties}>
              Last updated: {legalEntity.updated}
            </p>
            <p className="anim-rise mt-6 text-lg leading-relaxed text-muted" style={{ "--d": "180ms" } as React.CSSProperties}>
              <T>{doc.intro}</T>
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* table of contents */}
            <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">On this page</p>
              <ol className="mt-4 space-y-2 border-l border-line">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-0.5 pl-4 text-sm text-muted transition-colors hover:border-accent hover:text-fg">
                      {s.heading.replace(/^\d+\.\s*/, "")}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* body */}
            <article className="max-w-3xl">
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-line py-8 first:pt-0 last:border-b-0">
                  <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{s.heading}</h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
                    {s.body.map((b, i) =>
                      Array.isArray(b) ? (
                        <ul key={i} className="space-y-2">
                          {b.map((li) => (
                            <li key={li} className="flex gap-3">
                              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span><T>{li}</T></span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i}><T>{b}</T></p>
                      ),
                    )}
                  </div>
                </section>
              ))}

              <div className="mt-10 rounded-[1.5rem] border border-line bg-surface p-6 sm:p-8">
                <p className="text-sm font-semibold text-fg">Related policies</p>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-accent hover:text-accent">
                        {o.title}
                        <Icon name="arrow" className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </Container>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
