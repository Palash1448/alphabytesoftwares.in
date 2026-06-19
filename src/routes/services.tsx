import { createFileRoute, Link } from "@tanstack/react-router";
import { Smartphone, Apple, Code2, Database, Palette, Megaphone, BarChart3, Layers, CheckCircle2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AlphaBytes Softwares" },
      { name: "description", content: "Android & iOS apps, web development, ERP, brand handling, social media, digital marketing and UI/UX design." },
      { property: "og:title", content: "AlphaBytes Services" },
      { property: "og:description", content: "Eight service verticals built to grow your business." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { Icon: Smartphone, name: "Android App Development", deliverables: ["Native Kotlin / Java apps","Play Store publishing","Push notifications & analytics","In-app payments & subscriptions"] },
  { Icon: Apple, name: "iOS App Development", deliverables: ["Swift & SwiftUI apps","App Store optimisation","TestFlight beta cycles","HealthKit, ARKit & Apple Pay"] },
  { Icon: Code2, name: "Web Development", deliverables: ["React & Next.js frontends","Node.js / Laravel backends","REST & GraphQL APIs","Headless CMS integrations"] },
  { Icon: Database, name: "ERP Software", deliverables: ["Inventory, HR, payroll","Procurement & finance","Custom dashboards","Role-based access control"] },
  { Icon: Palette, name: "Brand Handling", deliverables: ["Brand strategy & positioning","Logo & visual identity","Guidelines & stationery","Packaging & brand audits"] },
  { Icon: Megaphone, name: "Social Media Marketing", deliverables: ["Monthly content calendars","Reels & Shorts production","Community management","Influencer partnerships"] },
  { Icon: BarChart3, name: "Digital Marketing", deliverables: ["SEO & content strategy","Google Ads (PPC)","Meta Ads & retargeting","Email marketing & CRO"] },
  { Icon: Layers, name: "UI / UX Design", deliverables: ["Figma wireframes & prototypes","Usability testing","Design systems","Accessibility (WCAG 2.1)"] },
];

function Services() {
  return (
    <PageShell>
      <PageHeader eyebrow="Services" title="Engineered for outcomes, not output." subtitle="Eight verticals — handpicked specialists work as one team on your roadmap." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 grid gap-6 md:grid-cols-2">
          {SERVICES.map(({ Icon, name, deliverables }, i) => (
            <article key={name} className="p-7 rounded-xl bg-card border border-border hover:border-[color:var(--gold)] transition-colors">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-foreground text-[color:var(--gold)] grid place-items-center"><Icon size={26} /></div>
                <div>
                  <div className="text-xs text-muted-foreground font-mono">0{i+1}</div>
                  <h2 className="text-xl font-semibold">{name}</h2>
                </div>
              </div>
              <ul className="space-y-2.5">
                {deliverables.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm">
                    <CheckCircle2 size={18} className="text-[color:var(--emerald)] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[var(--gradient-dark)] text-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Not sure what you need?</h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">Book a free 30-minute discovery call. We'll scope, estimate and quote.</p>
          <Link to="/contact" className="inline-flex items-center justify-center mt-8 h-[52px] px-8 rounded-md bg-[color:var(--gold)] text-black font-semibold hover:bg-[color:var(--gold-glow)]">Talk to an expert</Link>
        </div>
      </section>
    </PageShell>
  );
}