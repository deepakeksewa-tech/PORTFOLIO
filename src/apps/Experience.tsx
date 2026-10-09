import { resume } from '../data/resume';

export default function Experience() {
  return (
    <ol className="space-y-6 p-5 md:p-7">
      {resume.experience.map((j) => (
        <li key={j.org} className="relative border-l border-white/15 pl-5">
          <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-sky-400" aria-hidden />
          <h3 className="text-lg font-semibold">{j.role}</h3>
          <p className="text-white/80">{j.org}</p>
          <p className="text-sm text-white/50">{j.period} · {j.location}</p>
          {j.mentor && <p className="mt-1 text-sm text-white/60">Mentor: {j.mentor}</p>}
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-white/80">{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </li>
      ))}
    </ol>
  );
}
