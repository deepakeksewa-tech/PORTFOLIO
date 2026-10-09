import type { ReactNode } from 'react';

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-white/85">{children}</span>
);

export const Card = ({ title, children }: { title?: string; children: ReactNode }) => (
  <section className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
    {title && <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">{title}</h3>}
    {children}
  </section>
);

export const btn =
  'focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40';
export const btnPrimary = `${btn} bg-sky-500 text-white hover:bg-sky-400`;
export const btnGhost = `${btn} border border-white/15 bg-white/5 text-white/90 hover:bg-white/10`;
