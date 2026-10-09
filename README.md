# Deepak Mahajan — Portfolio OS

macOS-inspired portfolio: React + Vite + TypeScript + Tailwind + Framer Motion + Lucide.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview
```

## Structure
- `src/config.ts` — all external URLs (GitHub, LinkedIn, resume PDF, project demo/source)
- `src/data/resume.ts` — single source of truth for resume content
- `src/data/apps.ts` — app metadata + dock items
- `src/store/desktop.tsx` — window manager (open/close/minimize/maximize/focus/z-index)
- `src/components/` — MenuBar, Dock, Window, shared UI
- `src/apps/` — About, Projects, Skills, Experience, Assistant, Resume, Contact, Terminal
- `src/lib/assistant.ts`, `src/lib/terminal.ts` — local assistant knowledge base and terminal commands

## URLs still to configure (src/config.ts)
1. `github`  2. `linkedin`  3. `projects['doctor-consultancy'].live/source`
4. `projects.brainezium.live/source`  5. `projects['stock-analysis'].live/source`
6. Resume PDF → add `public/resume.pdf`

## Notes
- The assistant is a local, resume-grounded keyword matcher; no LLM API is connected. To add one, call a
  server-side endpoint — never put API keys in frontend code.
- The contact form opens a prefilled `mailto:` (no backend); it never claims a message was sent.
