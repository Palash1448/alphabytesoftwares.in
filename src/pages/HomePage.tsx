import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { HeroSlider } from "@/components/hero-slider";
import { db } from "@/lib/db";

const testimonials = [
  { quote: "AlphaByte shipped our ERP twice as fast as our previous vendor — and the team genuinely cares.", name: "Rohit Verma", role: "COO, Linkstream Logistics" },
  { quote: "Our app store ratings jumped from 3.6 to 4.8 after the rebuild. The team is sharp and responsive.", name: "Anjali Mehra", role: "Founder, FitNest" },
  { quote: "Lead volume tripled in 90 days. Their SEO and ad ops actually move numbers.", name: "Karthik Iyer", role: "Marketing Head, Greenstone" },
];

export function HomePage() {
  const statsData = db.getStats();
  const servicesList = db.getServices();
  const productsList = db.getProducts().filter(p => p.isReadyToDeploy).slice(0, 4);

  const homeStats = [
    { n: statsData.projectsShipped, l: "Projects Delivered" },
    { n: statsData.happyClients, l: "Happy Clients" },
    { n: statsData.yearsInBusiness, l: "Years of Experience" },
    { n: statsData.teamSize, l: "Engineers & Designers" },
  ];

  return (
    <PageShell>
      <HeroSlider />

      {/* Stats */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {homeStats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-bold text-gold">{s.n}</div>
              <div className="text-sm text-white/65 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">What we do</div>
            <h2 className="text-3xl md:text-5xl font-bold">Eight service verticals, one trusted partner.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {servicesList.map((s) => {
              const IconComponent = (Icons as any)[s.iconName] || Icons.HelpCircle;
              return (
                <div key={s.id} className="group p-6 rounded-xl bg-card border border-border hover:border-gold hover:shadow-elegant transition-all">
                  <div className="w-12 h-12 rounded-lg bg-black text-gold grid place-items-center mb-5 group-hover:bg-gold group-hover:text-black transition-colors">
                    <IconComponent size={22} strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <Link to="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:text-gold">
                    Learn more <Icons.ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 md:py-28 bg-background-alt">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Featured</div>
              <h2 className="text-3xl md:text-5xl font-bold">Ready-to-deploy products.</h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">
              View all <Icons.ArrowRight size={14}/>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productsList.map((p) => (
              <article key={p.id} className="rounded-xl bg-card border border-border overflow-hidden flex flex-col hover:shadow-elegant transition-shadow">
                <div className="aspect-[4/3] bg-gradient-dark relative grid place-items-center">
                  <div className="absolute inset-0 opacity-30 bg-gradient-gold"/>
                  <span className="relative font-display font-bold text-3xl text-gold">{p.name.split(" ")[0]}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3 flex-1">{p.tag}</p>
                  <div className="flex items-center gap-1 text-sm mb-3">
                    <Icons.Star size={14} className="fill-gold text-gold" />
                    <span className="font-semibold">{p.rating}</span>
                    <span className="text-muted-foreground">(120+ reviews)</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display font-bold text-lg">{p.price}</span>
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
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Why AlphaByte</div>
            <h2 className="text-3xl md:text-5xl font-bold">The leading software company in Sangli &amp; Kolhapur.</h2>
            <p className="text-muted-foreground mt-5 text-lg">As the premier software development partner in the Kolhapur and Sangli regions, we pair senior engineers with disciplined project managers to build native mobile apps, custom web platforms, and unified ERP architectures that compound business growth.</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {["Agile sprints with weekly demos","Transparent fixed-scope pricing","6 months of post-launch support","NDA-safe & IP-clean delivery","Senior-only engineering pods","Performance-first architecture"].map((w) => (
              <li key={w} className="flex gap-3 p-4 rounded-lg bg-card border border-border">
                <Icons.CheckCircle2 className="text-emerald shrink-0" size={20} />
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
              <span key={b} className="font-display font-bold tracking-widest text-black/70 text-lg">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="max-w-2xl mb-12 text-center mx-auto">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Testimonials</div>
            <h2 className="text-3xl md:text-5xl font-bold">Words that earn our work.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="p-7 rounded-xl bg-card border border-border">
                <Icons.Quote className="text-gold" size={28} />
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
      <section className="bg-gradient-dark text-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Have an idea? Let's build it.</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">Free 30-minute consultation. No pitch decks, just a clear plan.</p>
          <Link to="/contact" className="inline-flex items-center justify-center mt-8 h-[52px] px-8 rounded-md bg-gold text-black font-semibold hover:bg-gold-glow shadow-gold">
            Get a Free Consultation
          </Link>
        </div>
      </section>
    </PageShell>
  );
}