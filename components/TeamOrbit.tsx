"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { hasWhatsApp, linkProps, whatsappLink, whatsappLinkFor } from "@/content/site";
import { Icon, WhatsAppIcon } from "./Icon";

type Member = { name: string; shortName: string; whatsapp?: string; role: string; photo: string; bio: string; skills: { label: string; slug?: string }[] };

// One accent per person (brand lime first), as "R G B" for rgb(var(--c) / a).
const ACCENTS = ["198 244 50", "255 185 56", "94 234 212", "244 114 182"];
const SLOTS = 8; // 8 places on the circle, 45° apart; each member appears twice so the ring loops
const STEP = 360 / SLOTS;
const VISIBLE_SKILLS = 6; // 4 on phones, where cards are narrower

const initials = (name: string) => {
  const w = name.split(" ").filter(Boolean);
  return (w[0][0] + w[w.length - 1][0]).toUpperCase();
};
/** How far slot i is from facing the viewer, in degrees (−180…180). */
const offset = (i: number, angle: number) => ((((i * STEP + angle) % 360) + 540) % 360) - 180;

/**
 * Team section as a 3D ring: cards stand on a glowing circular path, and swiping, dragging,
 * the arrows or the keyboard rotates the ring to bring the next person to the front.
 * Auto-rotates while in view until the visitor interacts. Reduced motion: no auto-rotate or animation.
 */
export function TeamOrbit({ members }: { members: Member[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const angleRef = useRef(0);
  angleRef.current = angle;
  const auto = useRef<ReturnType<typeof setInterval> | null>(null);
  const moved = useRef(false);
  const [reduce, setReduce] = useState(false);
  const [visible, setVisible] = useState(VISIBLE_SKILLS);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setVisible(mq.matches ? 4 : VISIBLE_SKILLS);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const front = ((Math.round(-angle / STEP) % SLOTS) + SLOTS) % SLOTS;
  const frontMember = front % members.length;

  const stopAuto = useCallback(() => {
    if (auto.current) clearInterval(auto.current);
    auto.current = null;
  }, []);
  const snap = (a: number) => Math.round(a / STEP) * STEP;
  const rotateBy = useCallback((steps: number) => setAngle((a) => snap(a) - steps * STEP), []);
  const goToSlot = (i: number) => {
    const a = angleRef.current;
    setAngle(a - offset(i, a));
  };
  const goToMember = (m: number) => {
    const a = angleRef.current;
    let best = Infinity;
    for (let i = m; i < SLOTS; i += members.length) {
      const d = offset(i, a);
      if (Math.abs(d) < Math.abs(best)) best = d;
    }
    setAngle(a - best);
  };

  // Auto-rotate only while the section is on screen, and never with reduced motion.
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interacted = false;
    const start = () => {
      if (interacted || auto.current) return;
      auto.current = setInterval(() => { if (!document.hidden) rotateBy(1); }, 4200);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stopAuto()), { threshold: 0.35 });
    io.observe(el);
    const stop = () => { interacted = true; stopAuto(); };
    el.addEventListener("pointerdown", stop);
    el.addEventListener("keydown", stop);
    el.addEventListener("focusin", stop);
    return () => { io.disconnect(); stopAuto(); el.removeEventListener("pointerdown", stop); el.removeEventListener("keydown", stop); el.removeEventListener("focusin", stop); };
  }, [rotateBy, stopAuto]);

  // Trackpad two-finger swipe / horizontal mouse wheel: the ring follows, then snaps when the gesture stops.
  // Vertical scrolling is left alone so the page still scrolls normally.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX; // Shift + wheel = horizontal on mice
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY) || Math.abs(dx) < 1) return;
      e.preventDefault();
      stopAuto();
      const width = el.querySelector<HTMLElement>(".orbit-ring")?.offsetWidth || 340;
      const px = e.deltaMode === 1 ? dx * 16 : dx; // line-based wheels report lines, not pixels
      setDragging(true);
      setAngle((a) => a - px * (STEP / (width * 0.9)));
      clearTimeout(idle);
      idle = setTimeout(() => { setDragging(false); setAngle((a) => snap(a)); }, 140);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => { el.removeEventListener("wheel", onWheel); clearTimeout(idle); };
  }, [stopAuto]);

  // Drag / swipe: the ring follows the pointer, then snaps to the nearest card.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const startX = e.clientX, startAngle = angleRef.current;
    const width = stage.current?.querySelector<HTMLElement>(".orbit-ring")?.offsetWidth || 340;
    moved.current = false;
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (!moved.current && Math.abs(dx) < 6) return;
      moved.current = true;
      setDragging(true);
      setAngle(startAngle + dx * (STEP / (width * 0.9)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      setDragging(false);
      setAngle((a) => snap(a));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const m = members[frontMember];

  return (
    <div className="mt-6 sm:mt-10">
      <div
        ref={stage}
        className={`orbit-stage ${dragging ? "is-dragging" : ""}`}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Team members. Use the left and right arrow keys to rotate."
        onPointerDown={onPointerDown}
        onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false; } }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); rotateBy(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); rotateBy(-1); }
        }}
      >
        <div
          className="orbit-ring"
          style={{
            transform: `translateZ(calc(var(--r) * -1)) rotateY(${angle}deg)`,
            transition: dragging || reduce ? "none" : "transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="orbit-path" aria-hidden="true">
            {Array.from({ length: SLOTS }).map((_, i) => (
              <span key={i} className="orbit-node" style={{ transform: `rotate(${i * STEP}deg) translateY(calc(var(--r) * -1 - 24px))` }} />
            ))}
          </div>

          {Array.from({ length: SLOTS }).map((_, i) => {
            const member = members[i % members.length];
            const c = ACCENTS[(i % members.length) % ACCENTS.length];
            const t = Math.min(Math.abs(offset(i, angle)) / 90, 1); // 0 = front, 1 = side
            const isFront = i === front;
            const skills = member.skills.slice(0, visible);
            const expanded = !!open[member.name];
            // A member's own number (if set) gets a direct message; otherwise the main business number.
            const talk = member.whatsapp && /^\d{8,15}$/.test(member.whatsapp)
              ? whatsappLinkFor(member.whatsapp, `Hi ${member.shortName}, I found you on the WeMakeIt website and would like to talk about my business`)
              : whatsappLink(`Hi WeMakeIt, I'd like to talk to ${member.name} about my business`);
            return (
              <div
                key={i}
                className="orbit-slot"
                style={{ "--i": i, opacity: 1 - t * 0.5, filter: t > 0.05 ? `saturate(${1 - t * 0.5}) brightness(${1 - t * 0.3})` : "none" } as React.CSSProperties}
                aria-hidden={!isFront}
              >
                {!isFront && (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute inset-0 z-10 cursor-pointer rounded-[1.9rem]"
                    onClick={() => { if (!moved.current) { stopAuto(); goToSlot(i); } }}
                  />
                )}
                <article inert={!isFront} className={`tcard ${isFront ? "is-front" : ""}`} style={{ "--c": c } as React.CSSProperties}>
                  <div className="tcard-inner">
                    <span className="tcard-watermark" aria-hidden="true">{initials(member.name)}</span>

                    {/* All skills: slides up over the card so nothing gets squeezed */}
                    <div
                      id={`skills-${i}`}
                      role="dialog"
                      aria-label={`${member.name}'s skills`}
                      aria-hidden={!expanded}
                      inert={!expanded}
                      className={`absolute inset-0 z-20 flex flex-col bg-[radial-gradient(90%_50%_at_100%_0%,rgb(var(--c)/0.22),transparent_60%),rgb(var(--surface)/0.97)] px-7 pb-6 pt-7 backdrop-blur-xl transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        expanded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Expertise</p>
                          <p className="mt-1 font-display text-[1.6rem] leading-tight text-fg">{member.shortName}&apos;s skills</p>
                          <p className="mt-0.5 text-[13px] tabular-nums text-muted">{member.skills.length} skills</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setOpen((o) => ({ ...o, [member.name]: false })); }}
                          aria-label={`Close ${member.shortName}'s skills`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fg/15 text-fg transition-colors hover:border-[rgb(var(--c)/0.8)] hover:bg-[rgb(var(--c))] hover:text-ink"
                        >
                          <Icon name="plus" className="h-4 w-4 rotate-45" />
                        </button>
                      </div>
                      <ul className="mt-4 flex min-h-0 flex-1 flex-wrap content-start gap-1.5 overflow-y-auto overscroll-contain pb-6 pr-1 [mask-image:linear-gradient(to_bottom,black_calc(100%-28px),transparent)] [scrollbar-width:thin]">
                        {member.skills.map((sk) => (
                          <li key={sk.label}>
                            {sk.slug ? (
                              <Link
                                href={`/services/${sk.slug}`}
                                draggable={false}
                                className="inline-flex rounded-lg border border-fg/10 bg-fg/[0.04] px-2.5 py-1 text-[12px] font-medium text-fg/90 transition-colors hover:border-[rgb(var(--c)/0.7)] hover:text-fg"
                              >
                                {sk.label}
                              </Link>
                            ) : (
                              <span className="inline-flex rounded-lg border border-fg/10 bg-fg/[0.04] px-2.5 py-1 text-[12px] font-medium text-fg/90">{sk.label}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={talk}
                        {...linkProps(talk)}
                        draggable={false}
                        className="mt-5 flex items-center justify-between rounded-2xl bg-[rgb(var(--c))] px-4 py-3 text-[14px] font-semibold text-ink transition-opacity hover:opacity-90"
                      >
                        <span className="inline-flex items-center gap-2.5">
                          {hasWhatsApp ? <WhatsAppIcon className="h-4 w-4" /> : <Icon name="mail" className="h-4 w-4" />}
                          Talk to {member.shortName}
                        </span>
                        <Icon name="arrowUpRight" className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="relative flex items-start justify-between gap-4 px-7 pt-7">
                      <div className="tcard-avatar">
                        {member.photo ? (
                          <Image src={member.photo} alt={`Photo of ${member.name}`} width={70} height={70} className="object-cover" draggable={false} />
                        ) : (
                          <span aria-hidden="true" className="flex items-center justify-center font-display text-[1.9rem] text-ink" style={{ background: `rgb(${c})` }}>
                            {initials(member.name)}
                          </span>
                        )}
                      </div>
                      <span className="mt-1 rounded-full border border-fg/10 bg-canvas/60 px-3 py-1 text-[11px] font-medium tabular-nums text-fg/75 backdrop-blur">
                        {member.skills.length} skills
                      </span>
                    </div>

                    <div className="relative flex flex-1 flex-col px-7 pb-6 pt-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: `rgb(${c})` }}>
                        <span className="dark:hidden" style={{ color: "rgb(var(--accent))" }}>{member.role}</span>
                        <span className="hidden dark:inline">{member.role}</span>
                      </p>
                      <h3 className="mt-2 font-display text-[2.15rem] leading-[1.02] tracking-tight text-fg">{member.name}</h3>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{member.bio}</p>

                      <div className="mt-5 flex items-center gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/50">Expertise</span>
                        <span className="h-px flex-1 bg-[linear-gradient(90deg,rgb(var(--c)/0.6),transparent)]" />
                      </div>
                      <ul className="mt-3 flex shrink-0 flex-wrap content-start gap-1.5" aria-label={`${member.name}'s top skills`}>
                        {skills.map((sk) => (
                          <li key={sk.label}>
                            {sk.slug ? (
                              <Link
                                href={`/services/${sk.slug}`}
                                draggable={false}
                                className="inline-flex rounded-lg border border-fg/10 bg-fg/[0.03] px-2.5 py-1 text-[12px] font-medium text-fg/85 transition-colors hover:border-[rgb(var(--c)/0.7)] hover:text-fg"
                              >
                                {sk.label}
                              </Link>
                            ) : (
                              <span className="inline-flex rounded-lg border border-fg/10 bg-fg/[0.03] px-2.5 py-1 text-[12px] font-medium text-fg/85">{sk.label}</span>
                            )}
                          </li>
                        ))}
                        {member.skills.length > visible && (
                          <li>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setOpen((o) => ({ ...o, [member.name]: true })); }}
                              aria-expanded={expanded}
                              aria-controls={`skills-${i}`}
                              className="inline-flex rounded-lg border border-[rgb(var(--c)/0.6)] px-2.5 py-1 text-[12px] font-semibold text-fg transition-colors hover:bg-[rgb(var(--c))] hover:text-ink"
                            >
                              +{member.skills.length - visible} more
                            </button>
                          </li>
                        )}
                      </ul>

                      <div className="mt-auto border-t border-fg/10 pt-5">
                        <a
                          href={talk}
                          {...linkProps(talk)}
                          draggable={false}
                          className="group/cta flex items-center justify-between rounded-2xl border border-fg/10 bg-fg/[0.03] px-4 py-3 text-[14px] font-semibold text-fg transition-colors hover:border-[rgb(var(--c)/0.8)] hover:bg-[rgb(var(--c)/0.12)]"
                        >
                          <span className="inline-flex items-center gap-2.5">
                            {hasWhatsApp ? <WhatsAppIcon className="h-4 w-4" /> : <Icon name="mail" className="h-4 w-4" />}
                            Talk to {member.shortName}
                          </span>
                          <Icon name="arrowUpRight" className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => { stopAuto(); rotateBy(-1); }}
          aria-label="Previous team member"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-accent/60 hover:text-accent"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {members.map((mm, i) => (
            <button
              key={mm.name}
              type="button"
              onClick={() => { stopAuto(); goToMember(i); }}
              aria-label={`Show ${mm.name}`}
              aria-current={frontMember === i ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${frontMember === i ? "w-8 bg-lime" : "w-2.5 bg-fg/20 hover:bg-fg/40"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => { stopAuto(); rotateBy(1); }}
          aria-label="Next team member"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-accent/60 hover:text-accent"
        >
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-muted" aria-live="polite">
        <span className="font-semibold text-fg">{m.name}</span> · {m.role}
      </p>
    </div>
  );
}
