import { PageShell, PageHeader } from "@/components/page-shell";

const MILESTONES = [
  { y: "2017", t: "Founded in Bengaluru", d: "Two engineers, one promise: software that earns its keep." },
  { y: "2019", t: "Crossed 50 clients", d: "Expanded into ERP and mobile app verticals." },
  { y: "2021", t: "Launched first SaaS", d: "FleetPilot — now used in 6 countries." },
  { y: "2023", t: "Team of 40+", d: "Opened design and growth marketing studios." },
  { y: "2026", t: "300+ projects shipped", d: "Trusted by Linkstream, Greenstone, FitNest and more." },
];

const TEAM = [
  { n: "Aarav Sharma", r: "Founder & CEO" },
  { n: "Diya Kapoor", r: "Head of Engineering" },
  { n: "Vikram Joshi", r: "Design Director" },
  { n: "Neha Iyer", r: "Growth Lead" },
];

export function AboutPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="About" title="A studio of engineers, designers and operators." subtitle="We build software that compounds — for founders, operators and ambitious teams across India." />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Our story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>AlphaByte Softwares was founded in 2017 with a simple thesis: most teams don't need more software — they need software that actually fits how they work.</p>
              <p>Today we're a 40-person studio combining engineering, design and growth marketing under one roof. We ship products, mobile and web apps, ERP systems and the digital marketing that makes them visible.</p>
              <p>We're proudly bootstrapped, headquartered in Bengaluru, and obsessed with shipping work that we'd be happy to sign our name to.</p>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-dark text-white p-8 md:p-10">
            <h3 className="text-2xl font-semibold mb-6">By the numbers</h3>
            <div className="grid grid-cols-2 gap-6">
              {[["320+","Projects shipped"],["180+","Happy clients"],["9+","Years in business"],["40+","Engineers & designers"]].map(([n,l]) => (
                <div key={l}>
                  <div className="text-4xl font-display font-bold text-gold">{n}</div>
                  <div className="text-sm text-white/65 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background-alt">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Milestones</h2>
          <ol className="relative border-l-2 border-border ml-2 space-y-8">
            {MILESTONES.map((m) => (
              <li key={m.y} className="pl-8 relative">
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-gold border-4 border-white"></span>
                <div className="font-mono text-sm text-gold font-semibold">{m.y}</div>
                <h3 className="font-semibold text-lg mt-1">{m.t}</h3>
                <p className="text-muted-foreground mt-1">{m.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Leadership</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div key={m.n} className="rounded-xl bg-card border border-border p-6 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-dark grid place-items-center text-gold font-display font-bold text-2xl mb-4">{m.n.split(" ").map(p=>p[0]).join("")}</div>
                <div className="font-semibold">{m.n}</div>
                <div className="text-sm text-muted-foreground">{m.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}