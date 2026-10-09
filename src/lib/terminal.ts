import { resume } from '../data/resume';
import { LINKS } from '../config';
import type { AppId } from '../types';

export interface CmdResult { lines: string[]; clear?: boolean; open?: AppId }

const APP_NAMES: AppId[] = ['about', 'terminal', 'projects', 'skills', 'experience', 'assistant', 'resume', 'contact'];

export const WELCOME = [
  `Welcome to ${resume.name}'s portfolio terminal.`,
  "Type 'help' to see available commands.",
];

export function runCommand(raw: string): CmdResult {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  switch (cmd.toLowerCase()) {
    case '':
      return { lines: [] };
    case 'help':
      return {
        lines: [
          'Available commands:',
          '  whoami       who is Deepak',
          '  about        profile summary',
          '  skills       technical skills',
          '  projects     project list',
          '  experience   internships',
          '  education    degree details',
          '  achievements ratings & certifications',
          '  contact      contact details',
          '  resume       open the resume app',
          '  open <app>   open an app (about, projects, skills, experience, assistant, resume, contact)',
          '  clear        clear the screen',
        ],
      };
    case 'whoami':
      return { lines: [`${resume.name} — ${resume.roles.join(' | ')}`] };
    case 'about':
      return { lines: [resume.summary] };
    case 'skills':
      return { lines: resume.skills.map((g) => `${g.title.padEnd(20)} ${g.items.join(', ')}`) };
    case 'projects':
      return {
        lines: resume.projects.flatMap((p, i) => [`${i + 1}. ${p.name}`, `   ${p.description}`, `   Stack: ${p.stack.join(', ')}`]),
      };
    case 'experience':
      return {
        lines: resume.experience.flatMap((j) => [
          `${j.role} — ${j.org}`, `  ${j.period} | ${j.location}${j.mentor ? ` | Mentor: ${j.mentor}` : ''}`,
          ...j.points.map((p) => `  - ${p}`), '',
        ]),
      };
    case 'education': {
      const e = resume.education;
      return { lines: [e.degree, e.school, e.period, `CGPA: ${e.cgpa}`] };
    }
    case 'achievements':
      return { lines: resume.achievements.map((a) => `- ${a}`) };
    case 'contact':
      return {
        lines: [
          `Email:    ${resume.email}`, `Phone:    ${resume.phone}`,
          `GitHub:   ${LINKS.github || '(not configured yet)'}`, `LinkedIn: ${LINKS.linkedin || '(not configured yet)'}`,
        ],
      };
    case 'resume':
      return { lines: ['Opening the Resume app…'], open: 'resume' };
    case 'open': {
      const target = args[0]?.toLowerCase() as AppId | undefined;
      if (target && APP_NAMES.includes(target)) return { lines: [`Opening ${target}…`], open: target };
      return { lines: [`Usage: open <${APP_NAMES.join('|')}>`] };
    }
    case 'clear':
      return { lines: [], clear: true };
    default:
      return { lines: [`command not found: ${cmd}. Type 'help' for the list of commands.`] };
  }
}
