# Quiet Space Club - Flat HTML Site

This is the flat HTML version of Quiet Space Club designed for SEO optimization and search engine crawling.

## Purpose

- **SEO Optimization**: Provides crawlable HTML content for search engines
- **Fast Loading**: Static HTML loads instantly for search bots
- **User Redirection**: Automatically redirects users to the full React app at `index.quietspace.club`

## Structure

```
flat-site/
├── index.html                    # Homepage
├── about/index.html             # About page
├── contact/index.html           # Contact page
├── how-it-works/index.html      # How it works page
├── resources/index.html         # Resources page
├── workspace-providers/index.html # Workspace providers page
├── sitemap.xml                  # XML sitemap
├── robots.txt                   # Robots directives
└── README.md                    # This file
```

## Features

- **Complete SEO Meta Tags**: Title, description, keywords, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD markup for rich snippets
- **Clean URLs**: Directory structure for `/about/`, `/contact/`, etc.
- **Auto-Redirect**: 2-second delay then redirect to React app
- **Loading States**: Visual feedback during redirect

## Deployment

1. Upload all files to your web hosting for `quietspace.club`
2. Configure DNS to point `quietspace.club` to this static site
3. Keep `index.quietspace.club` pointing to your React app
4. Submit sitemap to Google Search Console

## Benefits

- Search engines can crawl and index all content
- Users get seamless redirect to functional app
- Clean separation of SEO and application concerns
- Fast initial page loads for better Core Web Vitals