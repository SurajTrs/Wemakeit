import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp, Footer, StatsStrip } from "@/components/Sections";
import { btn, Container, Label } from "@/components/ui";
import { hasWhatsApp, linkProps, offer, process, SITE_URL, whatsappLink } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => offer.items.find((o) => o.slug === slug);

// Build one static page per service in content/site.ts → offer.items
export function generateStaticParams() {
  return offer.items.map((o) => ({ slug: o.slug }));
}
export const dynamicParams = false; // unknown slugs → 404

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = find((await params).slug);
  if (!item) return {};
  const title = `${item.title} | WeMakeIt`;
  return {
    title,
    description: item.line,
    alternates: { canonical: `/services/${item.slug}` },
    openGraph: { title, description: item.line, url: `/services/${item.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const item = find((await params).slug);
  if (!item) notFound();

  const message = `Hi WeMakeIt, I'm interested in ${item.title}. Can you share details and pricing?`;
  const href = whatsappLink(message);
  const others = offer.items.filter((o) => o.slug !== item.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.line,
    url: `${SITE_URL}/services/${item.slug}`,
    provider: { "@type": "ProfessionalService", name: "WeMakeIt", url: SITE_URL },
    areaServed: "IN",
  };

  return (
    <>
      <Navbar />
      <main id="main">
        {/* Header */}
        <section className="relative overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-24">
          <div
            aria-hidden="true"
            className="anim-breathe pointer-events-none absolute bottom-[-30%] left-1/2 h-[480px] w-[900px] max-w-[180vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(198,244,50,0.28),rgba(198,244,50,0.06)_40%,transparent_70%)] blur-2xl"
          />
          <Container className="relative">
            <Link href="/#offer" className="anim-rise inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent">
              <Icon name="arrowLeft" className="h-4 w-4" />
              All services
            </Link>
            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span style={{ "--d": "100ms" } as React.CSSProperties} className="anim-pop flex h-16 w-16 items-center justify-center rounded-2xl bg-lime text-ink shadow-[0_0_40px_-8px_rgba(198,244,50,0.7)]">
                  <Icon name={item.icon} className="h-8 w-8" />
                </span>
                <h1 style={{ "--d": "200ms" } as React.CSSProperties} className="anim-rise mt-8 font-display text-[3rem] leading-[1.02] tracking-tight text-fg sm:text-7xl">
                  {item.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <em className="text-accent">{item.title.split(" ").slice(-1)}</em>
                </h1>
                <p style={{ "--d": "350ms" } as React.CSSProperties} className="anim-rise mt-6 text-xl leading-relaxed text-muted">{item.intro}</p>
              </div>
              <a href={href} {...linkProps(href)} style={{ "--d": "500ms" } as React.CSSProperties} className={`anim-rise ${btn.base} ${btn.lime} shrink-0 !px-8 !py-4 text-base`}>
                {hasWhatsApp ? <WhatsAppIcon /> : <Icon name="mail" />}
                Get a quote
              </a>
            </div>
          </Container>
        </section>

        {/* Quick facts */}
        <section className="pb-4">
          <Container>
            <StatsStrip />
          </Container>
        </section>

        {/* What's included + who it's for */}
        <section className="border-t border-line py-16 lg:py-24">
          <Container className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div data-reveal className="spotlight rounded-[1.75rem] border border-line bg-surface p-7 sm:p-10">
              <Label>What&apos;s included</Label>
              <ul className="mt-2 space-y-4">
                {item.includes.map((i, n) => (
                  <li key={i} data-reveal style={{ "--d": `${150 + n * 80}ms` } as React.CSSProperties} className="flex gap-4 text-[17px] leading-snug text-fg">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="spotlight rounded-[1.75rem] border border-line bg-surface p-7 sm:p-8">
                <Label>Good for</Label>
                <ul className="space-y-3">
                  {item.goodFor.map((g) => (
                    <li key={g} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-reveal="pop" style={{ "--d": "240ms" } as React.CSSProperties} className="rounded-[1.75rem] bg-lime p-7 text-ink sm:p-8">
                <p className="font-display text-3xl leading-tight">Not sure what you need?</p>
                <p className="mt-2 text-[15px] text-ink/75">Tell us about your business and we&apos;ll suggest the right plan and a fixed price.</p>
                <a href={href} {...linkProps(href)} className="mt-6 inline-flex items-center gap-2 font-semibold underline decoration-2 underline-offset-4">
                  {hasWhatsApp ? "Chat on WhatsApp" : "Contact us"}
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section className="border-t border-line bg-surface py-16 lg:py-24">
          <Container>
            <Label>How it works</Label>
            <h2 data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="font-display text-[2.4rem] leading-[1.05] tracking-tight text-fg sm:text-5xl">
              Four simple steps. <em className="text-accent">No surprises.</em>
            </h2>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {process.steps.map((s, i) => (
                <li key={s.title} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties} className="spotlight rounded-[1.5rem] border border-line bg-canvas p-6">
                  <span className="font-display text-3xl italic text-accent">{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-fg">{s.title}</h3>
                  <p className="mt-1 text-[15px] text-muted">{s.line}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Other services */}
        <section className="py-16 lg:py-24">
          <Container>
            <Label>More services</Label>
            <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {others.map((o, i) => (
                <li key={o.slug} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-raised text-accent transition-colors group-hover:bg-lime group-hover:text-ink">
                      <Icon name={o.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-fg">{o.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
