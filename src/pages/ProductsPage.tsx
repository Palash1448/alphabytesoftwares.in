import { PageShell, PageHeader } from "@/components/page-shell";

export function ProductsPage() {
  return (
    <PageShell>
      <PageHeader 
        eyebrow="Products" 
        title="Ready-to-deploy software products." 
        subtitle="ERP, POS, fleet management and more — battle-tested solutions for growing teams." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Products</h2>
          <p className="text-muted-foreground text-lg">Product showcase coming soon...</p>
        </div>
      </section>
    </PageShell>
  );
}