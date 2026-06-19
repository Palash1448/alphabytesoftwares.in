import { PageShell, PageHeader } from "@/components/page-shell";

export function ServicesPage() {
  return (
    <PageShell>
      <PageHeader 
        eyebrow="Services" 
        title="Full-spectrum engineering and growth." 
        subtitle="From mobile apps to ERP systems to digital marketing — we handle the complete technology stack." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Services</h2>
          <p className="text-muted-foreground text-lg">Complete service details coming soon...</p>
        </div>
      </section>
    </PageShell>
  );
}