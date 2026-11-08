"use client";

import { useEffect, useState } from "react";
import { brand, hasWhatsApp, linkProps, nav, whatsappLink } from "@/content/site";
import { Icon, WhatsAppIcon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { btn } from "./ui";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and lock body scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        scrolled || open ? "border-b border-line bg-canvas/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="/" className="font-display text-2xl tracking-tight text-fg lg:text-[1.7rem]" onClick={() => setOpen(false)}>
          {brand.name}
          <span className="ml-1 inline-block h-2 w-2 rounded-full bg-lime align-baseline" aria-hidden="true" />
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/70 px-2 py-1.5 lg:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-fg/5 hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={whatsappLink()} {...linkProps(whatsappLink())} className={`${btn.base} ${btn.lime} hidden !px-5 !py-2.5 sm:inline-flex`}>
            {hasWhatsApp && <WhatsAppIcon className="h-4 w-4" />}
            {hasWhatsApp ? nav.cta : nav.ctaFallback}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-canvas px-4 pb-10 pt-4 lg:hidden"
      >
        <ul className="flex flex-col">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-5 font-display text-3xl text-fg"
              >
                {l.label}
                <Icon name="arrow" className="h-5 w-5 text-accent" />
              </a>
            </li>
          ))}
        </ul>
        <a href={whatsappLink()} {...linkProps(whatsappLink())} className={`${btn.base} ${btn.lime} mt-8 w-full`}>
          {hasWhatsApp && <WhatsAppIcon />}
          {hasWhatsApp ? nav.cta : nav.ctaFallback}
        </a>
      </div>
    </header>
  );
}
