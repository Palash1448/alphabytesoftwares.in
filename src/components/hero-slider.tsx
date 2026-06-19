import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const slides = [
  { img: hero1, headline: "Build Smarter. Scale Faster.", sub: "Software, apps and ERP engineered to grow with your ambition.", cta: "Explore Products", href: "/products" },
  { img: hero2, headline: "Custom Android & iOS Apps", sub: "Native experiences your users will love on every screen.", cta: "See Our Services", href: "/services" },
  { img: hero3, headline: "ERP Tailored for Your Business", sub: "Inventory, HR, payroll and finance — unified on one dashboard.", cta: "Get a Free Quote", href: "/contact" },
  { img: hero4, headline: "Grow Your Brand Digitally", sub: "SEO, paid ads and social storytelling that compound month over month.", cta: "Start Today", href: "/contact" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => window.clearInterval(t);
  }, [paused]);

  const interact = (fn: () => void) => {
    fn();
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "clamp(420px, 88vh, 820px)" }}
      aria-roledescription="carousel"
    >
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${idx === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.img}
            alt={s.headline}
            className="absolute inset-0 w-full h-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
          <div className="relative z-10 h-full flex items-center">
            <div className="mx-auto max-w-[1320px] w-full px-5 md:px-8">
              <div className="max-w-2xl text-white">
                <div className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-gold mb-4">AlphaByte Softwares</div>
                <h1 className="font-display font-bold" style={{ fontSize: "clamp(1.8rem, 5.5vw, 4rem)" }}>{s.headline}</h1>
                <p className="mt-5 text-white/80 text-base md:text-xl max-w-xl">{s.sub}</p>
                <Link
                  to={s.href}
                  className="inline-flex items-center justify-center mt-8 w-full sm:w-auto h-[52px] px-8 rounded-md bg-gold text-black font-semibold hover:bg-gold-glow transition-colors shadow-gold"
                >
                  {s.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => interact(() => setI((i - 1 + slides.length) % slides.length))}
        className="hidden sm:grid place-items-center absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white hover:bg-gold hover:text-black z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => interact(() => setI((i + 1) % slides.length))}
        className="hidden sm:grid place-items-center absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white hover:bg-gold hover:text-black z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => interact(() => setI(idx))}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}