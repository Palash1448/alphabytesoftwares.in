import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Smartphone, Apple, Code2, Database, Palette, Megaphone, BarChart3, Layers, CheckCircle2, Star, ArrowRight, Quote } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { HeroSlider } from "@/components/hero-slider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AlphaBytes Softwares — Build Smarter. Scale Faster." },
      { name: "description", content: "Software products, mobile & web apps, ERP, brand handling and digital marketing — engineered for growth." },
      { property: "og:title", content: "AlphaBytes Softwares" },
      { property: "og:description", content: "Full-spectrum technology partner for products, apps, ERP and growth." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Smartphone, title: "Android Apps", desc: "Native Kotlin & Java apps with push, payments and Play Store launch." },
  { icon: Apple, title: "iOS Apps", desc: "SwiftUI experiences, App Store optimisation and TestFlight beta cycles." },
  { icon: Code2, title: "Web Development", desc: "React & Next.js frontends with Node, Laravel or GraphQL backends." },
  { icon: Database, title: "ERP Software", desc: "Inventory, HR, payroll, procurement and finance — unified dashboards." },
  { icon: Palette, title: "Brand Handling", desc: "Strategy, logos, guidelines, stationery and brand audits that scale." },
  { icon: Megaphone, title: "Social Media", desc: "Calendars, reels, community management and influencer partnerships." },
  { icon: BarChart3, title: "Digital Marketing", desc: "SEO, Google & Meta Ads, email automation and conversion optimisation." },
  { icon: Layers, title: "UI / UX Design", desc: "Figma prototypes, usability testing and reusable design systems." },
];

const stats = [
  { n: "320+", l: "Projects Delivered" },
  { n: "180+", l: "Happy Clients" },
  { n: "9+", l: "Years of Experience" },
  { n: "40+", l: "Technologies" },
];

const products = [
  { name: "InventoryX ERP", tag: "Stock & finance, one screen", price: "₹24,999", old: "₹39,999", rating: 4.9 },
  { name: "FleetPilot SaaS", tag: "GPS fleet tracking dashboard", price: "₹14,999", old: "₹19,999", rating: 4.8 },
  { name: "ClinicCare PMS", tag: "Patients, billing & telehealth", price: "₹29,999", old: "₹44,999", rating: 5.0 },
  { name: "RetailBoom POS", tag: "Multi-store retail POS", price: "₹9,999", old: "₹14,999", rating: 4.7 },
];

const testimonials = [
  { quote: "AlphaBytes shipped our ERP twice as fast as our previous vendor — and the team genuinely cares.", name: "Rohit Verma", role: "COO, Linkstream Logistics" },
  { quote: "Our app store ratings jumped from 3.6 to 4.8 after the rebuild. The team is sharp and responsive.", name: "Anjali Mehra", role: "Founder, FitNest" },
  { quote: "Lead volume tripled in 90 days. Their SEO and ad ops actually move numbers.", name: "Karthik Iyer", role: "Marketing Head, Greenstone" },
];

function Index() {
  return (
    <PageShell>
      <HeroSlider />

      {/* Stats */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-bold text-[color:var(--gold)]">{s.n}</div>
              <div className="text-sm text-white/65 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--gold)] mb-3">What we do</div>
            <h2 className="text-3xl md:text-5xl font-bold">Eight service verticals, one trusted partner.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-xl bg-card border border-border hover:border-[color:var(--gold)] hover:shadow-[var(--shadow-elegant)] transition-all">
                <div className="w-12 h-12 rounded-lg bg-foreground text-[color:var(--gold)] grid place-items-center mb-5 group-hover:bg-[color:var(--gold)] group-hover:text-black transition-colors">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <Link to="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-[color:var(--gold)]">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 md:py-28 bg-background-alt">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--gold)] mb-3">Featured</div>
              <h2 className="text-3xl md:text-5xl font-bold">Ready-to-deploy products.</h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[color:var(--gold)]">
              View all <ArrowRight size={14}/>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <article key={p.name} className="rounded-xl bg-card border border-border overflow-hidden flex flex-col hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <div className="aspect-[4/3] bg-[var(--gradient-dark)] relative grid place-items-center">
                  <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 30%, var(--gold), transparent 60%)"}}/>
                  <span className="relative font-display font-bold text-3xl text-[color:var(--gold)]">{p.name.split(" ")[0]}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3 flex-1">{p.tag}</p>
                  <div className="flex items-center gap-1 text-sm mb-3">
                    <Star size={14} className="fill-[color:var(--gold)] text-[color:var(--gold)]" />
                    <span className="font-semibold">{p.rating}</span>
                    <span className="text-muted-foreground">(120+ reviews)</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display font-bold text-lg">{p.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{p.old}</span>
                  </div>
                  <button className="w-full h-11 rounded-md bg-[color:var(--emerald)] hover:bg-[color:var(--emerald-glow)] text-white font-semibold text-sm transition-colors">
                    Buy Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--gold)] mb-3">Why AlphaBytes</div>
            <h2 className="text-3xl md:text-5xl font-bold">A team that ships — and stays.</h2>
            <p className="text-muted-foreground mt-5 text-lg">We pair senior engineers with disciplined project managers so your roadmap stays on time, on budget and easy to maintain.</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {["Agile sprints with weekly demos","Transparent fixed-scope pricing","6 months of post-launch support","NDA-safe & IP-clean delivery","Senior-only engineering pods","Performance-first architecture"].map((w) => (
              <li key={w} className="flex gap-3 p-4 rounded-lg bg-card border border-border">
                <CheckCircle2 className="text-[color:var(--emerald)] shrink-0" size={20} />
                <span className="font-medium">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Logos marquee */}
      <section className="py-12 border-y border-border bg-background-alt overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground text-center mb-6">Trusted by ambitious teams</p>
          <div className="flex gap-12 items-center justify-around opacity-60 flex-wrap">
            {["LINKSTREAM","FITNEST","GREENSTONE","ARCADIA","NORTHWIND","BLUEFIN","ORBITAL"].map((b) => (
              <span key={b} className="font-display font-bold tracking-widest text-foreground/70 text-lg">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="max-w-2xl mb-12 text-center mx-auto">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--gold)] mb-3">Testimonials</div>
            <h2 className="text-3xl md:text-5xl font-bold">Words that earn our work.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="p-7 rounded-xl bg-card border border-border">
                <Quote className="text-[color:var(--gold)]" size={28} />
                <blockquote className="mt-4 text-base leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-5 text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[var(--gradient-dark)] text-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Have an idea? Let's build it.</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">Free 30-minute consultation. No pitch decks, just a clear plan.</p>
          <Link to="/contact" className="inline-flex items-center justify-center mt-8 h-[52px] px-8 rounded-md bg-[color:var(--gold)] text-black font-semibold hover:bg-[color:var(--gold-glow)] shadow-[var(--shadow-gold)]">
            Get a Free Consultation
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
