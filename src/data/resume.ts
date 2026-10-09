import type { Job, Project, SkillGroup } from '../types';

export const resume = {
  name: 'Deepak Mahajan',
  roles: ['Full-Stack Developer', 'MERN Stack Developer', 'RAG Enthusiast'],
  summary:
    'Full-stack developer with hands-on experience in the MERN stack, RESTful APIs, scalable web applications, PySpark, and Retrieval-Augmented Generation (RAG).',
  email: 'deepakmahajan3028@gmail.com',
  phone: '+91-8427241682',
  experience: [
    {
      role: 'Software Engineer Intern',
      org: 'EKSEWA by SEWA EK Ventures Pvt. Ltd.',
      period: 'June 2026 – Present',
      location: 'Amritsar, India',
      points: [
        'Developed frontend modules for an Inventory Store and a full-stack Employee Management System using the MERN stack.',
        'Implemented JWT authentication and RESTful APIs for secure access, attendance tracking, and employee data.',
        'Gained practical experience with RAG-based semantic data retrieval.',
      ],
    },
    {
      role: 'Winter Intern',
      org: 'NPTEL Winter Internship Program, IIT Ropar',
      period: 'January 2026 – March 2026',
      location: 'Remote',
      mentor: 'Prof. Sudarshan Iyengar',
      points: [
        'Engineered full-stack web applications using the MERN stack.',
        'Built RESTful APIs and managed database integrations.',
      ],
    },
  ] as Job[],
  projects: [
    {
      id: 'doctor-consultancy',
      name: 'Doctor Consultancy Platform',
      description: 'A three-tier healthcare platform with Admin, Doctor, and Patient roles.',
      stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'n8n'],
      highlights: [
        'Three-tier healthcare platform with Admin, Doctor, and Patient roles.',
        'Doctor onboarding verification and admin access management.',
        'Automated email notifications after appointment-slot booking.',
        'Sends meeting links, appointment time slots, and doctor location to patients and doctors.',
      ],
      preview: { gradient: 'from-sky-500/40 via-indigo-500/30 to-fuchsia-500/20', icon: 'heart', flow: ['Admin', 'Doctor', 'Patient'] },
    },
    {
      id: 'brainezium',
      name: 'Brainezium — Content Sharing Platform',
      description: 'A responsive full-stack content publishing platform.',
      stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
      highlights: [
        'Responsive full-stack content publishing platform.',
        'Deployed using Vercel and Render.',
        'JWT authentication, protected API routes, and MongoDB data models.',
      ],
      preview: { gradient: 'from-emerald-500/35 via-teal-500/25 to-cyan-500/20', icon: 'pen', flow: ['React', 'Express API', 'MongoDB'] },
    },
    {
      id: 'stock-analysis',
      name: 'Stock Price Analysis',
      description: 'Analysis of historical stock data using PySpark and Spark SQL.',
      stack: ['PySpark', 'SQL', 'Python', 'Matplotlib', 'Databricks'],
      highlights: [
        'Analyzed historical stock data using PySpark and Spark SQL.',
        'Created data visualizations using Matplotlib.',
      ],
      preview: { gradient: 'from-amber-500/35 via-orange-500/25 to-rose-500/20', icon: 'chart', flow: ['PySpark', 'Spark SQL', 'Matplotlib'] },
    },
  ] as Project[],
  skills: [
    { title: 'Programming', items: ['Java', 'JavaScript', 'Python', 'SQL', 'C++'] },
    { title: 'Frontend & Backend', items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js'] },
    { title: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
    { title: 'Big Data & AI', items: ['PySpark', 'Apache Spark', 'Databricks', 'RAG'] },
    { title: 'Tools', items: ['VS Code', 'IntelliJ IDEA', 'Git', 'GitHub', 'Jupyter Notebook'] },
    { title: 'Computer Science', items: ['Data Structures and Algorithms', 'OOP', 'DBMS'] },
  ] as SkillGroup[],
  achievements: [
    'Solved 300+ DSA problems on LeetCode and GeeksforGeeks (per the supplied resume).',
    'Achieved a 4-star rating in Java on HackerRank.',
    'Reached a 955 rating on Codeforces.',
    'SQL certification from Udemy.',
    'NPTEL Computer Architecture certification.',
    'NPTEL Python certification.',
  ],
  education: {
    school: 'Punjab Technical University',
    degree: 'B.Tech in Computer Science and Engineering',
    period: 'July 2023 – July 2027',
    cgpa: '8.06',
  },
};
