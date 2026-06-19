import { PageShell, PageHeader } from "@/components/page-shell";

export function PortfolioPage() {
  return (
    <PageShell>
      <PageHeader 
        eyebrow="Portfolio" 
        title="320+ projects, 180+ happy clients." 
        subtitle="A selection of our favorite work — from mobile apps to enterprise systems." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Work</h2>
          <p className="text-muted-foreground text-lg">Portfolio showcase coming soon...</p>
        </div>
      </section>
    </PageShell>
  );
}