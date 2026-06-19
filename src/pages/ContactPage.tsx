import { useState } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { db, ContactSubmission } from "@/lib/db";
import { Mail, Phone, MapPin, CheckCircle, MessageSquare } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    const submission: ContactSubmission = {
      id: `msg_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      date: new Date().toISOString(),
      isRead: false
    };

    db.saveSubmission(submission);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageShell>
      <PageHeader 
        eyebrow="Contact" 
        title="Let's build something together." 
        subtitle="Free 30-minute consultation. No pitch decks, just a clear plan forward." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 grid gap-12 lg:grid-cols-12">
          
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Connect with us</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a fully scoped product blueprint or just an idea on a napkin, our engineering team is here to help you scope, design, and compile it.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">Office Location</h3>
                  <p className="text-foreground font-medium mt-1">Bengaluru, Karnataka, India</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">Call Us</h3>
                  <p className="text-foreground font-medium mt-1">
                    <a href="tel:+919999999999" className="hover:text-gold transition-colors">+91 99999 99999</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">Email</h3>
                  <p className="text-foreground font-medium mt-1">
                    <a href="mailto:hello@alphabytesoftwares.in" className="hover:text-gold transition-colors">hello@alphabytesoftwares.in</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-xl border border-border">
              <h4 className="font-bold mb-2 flex items-center gap-2 text-gold"><MessageSquare size={16}/> Instant WhatsApp Direct</h4>
              <p className="text-xs text-muted-foreground mb-4">Chat directly with a team leader right now.</p>
              <a 
                href="https://wa.me/919999999999?text=Hi%20AlphaByte%2C%20I%27m%20interested%20in%20your%20services" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-emerald text-white text-xs font-semibold hover:bg-emerald-glow transition-colors"
              >
                Launch WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-card border border-border p-8 rounded-2xl shadow-elegant">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald/10 text-emerald flex items-center justify-center mb-6">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Shipped!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for reaching out. Your inquiry has been logged in the local database and is immediately reviewable in the <a href="/admin" className="text-gold hover:underline font-semibold">Admin Panel</a>.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 bg-gold text-black text-xs font-semibold h-10 px-6 rounded-md hover:bg-gold-glow transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">Send a Message</h3>
                  <p className="text-xs text-muted-foreground">All submissions route immediately to the admin console.</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-11 px-4 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full h-11 px-4 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Project Scope Query"
                    value={formData.subject} 
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full h-11 px-4 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">Project Brief / Message</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Tell us about what you want to build..."
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 bg-secondary rounded-lg border border-border text-sm text-foreground focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full sm:w-auto bg-gold hover:bg-gold-glow text-black font-semibold text-sm h-12 px-8 rounded-md transition-colors"
                >
                  Send Inquiry Message
                </button>
              </form>
            )}
          </div>
          
        </div>
      </section>
    </PageShell>
  );
}