import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
          <img src="/alphabyte_logo.png" alt="AlphaByte" className="w-8 h-8 rounded-md object-contain" />
          <span>AlphaByte</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map((l) => (
            <Link 
              key={l.to} 
              to={l.to} 
              className={`transition-colors ${
                location.pathname === l.to 
                  ? "text-[color:var(--gold)]" 
                  : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="hidden md:inline-flex items-center px-4 h-10 rounded-md bg-[color:var(--emerald)] text-white text-sm font-semibold hover:bg-[color:var(--emerald-glow)] transition-colors">
          Get a Quote
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-3 rounded-md text-foreground/85 hover:bg-secondary min-h-11">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center h-12 rounded-md bg-[color:var(--emerald)] text-white font-semibold">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}