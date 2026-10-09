/**
 * Central place for every external URL.
 * Leave a value as '' until you have the real URL — the UI will show
 * "not configured" states instead of fake or dead links.
 */
export interface ProjectLinks { live: string; source: string }

export const LINKS = {
  github: 'https://github.com/Deepakmahajan482',  
  linkedin: 'https://www.linkedin.com/in/deepak-mahajan-960182303/', // e.g. 'https://www.linkedin.com/in/<handle>'
  resumePdf: '/resume.pdf',
  projects: {
    'doctor-consultancy': { live: 'https://health-care-system-sooty.vercel.app/', source: 'https://github.com/Deepakmahajan482/health-care-system' },
    brainezium: { live: 'https://brainezium.vercel.app/', source: 'https://github.com/Deepakmahajan482/brainezium' },
    'stock-analysis': { live: '', source: 'https://github.com/Deepakmahajan482/Stock_analysis_by_pyspark' },
  } as Record<string, ProjectLinks>,
};
