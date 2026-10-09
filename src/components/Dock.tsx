import { useState } from 'react';
import { motion } from 'framer-motion';
import { DOCK } from '../data/apps';
import { useDesktop } from '../store/desktop';

export default function Dock() {
  const { state, openApp, openLink } = useDesktop();
  const [bounce, setBounce] = useState<string | null>(null);

  const launch = (key: string, app?: Parameters<typeof openApp>[0], link?: Parameters<typeof openLink>[0]) => {
    setBounce(key);
    window.setTimeout(() => setBounce(null), 550);
    if (app) openApp(app);
    else if (link) openLink(link);
  };

  return (
    <nav aria-label="Dock" className="pointer-events-none fixed inset-x-0 bottom-2 z-[9999] flex justify-center px-2 pb-[env(safe-area-inset-bottom)]">
      <ul className="glass pointer-events-auto flex max-w-full items-end gap-1.5 overflow-x-auto rounded-3xl px-2 py-1.5 md:gap-2 md:overflow-visible md:px-3 md:py-2">
        {DOCK.map(({ key, label, Icon, color, app, link }) => {
          const open = app ? state.wins[app].open : false;
          return (
            <li key={key} className="group relative flex shrink-0 flex-col items-center">
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-10 hidden whitespace-nowrap rounded-md border border-white/10 bg-neutral-900/90 px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition group-focus-within:opacity-100 group-hover:opacity-100 md:block"
              >
                {label}
              </span>
              <motion.button
                aria-label={label}
                onClick={() => launch(key, app, link)}
                whileHover={{ scale: 1.3, y: -8 }}
                whileTap={{ scale: 0.88 }}
                animate={bounce === key ? { y: [0, -16, 0, -8, 0] } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className={`focus-ring flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b shadow-lg shadow-black/40 ring-1 ring-white/20 md:h-12 md:w-12 md:rounded-[14px] ${color}`}
              >
                <Icon className="h-5 w-5 text-white md:h-6 md:w-6" aria-hidden />
              </motion.button>
              <span className={`mt-1 h-1 w-1 rounded-full ${open ? 'bg-white/80' : 'bg-transparent'}`} aria-hidden />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
