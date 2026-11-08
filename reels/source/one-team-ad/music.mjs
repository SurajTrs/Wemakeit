// Synthesises an original 20s backing track (no samples, no licensing).
// Usage: node music.mjs out.wav
import fs from "fs";
const SR = 48000, DUR = 20, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
const BPM = 112, beat = 60 / BPM, bar = beat * 4;
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const add = (i, l, r = l) => { if (i >= 0 && i < N) { L[i] += l; R[i] += r; } };

// Chords (Fmaj7 – Am7 – Dm9 – Bbmaj7), warm and modern
const chords = [[53, 57, 60, 64], [57, 60, 64, 67], [50, 57, 60, 64], [46, 53, 57, 62]];
const chordAt = (t) => chords[Math.floor(t / bar) % 4];

// ── pad: detuned saws through a simple 1-pole lowpass, swelling in
function pad() {
  const st = [0, 0];
  for (let i = 0; i < N; i++) {
    const t = i / SR, ch = chordAt(t), bt = (t % bar) / bar;
    let s = 0;
    for (const m of ch) for (const d of [-0.07, 0.07]) {
      const f = mtof(m + d); s += ((t * f) % 1) * 2 - 1;
    }
    s /= 8;
    const env = Math.min(1, bt * 6) * (0.75 + 0.25 * Math.cos(bt * Math.PI * 2 * 0)) ;
    const intro = Math.min(1, t / 1.5), outro = Math.min(1, (DUR - t) / 1.2);
    const cut = 0.035 + 0.03 * Math.min(1, t / 8); // filter opens over time
    st[0] += cut * (s - st[0]); st[1] += cut * (st[0] - st[1]);
    const v = st[1] * 0.22 * env * intro * outro;
    add(i, v * 0.95, v * 1.05);
  }
}

// ── pluck arpeggio (8ths) from scene 2 onwards, with ping-pong delay
function pluck() {
  const dl = Math.round(beat * 0.75 * SR), bufL = new Float32Array(N), bufR = new Float32Array(N);
  const pattern = [0, 2, 1, 3, 2, 1, 3, 2];
  for (let k = 0; k * beat / 2 < DUR; k++) {
    const t0 = k * beat / 2; if (t0 < 4) continue;
    const ch = chordAt(t0), m = ch[pattern[k % 8]] + 12, f = mtof(m);
    const vel = (k % 2 ? 0.6 : 1) * (t0 > 14 && t0 < 18 ? 1.1 : 0.9);
    for (let j = 0; j < SR * 0.5; j++) {
      const t = j / SR, e = Math.exp(-t * 9);
      const s = (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t) * Math.exp(-t * 20)) * e * 0.085 * vel;
      const i = Math.round(t0 * SR) + j; if (i < N) { bufL[i] += s; bufR[i] += s; }
    }
  }
  for (let i = 0; i < N; i++) {
    const outro = Math.min(1, (DUR - i / SR) / 1.2);
    if (i >= dl) { bufR[i] += bufL[i - dl] * 0.35; bufL[i] += bufR[i - dl] * 0.3; }
    add(i, bufL[i] * outro, bufR[i] * outro);
  }
}

// ── drums: soft kick 4-on-floor from 4s (half-time in scene 1), hats, clap on 2/4 in scene 3+
function drums() {
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const kick = (t0, g) => { for (let j = 0; j < SR * 0.35; j++) { const t = j / SR, f = 48 + 90 * Math.exp(-t * 28);
    const ph = 2 * Math.PI * (48 * t + (90 / 28) * (1 - Math.exp(-t * 28))); add(Math.round(t0 * SR) + j, Math.sin(ph) * Math.exp(-t * 9) * g); void f; } };
  const hat = (t0, g, pan) => { let hp = 0, prev = 0; for (let j = 0; j < SR * 0.06; j++) { const n = rnd(); hp = 0.9 * (hp + n - prev); prev = n;
    const v = hp * Math.exp(-j / SR * 70) * g; add(Math.round(t0 * SR) + j, v * (1 - pan), v * (1 + pan)); } };
  const clap = (t0, g) => { let lp = 0; for (let j = 0; j < SR * 0.18; j++) { const t = j / SR; lp += 0.35 * (rnd() - lp);
    const e = Math.exp(-t * 22) * (t < 0.02 ? (Math.floor(t * 300) % 2 ? 0.5 : 1) : 1); add(Math.round(t0 * SR) + j, lp * e * g * 1.4); } };
  for (let b = 0; b * beat < DUR - 1; b++) {
    const t = b * beat;
    if (t < 4) { if (b % 2 === 0) kick(t, 0.38); }
    else if (t < 18.6) kick(t, 0.5);
    if (t >= 2 && t < 18.6) { hat(t + beat / 2, 0.12, 0.2); if (t >= 8) hat(t + beat * 0.75, 0.05, -0.3); }
    if (t >= 8 && t < 18.6 && b % 2 === 1) clap(t, 0.16);
  }
}

// ── transition swells/impacts at scene changes (4, 8, 14, 18)
function fx() {
  for (const tc of [4, 8, 14, 18]) {
    let lp = 0, seed = tc * 99; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
    for (let j = -SR * 0.8; j < 0; j++) { const p = 1 + j / (SR * 0.8); lp += (0.02 + 0.3 * p * p) * (rnd() - lp);
      add(Math.round(tc * SR) + j, lp * p * p * 0.08); }
    for (let j = 0; j < SR * 1.2; j++) { const t = j / SR; add(Math.round(tc * SR) + j, Math.sin(2 * Math.PI * 41 * t) * Math.exp(-t * 4) * 0.22); }
  }
  // final shimmer on logo
  for (const m of [77, 81, 84, 88]) for (let j = 0; j < SR * 1.9; j++) { const t = j / SR;
    add(Math.round(18.05 * SR) + j, Math.sin(2 * Math.PI * mtof(m) * t) * Math.exp(-t * 2.2) * 0.03 * Math.min(1, t * 40), Math.sin(2 * Math.PI * mtof(m) * 1.003 * t) * Math.exp(-t * 2.2) * 0.03 * Math.min(1, t * 40)); }
}

pad(); pluck(); drums(); fx();

// normalise + soft clip + write 16-bit WAV
let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const g = 0.9 / peak, buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(Math.tanh(L[i] * g) * 32000), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.tanh(R[i] * g) * 32000), 46 + i * 4);
}
fs.writeFileSync(process.argv[2] || "music.wav", buf);
