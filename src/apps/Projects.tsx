import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, Github, HeartPulse, LineChart, PenLine } from 'lucide-react';
import { resume } from '../data/resume';
import { LINKS } from '../config';
import { useDesktop } from '../store/desktop';
import { Chip, btn, btnGhost, btnPrimary } from '../components/ui';

const ICONS = { heart: HeartPulse, pen: PenLine, chart: LineChart };

export default function Projects() {
  const { state } = useDesktop();
  const [sel, setSel] = useState(state.projectFocus ?? resume.projects[0].id);
  useEffect(() => { if (state.projectFocus) setSel(state.projectFocus); }, [state.projectFocus]);

  const p = resume.projects.find((x) => x.id === sel) ?? resume.projects[0];
  const links = LINKS.projects[p.id] ?? { live: '', source: '' };
  const Icon = ICONS[p.preview.icon];

  const action = (url: string, label: string, primary: boolean, I: typeof ExternalLink) =>
    url ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className={primary ? btnPrimary : btnGhost}><I className="h-4 w-4" />{label}</a>
    ) : (
      <button disabled className={`${btn} border border-white/10 bg-white/5`} title="URL not configured yet — see src/config.ts"><I className="h-4 w-4" />{label} (not configured)</button>
    );

  return (
    <div className="flex h-full flex-col">
      <div role="tablist" aria-label="Projects" className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 p-2">
        {resume.projects.map((x) => (
          <button
            key={x.id} role="tab" aria-selected={x.id === p.id} onClick={() => setSel(x.id)}
            className={`focus-ring shrink-0 rounded-lg px-3 py-1.5 text-sm ${x.id === p.id ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10'}`}
          >
            {x.name.split(' — ')[0]}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 space-y-5 overflow-auto p-5 md:p-7" role="tabpanel">
        <div className={`flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br p-6 ${p.preview.gradient}`}>
          <Icon className="h-10 w-10 text-white/90" aria-hidden />
          <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Architecture overview">
            {p.preview.flow.map((f, i) => (
              <span key={f} className="flex items-center gap-2">
                <span className="rounded-lg border border-white/20 bg-black/30 px-3 py-1.5 text-sm">{f}</span>
                {i < p.preview.flow.length - 1 && <ArrowRight className="h-4 w-4 text-white/60" aria-hidden />}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{p.name}</h1>
          <p className="mt-1 text-white/70">{p.description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">{p.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-white/80">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        <div className="flex flex-wrap gap-2">
          {action(links.live, 'Live Demo', true, ExternalLink)}
          {action(links.source, 'Source Code', false, Github)}
        </div>
      </div>
    </div>
  );
}
