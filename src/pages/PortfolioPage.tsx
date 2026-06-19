import { useState } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { db } from "@/lib/db";
import { ArrowUpRight } from "lucide-react";

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const portfolio = db.getPortfolio();

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(portfolio.map(item => item.category)))];

  const filteredPortfolio = activeCategory === "All" 
    ? portfolio 
    : portfolio.filter(item => item.category === activeCategory);

  return (
    <PageShell>
      <PageHeader 
        eyebrow="Portfolio" 
        title="320+ projects, 180+ happy clients." 
        subtitle="A selection of our favorite work — from mobile apps to enterprise systems." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          {/* Category Filter */}
          <div className="flex gap-2 border-b border-border pb-4 mb-10 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all shrink-0 ${activeCategory === cat ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:text-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid gap-8 md:grid-cols-2">
            {filteredPortfolio.map((p) => (
              <article key={p.id} className="group rounded-2xl bg-card border border-border overflow-hidden flex flex-col hover:border-gold hover:shadow-elegant transition-all">
                <div className="aspect-[16/9] bg-gradient-dark relative grid place-items-center p-8">
                  <div className="absolute inset-0 opacity-15 bg-gradient-gold" />
                  <div className="relative z-10 text-center">
                    <span className="text-xs font-mono uppercase text-gold tracking-widest">{p.category}</span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 group-hover:text-gold transition-colors">{p.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-3">
                    <span>Client: {p.client}</span>
                    <span>Year: {p.year}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
                  {p.link && p.link !== "#" && (
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-black hover:text-gold dark:text-white dark:hover:text-gold mt-auto"
                    >
                      View live project <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
            {filteredPortfolio.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No portfolio items configured under this category.
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}