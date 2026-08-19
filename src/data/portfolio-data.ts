export interface Project {
  id: string;
  title: { fr: string; en: string };
  meta: { fr: string; en: string };
  badge?: { fr: string; en: string; featured?: boolean };
  desc: { fr: string; en: string };
  urlLabel?: string;
  image: string;
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
      fr: "Je construis des logiciels qui tournent, du backend à la distribution.",
      en: "I build software that ships, from backend to distribution.",
    },
    status: {
      fr: "Stage recherché — été 2027 · Québec, QC",
      en: "Seeking summer 2027 internship · Quebec City, QC",
    },
    email: "madia262@ulaval.ca",
    altEmail: "diabatemahamoud00@outlook.com",
    location: "Québec, QC, Canada",
    education: {
      fr: "B. Sc. Informatique @ Univ. Laval",
      en: "B.Sc. Computer Science @ Univ. Laval",
    },
    role: {
      fr: "Développeur Full-Stack & IA",
      en: "Full-Stack & AI Developer",
    },
    github: "https://github.com/mahamoud-diabate",
    linkedin: "https://www.linkedin.com/in/mahamoud-diabate",
  },

  about: {
    fr: [
      "Je suis **Mahamoud Diabate** — étudiant en informatique à l'Université Laval et développeur passionné par les systèmes fiables, l'IA générative et le design d'interface soigné.",
      "J'aime concevoir des architectures complètes, du backend robuste à la distribution autonome : créateur de [SODIPAC](https://github.com/mahamoud-diabate/SODIPAC) (ERP testé en conditions réelles avec 319 tests automatisés), du [Moteur RAG local](https://github.com/mahamoud-diabate/local-agentic-rag) (100% hors-ligne avec streaming SSE) et de [Compare-Tech](https://compare-tech-frontend.vercel.app) (440 produits benchmarkés).",
      "Actuellement à la recherche d'un **stage en développement logiciel pour l'été 2027** à Québec ou en télétravail.",
    ],
    en: [
      "I’m **Mahamoud Diabate** — Computer Science student at Université Laval and developer passionate about reliable distributed systems, generative AI, and meticulous UI craftsmanship.",
      "I design end-to-end architectures from robust backends to standalone distribution: creator of [SODIPAC](https://github.com/mahamoud-diabate/SODIPAC) (enterprise ERP with 319 automated tests), [Local RAG Engine](https://github.com/mahamoud-diabate/local-agentic-rag) (100% offline with SSE streaming), and [Compare-Tech](https://compare-tech-frontend.vercel.app) (440 benchmarked products).",
      "Currently seeking a **software engineering internship for Summer 2027** in Quebec City or remote.",
    ],
  },

  projects: [
    {
      id: "sodipac",
      title: { fr: "SODIPAC — ERP & gestion de stock", en: "SODIPAC — ERP & inventory management" },
      meta: {
        fr: "2025 – en cours · Application Desktop Commerciale",
        en: "2025 – ongoing · Commercial Desktop Application",
      },
      badge: { fr: "Éprouvé en entreprise", en: "Business-tested", featured: true },
      desc: {
        fr: "Logiciel de gestion commerciale autonome pour un magasin de pièces automobiles, éprouvé en conditions réelles dans l'entreprise. Caisse, stock multi-dépôts au coût unitaire moyen pondéré, créances, achats et retours.",
        en: "Autonomous ERP and inventory management software for an auto parts dealership, trialled under real conditions inside the business. POS, weighted average cost multi-warehouse inventory, receivables, purchasing, and returns.",
      },
      image: "/images/sodipac-dashboard.webp",
      highlights: {
        fr: [
          "319 tests unitaires & intégration, distribué en exécutable Windows via PyInstaller & Inno Setup.",
          "Architecture de 18 mixins modulaires sur SQLite (23 tables relationnelles, 33 index).",
          "Tableau de bord de bord KPI avec alertes de rupture, valorisation CUMP et bilans de trésorerie.",
        ],
        en: [
          "319 unit & integration tests, shipped as a standalone Windows executable via PyInstaller & Inno Setup.",
          "18 modular mixins architecture over SQLite (23 relational tables, 33 indices).",
          "KPI dashboard with real-time stockout alerts, AVCO valuation, and financial reports.",
        ],
      },
      tags: ["Python", "Tkinter", "SQLite", "PyInstaller", "PyTest (319)"],
      links: {
        code: "https://github.com/mahamoud-diabate/SODIPAC",
      },
    },
    {
      id: "local-rag",
      title: { fr: "Moteur Corrective RAG local", en: "Local Corrective RAG engine" },
      meta: {
        fr: "2025 – 2026 · IA Générative & Recherche Vectorielle",
        en: "2025 – 2026 · Generative AI & Vector Search",
      },
      badge: { fr: "100% Offline", en: "100% Offline", featured: true },
      desc: {
        fr: "Pipeline Corrective RAG avec agent de décision : reformulation des requêtes, recherche vectorielle locale (ChromaDB + Ollama) et bascule web automatique avec citations des sources.",
        en: "Corrective RAG pipeline with agentic routing: query reformulation, local vector search (ChromaDB + Ollama), and automatic web fallback with verifiable source citations.",
      },
      image: "/images/rag-web.webp",
      highlights: {
        fr: [
          "Exécution 100% locale sans fuite de données, embeddings calculés via Ollama (nomic-embed-text / llama3).",
          "Streaming de tokens en temps réel via Server-Sent Events (SSE) avec indicateurs de pertinence.",
          "Backend FastAPI, graphe de décision LangGraph, interface web moderne React/Next.js.",
        ],
        en: [
          "100% offline local execution with zero data leakage, embeddings computed locally via Ollama.",
          "Real-time token streaming via Server-Sent Events (SSE) with relevance indicators.",
          "FastAPI backend, LangGraph decision graph, and modern React/Next.js frontend.",
        ],
      },
      tags: ["FastAPI", "LangGraph", "ChromaDB", "Ollama", "SSE Streaming"],
      links: {
        code: "https://github.com/mahamoud-diabate/local-agentic-rag",
      },
    },
    {
      id: "compare-tech",
      title: { fr: "Compare-Tech — plateforme de benchmarks", en: "Compare-Tech — benchmark platform" },
      meta: {
        fr: "2025 – 2026 · Web Full-Stack",
        en: "2025 – 2026 · Web Full-Stack",
      },
      badge: { fr: "Live Web", en: "Live Web", featured: false },
      desc: {
        fr: "Plateforme web de comparaison de matériel informatique (CPUs, GPUs, Laptops, Smartphones) basée sur des benchmarks réels avec graphiques comparatifs radar.",
        en: "Hardware benchmark comparison platform (CPUs, GPUs, Laptops, Smartphones) powered by real-world multi-source scores and side-by-side radar charts.",
      },
      urlLabel: "https://compare-tech-frontend.vercel.app",
      image: "/images/compare-tech-home.webp",
      highlights: {
        fr: [
          "440 produits indexés : 136 processeurs, 104 cartes graphiques, 100 PC portables, 100 smartphones.",
          "Calculs pondérés issus de Geekbench 6, 3DMark TimeSpy et AnTuTu.",
          "Déploiement CI/CD : React sur Vercel, API REST Node.js/Express et MongoDB sur Render.",
        ],
        en: [
          "440 indexed products: 136 processors, 104 graphics cards, 100 laptops, 100 smartphones.",
          "Weighted scores aggregated from Geekbench 6, 3DMark TimeSpy, and AnTuTu.",
          "CI/CD deployment: React on Vercel, REST API Node.js/Express and MongoDB on Render.",
        ],
      },
      tags: ["React", "Node.js", "Express", "MongoDB", "Vercel"],
      links: {
        demo: "https://compare-tech-frontend.vercel.app",
        code: "https://github.com/mahamoud-diabate/compare-tech",
      },
    },
    {
      id: "cpp-systems",
      title: { fr: "Systèmes C++ & travaux académiques", en: "C++ systems & academic work" },
      meta: {
        fr: "2024 – 2026 · C++, Google Test, CMake",
        en: "2024 – 2026 · C++, Google Test, CMake",
      },
      badge: { fr: "C++ Natif", en: "Native C++", featured: false },
      desc: {
        fr: "Architecture orientée objet en C++ moderne : gestionnaire de parc de véhicules avec polymorphisme, validation contractuelle rigoureuse et suite de tests Google Test (GTest). Portage natif Win32 & CMake.",
        en: "Modern C++ object-oriented architecture: fleet management system with polymorphism, strict contractual validation, and full Google Test (GTest) coverage. Win32 & CMake native port.",
      },
      image: "",
      highlights: {
        fr: [
          "Hiérarchie polymorphique C++20 avec gestion stricte de la mémoire et RAII.",
          "Suite de tests unitaires automatisés Google Test (GTest).",
          "Travaux disponibles sur demande pour respect de l'intégrité académique.",
        ],
        en: [
          "Modern C++20 polymorphic hierarchy with strict memory management & RAII.",
          "Automated unit testing suite with Google Test (GTest).",
          "Academic course works available upon request.",
        ],
      },
      tags: ["C++20", "CMake", "Google Test", "Win32 API", "Design Patterns"],
    },
  ],

  stack: [
    {
      index: "01",
      name: { fr: "Langages", en: "Languages" },
      skills: ["Python", "C++", "TypeScript", "JavaScript", "SQL", "Java", "HTML / CSS"],
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
      name: { fr: "IA Générative", en: "Generative AI" },
      skills: ["Corrective RAG", "LangGraph", "Ollama", "Embeddings locaux", "SSE Streaming"],
    },
    {
      index: "05",
      name: { fr: "Outils & Workflow", en: "Tools & Workflow" },
      skills: ["Git & GitHub", "Linux", "CMake", "Google Test", "PyInstaller", "Vercel", "Render"],
    },
  ],

  experience: [
    {
      id: "postes-canada",
      company: "Postes Canada",
      role: { fr: "Agent de services postaux", en: "Postal Services Officer" },
      period: { fr: "Sept. 2025 — présent · Québec", en: "Sept. 2025 — Present · Quebec City" },
      desc: {
        fr: "Systèmes transactionnels web, suivi logistique, gestion d'envois, transactions financières et conformité des expéditions internationales.",
        en: "Web-based transactional systems, logistics tracking, parcel management, financial transactions, and international customs compliance.",
      },
      tags: ["Systèmes transactionnels", "Logistique", "Service client"],
    },
    {
      id: "wis",
      company: "WIS International",
      role: { fr: "Auditeur d'inventaire", en: "Inventory Auditor" },
      period: { fr: "2024 · Québec", en: "2024 · Quebec City" },
      desc: {
        fr: "Audit des stocks de grandes enseignes commerciales sur terminaux mobiles industriels, avec des exigences rigoureuses de précision et de cadence.",
        en: "Stock auditing for major retail chains using industrial handheld mobile terminals with stringent accuracy and speed benchmarks.",
      },
      tags: ["Audit de stock", "Terminaux mobiles", "Contrôle qualité"],
    },
    {
      id: "yango",
      company: "Yango / ETS Mounir Transport",
      role: { fr: "Gestionnaire de flotte / conseiller client", en: "Fleet Manager / Customer Success" },
      period: { fr: "2017 — 2023 · Abidjan", en: "2017 — 2023 · Abidjan" },
      desc: {
        fr: "Supervision d'une flotte de transport via plateforme numérique, gestion des comptes et flux de paiements, résolution de litiges et encadrement d'équipe. 6 ans passés du côté métier que j'informatise aujourd'hui.",
        en: "Supervision of a transport fleet via digital dispatch platform, accounts and cashflow management, dispute resolution, and team leadership. 6 years of industry domain expertise.",
      },
      tags: ["Gestion de flotte", "Encadrement d'équipe", "Flux financiers"],
    },
  ],

  education: [
    {
      id: "ulaval",
      school: "Université Laval",
      degree: { fr: "Baccalauréat en informatique (B. Sc.)", en: "B.Sc. in Computer Science" },
      period: { fr: "2024 — 2028 · Québec", en: "2024 — 2028 · Quebec City" },
      desc: {
        fr: "Programmation C++ (IFT-1006 / GIF-1003), informatique théorique (IFT-2002), logique et techniques de preuve, systèmes d'information organisationnels.",
        en: "C++ Systems Programming (IFT-1006 / GIF-1003), Theoretical CS (IFT-2002), Logic and Proof Techniques, Enterprise Information Systems.",
      },
      tags: ["C++ Moderne", "Structures de données & Algorithmes", "Systèmes d'exploitation"],
    },
    {
      id: "iugb",
      school: "International University of Grand-Bassam",
      degree: { fr: "Études universitaires en économie", en: "University Studies in Economics" },
      period: { fr: "2018 — 2022", en: "2018 — 2022" },
      desc: {
        fr: "Équivalence de 3e année complétée avec distinction. Solide base en analyse quantitative, économétrie et modélisation de systèmes.",
        en: "3rd-year equivalence achieved with honors. Strong foundation in quantitative analysis, econometrics, and systems modeling.",
      },
      tags: ["Analyse quantitative", "Économétrie", "Modélisation"],
    },
  ],
};
