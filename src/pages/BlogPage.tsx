import { useState } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { db, BlogPost } from "@/lib/db";
import { Calendar, User, Clock, ArrowRight, X } from "lucide-react";

export function BlogPage() {
  const blogs = db.getBlogs();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <PageShell>
      <PageHeader 
        eyebrow="Blog" 
        title="Insights from the engineering floor." 
        subtitle="Technical deep-dives, industry analysis and lessons learned from 300+ projects." 
      />
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Latest Insights &amp; Articles</h2>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <article 
                key={b.id} 
                className="group flex flex-col rounded-xl bg-card border border-border overflow-hidden hover:shadow-elegant transition-shadow cursor-pointer"
                onClick={() => setSelectedPost(b)}
              >
                <div className="aspect-[16/10] bg-gradient-dark relative p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-20 bg-gradient-gold" />
                  <span className="relative text-xs text-gold font-semibold uppercase tracking-widest">{b.readTime}</span>
                  <h3 className="relative text-xl font-bold text-white leading-snug group-hover:text-gold transition-colors">{b.title}</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{b.summary}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                    <span className="flex items-center gap-1.5"><User size={13} /> {b.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={13} /> {b.date}</span>
                  </div>
                </div>
              </article>
            ))}
            {blogs.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No blog posts published yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-5 overflow-y-auto">
          <div className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-elegant overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center bg-secondary">
              <div>
                <span className="text-xs font-mono uppercase text-gold tracking-widest">{selectedPost.readTime}</span>
                <h3 className="font-bold text-xl mt-1 text-foreground leading-snug">{selectedPost.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedPost(null)} 
                className="p-1 rounded-md hover:bg-border text-muted-foreground hover:text-foreground shrink-0 ml-4"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 text-xs text-muted-foreground pb-4 border-b border-border">
                <span className="flex items-center gap-1.5"><User size={14} /> By {selectedPost.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {selectedPost.date}</span>
              </div>
              <p className="font-medium text-foreground text-base leading-relaxed bg-secondary p-4 rounded-xl border border-border italic">
                "{selectedPost.summary}"
              </p>
              <div className="text-muted-foreground text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {selectedPost.content}
              </div>
            </div>
            <div className="p-4 border-t border-border bg-secondary flex justify-end">
              <button 
                onClick={() => setSelectedPost(null)}
                className="bg-gold text-black text-xs font-semibold px-4 h-9 rounded-md hover:bg-gold-glow"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}