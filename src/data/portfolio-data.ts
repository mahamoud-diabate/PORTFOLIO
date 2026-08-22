export interface Project {
  id: string;
  category: "ai" | "systems" | "desktop" | "web";
  title: { fr: string; en: string };
  meta: { fr: string; en: string };
  badge?: { fr: string; en: string; featured?: boolean };
  desc: { fr: string; en: string };
  urlLabel?: string;
  image: string;
  video?: { poster: string; mp4: string; webm: string };
  screenshots?: string[];
  highlights: { fr: string[]; en: string[] };
  tags: string[];
  links?: {
    code?: string;
    demo?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: { fr: string; en: string };
  period: { fr: string; en: string };
  desc: { fr: string; en: string };
  tags: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: { fr: string; en: string };
  period: { fr: string; en: string };
  desc: { fr: string; en: string };
  tags: string[];
}

export interface StackCategory {
  index: string;
  name: { fr: string; en: string };
  skills: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Mahamoud Diabate",
    tagline: {
      fr: "Je conçois des architectures fiables et performantes, du backend à la distribution.",
      en: "I build reliable, high-performance software from backend to distribution.",
    },
    status: {
      fr: "Stage recherché — Hiver / Été 2027 · Québec, QC",
      en: "Seeking Winter / Summer 2027 internship · Quebec City, QC",
    },
    email: "madia262@ulaval.ca",
    altEmail: "diabatemahamoud00@outlook.com",
    location: "Québec, QC, Canada",
    education: {
      fr: "B. Sc. Informatique @ Université Laval",
      en: "B.Sc. Computer Science @ Université Laval",
    },
    role: {
      fr: "Développeur Logiciel & IA",
      en: "Software & AI Developer",
    },
    github: "https://github.com/mahamoud-diabate",
    linkedin: "https://www.linkedin.com/in/mahamoud-diabate-61a1b1384",
  },

  stats: [
    { label: { fr: "Tests automatisés", en: "Automated Tests" }, value: "319", sub: "sans dépendance externe" },
    { label: { fr: "Recherche RAG", en: "RAG Execution" }, value: "100%", sub: "Local & Hors-ligne" },
    { label: { fr: "Tables relationnelles", en: "Relational Tables" }, value: "23", sub: "SQLite + 33 index" },
    { label: { fr: "Matériels benchmarkés", en: "Benchmarked Devices" }, value: "440", sub: "Geekbench & 3DMark" },
  ],

  about: {
    fr: [
      "Étudiant au baccalauréat en informatique à l'Université Laval, avec un parcours préalable en analyse quantitative et économie (IUGB).",
      "Je développe des logiciels robustes et bien testés : créateur de [SOPAUTO](https://github.com/mahamoud-diabate/SOPAUTO) (logiciel de gestion commerciale avec 319 tests unitaires et intégration), de [SYNKORTEX](https://github.com/mahamoud-diabate/SYNKORTEX) (pipeline vectoriel hors-ligne avec streaming SSE) et de [Compare-Tech](https://compare-tech-king2mos-projects.vercel.app) (plateforme full-stack de benchmarks).",
      "À la recherche d'un **stage en développement logiciel (hiver ou été 2027)** à Québec ou en formule hybride / télétravail.",
    ],
    en: [
      "Computer Science student at Université Laval, with prior background in quantitative analysis and economics (IUGB).",
      "I build robust, thoroughly tested software: author of [SOPAUTO](https://github.com/mahamoud-diabate/SOPAUTO) (commercial ERP with 319 automated tests), [SYNKORTEX](https://github.com/mahamoud-diabate/SYNKORTEX) (offline vector pipeline with SSE streaming), and [Compare-Tech](https://compare-tech-king2mos-projects.vercel.app) (full-stack benchmark platform).",
      "Actively seeking a **software engineering internship for Winter or Summer 2027** in Quebec City or remote.",
    ],
  },

  projects: [
    {
      id: "sopauto",
      category: "desktop",
      title: { fr: "SOPAUTO — Gestion commerciale & ERP", en: "SOPAUTO — Commercial ERP & Inventory" },
      meta: {
        fr: "2025 – en cours · Application Desktop Commerciale",
        en: "2025 – ongoing · Commercial Desktop Application",
      },
      badge: { fr: "319 tests automatisés", en: "319 automated tests", featured: true },
      desc: {
        fr: "Application complète de gestion commerciale pour distributeur de pièces automobiles, modélisée sur les processus réels d'un comptoir. Module de caisse, gestion de stock multi-dépôts au CUMP, créances, achats et retours.",
        en: "Autonomous ERP and inventory software for an auto parts distributor, modelled on real counter workflows. POS, multi-warehouse weighted average cost (AVCO) inventory, receivables, purchasing, and returns.",
      },
      image: "/images/sopauto-dashboard.webp",
      video: { poster: "/images/sopauto-caisse-poster.jpg", mp4: "/videos/sopauto-caisse.mp4", webm: "/videos/sopauto-caisse.webm" },
      screenshots: [
        "/images/sopauto-stock.webp",
        "/images/sopauto-analyse.webp",
        "/images/sopauto-creances.webp",
        "/images/sopauto-produits.webp",
      ],
      highlights: {
        fr: [
          "Architecture modulaire de 18 modules appuyée sur SQLite (**23 tables relationnelles, 33 index**).",
          "Tableau de bord KPI : alertes automatiques de rupture, valorisation CUMP et suivi des marges.",
          "**319 tests unitaires et d'intégration** automatisés, distribution via exécutable autonome Windows (PyInstaller / Inno Setup).",
        ],
        en: [
          "18 modular architecture components over SQLite (**23 relational tables, 33 indices**).",
          "KPI dashboard: real-time stockout alerts, AVCO valuation, and margin analytics.",
          "**319 automated unit & integration tests**, packaged as a standalone Windows installer.",
        ],
      },
      tags: ["Python", "Tkinter", "SQLite", "PyTest (319)", "PyInstaller", "Inno Setup"],
      links: {
        code: "https://github.com/mahamoud-diabate/SOPAUTO",
      },
    },
    {
      id: "synkortex",
      category: "ai",
      title: { fr: "SYNKORTEX — Assistant documentaire local", en: "SYNKORTEX — Local Document Assistant" },
      meta: {
        fr: "2025 – en cours · IA Générative & Recherche Vectorielle",
        en: "2025 – ongoing · Generative AI & Vector Search",
      },
      badge: { fr: "100% Hors-ligne", en: "100% Offline", featured: true },
      desc: {
        fr: "Pipeline RAG local avec agent de décision : indexation vectorielle, réécriture contextuelle des requêtes, bascule web automatique en cas d'absence de source locale et streaming des réponses.",
        en: "Local RAG pipeline with agentic routing: vector indexing, contextual query reformulation, automatic web fallback, and real-time token streaming.",
      },
      image: "/images/synkortex-chat.webp",
      video: { poster: "/images/synkortex-chat-poster.jpg", mp4: "/videos/synkortex-chat.mp4", webm: "/videos/synkortex-chat.webm" },
      screenshots: [
        "/images/synkortex-parametres.webp",
        "/images/synkortex-local.webp",
        "/images/synkortex-web.webp",
        "/images/synkortex-clair.webp",
      ],
      highlights: {
        fr: [
          "Confidentialité totale des données grâce à une exécution 100 % locale (embeddings FastEmbed, LLM agnostique : Gemini, DeepSeek, Ollama ou endpoint OpenAI).",
          "Diffusion en temps réel via Server-Sent Events (SSE) avec indicateurs de pertinence et citations.",
          "Backend FastAPI avec graphe décisionnel LangGraph et interface réactive Next.js / React.",
        ],
        en: [
          "Zero data leakage: 100% offline local execution with FastEmbed embeddings and provider-agnostic LLMs (Gemini, DeepSeek, Ollama, or any OpenAI-compatible endpoint).",
          "Real-time token streaming via Server-Sent Events (SSE) with relevance metrics and source citations.",
          "FastAPI backend with LangGraph decision agent and modern Next.js / React UI.",
        ],
      },
      tags: ["FastAPI", "LangGraph", "ChromaDB", "FastEmbed", "Next.js", "SSE Streaming"],
      links: {
        code: "https://github.com/mahamoud-diabate/SYNKORTEX",
      },
    },
    {
      id: "compare-tech",
      category: "web",
      title: { fr: "Compare-Tech — Plateforme de benchmarks", en: "Compare-Tech — Benchmark Platform" },
      meta: {
        fr: "2025 – en cours · Web Full-Stack",
        en: "2025 – ongoing · Full-Stack Web",
      },
      badge: { fr: "En production", en: "Live Web", featured: false },
      desc: {
        fr: "Plateforme web de comparaison de matériel informatique (processeurs, cartes graphiques, PC portables, smartphones) basée sur des benchmarks réels et graphiques radar comparatifs.",
        en: "Hardware benchmark comparison web platform (CPUs, GPUs, Laptops, Smartphones) powered by real-world multi-source scores and side-by-side radar charts.",
      },
      urlLabel: "https://compare-tech-king2mos-projects.vercel.app",
      image: "/images/compare-tech-home.webp",
      video: { poster: "/images/compare-tech-poster.jpg", mp4: "/videos/compare-tech.mp4", webm: "/videos/compare-tech.webm" },
      screenshots: [
        "/images/compare-cpus.webp",
        "/images/compare-gpus.webp",
        "/images/compare-laptops.webp",
        "/images/compare-phones.webp",
      ],
      highlights: {
        fr: [
          "440 produits indexés (136 processeurs, 104 cartes graphiques, 100 PC portables, 100 smartphones).",
          "Calculs de scores pondérés issus de Geekbench 6, 3DMark TimeSpy et AnTuTu.",
          "Architecture full-stack : frontend React déployé sur Vercel, API REST Node.js/Express et MongoDB sur Render.",
        ],
        en: [
          "440 indexed devices (136 CPUs, 104 GPUs, 100 laptops, 100 smartphones).",
          "Weighted performance scores calculated from Geekbench 6, 3DMark TimeSpy, and AnTuTu.",
          "Full-stack architecture: React frontend on Vercel, REST API Node.js/Express and MongoDB on Render.",
        ],
      },
      tags: ["React", "Node.js", "Express", "MongoDB", "Vercel", "REST API"],
      links: {
        demo: "https://compare-tech-king2mos-projects.vercel.app",
        code: "https://github.com/mahamoud-diabate/compare-tech",
      },
    },
    {
      id: "cpp-systems",
      category: "systems",
      title: { fr: "Systèmes C++ & Travaux académiques", en: "C++ Systems & Academic Coursework" },
      meta: {
        fr: "2024 – 2026 · C++20, Google Test, CMake",
        en: "2024 – 2026 · C++20, Google Test, CMake",
      },
      badge: { fr: "C++ Moderne", en: "Modern C++", featured: false },
      desc: {
        fr: "Architecture orientée objet en C++ moderne : système de gestion de parc de véhicules avec hiérarchie polymorphique, validation contractuelle rigoureuse et suite de tests Google Test (GTest). Portage natif Win32 et CMake.",
        en: "Modern C++ object-oriented architecture: fleet management system with polymorphic hierarchy, strict contractual validation, and full Google Test (GTest) test suite. Native Win32 & CMake port.",
      },
      image: "",
      highlights: {
        fr: [
          "Hiérarchie polymorphique C++20 avec gestion stricte de la mémoire (RAII, pointeurs intelligents).",
          "Suite de tests unitaires automatisés avec Google Test (GTest).",
          "Code source disponible sur demande pour respect de l'intégrité académique.",
        ],
        en: [
          "Modern C++20 polymorphic hierarchy with strict memory management (RAII, smart pointers).",
          "Automated unit testing suite with Google Test (GTest).",
          "Source code available upon request to preserve academic integrity.",
        ],
      },
      tags: ["C++20", "CMake", "Google Test", "RAII", "Design Patterns", "Win32 API"],
    },
  ],

  stack: [
    {
      index: "01",
      name: { fr: "Langages", en: "Languages" },
      skills: ["C++", "Python", "JavaScript", "SQL", "TypeScript", "Java", "HTML / CSS"],
    },
    {
      index: "02",
      name: { fr: "Backend & Données", en: "Backend & Data" },
      skills: ["FastAPI", "Node.js", "Express", "SQLite", "MongoDB", "ChromaDB", "REST API", "Docker"],
    },
    {
      index: "03",
      name: { fr: "Frontend & UI", en: "Frontend & UI" },
      skills: ["React", "Next.js", "Tailwind CSS", "Vite", "Tkinter", "Figma"],
    },
    {
      index: "04",
      name: { fr: "IA & Systèmes", en: "AI & Systems" },
      skills: ["RAG Local", "LangGraph", "FastEmbed", "Embeddings Vectoriels", "SSE Streaming", "Google Test", "CMake"],
    },
    {
      index: "05",
      name: { fr: "Outils & Distribution", en: "Tools & Shipping" },
      skills: ["Git & GitHub", "Linux", "PyInstaller", "Inno Setup", "Vercel", "Render"],
    },
  ],

  experience: [
    {
      id: "postes-canada",
      company: "Postes Canada",
      role: { fr: "Agent de services postaux", en: "Postal Services Officer" },
      period: { fr: "Sept. 2024 — présent · Québec", en: "Sept. 2024 — Present · Quebec City" },
      desc: {
        fr: "Traitement des envois de colis et suivi logistique sur les logiciels internes. Gestion des encaissements, balancement quotidien de caisse et contrôle de conformité des expéditions internationales.",
        en: "Parcel logistics tracking and handling via internal software. Cash balance management, point-of-sale transactions, and international customs compliance verification.",
      },
      tags: ["Systèmes transactionnels", "Logistique", "Conformité douanière"],
    },
    {
      id: "wis",
      company: "WIS International",
      role: { fr: "Auditeur d'inventaire", en: "Inventory Auditor" },
      period: { fr: "2024 · Québec", en: "2024 · Quebec City" },
      desc: {
        fr: "Audit et inventaire physique de stocks en commerces sur terminaux mobiles industriels, avec exigences strictes de cadence et d'exactitude.",
        en: "Physical stock auditing for retail stores using industrial handheld barcode scanners with strict speed and accuracy requirements.",
      },
      tags: ["Audit de stock", "Terminaux mobiles", "Contrôle qualité"],
    },
    {
      id: "yango",
      company: "Yango / ETS Mounir Transport",
      role: { fr: "Gestionnaire de flotte et conseiller client", en: "Fleet Manager / Operations" },
      period: { fr: "2022 — présent · Abidjan", en: "2022 — Present · Abidjan" },
      desc: {
        fr: "Supervision d'une flotte de véhicules sur plateforme en ligne : suivi des courses, gestion des comptes et flux de paiements, formation des chauffeurs et résolution des litiges.",
        en: "Transport fleet supervision on digital dispatch platform: trip tracking, payout reconciliation, driver onboarding, and dispute resolution.",
      },
      tags: ["Gestion d'opérations", "Flux financiers", "Support client"],
    },
  ],

  education: [
    {
      id: "ulaval",
      school: "Université Laval",
      degree: { fr: "Baccalauréat en informatique (B. Sc. A.)", en: "B.Sc.A. in Computer Science" },
      period: { fr: "2024 — 2028 · Québec", en: "2024 — 2028 · Quebec City" },
      desc: {
        fr: "En cours (cheminement étalé, 18 h/semaine). Cours : programmation C++ (IFT-1006 / GIF-1003), ordinateurs : structure et applications (GIF-1001).",
        en: "In progress (part-time work schedule, 18 hrs/week). Courses: C++ Systems Programming (IFT-1006 / GIF-1003), Computer Structure & Applications (GIF-1001).",
      },
      tags: ["C++ Moderne", "Structures de données & Algorithmes", "Systèmes & Logique"],
    },
    {
      id: "iugb",
      school: "International University of Grand-Bassam",
      degree: { fr: "Études universitaires en économie", en: "University Studies in Economics" },
      period: { fr: "2019 — 2021", en: "2019 — 2021" },
      desc: {
        fr: "Solide base en analyse quantitative, économétrie et modélisation de systèmes.",
        en: "Strong foundation in quantitative analysis, econometrics, and systems modeling.",
      },
      tags: ["Analyse quantitative", "Économétrie", "Modélisation"],
    },
  ],
};

