import type { BlogSection } from '@/data/blogPosts';

export const renderArticleSection = (section: BlogSection, index: number) => {
  switch (section.type) {
    case 'heading':
      if (section.level === 2)
        return (
          <h2 key={index} id={section.id} className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-20">
            {section.text}
          </h2>
        );
      if (section.level === 3)
        return (
          <h3 key={index} id={section.id} className="text-xl font-semibold text-foreground mt-8 mb-3">
            {section.text}
          </h3>
        );
      return null;
    case 'paragraph':
      return (
        <p
          key={index}
          className="text-foreground/85 leading-relaxed mb-4 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80"
          dangerouslySetInnerHTML={{ __html: section.text || '' }}
        />
      );
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
                  <th key={i} className="text-left p-3 font-semibold text-foreground border-b border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, ri) => (
                <tr key={ri} className="border-b border-border/50 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-3 text-foreground/85">
                      {cell}
                    </td>
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
        <div key={index} className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-foreground mb-2">{section.question}</h3>
          <p className="text-foreground/85 leading-relaxed">{section.answer}</p>
        </div>
      );
    default:
      return null;
  }
};
