import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion, useDragControls, useMotionValue } from 'framer-motion';
import { Maximize2, Minus, RotateCcw, X } from 'lucide-react';
import { APPS, APP_ORDER } from '../data/apps';
import { useDesktop } from '../store/desktop';
import { useIsMobile } from '../hooks/useIsMobile';
import type { AppId } from '../types';

export default function Window({ id, children }: { id: AppId; children: ReactNode }) {
  const { state, focus, close, minimize, toggleMax, reset } = useDesktop();
  const w = state.wins[id];
  const meta = APPS[id];
  const mobile = useIsMobile();
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const full = mobile || w.maximized;
  const active = state.active === id;
  const idx = APP_ORDER.indexOf(id);

  useEffect(() => { x.set(0); y.set(0); }, [w.resetKey, w.maximized, mobile, x, y]);

  const pos = full
    ? { top: 34, left: 8, right: 8, bottom: mobile ? 84 : 100 }
    : {
        top: 44 + (idx % 4) * 24,
        left: `max(8px, calc(50% - ${meta.w / 2}px + ${((idx % 5) - 2) * 30}px))`,
        width: meta.w, height: meta.h, maxWidth: 'calc(100% - 16px)', maxHeight: 'calc(100% - 150px)',
      };

  const dot = 'group/btn flex h-4 w-4 items-center justify-center rounded-full focus-ring md:h-3 md:w-3';

  return (
    <AnimatePresence>
      {w.open && (
        <motion.section
          key={id}
          role="dialog"
          aria-label={meta.title}
          aria-hidden={w.minimized}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={w.minimized
            ? { opacity: 0, scale: 0.2, transitionEnd: { visibility: 'hidden' } }
            : { opacity: 1, scale: 1, visibility: 'visible' }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          drag={!full}
          dragControls={controls}
          dragListener={false}
          dragMomentum={false}
          onPointerDownCapture={() => focus(id)}
          style={{ ...pos, x, y, zIndex: w.z, transformOrigin: '50% 100%' }}
          className={`glass-win absolute flex flex-col overflow-hidden rounded-xl border border-white/10 md:rounded-2xl ${
            active ? 'shadow-2xl shadow-black/70' : 'shadow-lg shadow-black/40'
          }`}
        >
          <header
            style={{ touchAction: 'none' }}
            className={`relative flex h-10 shrink-0 select-none items-center gap-3 border-b border-white/10 px-3 ${
              active ? 'bg-white/[0.07]' : 'bg-white/[0.03]'
            } ${full ? '' : 'cursor-grab active:cursor-grabbing'}`}
            onPointerDown={(e) => { if (!full && !(e.target as HTMLElement).closest('button')) controls.start(e); }}
            onDoubleClick={() => { if (!mobile) toggleMax(id); }}
          >
            <div className="flex items-center gap-2">
              <button aria-label={`Close ${meta.title}`} onClick={() => close(id)} className={`${dot} bg-[#ff5f57]`}>
                <X className="h-2.5 w-2.5 text-black/60 opacity-0 group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100" />
              </button>
              <button aria-label={`Minimize ${meta.title}`} onClick={() => minimize(id)} className={`${dot} bg-[#febc2e]`}>
                <Minus className="h-2.5 w-2.5 text-black/60 opacity-0 group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100" />
              </button>
              {!mobile && (
                <button aria-label={w.maximized ? `Restore ${meta.title}` : `Maximize ${meta.title}`} onClick={() => toggleMax(id)} className={`${dot} bg-[#28c840]`}>
                  <Maximize2 className="h-2 w-2 text-black/60 opacity-0 group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100" />
                </button>
              )}
            </div>
            <h2 className="pointer-events-none absolute inset-x-20 truncate text-center text-[13px] font-medium text-white/80">{meta.title}</h2>
            {!mobile && (
              <button
                aria-label={`Reset ${meta.title} size and position`}
                title="Reset window size and position"
                onClick={() => reset(id)}
                className="focus-ring ml-auto rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </header>
          <div className="min-h-0 flex-1 overflow-auto">{children}</div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
