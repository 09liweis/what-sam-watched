import { useHead } from '#imports';
import { SITE_URL, SEO_DEFAULTS } from '~/constants/seo';

interface SeoOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

export function useSeo(options: SeoOptions = {}) {
  const defaults = {
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    url: process.env.PUBLIC_URL || SITE_URL,
    image: `${process.env.PUBLIC_URL || SITE_URL}/og-image.png`,
    keywords: SEO_DEFAULTS.keywords,
  };

  const seo = { ...defaults, ...options };

  const metaTags: Array<Record<string, string>> = [
    { name: 'description', content: seo.description },
    { name: 'keywords', content: seo.keywords },
    { name: 'author', content: 'Sam Liweisen' },
    { name: 'robots', content: 'index,follow' },
    { name: 'language', content: 'English' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:url', content: seo.url },
    { property: 'og:image', content: seo.image },
    { property: 'og:site_name', content: SEO_DEFAULTS.site_name },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: seo.image },
  ];

  const scriptTags: Array<Record<string, string>> = [];
  if (options.jsonLd) {
    scriptTags.push({
      type: 'application/ld+json',
      children: JSON.stringify(options.jsonLd),
    });
  }

  useHead({
    title: seo.title,
    meta: metaTags,
    link: [
      { rel: 'canonical', href: seo.url },
    ],
    script: scriptTags,
  });
}
