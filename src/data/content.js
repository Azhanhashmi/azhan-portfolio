export const navItems = [
  { id: 'guide', label: 'guide', icon: '✕' },
  { id: 'about', label: 'about', icon: '✕' },
  { id: 'contact', label: 'contact', icon: '✕' },
  { id: 'work', label: 'my work', icon: '✕' },
  { id: 'experience', label: 'experience', icon: null },
  { id: 'skills', label: 'my skills', icon: null },
  { id: 'buildlog', label: 'build log', icon: null },
];

export const projects = [
  {
    id: 'vectorengine',
    title: 'AI Vector Engine',
    subtitle: 'React, Node.js, C++, RAG, Ollama',
    color: '#00e5ff',
    bgColor: '#0d1b2a',
    description: 'Built a fully offline AI assistant with a custom HNSW vector search engine written from scratch in C++ — no third-party vector database, no API costs, no shortcuts.',
    tags: ['TYPE >> Full Stack & RAG ', 'MAY 2026', '>> VIEW ON GITHUB'],
    details: 'Implemented HNSW vector search from scratch in C++ with custom multi-layer graph traversal and approximate nearest neighbor retrieval. Bridged it to Node.js via stdin/stdout pipes for sub-millisecond queries. Integrated Ollama locally for embedding and generation using LLaMA 3.2 — fully offline with confidence-threshold fallback. Built a React frontend with a D3.js force-directed graph that maps knowledge nodes and surfaces similarity scores per query.',
    meta: { role: 'Full Stack Developer', team: 'Solo', tools: 'React, Node.js, C++, Ollama, D3.js, Prompt Embedding, RAG, TypeScript' },
    links: { github: 'https://github.com/Azhanhashmi/ai-assistant-vector-engine' },
  },
  {
    id: 'hireable',
    title: 'Am I Hireable?',
    subtitle: 'React, TypeScript, Node.js, LLM ',
    color: '#f5d020',
    bgColor: '#1a1a0d',
    description: 'A brutally honest AI-powered hiring readiness analyzer — pulls real GitHub and LeetCode data, processes 15+ developer signals, and scores you against Google, Zepto, and funded startups.',
    tags: ['TYPE >> AI & FULLSTACK', 'APR 2026', '>> VIEW LIVE', '>> VIEW ON GITHUB'],
    details: 'Fetches real GitHub and LeetCode data via REST and GraphQL APIs. Engineered a custom signal pipeline that detects tutorial repos, measures commit consistency, and evaluates DSA readiness. Ships a dual-mode scoring system across 3 company tiers — Google/Microsoft, Zepto/Razorpay, and Funded Startups — each with India-specific 2025 hiring benchmarks. Deployed on Render + Vercel with live users discovering it organically via Google Search Console.',
    meta: { role: 'Full Stack Developer', team: 'Solo', tools: 'React, TypeScript, Node.js, LLM Integration, Prompt Embedding' },
    links: { live: 'https://am-i-hireable.vercel.app', github: 'https://github.com/Azhanhashmi/am-i-hireable' },
  },
  {
    id: 'inceptax',
    title: 'InceptaX',
    subtitle: 'React, Node.js, MongoDB',
    color: '#b44fff',
    bgColor: '#120a1e',
    description: 'A 3-interface AI challenge and project platform — user portal, admin panel, and backend API — each independently deployable, built to give beginners a competitive environment that mirrors real hiring assessments.',
    tags: ['TYPE >> FULLSTACK ', 'APR 2026', '>> VIEW LIVE', '>> VIEW ON GITHUB'],
    details: 'Architected all 3 interfaces from scratch — user portal, admin panel, and REST API — each independently deployable. Replicated a hackathon-style evaluation flow with industry challenges, solution submissions, and rankings. Launched a dual-ranking system combining per-challenge leaderboards with aggregated scores. User surveys confirmed 5–8 hours saved per project cycle. Built with WCAG accessibility guidelines across all interfaces from day one.',
    meta: { role: 'Solo Builder', team: 'Solo', tools: 'React, Node.js, MongoDB, LLM Integration, JWT TOKEN, Bycript, Nodemailer, Express ' },
    links: { live: 'https://inceptax.vercel.app', github: 'https://github.com/azhanhashmi' },
  },
];

export const skills = {
  frontend: ['React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
  backend: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'JWT', 'Firebase', 'Groq / LLM', 'Websocket'],
  databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Schema Design'],
  tools: ['Git', 'GitHub', 'Vercel', 'Render', 'Cloudinary', 'VS Code', 'Claude'],
  ai: ['RAG Pipelines', 'Ollama', 'LLaMA 3.2', 'Groq API', 'Vector Embeddings', 'HNSW Search', 'Prompt Engineering', 'LLM Integration'],
};

export const experience = [

];
