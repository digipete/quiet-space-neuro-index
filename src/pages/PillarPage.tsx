import { Link, Navigate, useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { renderArticleSection } from '@/components/ArticleSections';
import { getGuidePage } from '@/data/landingPages';
import { getBlogPost } from '@/data/blogPosts';
import { Card, CardContent } from '@/components/ui/card';

const SITE = 'https://index.quietspace.club';

const PillarPage = () => {
  const location = useLocation();
  const page = getGuidePage(location.pathname.replace(/\/$/, '') || '/');

  if (!page) return <Navigate to="/" replace />;

  const pageUrl = `${SITE}${page.path}`;
  const toc = page.content.filter((s) => s.type === 'heading' && s.level === 2 && s.id);
  const faqs = page.content.filter((s) => s.type === 'faq');
  const related = page.relatedSlugs.map(getBlogPost).filter(Boolean);
  const isoUpdated = (() => {
    const d = new Date(page.updated);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString().split('T')[0];
  })();

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.metaDescription,
    datePublished: isoUpdated,
    dateModified: isoUpdated,
    image: `${SITE}/og-image.png`,
    author: { '@type': 'Organization', name: 'Quiet Space Club', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'Quiet Space Club',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: page.title, item: pageUrl },
    ],
  };

  const faqStructuredData =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((s) => ({
            '@type': 'Question',
            name: s.question,
            acceptedAnswer: { '@type': 'Answer', text: s.answer },
          })),
        }
      : null;

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription}
        keywords={page.keywords}
        url={pageUrl}
        type="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      {faqStructuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      )}

      <article className="min-h-screen bg-background">
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-4">Guide</p>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-5">{page.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{page.intro}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground mt-5">
                <Calendar className="w-4 h-4" />
                <span>Updated {page.updated}</span>
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto">
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

            <div>{page.content.map((section, i) => renderArticleSection(section, i))}</div>

            <aside className="mt-14 p-6 rounded-xl border border-primary/25 bg-primary/5">
              <h2 className="text-xl font-bold text-foreground mb-2">Find a neuro-inclusive workspace</h2>
              <p className="text-foreground/85 mb-4">
                NeuroIndex scores real offices, coworking spaces and meeting rooms on noise, lighting and sensory load,
                so your team can work somewhere that has actually been assessed.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/spaces/"
                  className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Search workspaces
                </Link>
                <Link
                  to="/how-it-works/"
                  className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  How the Neuro Index score works
                </Link>
                <Link
                  to="/workspace-providers/"
                  className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  List your space
                </Link>
              </div>
            </aside>

            {related.length > 0 && (
              <section className="mt-16 pt-10 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Read next</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map((p) => (
                    <Link key={p!.slug} to={`/blog/${p!.slug}/`} className="group">
                      <Card className="h-full overflow-hidden border-border/50 transition-all group-hover:shadow-md group-hover:border-primary/30">
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {p!.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{p!.excerpt}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default PillarPage;
