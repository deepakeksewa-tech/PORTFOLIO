import { resume } from '../data/resume';
import { LINKS } from '../config';
import type { ChatAction } from '../types';

export interface Reply { text: string; actions?: ChatAction[] }
interface Intent { keys: string[]; weight: number; reply: () => Reply }

export const GREETING =
  "Hi, I'm Deepak's Portfolio Assistant. Ask me about his projects, technical skills, experience, education, or achievements.";

export const SUGGESTIONS = [
  'Who is Deepak Mahajan?',
  'Explain his Doctor Consultancy Platform.',
  'Tell me about Brainezium.',
  'What are his technical skills?',
  'What internship experience does he have?',
  'How can I contact him?',
  'Show me his resume.',
];

const bullets = (a: string[]) => a.map((x) => `• ${x}`).join('\n');
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const project = (id: string): Reply => {
  const p = resume.projects.find((x) => x.id === id)!;
  const links = LINKS.projects[id];
  const note = links?.live || links?.source ? '' : '\n\nLive demo and source links have not been configured yet.';
  return {
    text: `${p.name}\n${p.description}\n\nTech stack: ${p.stack.join(', ')}\n\n${bullets(p.highlights)}${note}`,
    actions: [{ label: `Open ${p.name.split(' — ')[0]}`, app: 'projects', project: id }],
  };
};

const intents: Intent[] = [
  { keys: ['doctor', 'consultancy', 'healthcare', 'n8n', 'appointment'], weight: 3, reply: () => project('doctor-consultancy') },
  { keys: ['brainezium', 'content sharing', 'publishing platform'], weight: 3, reply: () => project('brainezium') },
  { keys: ['stock', 'price analysis', 'databricks'], weight: 3, reply: () => project('stock-analysis') },
  {
    keys: ['who is', 'about deepak', 'introduce', 'summary', 'profile', 'yourself'], weight: 2,
    reply: () => ({
      text: `${resume.name} — ${resume.roles.join(' | ')}\n\n${resume.summary}\n\nCurrently a Software Engineer Intern at EKSEWA (SEWA EK Ventures Pvt. Ltd.), Amritsar.`,
      actions: [{ label: 'Open About Me', app: 'about' }],
    }),
  },
  {
    keys: ['project', 'built', 'build'], weight: 1,
    reply: () => ({
      text: `Deepak's projects:\n${bullets(resume.projects.map((p) => `${p.name} — ${p.description}`))}`,
      actions: [{ label: 'Open Projects', app: 'projects' }],
    }),
  },
  {
    keys: ['rag', 'retrieval'], weight: 2,
    reply: () => ({
      text: 'RAG (Retrieval-Augmented Generation) is listed under his Big Data & AI skills, and during his EKSEWA internship he gained practical experience with RAG-based semantic data retrieval. The resume does not list a dedicated RAG project.',
      actions: [{ label: 'Open Experience', app: 'experience' }],
    }),
  },
  {
    keys: ['skill', 'technolog', 'tech stack', 'language', 'technical', 'tools', 'database', 'pyspark', 'spark'], weight: 1,
    reply: () => ({
      text: resume.skills.map((g) => `${g.title}: ${g.items.join(', ')}`).join('\n'),
      actions: [{ label: 'Open Skills', app: 'skills' }],
    }),
  },
  {
    keys: ['intern', 'experience', 'ekseva', 'sewa', 'nptel', 'iit', 'ropar', 'job', 'employ', 'company'], weight: 2,
    reply: () => ({
      text: resume.experience
        .map((j) => `${j.role} — ${j.org}\n${j.period} | ${j.location}${j.mentor ? `\nMentor: ${j.mentor}` : ''}\n${bullets(j.points)}`)
        .join('\n\n'),
      actions: [{ label: 'Open Experience', app: 'experience' }],
    }),
  },
  {
    keys: ['educat', 'college', 'universit', 'degree', 'cgpa', 'b.tech', 'btech', 'study', 'ptu'], weight: 2,
    reply: () => {
      const e = resume.education;
      return { text: `${e.degree}\n${e.school}\n${e.period}\nCGPA: ${e.cgpa}`, actions: [{ label: 'Open About Me', app: 'about' }] };
    },
  },
  {
    keys: ['achiev', 'leetcode', 'codeforces', 'hackerrank', 'certif', 'rating', 'dsa', 'geeksforgeeks'], weight: 2,
    reply: () => ({ text: bullets(resume.achievements), actions: [{ label: 'Open About Me', app: 'about' }] }),
  },
  {
    keys: ['contact', 'email', 'phone', 'reach', 'hire', 'linkedin', 'github', 'mail'], weight: 2,
    reply: () => ({
      text: `Email: ${resume.email}\nPhone: ${resume.phone}\nGitHub: ${LINKS.github || 'not provided in this portfolio yet'}\nLinkedIn: ${LINKS.linkedin || 'not provided in this portfolio yet'}`,
      actions: [{ label: 'Open Contact', app: 'contact' }],
    }),
  },
  {
    keys: ['resume', 'cv', 'download'], weight: 2,
    reply: () => ({
      text: "The Resume app shows Deepak's resume and offers download / open-PDF buttons when the PDF file is available.",
      actions: [{ label: 'Open Resume', app: 'resume' }],
    }),
  },
];

export function answer(question: string): Reply {
  const q = question.toLowerCase().trim();
  if (/^(hi|hello|hey)\b[\s!.?]*$/.test(q)) {
    return { text: 'Hello! Ask me about his projects, skills, experience, education, achievements, or how to contact him.' };
  }
  let best: Intent | null = null;
  let bestScore = 0;
  for (const it of intents) {
    const hits = it.keys.filter((k) => new RegExp(`\\b${esc(k)}`).test(q)).length;
    const score = hits * it.weight;
    if (score > bestScore) { best = it; bestScore = score; }
  }
  if (best) return best.reply();
  return {
    text: "I don't have verified information about that in Deepak's resume, so I won't guess. I can answer questions about his projects, technical skills, internships, education, achievements, or contact details.",
    actions: [{ label: 'Open Contact', app: 'contact' }],
  };
}
