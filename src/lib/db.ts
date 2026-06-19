// Types
export interface Product {
  id: string;
  name: string;
  tag: string;
  price: string;
  oldPrice?: string;
  rating: number;
  isReadyToDeploy: boolean;
  category?: string;
}

export interface Service {
  id: string;
  iconName: string; // Lucide icon component name
  title: string;
  desc: string;
}

export interface Milestone {
  id: string;
  y: string; // year
  t: string; // title
  d: string; // description
}

export interface TeamMember {
  id: string;
  n: string; // name
  r: string; // role
}

export interface AboutStats {
  projectsShipped: string;
  happyClients: string;
  yearsInBusiness: string;
  teamSize: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  desc: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

// Default Data Seeds
const DEFAULT_PRODUCTS: Product[] = [
  { id: "p1", name: "InventoryX ERP", tag: "Stock & finance, one screen", price: "₹24,999", oldPrice: "₹39,999", rating: 4.9, isReadyToDeploy: true },
  { id: "p2", name: "FleetPilot SaaS", tag: "GPS fleet tracking dashboard", price: "₹14,999", oldPrice: "₹19,999", rating: 4.8, isReadyToDeploy: true },
  { id: "p3", name: "ClinicCare PMS", tag: "Patients, billing & telehealth", price: "₹29,999", oldPrice: "₹44,999", rating: 5.0, isReadyToDeploy: true },
  { id: "p4", name: "RetailBoom POS", tag: "Multi-store retail POS", price: "₹9,999", oldPrice: "₹14,999", rating: 4.7, isReadyToDeploy: true },
  { id: "p5", name: "E-Learning Hub", tag: "LMS platform for training providers", price: "₹34,999", oldPrice: "₹49,999", rating: 4.6, isReadyToDeploy: false }
];

const DEFAULT_SERVICES: Service[] = [
  { id: "s1", iconName: "Smartphone", title: "Android Apps", desc: "Native Kotlin & Java apps with push, payments and Play Store launch." },
  { id: "s2", iconName: "Apple", title: "iOS Apps", desc: "SwiftUI experiences, App Store optimisation and TestFlight beta cycles." },
  { id: "s3", iconName: "Code2", title: "Web Development", desc: "React & Next.js frontends with Node, Laravel or GraphQL backends." },
  { id: "s4", iconName: "Database", title: "ERP Software", desc: "Inventory, HR, payroll, procurement and finance — unified dashboards." },
  { id: "s5", iconName: "Palette", title: "Brand Handling", desc: "Strategy, logos, guidelines, stationery and brand audits that scale." },
  { id: "s6", iconName: "Megaphone", title: "Social Media", desc: "Calendars, reels, community management and influencer partnerships." },
  { id: "s7", iconName: "BarChart3", title: "Digital Marketing", desc: "SEO, Google & Meta Ads, email automation and conversion optimisation." },
  { id: "s8", iconName: "Layers", title: "UI / UX Design", desc: "Figma prototypes, usability testing and reusable design systems." }
];

const DEFAULT_STATS: AboutStats = {
  projectsShipped: "320+",
  happyClients: "180+",
  yearsInBusiness: "9+",
  teamSize: "40+"
};

const DEFAULT_MILESTONES: Milestone[] = [
  { id: "m1", y: "2017", t: "Founded in Bengaluru", d: "Two engineers, one promise: software that earns its keep." },
  { id: "m2", y: "2019", t: "Crossed 50 clients", d: "Expanded into ERP and mobile app verticals." },
  { id: "m3", y: "2021", t: "Launched first SaaS", d: "FleetPilot — now used in 6 countries." },
  { id: "m4", y: "2023", t: "Team of 40+", d: "Opened design and growth marketing studios." },
  { id: "m5", y: "2026", t: "300+ projects shipped", d: "Trusted by Linkstream, Greenstone, FitNest and more." }
];

const DEFAULT_TEAM: TeamMember[] = [
  { id: "t1", n: "Aarav Sharma", r: "Founder & CEO" },
  { id: "t2", n: "Diya Kapoor", r: "Head of Engineering" },
  { id: "t3", n: "Vikram Joshi", r: "Design Director" },
  { id: "t4", n: "Neha Iyer", r: "Growth Lead" }
];

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  { id: "pf1", title: "Linkstream Supply Chain ERP", category: "ERP Systems", client: "Linkstream Logistics", year: "2025", desc: "Re-engineered standard shipping dashboard into a real-time web portal tracking 4,000+ daily container consignments, improving route dispatch times by 24%.", link: "#" },
  { id: "pf2", title: "FitNest iOS & Android Apps", category: "Mobile Apps", client: "FitNest Wellness", year: "2024", desc: "Built cross-platform application with integrated bluetooth heart monitors, personalized workout planners, and social community feeds. App Store rating rose to 4.8.", link: "#" },
  { id: "pf3", title: "Greenstone Headless Commerce", category: "Web Development", client: "Greenstone Organics", year: "2025", desc: "Created high-performance Shopify custom integration using Next.js, boosting core web vitals speed scores and lifting transaction checkouts by 18%.", link: "#" },
  { id: "pf4", title: "Arcadia Investment Dashboard", category: "Web Development", client: "Arcadia Capital", year: "2023", desc: "Engineered web-based asset portal with microservice feeds rendering real-time portfolio returns, live candlestick charting, and automated monthly statement outputs.", link: "#" }
];

const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "Why We Migrated to Next.js for Enterprise ERPs",
    summary: "A deep dive into why Server Components, optimized image rendering, and edge route middleware improve standard enterprise SaaS products.",
    content: "Enterprise Resource Planning systems have historically been heavy, client-rendered single page applications. We outline our architectural pivot to hybrid Next.js systems, showing how server rendering and optimized edge databases cut dashboard load times in half while increasing telemetry security.",
    date: "June 15, 2026",
    author: "Diya Kapoor",
    readTime: "6 min read"
  },
  {
    id: "b2",
    title: "Designing Cross-Platform Systems: Figma to Native Code",
    summary: "Lessons learned building identical experiences across SwiftUI and Android Kotlin Compose out of a single design system.",
    content: "Consistency in UX across Apple iOS and Google Android is difficult. Our design director shares the workflow patterns we developed to map Figma design tokens straight to Tailwind-compatible styles and native UI modules, reducing engineering double-work by 30%.",
    date: "May 28, 2026",
    author: "Vikram Joshi",
    readTime: "4 min read"
  },
  {
    id: "b3",
    title: "SEO Frameworks for Bootstrapped Startups in 2026",
    summary: "How to capture and compound high-intent organic traffic without paying for expensive advertising campaigns.",
    content: "Organic visibility continues to be the highest yielding channel. We detail the technical indexing strategies, structured JSON-LD schemas, and keyword alignment systems we used to triple organic conversion funnels for Greenstone without any ad-spend.",
    date: "April 12, 2026",
    author: "Neha Iyer",
    readTime: "5 min read"
  }
];

// Helper to initialize localStorage key safely
function initKey<T>(key: string, defaultValue: T): T {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(data);
  } catch {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
}

// Initial seeding checks
initKey<Product[]>("ab_products", DEFAULT_PRODUCTS);
initKey<Service[]>("ab_services", DEFAULT_SERVICES);
initKey<AboutStats>("ab_stats", DEFAULT_STATS);
initKey<Milestone[]>("ab_milestones", DEFAULT_MILESTONES);
initKey<TeamMember[]>("ab_team", DEFAULT_TEAM);
initKey<PortfolioItem[]>("ab_portfolio", DEFAULT_PORTFOLIO);
initKey<BlogPost[]>("ab_blogs", DEFAULT_BLOGS);
initKey<ContactSubmission[]>("ab_submissions", []);

// Database Methods
export const db = {
  // PRODUCTS
  getProducts(): Product[] {
    return JSON.parse(localStorage.getItem("ab_products") || "[]");
  },
  saveProduct(p: Product): void {
    const list = this.getProducts();
    const index = list.findIndex((x) => x.id === p.id);
    if (index > -1) {
      list[index] = p;
    } else {
      list.push(p);
    }
    localStorage.setItem("ab_products", JSON.stringify(list));
  },
  deleteProduct(id: string): void {
    const list = this.getProducts().filter((x) => x.id !== id);
    localStorage.setItem("ab_products", JSON.stringify(list));
  },

  // SERVICES
  getServices(): Service[] {
    return JSON.parse(localStorage.getItem("ab_services") || "[]");
  },
  saveService(s: Service): void {
    const list = this.getServices();
    const index = list.findIndex((x) => x.id === s.id);
    if (index > -1) {
      list[index] = s;
    } else {
      list.push(s);
    }
    localStorage.setItem("ab_services", JSON.stringify(list));
  },
  deleteService(id: string): void {
    const list = this.getServices().filter((x) => x.id !== id);
    localStorage.setItem("ab_services", JSON.stringify(list));
  },

  // STATS
  getStats(): AboutStats {
    return JSON.parse(localStorage.getItem("ab_stats") || JSON.stringify(DEFAULT_STATS));
  },
  saveStats(stats: AboutStats): void {
    localStorage.setItem("ab_stats", JSON.stringify(stats));
  },

  // MILESTONES
  getMilestones(): Milestone[] {
    return JSON.parse(localStorage.getItem("ab_milestones") || "[]");
  },
  saveMilestone(m: Milestone): void {
    const list = this.getMilestones();
    const index = list.findIndex((x) => x.id === m.id);
    if (index > -1) {
      list[index] = m;
    } else {
      list.push(m);
    }
    localStorage.setItem("ab_milestones", JSON.stringify(list));
  },
  deleteMilestone(id: string): void {
    const list = this.getMilestones().filter((x) => x.id !== id);
    localStorage.setItem("ab_milestones", JSON.stringify(list));
  },

  // TEAM
  getTeam(): TeamMember[] {
    return JSON.parse(localStorage.getItem("ab_team") || "[]");
  },
  saveTeamMember(t: TeamMember): void {
    const list = this.getTeam();
    const index = list.findIndex((x) => x.id === t.id);
    if (index > -1) {
      list[index] = t;
    } else {
      list.push(t);
    }
    localStorage.setItem("ab_team", JSON.stringify(list));
  },
  deleteTeamMember(id: string): void {
    const list = this.getTeam().filter((x) => x.id !== id);
    localStorage.setItem("ab_team", JSON.stringify(list));
  },

  // PORTFOLIO
  getPortfolio(): PortfolioItem[] {
    return JSON.parse(localStorage.getItem("ab_portfolio") || "[]");
  },
  savePortfolioItem(p: PortfolioItem): void {
    const list = this.getPortfolio();
    const index = list.findIndex((x) => x.id === p.id);
    if (index > -1) {
      list[index] = p;
    } else {
      list.push(p);
    }
    localStorage.setItem("ab_portfolio", JSON.stringify(list));
  },
  deletePortfolioItem(id: string): void {
    const list = this.getPortfolio().filter((x) => x.id !== id);
    localStorage.setItem("ab_portfolio", JSON.stringify(list));
  },

  // BLOGS
  getBlogs(): BlogPost[] {
    return JSON.parse(localStorage.getItem("ab_blogs") || "[]");
  },
  saveBlogPost(b: BlogPost): void {
    const list = this.getBlogs();
    const index = list.findIndex((x) => x.id === b.id);
    if (index > -1) {
      list[index] = b;
    } else {
      list.push(b);
    }
    localStorage.setItem("ab_blogs", JSON.stringify(list));
  },
  deleteBlogPost(id: string): void {
    const list = this.getBlogs().filter((x) => x.id !== id);
    localStorage.setItem("ab_blogs", JSON.stringify(list));
  },

  // SUBMISSIONS
  getSubmissions(): ContactSubmission[] {
    return JSON.parse(localStorage.getItem("ab_submissions") || "[]");
  },
  saveSubmission(s: ContactSubmission): void {
    const list = this.getSubmissions();
    list.push(s);
    localStorage.setItem("ab_submissions", JSON.stringify(list));
  },
  markSubmissionRead(id: string, isRead = true): void {
    const list = this.getSubmissions();
    const index = list.findIndex((x) => x.id === id);
    if (index > -1) {
      list[index].isRead = isRead;
      localStorage.setItem("ab_submissions", JSON.stringify(list));
    }
  },
  deleteSubmission(id: string): void {
    const list = this.getSubmissions().filter((x) => x.id !== id);
    localStorage.setItem("ab_submissions", JSON.stringify(list));
  }
};
