import type { CSSProperties } from "react";
import { services } from "@/content/site";
import { Icon } from "./Icon";

const items = services.items;

/** 3D rotating ring of service names under the hero. Pauses on hover; still for reduced-motion users. */
export function ServiceRing() {
  const n = items.length;
  const angle = 360 / n;
  return (
    <section aria-label="Our services" className="ring-wrap relative mt-6 flex h-[130px] items-center justify-center overflow-hidden sm:mt-10 sm:h-[200px]">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(198,244,50,0.12),transparent)]" />
      <div className="-mt-14 scale-[0.55] [perspective:1400px] sm:-mt-16 sm:scale-75 lg:-mt-24 lg:scale-100">
        <div className="ring-spin relative h-16 w-[300px]">
          {items.map((s, i) => (
            <span
              key={s.title}
              className="absolute inset-0 flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line bg-surface/90 font-display text-[1.6rem] text-fg shadow-sm [backface-visibility:hidden]"
              style={{ transform: `rotateY(${i * angle}deg) translateZ(470px)` } as CSSProperties}
            >
              <Icon name={s.icon} className="h-5 w-5 text-accent" />
              {i % 2 ? <em className="text-accent">{s.title}</em> : s.title}
            </span>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--canvas)),transparent_22%,transparent_78%,rgb(var(--canvas)))]" />
    </section>
  );
}
