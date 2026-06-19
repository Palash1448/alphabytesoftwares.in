import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Info, 
  Briefcase, 
  FileText, 
  Mail, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  X, 
  Eye, 
  PlusCircle,
  TrendingUp,
  Inbox,
  Award,
  Globe
} from "lucide-react";
import { db, Product, Service, Milestone, TeamMember, AboutStats, PortfolioItem, BlogPost, ContactSubmission } from "@/lib/db";
import { PageShell } from "@/components/page-shell";

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "services" | "about" | "portfolio" | "blog" | "contacts">("overview");

  // State Management
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<AboutStats>({ projectsShipped: "", happyClients: "", yearsInBusiness: "", teamSize: "" });
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

  // Modals & Forms State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"product" | "service" | "milestone" | "team" | "portfolio" | "blog" | "none">("none");
  const [editId, setEditId] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  // Form Fields State
  const [productForm, setProductForm] = useState<Partial<Product>>({ name: "", tag: "", price: "", oldPrice: "", rating: 5.0, isReadyToDeploy: true });
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({ iconName: "Code2", title: "", desc: "" });
  const [milestoneForm, setMilestoneForm] = useState<Partial<Milestone>>({ y: "", t: "", d: "" });
  const [teamForm, setTeamForm] = useState<Partial<TeamMember>>({ n: "", r: "" });
  const [portfolioForm, setPortfolioForm] = useState<Partial<PortfolioItem>>({ title: "", category: "Web Development", client: "", year: "", desc: "", link: "#" });
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({ title: "", summary: "", content: "", author: "", readTime: "5 min read" });

  // Load Data
  const refreshData = () => {
    setProducts(db.getProducts());
    setServices(db.getServices());
    setStats(db.getStats());
    setMilestones(db.getMilestones());
    setTeam(db.getTeam());
    setPortfolio(db.getPortfolio());
    setBlogs(db.getBlogs());
    setContacts(db.getSubmissions());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Handle Saves
  const handleProductSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.tag || !productForm.price) return;
    const newProduct: Product = {
      id: editId || `p_${Date.now()}`,
      name: productForm.name,
      tag: productForm.tag,
      price: productForm.price,
      oldPrice: productForm.oldPrice || undefined,
      rating: Number(productForm.rating) || 5.0,
      isReadyToDeploy: !!productForm.isReadyToDeploy,
    };
    db.saveProduct(newProduct);
    setIsModalOpen(false);
    refreshData();
  };

  const handleServiceSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.desc) return;
    const newService: Service = {
      id: editId || `s_${Date.now()}`,
      iconName: serviceForm.iconName || "Code2",
      title: serviceForm.title,
      desc: serviceForm.desc,
    };
    db.saveService(newService);
    setIsModalOpen(false);
    refreshData();
  };

  const handleMilestoneSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneForm.y || !milestoneForm.t || !milestoneForm.d) return;
    const newMilestone: Milestone = {
      id: editId || `m_${Date.now()}`,
      y: milestoneForm.y,
      t: milestoneForm.t,
      d: milestoneForm.d,
    };
    db.saveMilestone(newMilestone);
    setIsModalOpen(false);
    refreshData();
  };

  const handleTeamSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.n || !teamForm.r) return;
    const newTeam: TeamMember = {
      id: editId || `t_${Date.now()}`,
      n: teamForm.n,
      r: teamForm.r,
    };
    db.saveTeamMember(newTeam);
    setIsModalOpen(false);
    refreshData();
  };

  const handlePortfolioSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioForm.title || !portfolioForm.client || !portfolioForm.desc) return;
    const newItem: PortfolioItem = {
      id: editId || `pf_${Date.now()}`,
      title: portfolioForm.title,
      category: portfolioForm.category || "Web Development",
      client: portfolioForm.client,
      year: portfolioForm.year || new Date().getFullYear().toString(),
      desc: portfolioForm.desc,
      link: portfolioForm.link || "#",
    };
    db.savePortfolioItem(newItem);
    setIsModalOpen(false);
    refreshData();
  };

  const handleBlogSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.summary || !blogForm.content || !blogForm.author) return;
    const newBlog: BlogPost = {
      id: editId || `b_${Date.now()}`,
      title: blogForm.title,
      summary: blogForm.summary,
      content: blogForm.content,
      date: editId ? (blogs.find(x => x.id === editId)?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })) : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: blogForm.author,
      readTime: blogForm.readTime || "5 min read",
    };
    db.saveBlogPost(newBlog);
    setIsModalOpen(false);
    refreshData();
  };

  const handleStatsSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveStats(stats);
    alert("Stats updated successfully!");
    refreshData();
  };

  // Open Modals for Add
  const openAddModal = (type: typeof modalType) => {
    setEditId(null);
    setModalType(type);
    setIsModalOpen(true);
    // Reset forms
    if (type === "product") setProductForm({ name: "", tag: "", price: "", oldPrice: "", rating: 5.0, isReadyToDeploy: true });
    if (type === "service") setServiceForm({ iconName: "Code2", title: "", desc: "" });
    if (type === "milestone") setMilestoneForm({ y: "", t: "", d: "" });
    if (type === "team") setTeamForm({ n: "", r: "" });
    if (type === "portfolio") setPortfolioForm({ title: "", category: "Web Development", client: "", year: new Date().getFullYear().toString(), desc: "", link: "#" });
    if (type === "blog") setBlogForm({ title: "", summary: "", content: "", author: "", readTime: "5 min read" });
  };

  // Open Modals for Edit
  const openEditModal = (type: typeof modalType, item: any) => {
    setEditId(item.id);
    setModalType(type);
    setIsModalOpen(true);
    if (type === "product") setProductForm(item);
    if (type === "service") setServiceForm(item);
    if (type === "milestone") setMilestoneForm(item);
    if (type === "team") setTeamForm(item);
    if (type === "portfolio") setPortfolioForm(item);
    if (type === "blog") setBlogForm(item);
  };

  // Deletions
  const handleDelete = (type: typeof modalType, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    if (type === "product") db.deleteProduct(id);
    if (type === "service") db.deleteService(id);
    if (type === "milestone") db.deleteMilestone(id);
    if (type === "team") db.deleteTeamMember(id);
    if (type === "portfolio") db.deletePortfolioItem(id);
    if (type === "blog") db.deleteBlogPost(id);
    refreshData();
  };

  const handleMessageDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    db.deleteSubmission(id);
    refreshData();
  };

  const markRead = (id: string, isRead: boolean) => {
    db.markSubmissionRead(id, isRead);
    refreshData();
  };

  const unreadMessagesCount = contacts.filter((c) => !c.isRead).length;

  return (
    <PageShell>
      <section className="bg-gradient-dark text-white py-12 border-b border-border">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">Management panel</div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              Admin Control Panel
            </h1>
          </div>
          <div className="text-xs bg-gold/10 text-gold px-3 py-1.5 rounded-full font-semibold border border-gold/25">
            Client-Side Cache (Persistent)
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-1.5">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "overview" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:bg-secondary"}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "products" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:bg-secondary"}`}
          >
            <span className="flex items-center gap-3"><Package size={18} /> Products</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === "products" ? "bg-black/10 text-black" : "bg-secondary text-foreground"}`}>{products.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab("services")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "services" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:bg-secondary"}`}
          >
            <span className="flex items-center gap-3"><Settings size={18} /> Services</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === "services" ? "bg-black/10 text-black" : "bg-secondary text-foreground"}`}>{services.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab("about")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "about" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:bg-secondary"}`}
          >
            <Info size={18} /> About Page
          </button>
          <button 
            onClick={() => setActiveTab("portfolio")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "portfolio" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:bg-secondary"}`}
          >
            <span className="flex items-center gap-3"><Briefcase size={18} /> Portfolio</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === "portfolio" ? "bg-black/10 text-black" : "bg-secondary text-foreground"}`}>{portfolio.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab("blog")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "blog" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:bg-secondary"}`}
          >
            <span className="flex items-center gap-3"><FileText size={18} /> Blog Posts</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === "blog" ? "bg-black/10 text-black" : "bg-secondary text-foreground"}`}>{blogs.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab("contacts")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "contacts" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:bg-secondary"}`}
          >
            <span className="flex items-center gap-3"><Mail size={18} /> Inbox</span>
            {unreadMessagesCount > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald text-white animate-pulse`}>{unreadMessagesCount} new</span>
            )}
          </button>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 min-w-0 bg-card border border-border rounded-2xl p-6 md:p-8">
          
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Dashboard Summary</h2>
              
              {/* Metrics Grid */}
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="p-5 bg-black/5 dark:bg-white/5 border border-border rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Package size={22} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{products.length}</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                </div>
                <div className="p-5 bg-black/5 dark:bg-white/5 border border-border rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Settings size={22} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{services.length}</div>
                    <div className="text-xs text-muted-foreground">Services</div>
                  </div>
                </div>
                <div className="p-5 bg-black/5 dark:bg-white/5 border border-border rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{portfolio.length}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </div>
                <div className="p-5 bg-black/5 dark:bg-white/5 border border-border rounded-xl flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${unreadMessagesCount > 0 ? "bg-emerald/15 text-emerald" : "bg-gold/10 text-gold"}`}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{unreadMessagesCount}</div>
                    <div className="text-xs text-muted-foreground">Unread Inquiries</div>
                  </div>
                </div>
              </div>

              {/* Status and quick instructions */}
              <div className="bg-secondary rounded-xl p-6 border border-border mb-8">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gold"><Award size={18} /> Admin Instructions</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Use this Admin Panel to customize the content on the live pages of AlphaByte. Since it is powered by `localStorage`, any edits, additions, or deletions you commit here will instantly update the site layout across tabs, making it dynamic and fully testable in the browser without loading databases or server pipelines.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 border border-border rounded-xl">
                  <h4 className="font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} /> Ready-to-Deploy Products</h4>
                  <div className="space-y-3">
                    {products.filter(p => p.isReadyToDeploy).slice(0, 4).map(p => (
                      <div key={p.id} className="flex justify-between items-center text-sm p-3 bg-secondary rounded-lg">
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.tag}</div>
                        </div>
                        <div className="text-gold font-mono font-bold text-xs">{p.price}</div>
                      </div>
                    ))}
                    {products.filter(p => p.isReadyToDeploy).length === 0 && (
                      <div className="text-muted-foreground text-sm">No ready-to-deploy products listed.</div>
                    )}
                  </div>
                </div>
                <div className="p-6 border border-border rounded-xl">
                  <h4 className="font-bold mb-4 flex items-center gap-2"><Inbox size={16} /> Latest Inquiries</h4>
                  <div className="space-y-3">
                    {contacts.slice(-3).reverse().map(c => (
                      <div key={c.id} className={`p-3 rounded-lg text-sm border ${c.isRead ? "bg-secondary border-border" : "bg-emerald/5 border-emerald/25"}`}>
                        <div className="flex justify-between font-semibold mb-1">
                          <span className="truncate">{c.name}</span>
                          <span className="text-xs text-muted-foreground">{new Date(c.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{c.subject}</div>
                      </div>
                    ))}
                    {contacts.length === 0 && (
                      <div className="text-muted-foreground text-sm">No contact messages received yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRODUCTS */}
          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Products Manager</h2>
                  <p className="text-xs text-muted-foreground mt-1">Manage regular and ready-to-deploy software products</p>
                </div>
                <button 
                  onClick={() => openAddModal("product")}
                  className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-glow text-white text-sm font-semibold px-4 h-10 rounded-md transition-colors"
                >
                  <PlusCircle size={16} /> Add Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-4">Tagline</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-secondary/40 transition-colors">
                        <td className="py-3.5 px-4 font-semibold">{p.name}</td>
                        <td className="py-3.5 px-4 text-muted-foreground truncate max-w-[200px]">{p.tag}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-gold">{p.price}</td>
                        <td className="py-3.5 px-4">{p.rating} ★</td>
                        <td className="py-3.5 px-4 text-center">
                          {p.isReadyToDeploy ? (
                            <span className="text-[10px] bg-emerald/10 text-emerald border border-emerald/25 px-2 py-0.5 rounded-full font-bold">Ready</span>
                          ) : (
                            <span className="text-[10px] bg-white/10 text-muted-foreground px-2 py-0.5 rounded-full font-bold">Standard</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button onClick={() => openEditModal("product", p)} className="p-1.5 text-muted-foreground hover:text-gold mr-2" aria-label="Edit"><Edit size={16} /></button>
                          <button onClick={() => handleDelete("product", p.id)} className="p-1.5 text-muted-foreground hover:text-red-500" aria-label="Delete"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-muted-foreground">No products registered yet. Click 'Add Product' to create one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === "services" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Services Manager</h2>
                  <p className="text-xs text-muted-foreground mt-1">Configure service cards shown on the services page</p>
                </div>
                <button 
                  onClick={() => openAddModal("service")}
                  className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-glow text-white text-sm font-semibold px-4 h-10 rounded-md transition-colors"
                >
                  <PlusCircle size={16} /> Add Service
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-3 px-4">Icon Name</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {services.map((s) => (
                      <tr key={s.id} className="hover:bg-secondary/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-gold text-xs">{s.iconName}</td>
                        <td className="py-3.5 px-4 font-semibold">{s.title}</td>
                        <td className="py-3.5 px-4 text-muted-foreground truncate max-w-[300px]">{s.desc}</td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button onClick={() => openEditModal("service", s)} className="p-1.5 text-muted-foreground hover:text-gold mr-2" aria-label="Edit"><Edit size={16} /></button>
                          <button onClick={() => handleDelete("service", s.id)} className="p-1.5 text-muted-foreground hover:text-red-500" aria-label="Delete"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                    {services.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted-foreground">No services configured yet. Click 'Add Service' to create one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ABOUT PAGE CONTENT */}
          {activeTab === "about" && (
            <div className="space-y-10">
              
              {/* Sub-section 1: Stats */}
              <div>
                <h3 className="text-lg font-bold border-b border-border pb-3 mb-4">Core Numbers & Stats</h3>
                <form onSubmit={handleStatsSave} className="grid gap-5 md:grid-cols-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Projects Shipped</label>
                    <input 
                      type="text" 
                      value={stats.projectsShipped} 
                      onChange={(e) => setStats({...stats, projectsShipped: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Happy Clients</label>
                    <input 
                      type="text" 
                      value={stats.happyClients} 
                      onChange={(e) => setStats({...stats, happyClients: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Years In Business</label>
                    <input 
                      type="text" 
                      value={stats.yearsInBusiness} 
                      onChange={(e) => setStats({...stats, yearsInBusiness: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Engineers & Designers</label>
                    <input 
                      type="text" 
                      value={stats.teamSize} 
                      onChange={(e) => setStats({...stats, teamSize: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="md:col-span-4 text-right">
                    <button type="submit" className="bg-gold text-black text-sm font-semibold h-10 px-6 rounded-md hover:bg-gold-glow transition-colors">
                      Update Numbers
                    </button>
                  </div>
                </form>
              </div>

              {/* Sub-section 2: Milestones */}
              <div>
                <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
                  <h3 className="text-lg font-bold">Milestones Timeline</h3>
                  <button 
                    onClick={() => openAddModal("milestone")}
                    className="inline-flex items-center gap-1.5 bg-emerald hover:bg-emerald-glow text-white text-xs font-semibold px-3 h-8 rounded-md transition-colors"
                  >
                    <Plus size={14} /> Add Year
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-muted-foreground border-b border-border">
                        <th className="py-2.5 px-3">Year</th>
                        <th className="py-2.5 px-3">Achievement</th>
                        <th className="py-2.5 px-3">Details</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {milestones.map((m) => (
                        <tr key={m.id} className="hover:bg-secondary/30">
                          <td className="py-2.5 px-3 font-bold text-gold">{m.y}</td>
                          <td className="py-2.5 px-3 font-medium">{m.t}</td>
                          <td className="py-2.5 px-3 text-muted-foreground text-xs max-w-[300px] truncate">{m.d}</td>
                          <td className="py-2.5 px-3 text-right whitespace-nowrap">
                            <button onClick={() => openEditModal("milestone", m)} className="p-1 text-muted-foreground hover:text-gold mr-2"><Edit size={14} /></button>
                            <button onClick={() => handleDelete("milestone", m.id)} className="p-1 text-muted-foreground hover:text-red-500"><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sub-section 3: Leadership Team */}
              <div>
                <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
                  <h3 className="text-lg font-bold">Leadership Team</h3>
                  <button 
                    onClick={() => openAddModal("team")}
                    className="inline-flex items-center gap-1.5 bg-emerald hover:bg-emerald-glow text-white text-xs font-semibold px-3 h-8 rounded-md transition-colors"
                  >
                    <Plus size={14} /> Add Leader
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-muted-foreground border-b border-border">
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {team.map((t) => (
                        <tr key={t.id} className="hover:bg-secondary/30">
                          <td className="py-2.5 px-3 font-semibold">{t.n}</td>
                          <td className="py-2.5 px-3 text-muted-foreground">{t.r}</td>
                          <td className="py-2.5 px-3 text-right whitespace-nowrap">
                            <button onClick={() => openEditModal("team", t)} className="p-1 text-muted-foreground hover:text-gold mr-2"><Edit size={14} /></button>
                            <button onClick={() => handleDelete("team", t.id)} className="p-1 text-muted-foreground hover:text-red-500"><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PORTFOLIO */}
          {activeTab === "portfolio" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Portfolio Manager</h2>
                  <p className="text-xs text-muted-foreground mt-1">Configure client case studies and showcases</p>
                </div>
                <button 
                  onClick={() => openAddModal("portfolio")}
                  className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-glow text-white text-sm font-semibold px-4 h-10 rounded-md transition-colors"
                >
                  <PlusCircle size={16} /> Add Case Study
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-3 px-4">Project Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {portfolio.map((p) => (
                      <tr key={p.id} className="hover:bg-secondary/40 transition-colors">
                        <td className="py-3.5 px-4 font-semibold">{p.title}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-gold">{p.category}</td>
                        <td className="py-3.5 px-4">{p.client}</td>
                        <td className="py-3.5 px-4">{p.year}</td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button onClick={() => openEditModal("portfolio", p)} className="p-1.5 text-muted-foreground hover:text-gold mr-2" aria-label="Edit"><Edit size={16} /></button>
                          <button onClick={() => handleDelete("portfolio", p.id)} className="p-1.5 text-muted-foreground hover:text-red-500" aria-label="Delete"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                    {portfolio.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">No case studies registered yet. Click 'Add Case Study' to configure one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: BLOG */}
          {activeTab === "blog" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Blog Manager</h2>
                  <p className="text-xs text-muted-foreground mt-1">Write and edit expert insights posts</p>
                </div>
                <button 
                  onClick={() => openAddModal("blog")}
                  className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-glow text-white text-sm font-semibold px-4 h-10 rounded-md transition-colors"
                >
                  <PlusCircle size={16} /> Write Post
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-3 px-4">Post Title</th>
                      <th className="py-3 px-4">Author</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-secondary/40 transition-colors">
                        <td className="py-3.5 px-4 font-semibold truncate max-w-[280px]">{b.title}</td>
                        <td className="py-3.5 px-4">{b.author}</td>
                        <td className="py-3.5 px-4 text-muted-foreground text-xs">{b.date}</td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button onClick={() => openEditModal("blog", b)} className="p-1.5 text-muted-foreground hover:text-gold mr-2" aria-label="Edit"><Edit size={16} /></button>
                          <button onClick={() => handleDelete("blog", b.id)} className="p-1.5 text-muted-foreground hover:text-red-500" aria-label="Delete"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                    {blogs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted-foreground">No blog posts written yet. Click 'Write Post' to start writing.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: INBOX / CONTACT INQUIRIES */}
          {activeTab === "contacts" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Inbox & Inquiries</h2>
              <p className="text-xs text-muted-foreground mb-6">Review messages sent through the public Contact page form</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-3 px-4 w-5"></th>
                      <th className="py-3 px-4">Sender</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {contacts.slice().reverse().map((c) => (
                      <tr key={c.id} className={`hover:bg-secondary/40 transition-colors ${!c.isRead ? "font-semibold bg-emerald/5 hover:bg-emerald/10" : ""}`}>
                        <td className="py-3.5 px-4">
                          {!c.isRead && (
                            <span className="block w-2.5 h-2.5 rounded-full bg-emerald shrink-0" title="Unread"></span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div>{c.name}</div>
                          <div className="text-xs text-muted-foreground font-normal">{c.email}</div>
                        </td>
                        <td className="py-3.5 px-4 truncate max-w-[240px]">{c.subject}</td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground">{new Date(c.date).toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap font-normal">
                          <button 
                            onClick={() => {
                              setSelectedContact(c);
                              markRead(c.id, true);
                            }} 
                            className="p-1.5 text-muted-foreground hover:text-gold mr-2" 
                            title="View message"
                          >
                            <Eye size={16} />
                          </button>
                          {c.isRead ? (
                            <button 
                              onClick={() => markRead(c.id, false)} 
                              className="p-1.5 text-muted-foreground hover:text-emerald mr-2 text-xs" 
                              title="Mark unread"
                            >
                              Unread
                            </button>
                          ) : null}
                          <button 
                            onClick={() => handleMessageDelete(c.id)} 
                            className="p-1.5 text-muted-foreground hover:text-red-500" 
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">No inquiries received yet. Submit messages through the contact page to test it!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* VIEW MESSAGE MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-5">
          <div className="bg-card border border-border w-full max-w-xl rounded-2xl shadow-elegant overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center bg-secondary">
              <div>
                <h3 className="font-bold text-lg">Inquiry Details</h3>
                <span className="text-xs text-muted-foreground font-mono">{new Date(selectedContact.date).toLocaleString()}</span>
              </div>
              <button onClick={() => setSelectedContact(null)} className="p-1 rounded-md hover:bg-border text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase text-muted-foreground font-semibold">From</div>
                  <div className="font-medium text-foreground">{selectedContact.name}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-muted-foreground font-semibold">Email</div>
                  <div className="font-medium text-foreground">{selectedContact.email}</div>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground font-semibold">Subject</div>
                <div className="font-medium text-foreground mt-0.5">{selectedContact.subject}</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <div className="text-xs uppercase text-muted-foreground font-semibold mb-2">Message</div>
                <p className="leading-relaxed text-foreground whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>
            <div className="p-4 border-t border-border bg-secondary flex justify-end">
              <button 
                onClick={() => setSelectedContact(null)}
                className="bg-gold text-black text-xs font-semibold px-4 h-9 rounded-md hover:bg-gold-glow"
              >
                Close Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CRUD MODAL FOR FORMS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-5 overflow-y-auto">
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-elegant overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* PRODUCT FORM */}
            {modalType === "product" && (
              <form onSubmit={handleProductSave}>
                <div className="p-6 border-b border-border flex justify-between items-center bg-secondary">
                  <h3 className="font-bold text-lg">{editId ? "Edit Product" : "Add Product"}</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Product Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. InventoryX ERP"
                      value={productForm.name} 
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Tagline</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Inventory & sales unified dashboard"
                      value={productForm.tag} 
                      onChange={(e) => setProductForm({...productForm, tag: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Price</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. ₹24,999"
                        value={productForm.price} 
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Old Price (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. ₹39,999"
                        value={productForm.oldPrice} 
                        onChange={(e) => setProductForm({...productForm, oldPrice: e.target.value})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold font-mono"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Rating</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="1" 
                        max="5"
                        value={productForm.rating} 
                        onChange={(e) => setProductForm({...productForm, rating: Number(e.target.value)})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="flex items-center pt-5 pl-2">
                      <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={productForm.isReadyToDeploy} 
                          onChange={(e) => setProductForm({...productForm, isReadyToDeploy: e.target.checked})}
                          className="w-4 h-4 text-gold border-border bg-secondary rounded focus:ring-0"
                        />
                        <span>Ready-To-Deploy</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-secondary flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 h-10 text-xs font-semibold border border-border hover:bg-secondary rounded-md transition-colors">Cancel</button>
                  <button type="submit" className="bg-gold text-black px-5 h-10 text-xs font-semibold hover:bg-gold-glow rounded-md transition-colors">Save Product</button>
                </div>
              </form>
            )}

            {/* SERVICE FORM */}
            {modalType === "service" && (
              <form onSubmit={handleServiceSave}>
                <div className="p-6 border-b border-border flex justify-between items-center bg-secondary">
                  <h3 className="font-bold text-lg">{editId ? "Edit Service" : "Add Service"}</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Service Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Custom Web Development"
                      value={serviceForm.title} 
                      onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Icon Name (Lucide Icon name)</label>
                    <select 
                      value={serviceForm.iconName}
                      onChange={(e) => setServiceForm({...serviceForm, iconName: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    >
                      <option value="Code2">Code2 (Web Development)</option>
                      <option value="Smartphone">Smartphone (Android Apps)</option>
                      <option value="Apple">Apple (iOS Apps)</option>
                      <option value="Database">Database (ERP Software)</option>
                      <option value="Palette">Palette (Brand Handling)</option>
                      <option value="Megaphone">Megaphone (Social Media)</option>
                      <option value="BarChart3">BarChart3 (Digital Marketing)</option>
                      <option value="Layers">Layers (UI / UX Design)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Description</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Service details and client deliverables..."
                      value={serviceForm.desc} 
                      onChange={(e) => setServiceForm({...serviceForm, desc: e.target.value})}
                      className="w-full p-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-secondary flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 h-10 text-xs font-semibold border border-border hover:bg-secondary rounded-md transition-colors">Cancel</button>
                  <button type="submit" className="bg-gold text-black px-5 h-10 text-xs font-semibold hover:bg-gold-glow rounded-md transition-colors">Save Service</button>
                </div>
              </form>
            )}

            {/* MILESTONE FORM */}
            {modalType === "milestone" && (
              <form onSubmit={handleMilestoneSave}>
                <div className="p-6 border-b border-border flex justify-between items-center bg-secondary">
                  <h3 className="font-bold text-lg">{editId ? "Edit Milestone" : "Add Milestone"}</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Year</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 2026"
                      value={milestoneForm.y} 
                      onChange={(e) => setMilestoneForm({...milestoneForm, y: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Achievement Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Scaled team to 40+ members"
                      value={milestoneForm.t} 
                      onChange={(e) => setMilestoneForm({...milestoneForm, t: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Description</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Add specific details or benchmarks achieved..."
                      value={milestoneForm.d} 
                      onChange={(e) => setMilestoneForm({...milestoneForm, d: e.target.value})}
                      className="w-full p-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-secondary flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 h-10 text-xs font-semibold border border-border hover:bg-secondary rounded-md transition-colors">Cancel</button>
                  <button type="submit" className="bg-gold text-black px-5 h-10 text-xs font-semibold hover:bg-gold-glow rounded-md transition-colors">Save Milestone</button>
                </div>
              </form>
            )}

            {/* TEAM MEMBER FORM */}
            {modalType === "team" && (
              <form onSubmit={handleTeamSave}>
                <div className="p-6 border-b border-border flex justify-between items-center bg-secondary">
                  <h3 className="font-bold text-lg">{editId ? "Edit Leader" : "Add Leader"}</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Leader Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={teamForm.n} 
                      onChange={(e) => setTeamForm({...teamForm, n: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Role / Designation</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Head of Engineering"
                      value={teamForm.r} 
                      onChange={(e) => setTeamForm({...teamForm, r: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-secondary flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 h-10 text-xs font-semibold border border-border hover:bg-secondary rounded-md transition-colors">Cancel</button>
                  <button type="submit" className="bg-gold text-black px-5 h-10 text-xs font-semibold hover:bg-gold-glow rounded-md transition-colors">Save Leader</button>
                </div>
              </form>
            )}

            {/* PORTFOLIO CASE STUDY FORM */}
            {modalType === "portfolio" && (
              <form onSubmit={handlePortfolioSave}>
                <div className="p-6 border-b border-border flex justify-between items-center bg-secondary">
                  <h3 className="font-bold text-lg">{editId ? "Edit Case Study" : "Add Case Study"}</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Project Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Linkstream Logistics Mobile Portal"
                      value={portfolioForm.title} 
                      onChange={(e) => setPortfolioForm({...portfolioForm, title: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Category</label>
                      <select 
                        value={portfolioForm.category}
                        onChange={(e) => setPortfolioForm({...portfolioForm, category: e.target.value})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="ERP Systems">ERP Systems</option>
                        <option value="UI / UX Design">UI / UX Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Client Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Linkstream Logistics"
                        value={portfolioForm.client} 
                        onChange={(e) => setPortfolioForm({...portfolioForm, client: e.target.value})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Year</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 2025"
                        value={portfolioForm.year} 
                        onChange={(e) => setPortfolioForm({...portfolioForm, year: e.target.value})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Link (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. https://clientwebsite.com"
                        value={portfolioForm.link} 
                        onChange={(e) => setPortfolioForm({...portfolioForm, link: e.target.value})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Description Summary</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Add details about the solution engineered and the final results achieved..."
                      value={portfolioForm.desc} 
                      onChange={(e) => setPortfolioForm({...portfolioForm, desc: e.target.value})}
                      className="w-full p-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-secondary flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 h-10 text-xs font-semibold border border-border hover:bg-secondary rounded-md transition-colors">Cancel</button>
                  <button type="submit" className="bg-gold text-black px-5 h-10 text-xs font-semibold hover:bg-gold-glow rounded-md transition-colors">Save Case Study</button>
                </div>
              </form>
            )}

            {/* BLOG POST FORM */}
            {modalType === "blog" && (
              <form onSubmit={handleBlogSave}>
                <div className="p-6 border-b border-border flex justify-between items-center bg-secondary">
                  <h3 className="font-bold text-lg">{editId ? "Edit Post" : "Write Post"}</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Blog Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Why Next.js is dominant in 2026"
                      value={blogForm.title} 
                      onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Author</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Diya Kapoor"
                        value={blogForm.author} 
                        onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Read Time</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 5 min read"
                        value={blogForm.readTime} 
                        onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                        className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Summary (Short Excerpt)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="A short one-sentence summary of the article..."
                      value={blogForm.summary} 
                      onChange={(e) => setBlogForm({...blogForm, summary: e.target.value})}
                      className="w-full h-10 px-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Content (Full Text)</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Write your article here..."
                      value={blogForm.content} 
                      onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                      className="w-full p-3 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-secondary flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 h-10 text-xs font-semibold border border-border hover:bg-secondary rounded-md transition-colors">Cancel</button>
                  <button type="submit" className="bg-gold text-black px-5 h-10 text-xs font-semibold hover:bg-gold-glow rounded-md transition-colors">Save Post</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </PageShell>
  );
}
