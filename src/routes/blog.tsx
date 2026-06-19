import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — AlphaBytes Softwares" },
      { name: "description", content: "Articles, tutorials and field notes on engineering, ERP, design and digital marketing." },
      { property: "og:title", content: "AlphaBytes Blog" },
      { property: "og:description", content: "Engineering and marketing field notes." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { tag: "Engineering", title: "Why we bet on Next.js for enterprise frontends in 2026", date: "June 10, 2026", read: "7 min" },
  { tag: "ERP", title: "5 ERP rollout mistakes (and how to avoid them)", date: "May 28, 2026", read: "9 min" },
  { tag: "Design", title: "A design system that ships: lessons from 30 projects", date: "May 14, 2026", read: "6 min" },
  { tag: "Marketing", title: "The CRO playbook we use to lift conversions 2×", date: "April 30, 2026", read: "8 min" },
  { tag: "Mobile", title: "SwiftUI in production: what we learned the hard way", date: "April 18, 2026", read: "10 min" },
  { tag: "Growth", title: "Indian D2C: paid social benchmarks for 2026", date: "April 02, 2026", read: "5 min" },
];

function Blog() {
  return (
    <PageShell>
      <PageHeader eyebrow="Blog" title="Field notes from the studio." subtitle="What we learn, ship and recommend — written by the engineers and marketers doing the work." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.title} className="group rounded-xl bg-card border border-border overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-shadow flex flex-col">
              <div className="aspect-[16/10] bg-[var(--gradient-dark)] relative">
                <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 80%, var(--gold), transparent 60%)"}}/>
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/10 text-white">{p.tag}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-muted-foreground flex items-center gap-3 mb-3">
                  <span>{p.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.read}</span>
                </div>
                <h3 className="font-semibold text-lg leading-snug flex-1">{p.title}</h3>
                <a href="#" className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-foreground hover:text-[color:var(--gold)]">
                  Read article <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}