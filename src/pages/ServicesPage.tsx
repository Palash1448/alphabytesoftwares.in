import { useState, useEffect } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { db } from "@/lib/db";
import * as Icons from "lucide-react";

export function ServicesPage() {
  const [services, setServices] = useState(() => db.getServices());

  useEffect(() => {
    const handleUpdate = () => setServices(db.getServices());
    window.addEventListener("db-updated", handleUpdate);
    return () => window.removeEventListener("db-updated", handleUpdate);
  }, []);

  return (
    <PageShell>
      <PageHeader 
        eyebrow="Services" 
        title="Full-spectrum engineering and growth." 
        subtitle="From mobile apps to ERP systems to digital marketing — we handle the complete technology stack." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Core Service Verticals</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const IconComponent = (Icons as any)[s.iconName] || Icons.HelpCircle;
              return (
                <div key={s.id} className="group p-8 rounded-xl bg-card border border-border hover:border-gold hover:shadow-elegant transition-all">
                  <div className="w-12 h-12 rounded-lg bg-black text-gold grid place-items-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors">
                    <IconComponent size={24} strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                </div>
              );
            })}
            {services.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No services configured.
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}