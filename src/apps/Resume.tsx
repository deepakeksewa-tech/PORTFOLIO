import { useEffect, useState } from 'react';
import { AlertTriangle, Download, ExternalLink } from 'lucide-react';
import { resume as r } from '../data/resume';
import { LINKS } from '../config';
import { btn, btnGhost, btnPrimary } from '../components/ui';

export default function Resume() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(LINKS.resumePdf, { method: 'HEAD' })
      .then((res) => alive && setAvailable(res.ok && (res.headers.get('content-type') ?? '').includes('pdf')))
      .catch(() => alive && setAvailable(false));
    return () => { alive = false; };
  }, []);

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        {available ? (
          <>
            <a href={LINKS.resumePdf} download="Deepak_Mahajan_Resume.pdf" className={btnPrimary}><Download className="h-4 w-4" />Download Resume</a>
            <a href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer" className={btnGhost}><ExternalLink className="h-4 w-4" />Open PDF</a>
          </>
        ) : (
          <>
            <button disabled className={`${btn} bg-sky-500 text-white`}><Download className="h-4 w-4" />Download Resume</button>
            <button disabled className={`${btn} border border-white/15 bg-white/5`}><ExternalLink className="h-4 w-4" />Open PDF</button>
          </>
        )}
      </div>
      {available === false && (
        <div role="status" className="flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>The resume PDF wasn't found at <code className="rounded bg-black/30 px-1">public{LINKS.resumePdf}</code>. Add the file there (or change <code className="rounded bg-black/30 px-1">LINKS.resumePdf</code> in src/config.ts) to enable the buttons. The preview below is generated from the portfolio data.</p>
        </div>
      )}
      <article className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 text-[13px] leading-relaxed text-neutral-800 shadow-xl md:p-8">
        <header className="border-b border-neutral-300 pb-3">
          <h1 className="text-2xl font-bold text-neutral-900">{r.name}</h1>
          <p className="text-neutral-600">{r.roles.join(' | ')}</p>
          <p className="text-neutral-600">{r.email} · {r.phone}</p>
        </header>
        <Sec t="Profile"><p>{r.summary}</p></Sec>
        <Sec t="Experience">
          {r.experience.map((j) => (
            <div key={j.org} className="mb-2">
              <p className="font-semibold">{j.role} — {j.org}</p>
              <p className="text-neutral-500">{j.period} | {j.location}{j.mentor ? ` | Mentor: ${j.mentor}` : ''}</p>
              <ul className="list-disc pl-5">{j.points.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </Sec>
        <Sec t="Projects">
          {r.projects.map((p) => (
            <div key={p.id} className="mb-2">
              <p className="font-semibold">{p.name}</p>
              <p className="text-neutral-500">{p.stack.join(', ')}</p>
              <ul className="list-disc pl-5">{p.highlights.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </Sec>
        <Sec t="Technical Skills">{r.skills.map((g) => <p key={g.title}><b>{g.title}:</b> {g.items.join(', ')}</p>)}</Sec>
        <Sec t="Achievements"><ul className="list-disc pl-5">{r.achievements.map((x) => <li key={x}>{x}</li>)}</ul></Sec>
        <Sec t="Education"><p className="font-semibold">{r.education.school}</p><p>{r.education.degree} · {r.education.period} · CGPA {r.education.cgpa}</p></Sec>
      </article>
    </div>
  );
}

const Sec = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <section><h2 className="mb-1 border-b border-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-500">{t}</h2>{children}</section>
);
