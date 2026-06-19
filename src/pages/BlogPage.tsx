import { PageShell, PageHeader } from "@/components/page-shell";

export function BlogPage() {
  return (
    <PageShell>
      <PageHeader 
        eyebrow="Blog" 
        title="Insights from the engineering floor." 
        subtitle="Technical deep-dives, industry analysis and lessons learned from 300+ projects." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Latest Posts</h2>
          <p className="text-muted-foreground text-lg">Blog posts coming soon...</p>
        </div>
      </section>
    </PageShell>
  );
}