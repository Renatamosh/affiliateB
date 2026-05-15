import { getCollectionItem, getCollectionItemWithHtml } from '../../../lib/collections';
import CompareClient from './CompareClient';

export async function generateMetadata() {
  const item = getCollectionItem('comparisons', 'bbo-vs-funbridge-2026');
  return {
    title:       item?.meta_title       || 'BBO vs Funbridge 2026 — Pricing, Masterpoints & Features Compared',
    description: item?.meta_description || 'BBO vs Funbridge 2026 head-to-head: BBO ($5.99/mo BBO+) for live human play and ACBL masterpoints vs Funbridge ($15.99/mo Premium) for solo AI training. Verified pricing May 2026.',
    alternates:  { canonical: item?.canonical || 'https://bridgeplaybook.com/compare/bbo-vs-funbridge-2026/' },
    openGraph: {
      title:       item?.og_title       || item?.meta_title       || '',
      description: item?.og_description || item?.meta_description || '',
      ...(item?.og_image && { images: [{ url: item.og_image }] }),
    },
  };
}

export default async function CompareBBOFunbridge2026Page() {
  const item = await getCollectionItemWithHtml('comparisons', 'bbo-vs-funbridge-2026');

  // Build FAQ schema from CMS (fallback to empty)
  const faqItems = (item?.faq || []).map(f => ({
    q: f.question || f.q || '',
    a: f.answer   || f.a || '',
  }));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:    item?.meta_title || 'BBO vs Funbridge 2026 — Pricing, Masterpoints & Features Compared',
    description: item?.meta_description || '',
    author:      { '@type': 'Organization', name: 'Bridge Playbook' },
    publisher:   { '@type': 'Organization', name: 'Bridge Playbook' },
    datePublished: item?.date || '2026-05-01',
    dateModified:  item?.date || '2026-05-01',
  };

  const faqSchema = faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <CompareClient
        tldr={item?.tldr}
        keyTakeaways={item?.key_takeaways}
        faq={faqItems}
        bodyHtml={item?.bodyHtml}
        seoBodyHtml={item?.seoBodyHtml}
        seoSectionTitle={item?.seo_section_title}
      />
    </>
  );
}
