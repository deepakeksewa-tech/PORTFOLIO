import { resume } from '../data/resume';
import { useDesktop } from '../store/desktop';
import { Card, Chip, btnGhost, btnPrimary } from '../components/ui';

export default function About() {
  const { openApp } = useDesktop();
  const e = resume.education;
  return (
    <div className="space-y-5 p-5 md:p-7">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-fuchsia-500 text-xl font-bold text-white" aria-hidden>DM</div>
        <div>
          <h1 className="text-2xl font-semibold">{resume.name}</h1>
          <div className="mt-2 flex flex-wrap gap-1.5">{resume.roles.map((r) => <Chip key={r}>{r}</Chip>)}</div>
        </div>
      </div>
      <p className="leading-relaxed text-white/80">{resume.summary}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Education">
          <p className="font-medium">{e.school}</p>
          <p className="text-sm text-white/70">{e.degree}</p>
          <p className="text-sm text-white/70">{e.period} · CGPA {e.cgpa}</p>
        </Card>
        <Card title="Achievements">
          <ul className="list-disc space-y-1 pl-4 text-sm text-white/80">{resume.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
        </Card>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className={btnPrimary} onClick={() => openApp('projects')}>View projects</button>
        <button className={btnGhost} onClick={() => openApp('assistant')}>Ask the assistant</button>
        <button className={btnGhost} onClick={() => openApp('contact')}>Contact</button>
      </div>
    </div>
  );
}
