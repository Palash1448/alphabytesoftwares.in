import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ShieldCheck, BadgeCheck, MessageCircle } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — AlphaBytes Softwares" },
      { name: "description", content: "Browse ready-to-deploy ERP, SaaS, mobile and web products with secure Buy Now checkout." },
      { property: "og:title", content: "AlphaBytes Products" },
      { property: "og:description", content: "ERP, SaaS, mobile and web products ready to deploy." },
    ],
  }),
  component: Products,
});

const CATS = ["All","Mobile App","Web","ERP","SaaS","Templates"] as const;

const ITEMS = [
  { name: "InventoryX ERP", cat: "ERP", tag: "Stock & finance, one screen", price: 24999, old: 39999, rating: 4.9, reviews: 142 },
  { name: "FleetPilot SaaS", cat: "SaaS", tag: "GPS fleet tracking dashboard", price: 14999, old: 19999, rating: 4.8, reviews: 98 },
  { name: "ClinicCare PMS", cat: "ERP", tag: "Patients, billing & telehealth", price: 29999, old: 44999, rating: 5.0, reviews: 211 },
  { name: "RetailBoom POS", cat: "Web", tag: "Multi-store retail POS", price: 9999, old: 14999, rating: 4.7, reviews: 76 },
  { name: "MentorHub App", cat: "Mobile App", tag: "Coaching & cohort platform", price: 19999, old: 24999, rating: 4.8, reviews: 64 },
  { name: "EduLeap LMS", cat: "Web", tag: "LMS with live classes", price: 22999, old: 29999, rating: 4.6, reviews: 132 },
  { name: "QuickBook Templates", cat: "Templates", tag: "12 booking site templates", price: 2999, old: 4999, rating: 4.5, reviews: 312 },
  { name: "DeliverEase App", cat: "Mobile App", tag: "Hyperlocal delivery starter", price: 17999, old: 23999, rating: 4.7, reviews: 54 },
  { name: "PayLink SaaS", cat: "SaaS", tag: "Subscription billing engine", price: 12999, old: 17999, rating: 4.8, reviews: 89 },
];

function Products() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const items = cat === "All" ? ITEMS : ITEMS.filter((i) => i.cat === cat);
  return (
    <PageShell>
      <PageHeader eyebrow="Products" title="Ready-to-deploy software." subtitle="Production-ready ERP, SaaS, mobile and web products — buy, brand and ship in days." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 h-10 rounded-full text-sm font-medium border transition-colors ${cat === c ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:border-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <article key={p.name} className="rounded-xl bg-card border border-border overflow-hidden flex flex-col hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <div className="aspect-[16/10] bg-[var(--gradient-dark)] relative grid place-items-center">
                  <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(circle at 70% 30%, var(--gold), transparent 60%)"}}/>
                  <span className="relative font-display font-bold text-3xl text-[color:var(--gold)]">{p.name.split(" ")[0]}</span>
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/10 text-white">{p.cat}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">{p.tag}</p>
                  <div className="flex items-center gap-1 text-sm mb-3">
                    <Star size={14} className="fill-[color:var(--gold)] text-[color:var(--gold)]" />
                    <span className="font-semibold">{p.rating}</span>
                    <span className="text-muted-foreground">({p.reviews} reviews)</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4 mt-auto">
                    <span className="font-display font-bold text-xl">₹{p.price.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{p.old.toLocaleString("en-IN")}</span>
                  </div>
                  <button className="w-full h-12 rounded-md bg-[color:var(--emerald)] hover:bg-[color:var(--emerald-glow)] text-white font-semibold transition-colors">
                    Buy Now
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 grid sm:grid-cols-3 gap-4">
            {[{ I: ShieldCheck, t: "Secure checkout", s: "Razorpay PCI-DSS gateway." },
              { I: BadgeCheck, t: "30-day guarantee", s: "Refund if it doesn't fit." },
              { I: MessageCircle, t: "Live support", s: "Chat with engineers, not bots." }].map(({ I, t, s }) => (
              <div key={t} className="flex gap-3 p-5 rounded-xl bg-card border border-border">
                <I className="text-[color:var(--emerald)] shrink-0" />
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}