import type { CSSProperties } from "react";
import { brand, problem } from "@/content/site";
import { Icon, WhatsAppIcon } from "./Icon";
import { Accent, Container, Label } from "./ui";

/** "The problem" section: question + answer beside a 3D phone showing the WeMakeIt WhatsApp group. */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const answer = problem.answer.replace("one accountable partner", "*one accountable partner*");

/** The question, with its second half quieter. */
function Question({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const [a, b] = problem.question.split(" who never");
  return (
    <h2 id="problem-title" data-reveal style={d(80)} className={`font-display leading-[1.06] tracking-tight ${dark ? "text-white" : "text-fg"} ${className}`}>
      {a} <em className={dark ? "text-white/45" : "text-muted"}>who never{b}</em>
    </h2>
  );
}

const ghosts = [
  { who: "Web developer", msg: "Will check tomorrow", seen: "Seen 2 days ago", pos: "left-0 top-6 -rotate-3" },
  { who: "Designer", msg: "That's not in my scope", seen: "Seen yesterday", pos: "right-0 top-28 rotate-2" },
  { who: "SEO guy", msg: "Ask the developer", seen: "Seen 4 days ago", pos: "left-4 bottom-24 rotate-2" },
  { who: "Ads person", msg: "Payment pending?", seen: "Seen last week", pos: "right-2 bottom-6 -rotate-2" },
];
const updates = [
  { me: false, text: "Homepage design is ready for your review", time: "10:02" },
  { me: true, text: "Looks great, go ahead", time: "10:15" },
  { me: false, text: "SEO setup done. Search Console verified", time: "16:40" },
  { me: false, text: "Ads go live tomorrow at 10 AM", time: "18:05" },
];
export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="overflow-hidden border-b border-line pb-8 pt-10 sm:pb-10 sm:pt-14 lg:pb-12 lg:pt-16">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <Label>{problem.label}</Label>
          <Question className="max-w-3xl text-[2.4rem] sm:text-[3.4rem]" />
          <div data-reveal style={d(200)} className="mt-10 border-l-2 border-lime pl-6">
            <p className="font-display text-3xl leading-snug text-fg sm:text-[2.2rem]">
              <Accent text={answer} />
            </p>
            <p className="mt-2 text-muted">{problem.answerSub}</p>
          </div>
        </div>

        <div data-reveal className="relative mx-auto h-[560px] w-full max-w-[30rem] [perspective:1600px]">
          {/* faded "seen, no reply" notifications */}
          {ghosts.map((g, i) => (
            <div key={g.who} className={`anim-float absolute z-0 hidden w-56 rounded-2xl border border-line bg-surface/70 p-3 opacity-60 shadow-sm blur-[0.3px] backdrop-blur sm:block ${g.pos}`} style={{ animationDelay: `${i * 0.8}s` }}>
              <p className="flex items-center justify-between text-xs font-semibold text-fg/70">
                {g.who}
                <span className="font-normal text-muted">{g.seen}</span>
              </p>
              <p className="mt-1 truncate text-xs text-muted">{g.msg}</p>
            </div>
          ))}

          {/* phone */}
          <div className="absolute left-1/2 top-1/2 z-10 h-[520px] w-[260px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] lg:[transform:translate(-50%,-50%)_rotateY(-14deg)_rotateX(4deg)]">
            <div className="h-full w-full overflow-hidden rounded-[2.6rem] border-[9px] border-[#111] bg-canvas shadow-[0_50px_100px_-30px_rgb(0_0_0/0.5),0_0_0_1px_rgb(255_255_255/0.06)]">
              <div className="relative flex h-full flex-col">
                <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#111]" />
                <div className="flex items-center gap-2.5 bg-lime px-4 pb-3 pt-9 text-ink">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-sm italic text-lime">W</span>
                  <span className="flex-1 leading-tight">
                    <span className="block text-[13px] font-semibold">{brand.name} × You</span>
                    <span className="block text-[10px] text-ink/65">One team · online</span>
                  </span>
                  <WhatsAppIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-2 bg-[radial-gradient(rgb(var(--fg)/0.05)_1px,transparent_1px)] bg-[size:12px_12px] p-3">
                  {updates.map((m, i) => (
                    <div key={i} data-reveal style={d(400 + i * 220)} className={`flex ${m.me ? "justify-end" : ""}`}>
                      <p className={`max-w-[88%] rounded-2xl px-3 py-1.5 text-[12px] leading-snug shadow-sm ${m.me ? "rounded-tr-sm bg-lime/45 text-fg" : "rounded-tl-sm bg-surface text-fg"}`}>
                        {m.text}
                        <span className="ml-1.5 inline-flex items-center gap-0.5 align-bottom text-[9px] text-muted">
                          {m.time}
                          {m.me && <Icon name="check" className="h-2.5 w-2.5 text-sky-500" strokeWidth={2.5} />}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="m-3 rounded-full border border-line bg-surface px-4 py-2 text-[11px] text-muted">Message</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
