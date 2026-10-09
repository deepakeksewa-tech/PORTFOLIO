export type AppId =
  | 'about' | 'terminal' | 'projects' | 'skills'
  | 'experience' | 'assistant' | 'resume' | 'contact';

export type LinkKey = 'github' | 'linkedin';

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  highlights: string[];
  preview: { gradient: string; icon: 'heart' | 'pen' | 'chart'; flow: string[] };
}
export interface Job {
  role: string; org: string; period: string; location: string; mentor?: string; points: string[];
}
export interface SkillGroup { title: string; items: string[] }
export interface ChatAction { label: string; app: AppId; project?: string }
