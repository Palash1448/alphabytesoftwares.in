import { useState, useEffect } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { db, Product } from "@/lib/db";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

function ProductCard({ p }: { p: Product }) {
  const allImages = [p.image, ...(p.images || [])].filter(Boolean) as string[];
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIdx((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <article className="rounded-xl bg-card border border-border overflow-hidden flex flex-col hover:shadow-elegant transition-all duration-300 hover:-translate-y-0.5">
      <div className="aspect-[16/10] bg-gradient-dark relative overflow-hidden group">
        {allImages.length > 0 ? (
          <>
            <img 
              src={allImages[currentIdx]} 
              alt={p.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop';
              }}
            />
            {allImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-gold hover:text-black cursor-pointer select-none z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-gold hover:text-black cursor-pointer select-none z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {allImages.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setCurrentIdx(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === currentIdx ? "w-4 bg-gold" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-30 bg-gradient-gold"/>
            <span className="relative m-auto font-display font-bold text-3xl text-gold">{p.name.split(" ")[0]}</span>
          </>
        )}
        {p.isReadyToDeploy && (
          <span className="absolute top-4 right-4 text-[10px] bg-emerald/90 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10">
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
        <button className="w-full h-11 rounded-md bg-emerald hover:bg-emerald-glow text-white font-semibold text-sm transition-colors cursor-pointer">
          Buy Now
        </button>
      </div>
    </article>
  );
}

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
              <ProductCard key={p.id} p={p} />
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