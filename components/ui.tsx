import type { ReactNode } from "react";

// Shared button styles — real <a> links, since every CTA navigates somewhere.
export const btn = {
  base: "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  lime: "shine bg-lime text-ink hover:-translate-y-0.5 hover:shadow-[0_0_36px_-6px_rgba(198,244,50,0.65)]",
  ghost: "border border-fg/15 bg-fg/[0.04] text-fg hover:border-fg/40 hover:bg-fg/10",
};

/** Turns "*word*" in a heading into lime italics, e.g. "Recent *projects*." */
export function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={i} className="text-accent">{part.slice(1, -1)}</em>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <p data-reveal className="mb-5 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_rgba(198,244,50,0.9)]" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({ id, children }: { id?: string; children: string }) {
  return (
    <h2 id={id} data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="max-w-3xl font-display text-[2.4rem] leading-[1.05] tracking-tight text-fg sm:text-[3.4rem]">
      <Accent text={children} />
    </h2>
  );
}
