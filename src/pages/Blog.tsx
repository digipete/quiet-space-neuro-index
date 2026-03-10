import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import { blogPosts } from '@/data/blogPosts';

const Blog = () => {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Quiet Space Club Blog",
    "description": "Expert insights on neuro-inclusive workspaces, sensory-friendly design, and neurodiversity in the workplace.",
    "url": "https://blog.quietspace.club",
    "publisher": {
      "@type": "Organization",
      "name": "Quiet Space Club",
      "url": "https://quietspace.club"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "image": `https://blog.quietspace.club${post.heroImage}`,
      "url": `https://blog.quietspace.club/blog/${post.slug}`,
      "author": {
        "@type": "Organization",
        "name": "Quiet Space Club"
      }
    }))
  };

  return (
    <>
      <SEO
        title="Blog - Neuro-Inclusive Workspace Insights"
        description="Expert articles on creating sensory-friendly workspaces, inclusive meeting rooms, and neurodiversity in the workplace. Evidence-based guidance for neurodiverse professionals and workspace providers."
        keywords="neurodiversity blog, sensory friendly workspace, inclusive workplace design, ADHD workspace tips, autism friendly office, neuro-inclusive design, workplace accommodations UK"
        url="https://blog.quietspace.club/blog"
        type="website"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Quiet Space Club Blog
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Evidence-based insights on creating neuro-inclusive workspaces, sensory-friendly design, 
                and supporting neurodivergent professionals in the workplace.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {blogPosts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                  <Card className="h-full overflow-hidden border-border/50 transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.heroImage}
                        alt={post.heroImageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date}>{post.date}</time>
                      </div>
                      <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
