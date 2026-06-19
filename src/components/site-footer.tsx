import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.18_0_0)] text-white/80 mt-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white font-display font-bold text-lg mb-3">
            <span className="inline-block w-8 h-8 rounded-md bg-[color:var(--gold)] grid place-items-center text-black">α</span>
            AlphaBytes
          </div>
          <p className="text-sm leading-relaxed text-white/60 mb-4">
            Build Smarter. Scale Faster. Full-spectrum technology partner for products, apps, ERP and growth.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-md bg-white/5 hover:bg-[color:var(--gold)] hover:text-black transition-colors" aria-label="social">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Products", "Services", "About", "Portfolio", "Blog", "Contact"].map((x) => (
              <li key={x}><Link to={x === "Home" ? "/" : `/${x.toLowerCase()}`} className="hover:text-[color:var(--gold)]">{x}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2 text-sm">
            {["Android Apps","iOS Apps","Web Development","ERP Software","Brand Handling","Social Media","Digital Marketing","UI / UX Design"].map((s) => (
              <li key={s}><Link to="/services" className="hover:text-[color:var(--gold)]">{s}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin size={16} className="text-[color:var(--gold)] shrink-0 mt-0.5" /> Bengaluru, Karnataka, India</li>
            <li className="flex gap-2"><Phone size={16} className="text-[color:var(--gold)] shrink-0 mt-0.5" /> <a href="tel:+919999999999">+91 99999 99999</a></li>
            <li className="flex gap-2"><Mail size={16} className="text-[color:var(--gold)] shrink-0 mt-0.5" /> <a href="mailto:hello@alphabytesoftwares.in">hello@alphabytesoftwares.in</a></li>
            <li><a href="https://wa.me/919999999999" className="inline-flex items-center gap-2 mt-1 px-3 h-10 rounded-md bg-[color:var(--emerald)] text-white text-xs font-semibold"><MessageCircle size={14}/> WhatsApp Us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 py-5 flex flex-wrap gap-3 items-center justify-between text-xs text-white/50">
          <span>© 2026 AlphaBytes Softwares Pvt. Ltd.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}