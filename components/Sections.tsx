import Image from "next/image";
import Link from "next/link";
import {
  allWhatsAppNumbers,
  bookingLink,
  brand,
  contact,
  EMAIL,
  faq,
  festiveOffer,
  finalCta,
  footer,
  formatPhone,
  hasEmail,
  hasWhatsApp,
  hero,
  liveSocials,
  isPlaceholder,
  linkProps,
  mailtoLink,
  nav,
  offer,
  pricing,
  problem,
  process,
  services,
  servicePages,
  socials,
  team,
  ways,
  whatsappLink,
  whatsappLinkFor,
  why,
  work,
} from "@/content/site";
import { ContactForm } from "./ContactForm";
import { CountUp } from "./CountUp";
import { Problem } from "./Problem";
import { TeamOrbit } from "./TeamOrbit";
import { ServiceRing } from "./ServiceRing";
import { Icon, SocialIcon, WhatsAppIcon } from "./Icon";
import { Accent, btn, Container, Label, SectionHeading } from "./ui";

/** Renders text with any [PLACEHOLDER] visibly marked, so unfilled bits are easy to spot. */
export function T({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\[[^\]]+\]$/.test(p) ? (
          <mark key={i} className="rounded bg-lime/15 px-1 text-accent outline outline-1 outline-dashed outline-accent/50">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

/** Icon for "message us" buttons: WhatsApp when a number is set, otherwise email. */
const MsgIcon = ({ className }: { className?: string }) =>
  hasWhatsApp ? <WhatsAppIcon className={className} /> : <Icon name="mail" className={className} />;

/** Very soft glow — a hint of light, not a lime blob. */
function Glow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[radial-gradient(ellipse_at_center,rgb(var(--fg)/0.06),rgba(198,244,50,0.05)_35%,transparent_70%)] blur-2xl ${className}`}
    />
  );
}

const card = "spotlight rounded-[1.5rem] border border-line bg-surface";

/** Staggered delay for grid items: style={d(i)} */
const d = (i: number, step = 80, base = 0) => ({ "--d": `${base + i * step}ms` }) as React.CSSProperties;

/** Splits text into words that fade/blur in one after another. */
function Words({ text, start = 0, step = 55 }: { text: string; start?: number; step?: number }) {
  // "\n" in the text becomes a line break
  let n = 0;
  return (
    <>
      {text.split("\n").map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(" ").filter(Boolean).map((w) => {
            const i = n++;
            return (
              <span key={i}>
                <span className="anim-word" style={d(i, step, start)}>{w}</span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

/* ───────────────────────── Stats strip (used on service pages) ───────────────────────── */
export function StatsStrip() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-4">
      {hero.stats.map((s, i) => (
        <div key={s.label} data-reveal style={d(i, 90)} className="bg-surface px-5 py-7 text-center">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block font-display text-4xl text-fg sm:text-5xl"><CountUp value={s.value} /></span>
            <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{s.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
/** Hero background: fine dot grid + soft light beam from above. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* dot grid — dark mode only */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(rgb(var(--fg)/0.14)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div className="absolute left-1/2 top-[-10%] h-[80%] w-[60rem] max-w-[160vw] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_155deg,rgb(var(--fg)/0.09)_180deg,transparent_205deg)] blur-2xl" />
    </div>
  );
}

/** Thin concentric rings with a small lime dot orbiting, behind the wordmark. */
function OrbitRings({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${className}`}>
      {[0, 12, 24, 36].map((inset, i) => (
        <div key={inset} className="absolute rounded-full border border-fg/[0.08]" style={{ inset: `${inset}%`, opacity: 1 - i * 0.15 }} />
      ))}
      <div className="absolute inset-[12%] animate-[spin_28s_linear_infinite]">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_14px_3px_rgba(198,244,50,0.7)]" />
      </div>
      <div className="absolute inset-[36%] animate-[spin_18s_linear_infinite_reverse]">
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-fg/40" />
      </div>
    </div>
  );
}

/** Product-style "project window" under the hero. Decorative (aria-hidden); text lives in content/site.ts → hero.preview. */
function ProjectPreview() {
  const p = hero.preview;
  const t = p.timeline;
  const pct = (day: number) => `${(day / t.days) * 100}%`;
  const todayDay = 4.2; // where the "Today" marker sits on the chart
  const label = "text-[11px] font-medium uppercase tracking-[0.14em] text-muted";
  return (
    <div aria-hidden="true" className="anim-pop relative z-10 mx-auto mt-6 max-w-5xl sm:mt-10" style={{ "--d": "1100ms" } as React.CSSProperties}>
      <div className="overflow-hidden rounded-[1.25rem] border border-line bg-surface shadow-[0_1px_0_rgb(255_255_255/0.04)_inset,0_40px_100px_-40px_rgb(0_0_0/0.35)]">
        {/* window bar */}
        <div className="flex h-11 items-center gap-3 border-b border-line bg-raised/60 px-4">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
          </span>
          <span className="flex-1 truncate text-center text-xs font-medium text-muted">
            {brand.name} <span className="text-fg/30">/</span> {p.title}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-fg">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-lime" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            {p.status}
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_1.45fr_1fr] md:divide-x md:divide-line">
          {/* scope */}
          <div className="hidden p-5 md:block">
            <div className="flex items-center justify-between">
              <p className={label}>{p.scope.label}</p>
              <span className="text-[11px] tabular-nums text-muted">{p.scope.items.length}/{p.scope.items.length}</span>
            </div>
            <ul className="mt-4 space-y-1">
              {p.scope.items.map((it, i) => (
                <li key={it.label} style={d(i, 70, 1300)} className="anim-rise flex items-center gap-3 rounded-lg px-2 py-1.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                    <Icon name={it.icon} className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1 text-sm text-fg">{it.label}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                    <Icon name="check" className="h-3 w-3 text-accent" strokeWidth={3} />
                    {p.scope.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* timeline */}
          <div className="p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className={label}>{t.label}</p>
                <p className="mt-2 font-display text-3xl leading-none text-fg">
                  {t.days} <em className="text-accent">days</em>
                </p>
              </div>
              <p className="pb-0.5 text-xs text-muted">{t.summary}</p>
            </div>

            <div className="relative mt-5">
              {/* day grid */}
              <div className="ml-[38%] grid text-[10px] tabular-nums text-muted" style={{ gridTemplateColumns: `repeat(${t.days}, 1fr)` }}>
                {Array.from({ length: t.days }).map((_, i) => (
                  <span key={i} className="border-l border-line pb-1.5 pl-1">D{i + 1}</span>
                ))}
              </div>
              <ul className="space-y-2">
                {process.steps.map((s, i) => {
                  const st = t.steps[i];
                  const bar =
                    st.state === "done"
                      ? "bg-lime"
                      : st.state === "active"
                        ? "bg-[repeating-linear-gradient(-45deg,#C6F432_0_6px,#B5E02A_6px_12px)]"
                        : "border border-dashed border-fg/30 bg-transparent";
                  return (
                    <li key={s.title} className="flex items-center">
                      <span className="w-[38%] shrink-0 truncate pr-3 text-xs text-fg/80">{s.title}</span>
                      <span className="relative h-5 flex-1 rounded-md bg-raised">
                        <span
                          className={`anim-bar absolute inset-y-0 rounded-md ${bar}`}
                          style={{ left: pct(st.start), width: pct(st.end - st.start), "--d": `${1350 + i * 160}ms` } as React.CSSProperties}
                        />
                      </span>
                    </li>
                  );
                })}
              </ul>
              {/* today marker */}
              <div className="pointer-events-none absolute inset-y-0 left-[38%] right-0">
                <div className="absolute inset-y-0 w-px bg-fg/70" style={{ left: pct(todayDay) }}>
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full rounded bg-fg px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-canvas">
                    {t.today}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-lime" />Done</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-[repeating-linear-gradient(-45deg,#C6F432_0_3px,#B5E02A_3px_6px)]" />In progress</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm border border-dashed border-fg/40" />Ongoing</span>
            </div>
          </div>

          {/* team */}
          <div className="hidden flex-col p-5 md:flex">
            <p className={label}>{p.team.label}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime font-display text-lg italic text-ink">W</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-lime" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-fg">{brand.name}</span>
                <span className="block text-xs text-muted">{p.team.role}</span>
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {p.team.points.map((pt) => (
                <li key={pt.text} className="flex items-center gap-3 text-sm text-fg/85">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                    {pt.icon === "whatsapp" ? <WhatsAppIcon className="h-3.5 w-3.5" /> : <Icon name={pt.icon} className="h-3.5 w-3.5" />}
                  </span>
                  {pt.text}
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-line pt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                {hero.trustLine}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [before, after] = hero.headline.split(hero.highlight);
  const [subA, subB] = hero.subtext.split("\n");
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-28">
      <HeroBackdrop />

      <Container className="relative z-10 text-center">
        {festiveOffer.active && (
          <div className="mb-5">
          <a
            href="/#pricing"
            className="anim-rise group inline-flex items-center gap-2 rounded-full border border-[#FFB938]/60 bg-[#FFB938]/10 px-4 py-1.5 text-sm font-semibold text-[#9A5B00] transition-colors hover:bg-[#FFB938]/20 dark:text-[#FFB938]"
          >
            <span aria-hidden="true">🪔</span>
            <span className="sm:hidden">{festiveOffer.bannerShort} {festiveOffer.validLabel}</span>
            <span className="hidden sm:inline">{festiveOffer.banner} · {festiveOffer.validLabel}</span>
            <span className="inline-flex items-center gap-1 text-fg/70 group-hover:text-fg">
              <span className="hidden sm:inline">· {festiveOffer.bannerCta}</span>
              <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
          </div>
        )}
        <Label>{hero.eyebrow}</Label>
        <h1 id="hero-title" className="mx-auto font-display text-[3.8rem] lg:whitespace-nowrap leading-[0.98] tracking-tight text-fg sm:text-8xl lg:text-[6.5rem]">
          <Words text={before} />
          <em className="anim-word relative whitespace-nowrap text-accent" style={d(before.split(/\s+/).filter(Boolean).length, 55)}>
            {hero.highlight}
            <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full overflow-visible text-lime">
              <path pathLength={1} className="anim-draw" style={{ "--d": "1000ms" } as React.CSSProperties} d="M3 14C60 6 140 3 297 9" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </em>
          {after}
        </h1>
        {/* two lines on tablet/desktop; wraps naturally on phones */}
        <p className="anim-rise mx-auto mt-7 text-lg leading-relaxed text-muted sm:text-xl lg:whitespace-nowrap" style={{ "--d": "650ms" } as React.CSSProperties}>
          {subA}
          {subB && (
            <>
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>
              {subB}
            </>
          )}
        </p>
        <div className="anim-rise mt-9 flex flex-col justify-center gap-3 sm:flex-row" style={{ "--d": "800ms" } as React.CSSProperties}>
          <a href={whatsappLink(hero.primaryCtaMessage)} {...linkProps(whatsappLink(hero.primaryCtaMessage))} className={`${btn.base} ${btn.lime}`}>
            <MsgIcon />
            {hero.primaryCta}
          </a>
          <a href="#offer" className={`${btn.base} ${btn.ghost}`}>
            {hero.secondaryCta}
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      </Container>

      {/* giant fading wordmark with orbit rings behind and a lime horizon line below */}
      <div className="relative mt-16 sm:mt-20">
        <OrbitRings className="anim-pop top-1/2 h-[40rem] w-[40rem] max-w-[130vw] -translate-y-1/2 sm:h-[56rem] sm:w-[56rem]" />
        <p
          aria-hidden="true"
          className="anim-rise pointer-events-none relative select-none whitespace-nowrap bg-gradient-to-b from-fg/30 via-fg/12 to-transparent bg-clip-text text-center font-display text-[24vw] leading-[0.8] tracking-[-0.04em] text-transparent"
          style={{ "--d": "950ms" } as React.CSSProperties}
        >
          {brand.name}
        </p>
        <div aria-hidden="true" className="anim-rise relative mx-auto mt-6 h-px sm:mt-9 w-[70%] max-w-4xl bg-gradient-to-r from-transparent via-lime to-transparent" style={{ "--d": "1200ms" } as React.CSSProperties}>
          <div className="absolute inset-x-[20%] -top-3 h-6 bg-lime/40 blur-xl" />
        </div>
      </div>

      <Container className="relative pb-2 lg:pb-4">
        <ProjectPreview />
      </Container>
    </section>
  );
}

/* ───────────────────────── Three ways ───────────────────────── */
export function Ways() {
  return (
    <section aria-labelledby="ways-title" className="pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
      <Container>
        <Label>{ways.label}</Label>
        <SectionHeading id="ways-title">{ways.heading}</SectionHeading>
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mt-12 lg:mx-0 lg:grid lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden lg:grid-cols-3">
          {ways.items.map((w, i) => {
            const href = whatsappLink(w.ctaMessage);
            return (
              <article
                key={w.title}
                data-reveal
                style={d(i, 120)}
                className={`${card} ${"w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto"} group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_60px_-30px_rgba(198,244,50,0.45)] sm:p-8`}
              >
                <span className="font-display text-2xl italic text-accent">{w.number}</span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-fg">{w.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{w.intro}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {w.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-snug text-fg/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-accent">
                        <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={href} {...linkProps(href)} className="mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-semibold text-accent">
                  <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-current">{w.cta}</span>
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── What we offer ───────────────────────── */
export function Offer() {
  return (
    <section id="offer" aria-labelledby="offer-title" className="scroll-mt-20 border-t border-line py-16 sm:py-20 lg:py-28">
      <Container>
        <Label>{offer.label}</Label>
        <SectionHeading id="offer-title">{offer.heading}</SectionHeading>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{offer.sub}</p>
        <ul className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {offer.items.map((o, i) => (
            <li key={o.slug} data-reveal style={d(i % 3, 100, Math.floor(i / 3) * 120)}>
              <Link
                href={`/services/${o.slug}`}
                className={`${card} group flex h-full items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_-28px_rgba(198,244,50,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-col sm:gap-0 sm:p-8`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-raised text-accent transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink sm:h-14 sm:w-14">
                  <Icon name={o.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <span className="flex flex-1 flex-col self-stretch">
                  <h3 className="text-lg font-semibold tracking-tight text-fg sm:mt-6 sm:text-2xl">{o.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-3 sm:text-[15px]">{o.line}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-accent sm:pt-7 sm:text-[15px]">
                    {offer.learnMore}
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ───────────────────────── Services grid ───────────────────────── */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 border-t border-line py-16 sm:py-20 lg:py-28">
      <Container>
        <Label>{services.label}</Label>
        <SectionHeading id="services-title">{services.heading}</SectionHeading>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 lg:grid-cols-5">
          {services.items.map((s, i) => {
            // Cards with a service page link there (good for SEO); the rest open WhatsApp.
            const page = "slug" in s && s.slug ? `/services/${s.slug}` : null;
            const href = page ?? whatsappLink(services.ctaMessage(s.title));
            return (
              <li key={s.title} data-reveal style={d(i % 5, 70, Math.floor(i / 5) * 100)}>
                <Link
                  href={href}
                  {...linkProps(href)}
                  className={`${card} group flex h-full flex-col p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_-28px_rgba(198,244,50,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-6`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-raised text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-lime group-hover:text-ink sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon name={s.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold leading-tight text-fg sm:mt-5 sm:text-lg">{s.title}</h3>
                  <p className="mt-2 hidden text-sm leading-relaxed text-muted sm:block">{s.line}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold text-accent sm:pt-5 sm:text-sm">
                    {!page && hasWhatsApp && <WhatsAppIcon className="h-4 w-4" />}
                    {page ? services.cta : "Enquire"}
                    <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ───────────────────────── How it works ───────────────────────── */
export function Process() {
  return (
    <section id="how-it-works" aria-labelledby="process-title" className="scroll-mt-20 border-y border-line bg-surface py-16 sm:py-20 lg:py-28">
      <Container>
        <Label>{process.label}</Label>
        <SectionHeading id="process-title">{process.heading}</SectionHeading>
        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* connecting line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" data-reveal="line-y" className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-lime/60 to-line lg:hidden" />
          <span aria-hidden="true" data-reveal="line-x" className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-lime/60 via-line to-line lg:block" />
          {process.steps.map((s, i) => (
            <li key={s.title} data-reveal style={d(i, 180, 200)} className="relative flex gap-5 lg:block">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-canvas font-display text-xl italic text-accent">
                {i + 1}
              </span>
              <div className="lg:mt-6 lg:pr-4">
                <h3 className="text-xl font-semibold text-fg">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ───────────────────────── Pricing ───────────────────────── */
export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative scroll-mt-20 overflow-hidden py-16 sm:py-20 lg:py-28">
      <Glow className="left-1/2 top-1/2 h-[500px] w-[700px] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <Container className="relative">
        <Label>{pricing.label}</Label>
        <SectionHeading id="pricing-title">{pricing.heading}</SectionHeading>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{pricing.sub}</p>
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 pt-5 [scrollbar-width:none] sm:mt-12 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:items-stretch lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden">
          {pricing.plans.map((p, i) => {
            const href = whatsappLink(p.ctaMessage);
            const onOffer = festiveOffer.active && !!p.offerPrice;
            return (
              <article
                key={p.name}
                data-reveal
                style={d(i, 120)}
                className={`spotlight relative flex w-[88%] shrink-0 snap-start flex-col rounded-[1.75rem] border p-6 transition-transform duration-300 hover:-translate-y-1 sm:w-[60%] sm:p-8 lg:w-auto ${
                  p.popular
                    ? "border-accent/70 bg-[linear-gradient(180deg,rgba(198,244,50,0.07),rgb(var(--surface))_35%)] shadow-[0_30px_80px_-40px_rgb(0_0_0/0.45)]"
                    : "border-line bg-surface"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-6 rounded-full bg-lime px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink sm:left-8">
                    {pricing.popularBadge}
                  </span>
                )}

                {/* Who it's for + name */}
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{p.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg">{p.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted lg:min-h-[4.9rem]">{p.description}</p>

                {/* Price */}
                <div className="mt-6 border-t border-line pt-6">
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {onOffer && (
                      <del className="text-xl text-muted decoration-[#FF5A4E] decoration-2 sm:text-2xl">
                        <span className="sr-only">Regular price </span>
                        {p.price}
                      </del>
                    )}
                    <span className={`font-display tracking-tight text-fg ${p.offerPrice || /^₹/.test(p.price) ? "text-5xl sm:text-6xl" : "text-[2.6rem] leading-none sm:text-5xl"}`}>
                      {onOffer && <span className="sr-only">{festiveOffer.name} price </span>}
                      <T>{onOffer ? p.offerPrice! : p.price}</T>
                    </span>
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
                    <span className="text-muted">{p.priceNote}</span>
                    {onOffer && (
                      <span className="rounded-full border border-[#FFB938]/60 bg-[#FFB938]/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#9A5B00] dark:text-[#FFB938]">
                        {festiveOffer.badge} · save {savings(p.price, p.offerPrice!)}
                      </span>
                    )}
                  </p>
                </div>

                {/* Key facts */}
                <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {p.facts.map((f) => (
                    <div key={f.label} className="bg-raised/60 px-4 py-3">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{f.label}</dt>
                      <dd className="mt-0.5 text-[15px] font-semibold text-fg">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Inclusions */}
                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg/60">{pricing.includedLabel}</p>
                <ul className="mt-4 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] leading-snug text-fg/85">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.popular ? "bg-lime text-ink" : "bg-accent/15 text-accent"}`}>
                        <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Terms note + CTA */}
                <div className="mt-auto pt-8">
                  <p className="flex gap-2.5 rounded-2xl border border-line bg-canvas/60 p-4 text-[13px] leading-relaxed text-muted">
                    <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{p.note}</span>
                  </p>
                  <a href={href} {...linkProps(href)} className={`${btn.base} ${p.popular ? btn.lime : btn.ghost} mt-5 w-full`}>
                    {p.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-12 text-center text-[15px] text-muted">
          {pricing.note}{" "}
          <a
            href={whatsappLink(pricing.noteCtaMessage)}
            {...linkProps(whatsappLink(pricing.noteCtaMessage))}
            className="font-semibold text-fg underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            {pricing.noteCta}
          </a>
        </p>
      </Container>
    </section>
  );
}

/** "₹5,999" − "₹4,999" → "₹1,000" */
const savings = (regular: string, offer: string) => {
  const n = (v: string) => Number(v.replace(/[^\d]/g, ""));
  return `₹${(n(regular) - n(offer)).toLocaleString("en-IN")}`;
};

/* ───────────────────────── Our work ───────────────────────── */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 border-t border-line py-16 sm:py-20 lg:py-28">
      <Container>
        <Label>{work.label}</Label>
        <SectionHeading id="work-title">{work.heading}</SectionHeading>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {work.projects.map((p, i) => (
            <article
              key={p.title}
              data-reveal
              style={d(i, 120)}
              className={`${card} group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-raised">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className={`${"imageFit" in p && p.imageFit === "contain" ? "object-contain p-10 sm:p-12" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`}
                  />
                ) : (
                  <div className="relative flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                    <Glow className="inset-x-0 bottom-[-40%] h-full" />
                    <span className="relative font-display text-3xl text-fg">{p.title}</span>
                    <span className="relative text-sm text-muted">{p.type}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{p.type}</p>
                <h3 className="mt-2 text-2xl font-semibold text-fg">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
                {!isPlaceholder(p.url) && (
                  <a href={p.url} {...linkProps(p.url)} className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold text-accent">
                    <span className="underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-current">{p.linkLabel}</span>
                    <Icon name="arrowUpRight" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">: {p.title} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </article>
          ))}
          {Array.from({ length: work.comingSoonSlots }).map((_, i) => (
            <div
              key={i}
              data-reveal
              style={d(i + work.projects.length, 120)}
              className="flex min-h-[18rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-fg/15 p-8 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted">
                <Icon name="plus" />
              </span>
              <p className="mt-4 font-display text-2xl text-fg">{work.comingSoonLabel}</p>
              <p className="mt-1 text-sm text-muted">{work.comingSoonLine}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── Why WeMakeIt ───────────────────────── */
export function Why() {
  return (
    <section aria-labelledby="why-title" className="border-y border-line bg-surface py-16 sm:py-20 lg:py-28">
      <Container>
        <Label>{why.label}</Label>
        <SectionHeading id="why-title">{why.heading}</SectionHeading>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2">
          {why.points.map((p, i) => (
            <li key={p.title} data-reveal style={d(i, 100)} className="spotlight group bg-canvas p-7 transition-colors duration-300 hover:bg-raised sm:p-9">
              <span className="font-display text-2xl italic text-accent">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-fg sm:text-2xl">{p.title}</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{p.line}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ───────────────────────── Team ───────────────────────── */
export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-20 overflow-hidden pb-6 pt-16 sm:pb-8 sm:pt-20 lg:pb-10 lg:pt-28">
      <Container>
        <Label>{team.label}</Label>
        <SectionHeading id="team-title">{team.heading}</SectionHeading>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{team.sub}</p>
      </Container>
      <TeamOrbit members={team.members} />
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
export function Faq({ items = faq.items, heading = faq.heading, className = "" }: { items?: { q: string; a: string }[]; heading?: string; className?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`scroll-mt-20 py-16 sm:py-20 lg:py-28 ${className}`}>
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Label>{faq.label}</Label>
          <SectionHeading id="faq-title">{heading}</SectionHeading>
        </div>
        {/* Native <details> = accessible accordion with zero JavaScript */}
        <div className="divide-y divide-line border-y border-line">
          {items.map((item, i) => (
            <details key={item.q} data-reveal style={d(i, 70)} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-fg sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-all duration-300 group-open:rotate-45 group-open:border-accent group-open:bg-lime group-open:text-ink">
                  <Icon name="plus" className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 text-[15px] leading-relaxed text-muted">
                <T>{item.a}</T>
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── Contact form ───────────────────────── */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line bg-surface py-16 sm:py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Label>{contact.label}</Label>
          <SectionHeading id="contact-title">{contact.heading}</SectionHeading>
          <p data-reveal style={d(0, 0, 180)} className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            <T>{contact.sub}</T>
          </p>
        </div>
        <div data-reveal style={d(0, 0, 150)}>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div data-reveal="pop" className="relative mx-auto max-w-site overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center sm:px-10 lg:py-24">
        <Glow className="bottom-[-60%] left-1/2 h-[600px] w-[900px] max-w-[200vw] -translate-x-1/2" />
        <div className="relative">
          <h2 id="cta-title" className="mx-auto max-w-3xl font-display text-[2.6rem] leading-[1.02] tracking-tight text-fg sm:text-7xl">
            <Accent text={finalCta.heading} />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{finalCta.sub}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappLink()} {...linkProps(whatsappLink())} className={`${btn.base} ${btn.lime} !px-8 !py-4 text-base`}>
              <MsgIcon />
              {hasWhatsApp ? finalCta.whatsapp : finalCta.whatsappFallback}
            </a>
            <a href={bookingLink} {...linkProps(bookingLink)} className={`${btn.base} ${btn.ghost} !px-8 !py-4 text-base`}>
              <Icon name="calendar" />
              {finalCta.call}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
/** "Follow us" icon row. Unfilled profiles show faded in development and are hidden on the live site. */
function SocialLinks() {
  const dev = globalThis.process?.env?.NODE_ENV !== "production"; // ("process" is the How-it-works content here)
  const items = (dev ? socials : liveSocials).map((s) => ({ ...s, live: liveSocials.includes(s) }));
  if (!items.length) return null;
  return (
    <div className="mt-8">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-fg">{footer.followTitle}</p>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {items.map((s) => (
          <li key={s.name}>
            {s.live ? (
              <a
                href={s.url}
                {...linkProps(s.url)}
                aria-label={`${brand.name} on ${s.name}`}
                title={s.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-lime hover:bg-lime hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
              </a>
            ) : (
              <span title={`${s.name}: add the link in content/site.ts`} className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-fg/25 text-fg/35">
                <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 pt-16 sm:pb-16">
      <Container className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <a href="/" className="font-display text-3xl tracking-tight text-fg">
            {brand.name}
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
          </a>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">{brand.footerLine}</p>
          <SocialLinks />
        </div>
        <nav aria-label="Footer">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-fg">{footer.quickLinksTitle}</h2>
          <ul className="mt-4 space-y-3">
            {[...nav.links, { label: "Contact", href: "/#contact" }].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-muted transition-colors hover:text-accent">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Services">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-fg">Services</h2>
          <ul className="mt-4 space-y-3">
            {servicePages.map((p) => (
              <li key={p.slug}>
                <Link href={`/services/${p.slug}`} className="text-[15px] text-muted transition-colors hover:text-accent">{p.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-fg">{footer.contactTitle}</h2>
          <ul className="mt-4 space-y-3 text-[15px] text-muted">
            {allWhatsAppNumbers.map((n) => (
              <li key={n}>
                <a href={whatsappLinkFor(n)} {...linkProps(whatsappLinkFor(n))} className="inline-flex items-center gap-2 hover:text-accent">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp: {formatPhone(n)}
                </a>
              </li>
            ))}
            {hasEmail && (
              <li>
                <a href={mailtoLink()} className="inline-flex items-center gap-2 hover:text-accent">
                  <Icon name="mail" className="h-4 w-4" /> Email: {EMAIL}
                </a>
              </li>
            )}
            {!hasWhatsApp && !hasEmail && (
              <li>
                <a href="/#contact" className="inline-flex items-center gap-2 hover:text-accent">
                  <Icon name="arrow" className="h-4 w-4" /> Send us your project details
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <Container>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-accent">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

/* ───────────────────────── Home page (all sections, in order) ───────────────────────── */
export function HomeSections() {
  return (
    <>
      <Hero />
      <ServiceRing />
      <Problem />
      <Ways />
      <Offer />
      <Services />
      <Process />
      <Pricing />
      <Work />
      <Why />
      <Team />
      <Faq className="pt-10 sm:pt-12 lg:pt-16" />
      <Contact />
      <FinalCta />
    </>
  );
}

/* ───────────────────────── Floating WhatsApp ───────────────────────── */
export function FloatingWhatsApp() {
  if (!hasWhatsApp) return null;
  return (
    <a
      href={whatsappLink()}
      {...linkProps(whatsappLink())}
      aria-label="Chat with WeMakeIt on WhatsApp"
      className="ping-ring fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink shadow-[0_0_40px_-6px_rgba(198,244,50,0.7)] transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
