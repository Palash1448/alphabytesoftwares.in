import { PageShell, PageHeader } from "@/components/page-shell";

export function ContactPage() {
  return (
    <PageShell>
      <PageHeader 
        eyebrow="Contact" 
        title="Let's build something together." 
        subtitle="Free 30-minute consultation. No pitch decks, just a clear plan forward." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-muted-foreground text-lg">Contact form and details coming soon...</p>
        </div>
      </section>
    </PageShell>
  );
}