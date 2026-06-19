import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AlphaBytes Softwares" },
      { name: "description", content: "Talk to AlphaBytes Softwares. Free 30-minute consultation, transparent quote, fast response." },
      { property: "og:title", content: "Contact AlphaBytes" },
      { property: "og:description", content: "Book a free consultation." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <PageHeader eyebrow="Contact" title="Let's build something together." subtitle="Tell us about your idea — we'll reply within one business day with a clear next step." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-2xl bg-card border border-border p-6 md:p-10"
          >
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle2 className="text-[color:var(--emerald)] mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold">Thanks — we've got it.</h2>
                <p className="text-muted-foreground mt-2">A senior team member will reply within one business day.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">Project enquiry</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Work email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                  <Field label="Company" name="company" />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1.5">Service of interest</label>
                  <select className="w-full h-12 px-3 rounded-md border border-input bg-background">
                    {["Mobile App","Web Development","ERP Software","Brand Handling","Social Media","Digital Marketing","UI / UX Design","Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1.5">Tell us about your project</label>
                  <textarea rows={5} className="w-full p-3 rounded-md border border-input bg-background resize-none" placeholder="Goals, timeline, anything we should know..." />
                </div>
                <button type="submit" className="mt-6 w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-md bg-[color:var(--emerald)] hover:bg-[color:var(--emerald-glow)] text-white font-semibold transition-colors">
                  Send enquiry
                </button>
              </>
            )}
          </form>

          <aside className="space-y-4">
            <InfoCard I={MapPin} title="Visit us" lines={["AlphaBytes Softwares Pvt. Ltd.","Indiranagar, Bengaluru","Karnataka 560038, India"]} />
            <InfoCard I={Phone} title="Call us" lines={["+91 99999 99999", "Mon – Sat, 10:00 – 19:00 IST"]} />
            <InfoCard I={Mail} title="Email" lines={["hello@alphabytesoftwares.in","sales@alphabytesoftwares.in"]} />
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 h-14 rounded-xl bg-[color:var(--emerald)] text-white font-semibold hover:bg-[color:var(--emerald-glow)] transition-colors">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border">
              <iframe
                title="AlphaBytes office on map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.6307%2C12.9656%2C77.6507%2C12.9856&layer=mapnik&marker=12.9756%2C77.6407"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}{required && <span className="text-[color:var(--gold)]"> *</span>}</label>
      <input name={name} type={type} required={required} className="w-full h-12 px-3 rounded-md border border-input bg-background" />
    </div>
  );
}

function InfoCard({ I, title, lines }: { I: typeof MapPin; title: string; lines: string[] }) {
  return (
    <div className="p-5 rounded-xl bg-card border border-border flex gap-4">
      <div className="w-11 h-11 rounded-lg bg-foreground text-[color:var(--gold)] grid place-items-center shrink-0"><I size={20}/></div>
      <div>
        <div className="font-semibold mb-1">{title}</div>
        {lines.map(l => <div key={l} className="text-sm text-muted-foreground">{l}</div>)}
      </div>
    </div>
  );
}