import { useEffect, type ComponentType } from 'react';
import { DesktopProvider, useDesktop } from './store/desktop';
import { APP_ORDER } from './data/apps';
import type { AppId } from './types';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Window from './components/Window';
import About from './apps/About';
import TerminalApp from './apps/Terminal';
import Projects from './apps/Projects';
import Skills from './apps/Skills';
import Experience from './apps/Experience';
import Assistant from './apps/Assistant';
import Resume from './apps/Resume';
import Contact from './apps/Contact';
import { resume } from './data/resume';
import { btnPrimary } from './components/ui';

const COMPONENTS: Record<AppId, ComponentType> = {
  about: About, terminal: TerminalApp, projects: Projects, skills: Skills,
  experience: Experience, assistant: Assistant, resume: Resume, contact: Contact,
};

function Toast() {
  const { state, notify } = useDesktop();
  useEffect(() => {
    if (!state.toast) return;
    const t = window.setTimeout(() => notify(null), 4000);
    return () => window.clearTimeout(t);
  }, [state.toast, notify]);
  if (!state.toast) return null;
  return <div role="status" className="glass fixed left-1/2 top-10 z-[10001] max-w-[90vw] -translate-x-1/2 rounded-xl px-4 py-2 text-sm shadow-2xl">{state.toast}</div>;
}

function Desktop() {
  const { openApp } = useDesktop();
  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) openApp('about');
  }, [openApp]);

  return (
    <main className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0c12]" aria-hidden>
        <div className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-indigo-600/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/15 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
      <MenuBar />
      <section className="absolute inset-x-0 top-1/3 z-0 px-6 text-center" aria-label="Welcome">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{resume.name}</h1>
        <p className="mt-2 text-white/60">{resume.roles.join(' · ')}</p>
        <button className={`${btnPrimary} mt-5`} onClick={() => openApp('assistant')}>Ask the Portfolio Assistant</button>
      </section>
      {APP_ORDER.map((id) => {
        const C = COMPONENTS[id];
        return <Window key={id} id={id}><C /></Window>;
      })}
      <Dock />
      <Toast />
    </main>
  );
}

export default function App() {
  return <DesktopProvider><Desktop /></DesktopProvider>;
}
