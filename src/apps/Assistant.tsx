import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUp, Info, MessageSquarePlus, Sparkles, User } from 'lucide-react';
import { answer, GREETING, SUGGESTIONS } from '../lib/assistant';
import { useDesktop } from '../store/desktop';
import type { ChatAction } from '../types';

interface Msg { id: number; role: 'user' | 'assistant'; text: string; actions?: ChatAction[] }
const greeting = (): Msg[] => [{ id: 0, role: 'assistant', text: GREETING }];

export default function Assistant() {
  const { openApp } = useDesktop();
  const [msgs, setMsgs] = useState<Msg[]>(greeting);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const timer = useRef<number>();
  const end = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [msgs, typing]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { id: nextId.current++, role: 'user', text: q }]);
    setInput('');
    if (area.current) area.current.style.height = 'auto';
    setTyping(true);
    timer.current = window.setTimeout(() => {
      const r = answer(q);
      setMsgs((m) => [...m, { id: nextId.current++, role: 'assistant', text: r.text, actions: r.actions }]);
      setTyping(false);
    }, 600);
  };

  const clear = () => { window.clearTimeout(timer.current); setTyping(false); setMsgs(greeting()); };
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const empty = msgs.length === 1;

  return (
    <div className="flex h-full min-h-[420px]">
      <aside className="hidden w-56 shrink-0 flex-col gap-3 border-r border-white/10 bg-black/20 p-3 md:flex">
        <button onClick={clear} className="focus-ring flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/10">
          <MessageSquarePlus className="h-4 w-4" aria-hidden />New chat
        </button>
        <p className="px-1 text-xs font-semibold uppercase tracking-wider text-white/40">Try asking</p>
        <ul className="space-y-1 overflow-auto">
          {SUGGESTIONS.map((s) => (
            <li key={s}><button onClick={() => send(s)} className="focus-ring w-full rounded-lg px-2 py-1.5 text-left text-[13px] text-white/70 hover:bg-white/10">{s}</button></li>
          ))}
        </ul>
        <p className="mt-auto flex gap-2 text-[11px] leading-snug text-white/40"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />Answers come from a local knowledge base built from Deepak's resume. No external AI API is connected.</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 md:hidden">
          <span className="text-sm text-white/70">Portfolio Assistant</span>
          <button onClick={clear} className="focus-ring rounded-lg border border-white/15 px-2.5 py-1 text-xs">New chat</button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-auto p-4 md:p-6" role="log" aria-live="polite" aria-label="Conversation">
          {msgs.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-sky-500' : 'bg-gradient-to-br from-fuchsia-500 to-indigo-500'}`} aria-hidden>
                {m.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              </div>
              <div className={`max-w-[85%] space-y-2 ${m.role === 'user' ? 'items-end' : ''}`}>
                <div className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-sky-500 text-white' : 'bg-white/[0.07] text-white/90'}`}>{m.text}</div>
                {m.actions?.map((a) => (
                  <button key={a.label} onClick={() => openApp(a.app, { project: a.project })} className="focus-ring rounded-lg border border-sky-400/40 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-200 hover:bg-sky-500/20">{a.label} →</button>
                ))}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3" role="status" aria-label="Assistant is typing">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500" aria-hidden><Sparkles className="h-4 w-4" /></div>
              <div className="flex items-center gap-1 rounded-2xl bg-white/[0.07] px-4 py-3">
                {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          )}
          {empty && !typing && (
            <div className="flex flex-wrap gap-2 pl-11">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="focus-ring rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10">{s}</button>
              ))}
            </div>
          )}
          <div ref={end} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 md:p-4">
          <div className="flex items-end gap-2 rounded-3xl border border-white/15 bg-white/5 py-2 pl-4 pr-2 focus-within:border-sky-400/60">
            <label htmlFor="chat-input" className="sr-only">Ask about Deepak</label>
            <textarea
              id="chat-input" ref={area} rows={1} value={input} onKeyDown={onKey}
              onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`; }}
              placeholder="Ask about projects, skills, experience…"
              className="max-h-36 min-h-[28px] flex-1 resize-none bg-transparent py-1 text-sm outline-none placeholder:text-white/35"
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || typing} className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition disabled:opacity-30">
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[11px] text-white/35">Enter to send · Shift+Enter for a new line</p>
        </form>
      </div>
    </div>
  );
}
