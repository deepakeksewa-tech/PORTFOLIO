import { useEffect, useState } from 'react';
import { Apple, Battery, SlidersHorizontal, Wifi } from 'lucide-react';
import { resume } from '../data/resume';
import { useDesktop } from '../store/desktop';

interface Item { label: string; run?: () => void; sep?: boolean }

export default function MenuBar() {
  const { openApp, closeAll, openLink } = useDesktop();
  const [menu, setMenu] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(t);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const menus: Record<string, Item[]> = {
    Portfolio: [
      { label: 'About Me', run: () => openApp('about') },
      { label: 'AI Assistant', run: () => openApp('assistant') },
      { label: 'Terminal', run: () => openApp('terminal') },
      { label: 'Resume', run: () => openApp('resume') },
      { label: '', sep: true },
      { label: 'Close all windows', run: closeAll },
    ],
    Projects: resume.projects.map((p) => ({ label: p.name, run: () => openApp('projects', { project: p.id }) })),
    Skills: [{ label: 'Technical Skills', run: () => openApp('skills') }],
    Experience: [
      { label: 'Internships', run: () => openApp('experience') },
      { label: 'Education & Achievements', run: () => openApp('about') },
    ],
    Contact: [
      { label: 'Contact form', run: () => openApp('contact') },
      { label: 'Send email', run: () => { window.location.href = `mailto:${resume.email}`; } },
      { label: 'GitHub', run: () => openLink('github') },
      { label: 'LinkedIn', run: () => openLink('linkedin') },
    ],
  };

  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <>
      {menu && <div className="fixed inset-0 z-[9998]" onClick={() => setMenu(null)} aria-hidden />}
      <header className="glass fixed inset-x-0 top-0 z-[9999] flex h-7 items-center justify-between border-x-0 border-t-0 px-3 text-[13px]">
        <nav aria-label="Menu bar" className="flex items-center gap-1">
          <Apple className="mr-2 h-4 w-4 fill-white" aria-hidden />
          <span className="mr-2 font-semibold">{resume.name}</span>
          {Object.entries(menus).map(([name, items]) => (
            <div key={name} className="relative hidden md:block">
              <button
                aria-haspopup="menu"
                aria-expanded={menu === name}
                onClick={() => setMenu(menu === name ? null : name)}
                onMouseEnter={() => menu && setMenu(name)}
                className={`focus-ring rounded px-2 py-0.5 hover:bg-white/15 ${menu === name ? 'bg-white/20' : ''}`}
              >
                {name}
              </button>
              {menu === name && (
                <ul role="menu" className="glass absolute left-0 top-7 z-[10000] min-w-52 rounded-lg p-1 shadow-2xl">
                  {items.map((it, i) =>
                    it.sep ? <li key={i} role="separator" className="my-1 h-px bg-white/10" /> : (
                      <li key={it.label} role="none">
                        <button
                          role="menuitem"
                          onClick={() => { it.run?.(); setMenu(null); }}
                          className="focus-ring w-full rounded px-3 py-1.5 text-left hover:bg-sky-500"
                        >
                          {it.label}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-white/90" aria-label="Status">
          <Battery className="hidden h-4 w-4 sm:block" aria-hidden />
          <Wifi className="hidden h-4 w-4 sm:block" aria-hidden />
          <SlidersHorizontal className="hidden h-3.5 w-3.5 sm:block" aria-hidden />
          <time dateTime={now.toISOString()}>
            <span className="hidden sm:inline">{date}&nbsp;&nbsp;</span>{time}
          </time>
        </div>
      </header>
    </>
  );
}
