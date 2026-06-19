import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";
import { MessageCircle } from "lucide-react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <a
        href="https://wa.me/919834676051?text=Hi%20AlphaByte%2C%20I%27m%20interested%20in%20your%20services"
        target="_blank" rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 grid place-items-center w-14 h-14 rounded-full bg-emerald text-white shadow-elegant hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-dark text-white">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-20 md:py-28 text-center">
        {eyebrow && <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">{eyebrow}</div>}
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        {subtitle && <p className="mt-5 text-white/70 max-w-2xl mx-auto text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}