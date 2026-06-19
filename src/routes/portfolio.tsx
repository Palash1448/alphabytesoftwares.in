import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — AlphaBytes Softwares" },
      { name: "description", content: "Case studies and selected work across ERP, mobile apps, web platforms and digital marketing campaigns." },
      { property: "og:title", content: "AlphaBytes Portfolio" },
      { property: "og:description", content: "Selected case studies and client work." },
    ],
  }),
  component: Portfolio,
});

const CASES = [
  { tag: "ERP", title: "Linkstream Logistics", result: "Cut order processing time by 64%", color: "from-amber-700 to-amber-900" },
  { tag: "Mobile App", title: "FitNest Coaching App", result: "App Store rating 3.6 → 4.8", color: "from-emerald-700 to-emerald-900" },
  { tag: "Web", title: "Greenstone D2C", result: "3× lead volume in 90 days", color: "from-zinc-700 to-zinc-900" },
  { tag: "SaaS", title: "FleetPilot v3", result: "Onboarded 6 new countries", color: "from-stone-700 to-stone-900" },
  { tag: "Brand", title: "Arcadia Rebrand", result: "Full visual identity & guidelines", color: "from-yellow-700 to-yellow-900" },
  { tag: "Marketing", title: "Northwind Ads", result: "ROAS 5.1× over 6 months", color: "from-teal-700 to-teal-900" },
];

function Portfolio() {
  return (
    <PageShell>
      <PageHeader eyebrow="Portfolio" title="Work we're proud to put our name on." subtitle="A selection of recent products and campaigns shipped for partners across India and beyond." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <article key={c.title} className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-elegant)] transition-shadow">
              <div className={`aspect-[4/3] bg-gradient-to-br ${c.color} relative grid place-items-center`}>
                <span className="font-display font-bold text-2xl text-white/90 text-center px-6">{c.title}</span>
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-black/40 text-white">{c.tag}</span>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.result}</p>
                </div>
                <ArrowUpRight className="text-[color:var(--gold)] group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}