import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useDesktop } from '../store/desktop';
import { runCommand, WELCOME } from '../lib/terminal';

interface Line { kind: 'cmd' | 'out'; text: string }

export default function TerminalApp() {
  const { openApp } = useDesktop();
  const [lines, setLines] = useState<Line[]>(() => WELCOME.map((text) => ({ kind: 'out', text })));
  const [input, setInput] = useState('');
  const [hist, setHist] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const end = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    const cmd = input.trim();
    const res = runCommand(cmd);
    setLines((l) => res.clear ? [] : [...l, { kind: 'cmd', text: input }, ...res.lines.map((text) => ({ kind: 'out' as const, text }))]);
    if (cmd) setHist((h) => [...h, cmd]);
    setCursor(-1);
    setInput('');
    if (res.open) openApp(res.open);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
    else if (e.key === 'ArrowUp' && hist.length) {
      e.preventDefault();
      const n = cursor < 0 ? hist.length - 1 : Math.max(0, cursor - 1);
      setCursor(n); setInput(hist[n]);
    } else if (e.key === 'ArrowDown' && cursor >= 0) {
      e.preventDefault();
      const n = cursor + 1;
      if (n >= hist.length) { setCursor(-1); setInput(''); } else { setCursor(n); setInput(hist[n]); }
    }
  };

  return (
    <div className="min-h-full cursor-text bg-[#0b0f0c] p-4 font-mono text-[13px] leading-relaxed text-emerald-100/90" onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) => (
        <pre key={i} className={`whitespace-pre-wrap break-words font-mono ${l.kind === 'cmd' ? 'text-white' : ''}`}>
          {l.kind === 'cmd' ? <><span className="text-emerald-400">deepak@portfolio ~ %</span> {l.text}</> : l.text}
        </pre>
      ))}
      <div className="flex items-center gap-2">
        <label htmlFor="term-input" className="shrink-0 text-emerald-400">deepak@portfolio ~ %</label>
        <input
          id="term-input" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
          autoComplete="off" autoCapitalize="off" spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-white outline-none focus-visible:outline-none"
        />
      </div>
      <div ref={end} />
    </div>
  );
}
