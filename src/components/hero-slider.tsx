import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/db";

export function HeroSlider() {
  const [slides, setSlides] = useState(() => db.getSlides());
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setSlides(db.getSlides());
      setI(0);
    };
    window.addEventListener("db-updated", handleUpdate);
    return () => window.removeEventListener("db-updated", handleUpdate);
  }, []);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => window.clearInterval(t);
  }, [paused, slides.length]);

  const interact = (fn: () => void) => {
    fn();
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 8000);
  };

  if (slides.length === 0) return null;

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
            alt={s.headline || "Slide Image"}
            className="absolute inset-0 w-full h-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
            width={1920}
            height={1080}
          />
        </div>
      ))}
    </section>
  );
}