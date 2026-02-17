import { useHead } from '#imports';
import { SITE_URL } from '~/constants/seo';

interface SeoOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

export function useSeo(options: SeoOptions = {}) {
  const defaults = {
    title: 'What Sam Watched',
    description: 'My amazing movie dashboard.',
    url: process.env.PUBLIC_URL || SITE_URL,
    image: '/og-image.png',
  };

  const seo = { ...defaults, ...options };

  const metaTags: Array<Record<string, string>> = [
    { name: 'description', content: seo.description },
    { name: 'robots', content: 'index,follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:url', content: seo.url },
    { property: 'og:image', content: seo.image },
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
    script: scriptTags,
  });
}
