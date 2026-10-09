import {
  Briefcase, Cpu, FileText, Github, LayoutGrid, Linkedin, Mail, Sparkles, Terminal, UserRound,
  type LucideIcon,
} from 'lucide-react';
import type { AppId, LinkKey } from '../types';

export const APP_ORDER: AppId[] = ['about', 'terminal', 'projects', 'skills', 'experience', 'assistant', 'resume', 'contact'];

export const APPS: Record<AppId, { title: string; w: number; h: number }> = {
  about: { title: 'About Me', w: 760, h: 560 },
  terminal: { title: 'Terminal — deepak@portfolio', w: 720, h: 460 },
  projects: { title: 'Projects', w: 880, h: 590 },
  skills: { title: 'Technical Skills', w: 720, h: 500 },
  experience: { title: 'Experience', w: 720, h: 540 },
  assistant: { title: 'Portfolio Assistant', w: 940, h: 620 },
  resume: { title: 'Resume', w: 780, h: 620 },
  contact: { title: 'Contact', w: 700, h: 580 },
};

export interface DockItem {
  key: string; label: string; Icon: LucideIcon; color: string;
  app?: AppId; link?: LinkKey;
}

export const DOCK: DockItem[] = [
  { key: 'about', label: 'Finder — About Me', Icon: UserRound, color: 'from-sky-400 to-blue-600', app: 'about' },
  { key: 'terminal', label: 'Terminal — Developer Introduction', Icon: Terminal, color: 'from-zinc-600 to-zinc-900', app: 'terminal' },
  { key: 'projects', label: 'Projects — My Work', Icon: LayoutGrid, color: 'from-violet-400 to-purple-600', app: 'projects' },
  { key: 'skills', label: 'Skills — Technical Skills', Icon: Cpu, color: 'from-emerald-400 to-teal-600', app: 'skills' },
  { key: 'experience', label: 'Experience', Icon: Briefcase, color: 'from-amber-400 to-orange-600', app: 'experience' },
  { key: 'assistant', label: 'AI Assistant', Icon: Sparkles, color: 'from-fuchsia-400 to-pink-600', app: 'assistant' },
  { key: 'resume', label: 'Resume', Icon: FileText, color: 'from-rose-400 to-red-600', app: 'resume' },
  { key: 'github', label: 'GitHub', Icon: Github, color: 'from-neutral-500 to-neutral-800', link: 'github' },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin, color: 'from-blue-500 to-blue-700', link: 'linkedin' },
  { key: 'contact', label: 'Mail — Contact Me', Icon: Mail, color: 'from-cyan-400 to-sky-600', app: 'contact' },
];
