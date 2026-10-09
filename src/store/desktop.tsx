import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react';
import type { AppId, LinkKey } from '../types';
import { APP_ORDER } from '../data/apps';
import { LINKS } from '../config';

export interface WinState { open: boolean; minimized: boolean; maximized: boolean; z: number; resetKey: number }
interface State {
  wins: Record<AppId, WinState>;
  top: number;
  active: AppId | null;
  projectFocus: string | null;
  toast: string | null;
}
type Action =
  | { t: 'open'; id: AppId; project?: string }
  | { t: 'close' | 'min' | 'max' | 'reset' | 'focus'; id: AppId }
  | { t: 'closeAll' }
  | { t: 'toast'; msg: string | null };

const blank = (): WinState => ({ open: false, minimized: false, maximized: false, z: 0, resetKey: 0 });
const initial: State = {
  wins: Object.fromEntries(APP_ORDER.map((id) => [id, blank()])) as Record<AppId, WinState>,
  top: 10, active: null, projectFocus: null, toast: null,
};

function patch(s: State, id: AppId, p: Partial<WinState>): State {
  return { ...s, wins: { ...s.wins, [id]: { ...s.wins[id], ...p } } };
}

function reducer(s: State, a: Action): State {
  switch (a.t) {
    case 'open': {
      const z = s.top + 1;
      return {
        ...patch(s, a.id, { open: true, minimized: false, z }),
        top: z, active: a.id,
        projectFocus: a.id === 'projects' ? a.project ?? s.projectFocus : s.projectFocus,
      };
    }
    case 'close':
      return { ...patch(s, a.id, { open: false, minimized: false, maximized: false }), active: s.active === a.id ? null : s.active };
    case 'min':
      return { ...patch(s, a.id, { minimized: true }), active: s.active === a.id ? null : s.active };
    case 'max': {
      const z = s.top + 1;
      return { ...patch(s, a.id, { maximized: !s.wins[a.id].maximized, z }), top: z, active: a.id };
    }
    case 'reset': {
      const z = s.top + 1;
      return { ...patch(s, a.id, { maximized: false, resetKey: s.wins[a.id].resetKey + 1, z }), top: z, active: a.id };
    }
    case 'focus': {
      if (s.active === a.id && s.wins[a.id].z === s.top) return s;
      const z = s.top + 1;
      return { ...patch(s, a.id, { z }), top: z, active: a.id };
    }
    case 'closeAll':
      return { ...initial, top: s.top, toast: s.toast };
    case 'toast':
      return { ...s, toast: a.msg };
  }
}

interface Ctx {
  state: State;
  openApp: (id: AppId, opts?: { project?: string }) => void;
  close: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMax: (id: AppId) => void;
  reset: (id: AppId) => void;
  focus: (id: AppId) => void;
  closeAll: () => void;
  openLink: (key: LinkKey) => void;
  notify: (msg: string | null) => void;
}
const DesktopCtx = createContext<Ctx | null>(null);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const openApp = useCallback((id: AppId, o?: { project?: string }) => dispatch({ t: 'open', id, project: o?.project }), []);
  const close = useCallback((id: AppId) => dispatch({ t: 'close', id }), []);
  const minimize = useCallback((id: AppId) => dispatch({ t: 'min', id }), []);
  const toggleMax = useCallback((id: AppId) => dispatch({ t: 'max', id }), []);
  const reset = useCallback((id: AppId) => dispatch({ t: 'reset', id }), []);
  const focus = useCallback((id: AppId) => dispatch({ t: 'focus', id }), []);
  const closeAll = useCallback(() => dispatch({ t: 'closeAll' }), []);
  const notify = useCallback((msg: string | null) => dispatch({ t: 'toast', msg }), []);
  const openLink = useCallback((key: LinkKey) => {
    const url = LINKS[key];
    const label = key === 'github' ? 'GitHub' : 'LinkedIn';
    if (!url) notify(`${label} URL isn't configured yet — set it in src/config.ts`);
    else window.open(url, '_blank', 'noopener,noreferrer');
  }, [notify]);

  const value = useMemo(
    () => ({ state, openApp, close, minimize, toggleMax, reset, focus, closeAll, openLink, notify }),
    [state, openApp, close, minimize, toggleMax, reset, focus, closeAll, openLink, notify],
  );
  return <DesktopCtx.Provider value={value}>{children}</DesktopCtx.Provider>;
}

export function useDesktop() {
  const c = useContext(DesktopCtx);
  if (!c) throw new Error('useDesktop must be used inside DesktopProvider');
  return c;
}
