import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { getBlogPost, BlogSection, blogPosts } from '@/data/blogPosts';
import { Card, CardContent } from '@/components/ui/card';

const estimateReadTime = (content: BlogSection[]): number => {
  let wordCount = 0;
  content.forEach(section => {
    if (section.text) wordCount += section.text.split(/\s+/).length;
    if (section.items) section.items.forEach(item => { wordCount += item.split(/\s+/).length; });
    if (section.answer) wordCount += section.answer.split(/\s+/).length;
    if (section.rows) section.rows.forEach(row => row.forEach(cell => { wordCount += cell.split(/\s+/).length; }));
  });
  return Math.max(1, Math.ceil(wordCount / 200));
};

const renderSection = (section: BlogSection, index: number) => {
  switch (section.type) {
    case 'heading':
      if (section.level === 2) return <h2 key={index} id={section.id} className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-20">{section.text}</h2>;
      if (section.level === 3) return <h3 key={index} id={section.id} className="text-xl font-semibold text-foreground mt-8 mb-3">{section.text}</h3>;
      return null;
    case 'paragraph':
      return <p key={index} className="text-foreground/85 leading-relaxed mb-4 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80" dangerouslySetInnerHTML={{ __html: section.text || '' }} />;
    case 'list':
      return (
        <ul key={index} className="space-y-2 mb-6 ml-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-foreground/85 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div key={index} className="overflow-x-auto mb-6 rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                {section.headers?.map((h, i) => (
                  <th key={i} className="text-left p-3 font-semibold text-foreground border-b border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, ri) => (
                <tr key={ri} className="border-b border-border/50 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-3 text-foreground/85">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'image':
      return (
        <figure key={index} className="my-8">
          <img src={section.src} alt={section.alt} className="w-full rounded-lg shadow-sm" loading="lazy" />
          {section.alt && <figcaption className="text-sm text-muted-foreground mt-2 text-center">{section.alt}</figcaption>}
        </figure>
      );
    case 'protip':
      return (
        <div key={index} className="my-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
          <p className="text-sm font-semibold text-primary mb-1">Pro Tip</p>
          <p className="text-foreground/85 text-sm leading-relaxed">{section.text}</p>
        </div>
      );
    case 'faq':
      return (
        <div key={index} className="mb-6 last:mb-0" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 className="text-lg font-semibold text-foreground mb-2" itemProp="name">{section.question}</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p className="text-foreground/85 leading-relaxed" itemProp="text">{section.answer}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const readTime = estimateReadTime(post.content);
  const toc = post.content.filter(s => s.type === 'heading' && s.level === 2 && s.id);

  const faqSections = post.content.filter(s => s.type === 'faq');
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://blog.quietspace.club${post.heroImage}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": { "@type": "Organization", "name": "Quiet Space Club", "url": "https://quietspace.club" },
    "publisher": { "@type": "Organization", "name": "Quiet Space Club", "url": "https://quietspace.club" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://blog.quietspace.club/blog/${post.slug}` }
  };

  const faqStructuredData = faqSections.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqSections.map(s => ({
      "@type": "Question",
      "name": s.question,
      "acceptedAnswer": { "@type": "Answer", "text": s.answer }
    }))
  } : null;

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords}
        image={`https://blog.quietspace.club${post.heroImage}`}
        url={`https://blog.quietspace.club/blog/${post.slug}`}
        type="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
      {faqStructuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />}

      <article className="min-h-screen bg-background" itemScope itemType="https://schema.org/Article">
        {/* Hero */}
        <div className="w-full aspect-[21/9] max-h-[420px] overflow-hidden relative">
          <img src={post.heroImage} alt={post.heroImageAlt} className="w-full h-full object-cover" itemProp="image" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto -mt-16 relative z-10">
            {/* Breadcrumb */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4" itemProp="headline">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date} itemProp="datePublished">{post.date}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {readTime} min read
                </span>
              </div>
            </header>

            {/* Table of Contents */}
            {toc.length > 0 && (
              <nav className="mb-10 p-5 bg-muted/50 rounded-lg border border-border/50" aria-label="Table of contents">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Contents</h2>
                <ol className="space-y-1.5">
                  {toc.map((s, i) => (
                    <li key={i}>
                      <a href={`#${s.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {s.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Content */}
            <div className="prose-equivalent" itemProp="articleBody">
              {post.content.map((section, i) => renderSection(section, i))}
            </div>

            {/* Related Posts */}
            {otherPosts.length > 0 && (
              <section className="mt-16 pt-10 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherPosts.map(p => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                      <Card className="overflow-hidden border-border/50 transition-all group-hover:shadow-md group-hover:border-primary/30">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={p.heroImage} alt={p.heroImageAlt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1">{p.date}</p>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="h-16" />
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
