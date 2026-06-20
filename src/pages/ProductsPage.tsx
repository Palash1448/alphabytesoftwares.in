import { useState, useEffect } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { db } from "@/lib/db";
import { Star } from "lucide-react";

export function ProductsPage() {
  const [filter, setFilter] = useState<"all" | "ready" | "standard">("all");
  const [products, setProducts] = useState(() => db.getProducts());

  useEffect(() => {
    const handleUpdate = () => setProducts(db.getProducts());
    window.addEventListener("db-updated", handleUpdate);
    return () => window.removeEventListener("db-updated", handleUpdate);
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filter === "ready") return p.isReadyToDeploy;
    if (filter === "standard") return !p.isReadyToDeploy;
    return true;
  });

  return (
    <PageShell>
      <PageHeader 
        eyebrow="Products" 
        title="Ready-to-deploy software products." 
        subtitle="ERP, POS, fleet management and more — battle-tested solutions for growing teams." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          {/* Category Tabs */}
          <div className="flex gap-2 border-b border-border pb-4 mb-10 overflow-x-auto">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all shrink-0 ${filter === "all" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:text-foreground"}`}
            >
              All Products ({products.length})
            </button>
            <button 
              onClick={() => setFilter("ready")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all shrink-0 ${filter === "ready" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:text-foreground"}`}
            >
              Ready to Deploy ({products.filter(p => p.isReadyToDeploy).length})
            </button>
            <button 
              onClick={() => setFilter("standard")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all shrink-0 ${filter === "standard" ? "bg-gold text-black shadow-elegant" : "text-muted-foreground hover:text-foreground"}`}
            >
              Standard Solutions ({products.filter(p => !p.isReadyToDeploy).length})
            </button>
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <article key={p.id} className="rounded-xl bg-card border border-border overflow-hidden flex flex-col hover:shadow-elegant transition-shadow">
                <div className="aspect-[16/10] bg-gradient-dark relative grid place-items-center">
                  <div className="absolute inset-0 opacity-30 bg-gradient-gold"/>
                  <span className="relative font-display font-bold text-3xl text-gold">{p.name.split(" ")[0]}</span>
                  {p.isReadyToDeploy && (
                    <span className="absolute top-4 right-4 text-[10px] bg-emerald/90 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Ready to Deploy
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4 flex-1">{p.tag}</p>
                  <div className="flex items-center gap-1 text-sm mb-4">
                    <Star size={14} className="fill-gold text-gold" />
                    <span className="font-semibold">{p.rating}</span>
                    <span className="text-muted-foreground">(120+ reviews)</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-display font-bold text-xl">{p.price}</span>
                    {p.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">{p.oldPrice}</span>
                    )}
                  </div>
                  <button className="w-full h-11 rounded-md bg-emerald hover:bg-emerald-glow text-white font-semibold text-sm transition-colors">
                    Buy Now
                  </button>
                </div>
              </article>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No products found in this category.
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}