// Every piece of copy on the site lives here, sourced from the CV and the previous portfolio.

export const profile = {
  name: "Eliza Rica De La Rosa",
  firstName: "Eliza Rica",
  lastName: "De La Rosa",
  location: "Manila, PH",
  timeZone: "Asia/Manila",
  email: "eliza_delarosa@dlsu.edu.ph",
  github: "https://github.com/aeilzmabel",
  current: { role: "Application Developer – Cloud Fullstack", company: "IBM" },
  roles: ["AI Mobile Engineer", "Cloud Fullstack Developer", "Computer Engineer", "ML & IoT Builder", "Web Developer"],
  intro:
    "Computer Engineering graduate from De La Salle University, now training as a cloud fullstack developer at IBM and building on-device AI at Supervaise. I care about the details: the latency of an inference call, the battery it costs, and the way a hover state feels.",
  cv: {
    href: "/cv/Eliza-Rica-De-La-Rosa-CV.pdf",
    filename: "Eliza-Rica-De-La-Rosa-CV.pdf",
    meta: "PDF · 3 pages",
  },
} as const;

export const highlights = [
  { value: "95.7%", label: "Isolation Forest precision on real truck telemetry" },
  { value: "20,412", label: "Telemetry records evaluated across 79 trips" },
  { value: "Gold", label: "DLSU thesis nominee, 2026" },
  { value: "NVIDIA", label: "Fundamentals of Deep Learning, 2025" },
] as const;

export type Entry = {
  id: string;
  group: "Work" | "Education";
  org: string;
  glyph: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
  note?: { label: string; body: string };
};

export const entries: Entry[] = [
  {
    id: "ibm",
    group: "Work",
    org: "IBM",
    glyph: "IBM",
    role: "Application Developer – Cloud Fullstack",
    location: "Manila, Metro Manila",
    period: "Oct 2026 — Present",
    current: true,
    points: [
      "Completing structured training in cloud and fullstack application development, covering frontend and backend development, databases, APIs, and cloud deployment, with hands-on assessments to validate skills.",
      "Building practice applications using fullstack and cloud development tools, applying version control with Git and containerization with Docker.",
      "Applying prior experience in React, Node.js, Python, and testing to coursework, following IBM engineering practices and collaborating with peers and mentors.",
    ],
    tags: ["Cloud", "Fullstack", "APIs", "Databases", "Git", "Docker"],
  },
  {
    id: "supervaise",
    group: "Work",
    org: "Supervaise",
    glyph: "S",
    role: "AI Mobile Engineer",
    location: "Manila, Metro Manila",
    period: "Jun 2026 — Present",
    current: true,
    points: [
      "Engineered and integrated mobile AI inference pipelines, enabling low-latency model predictions and real-time features.",
      "Built hands-on lab dashboards and technical exercises, co-leading the Executive AI Workshop for Bounty Fresh and NVIDIA workshops on deep learning and LLMs.",
      "Profiled and optimized on-device runtime performance, significantly reducing memory overhead and preserving battery efficiency.",
    ],
    tags: ["On-device AI", "Inference pipelines", "Profiling", "Deep learning", "LLMs", "Workshops"],
  },
  {
    id: "xure",
    group: "Work",
    org: "Xure App Inc.",
    glyph: "X",
    role: "Quality Assurance Intern",
    location: "San Juan, Metro Manila",
    period: "Jan — Apr 2026",
    points: [
      "Conducted end-to-end testing across the platform, covering auctions, wallet, and order flows.",
      "Created test cases, reported bugs, and performed regression testing with cross-team collaboration.",
    ],
    tags: ["End-to-end testing", "Regression", "Test design", "Bug reporting"],
  },
  {
    id: "green-giant-fm",
    group: "Work",
    org: "DLSU Green Giant FM",
    glyph: "GG",
    role: "Web Developer",
    location: "Manila, Metro Manila",
    period: "Oct 2022 — Oct 2024",
    points: [
      "Redesigned and developed the station's website using HTML, CSS, and JavaScript.",
      "Used GitHub for version control and Docker for containerized development and deployment, while maintaining the website and digital platforms.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GitHub", "Docker"],
  },
  {
    id: "dlsu",
    group: "Education",
    org: "De La Salle University",
    glyph: "DL",
    role: "BS Computer Engineering",
    location: "Malate, Metro Manila",
    period: "Aug 2022 — Aug 2026",
    points: [
      "Relevant coursework: Machine Learning, Data Structures & Algorithms, Software Engineering, Database Systems, Computer Architecture, and Embedded Systems.",
      "Built full-stack systems across coursework, from database-backed payroll software to interactive digital-circuits references.",
    ],
    note: {
      label: "Thesis · Gold Thesis Nominee",
      body: "An IoT-Enabled System for Real-Time Fuel Monitoring, GPS Tracking, and Anomaly Detection in Trucks Using Non-Parametric Unsupervised Machine Learning.",
    },
    tags: ["Machine learning", "Embedded systems", "Algorithms", "Databases"],
  },
  {
    id: "lpu",
    group: "Education",
    org: "Lyceum of the Philippines University",
    glyph: "LP",
    role: "STEM Track, With Honors",
    location: "Calamba, Laguna",
    period: "Jul 2020 — Jun 2022",
    points: [
      "Graduated with honors from the Science, Technology, Engineering, and Mathematics track.",
      "Completed the Computer Technology Program work immersion at Torres Technology Center Corporation, earning Best in System Presentation, Top Student, and Leadership awards.",
    ],
    tags: ["STEM", "With Honors", "Work immersion"],
  },
];

export type ProjectVisual =
  | "fleet"
  | "route"
  | "apollo"
  | "circuits"
  | "inventory"
  | "composition"
  | "spring";

export type Project = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
  badge?: string;
  stats?: { value: string; label: string }[];
  visual: ProjectVisual;
  /** Column span on the large grid. */
  span: 1 | 2;
};

export const projects: Project[] = [
  {
    id: "fleet-monitor",
    title: "Fleet Monitor",
    kicker: "Undergraduate thesis · 2026",
    description:
      "An IoT-enabled system for real-time fuel monitoring, GPS tracking, and anomaly detection in trucks. Live dashboards, alert logs, driver compliance tracking, and ML-powered detection, deployed on Vercel.",
    tags: ["React", "Node.js", "Supabase", "Flask", "Isolation Forest", "Matrix Profile"],
    href: "https://thesis-tau-two.vercel.app/dashboard",
    linkLabel: "Live",
    badge: "Gold Thesis Nominee",
    stats: [
      { value: "20,412", label: "records" },
      { value: "79", label: "trips" },
      { value: "95.7%", label: "IF precision" },
      { value: "100%", label: "MP precision*" },
    ],
    visual: "fleet",
    span: 2,
  },
  {
    id: "fuel-prototype",
    title: "AI-Driven Fuel Monitoring",
    kicker: "Research prototype · 2025",
    description:
      "Collected real-time fuel level and location data and streamed it to the cloud over low-latency mobile networks, then applied Matrix Profile and Isolation Forest to flag fuel theft and abnormal consumption.",
    tags: ["IoT", "GPS", "Python", "Unsupervised ML"],
    visual: "route",
    span: 1,
  },
  {
    id: "apollo-manager",
    title: "Apollo Manager",
    kicker: "Database systems · 2025",
    description:
      "Payroll and inventory for a motorcycle maintenance garage. Persistent timesheets and salary breakdowns, CSV uploads with automatic backups, and role-based pay for cashier bonuses and night-shift differentials.",
    tags: ["React", "JavaScript", "MySQL"],
    visual: "apollo",
    span: 1,
  },
  {
    id: "digital-circuits",
    title: "Digital Circuits Explorer",
    kicker: "Coursework · DLSU",
    description:
      "An illustrated introduction to basic components in digital circuits: a resistor color-code calculator, capacitor code identifier, logic gates, and a transistor & diode lookup.",
    tags: ["HTML", "CSS", "JavaScript"],
    visual: "circuits",
    span: 1,
  },
  {
    id: "kaliorexi",
    title: "Kaliorexi Inventory",
    kicker: "Client system · 2024",
    description:
      "An authenticated inventory for a fragrance and packaging supplier. Searchable material catalog, filterable by classification, with suppliers, batch numbers, and retest dates.",
    tags: ["React", "Vite", "Supabase"],
    visual: "inventory",
    span: 1,
  },
  {
    id: "group-6",
    title: "Group 6 on Wix",
    kicker: "Visual design",
    description:
      "A purely design-driven site exploring layout composition, visual hierarchy, and aesthetic cohesion, shaped through intentional use of space, color, and typography.",
    tags: ["Wix", "UI/UX", "Visual design"],
    href: "https://eq4gematmw.wixsite.com/group6",
    linkLabel: "Visit",
    visual: "composition",
    span: 1,
  },
  {
    id: "portfolio",
    title: "This portfolio",
    kicker: "Living project · 2026",
    description:
      "The site you're on right now. A living project I keep refining as I grow. Built with Next.js, Tailwind CSS, and Framer Motion, and every interaction settles on the same spring.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    visual: "spring",
    span: 2,
  },
];

export const skills = [
  { label: "Languages", items: ["C", "C++", "Python", "MATLAB", "JavaScript"] },
  {
    label: "Machine learning",
    items: ["Anomaly detection", "Isolation Forest", "Matrix Profile", "Deep learning", "On-device inference"],
  },
  { label: "Web", items: ["HTML", "CSS", "React", "Node.js", "Flask", "Supabase", "MySQL"] },
  { label: "Tools", items: ["Git", "GitHub", "Docker", "Vercel", "Figma", "Claude Code", "OpenAI Codex"] },
  { label: "Spoken", items: ["English", "Tagalog"] },
] as const;

export const recognition = [
  { year: "2026", title: "Gold Thesis Nominee", org: "De La Salle University" },
  {
    year: "2025",
    title: "Fundamentals of Deep Learning",
    org: "NVIDIA",
    detail: "Credential juxi0I-WTAuiJOS-wznE3w",
  },
  { year: "2022", title: "Best in System Presentation", org: "Torres Technology Center Corporation" },
  { year: "2022", title: "Top Student Award", org: "Torres Technology Center Corporation" },
  { year: "2022", title: "Leadership Award", org: "Torres Technology Center Corporation" },
  { year: "2019", title: "2nd Place, PowerPoint Non-Linear", org: "National Student Convention" },
  { year: "2018", title: "1st Place, Science Exhibit (Theoretical)", org: "National Student Convention" },
  { year: "2018", title: "Outstanding in Academics", org: "Metro Lucena Integrated Learning Center" },
] as const;
