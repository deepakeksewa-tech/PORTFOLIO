import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { resume } from '../data/resume';
import { LINKS } from '../config';
import { useDesktop } from '../store/desktop';
import { Card, btnGhost, btnPrimary } from '../components/ui';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
const field = 'focus-ring w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-white/30';

export default function Contact() {
  const { openLink } = useDesktop();
  const [v, setV] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (!v.name.trim()) err.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) err.email = 'Please enter a valid email address.';
    if (v.message.trim().length < 10) err.message = 'Message should be at least 10 characters.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${v.name.trim()}`);
    const body = encodeURIComponent(`${v.message.trim()}\n\n— ${v.name.trim()} (${v.email.trim()})`);
    setDone(true);
    window.location.href = `mailto:${resume.email}?subject=${subject}&body=${body}`;
  };

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => { setDone(false); setV({ ...v, [k]: e.target.value }); };

  return (
    <div className="grid gap-5 p-5 md:grid-cols-[220px_1fr] md:p-7">
      <div className="space-y-2">
        <a className={`${btnGhost} w-full justify-start`} href={`mailto:${resume.email}`}><Mail className="h-4 w-4" />{resume.email}</a>
        <a className={`${btnGhost} w-full justify-start`} href={`tel:${resume.phone.replace(/[^+\d]/g, '')}`}><Phone className="h-4 w-4" />{resume.phone}</a>
        <button className={`${btnGhost} w-full justify-start`} onClick={() => openLink('github')}><Github className="h-4 w-4" />GitHub{LINKS.github ? '' : ' (not set)'}</button>
        <button className={`${btnGhost} w-full justify-start`} onClick={() => openLink('linkedin')}><Linkedin className="h-4 w-4" />LinkedIn{LINKS.linkedin ? '' : ' (not set)'}</button>
      </div>
      <Card title="Send a message">
        <form onSubmit={submit} noValidate className="space-y-3">
          {(['name', 'email', 'message'] as const).map((k) => (
            <div key={k}>
              <label htmlFor={`c-${k}`} className="mb-1 block text-sm capitalize text-white/70">{k}</label>
              {k === 'message'
                ? <textarea id={`c-${k}`} rows={5} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={`e-${k}`} className={field} />
                : <input id={`c-${k}`} type={k === 'email' ? 'email' : 'text'} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={`e-${k}`} className={field} />}
              <p id={`e-${k}`} className="mt-1 min-h-4 text-xs text-rose-300">{errors[k]}</p>
            </div>
          ))}
          <button type="submit" className={btnPrimary}><Send className="h-4 w-4" />Open in email app</button>
          {done && (
            <p role="status" className="text-sm text-white/70">
              Your email app should open with the message prefilled — nothing is sent until you press Send there. If it doesn't open, email {resume.email} directly.
            </p>
          )}
        </form>
      </Card>
    </div>
  );
}
