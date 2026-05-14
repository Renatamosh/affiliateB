import { getCollectionItemWithHtml, getCollectionSlugs } from '../../../lib/collections';
import ArticleLayout from '../../../components/ArticleLayout';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getCollectionSlugs('comparisons');
  // Exclude slugs that have hardcoded static segment pages — Next.js gives those priority,
  // but filtering here keeps generateStaticParams clean and avoids duplicate route warnings.
  const STATIC_SLUGS = new Set(['bbo-vs-funbridge-2026', 'trickster-vs-realbridge']);
  return slugs
    .filter(slug => !STATIC_SLUGS.has(slug))
    .map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getCollectionItemWithHtml('comparisons', slug);
  if (!item) return { title: 'Comparison Not Found' };
  return {
    title: item.meta_title || item.title || 'Bridge Platform Comparison | Bridge Playbook',
    description: item.meta_description || item.excerpt || '',
    alternates: { canonical: item.canonical || `https://bridgeplaybook.com/compare/${slug}/` },
    openGraph: {
      title: item.og_title || item.meta_title || item.title || '',
      description: item.og_description || item.meta_description || item.excerpt || '',
      ...(item.og_image && { images: [{ url: item.og_image }] }),
    },
  };
}

export default async function CompareSlugPage({ params }) {
  const { slug } = await params;
  const item = await getCollectionItemWithHtml('comparisons', slug);
  if (!item) notFound();

  return (
    <ArticleLayout
      title={item.title}
      subtitle={item.excerpt || 'Platform Comparison'}
      suit="♠"
      bodyHtml={item.bodyHtml}
      seo_section_title={item.seo_section_title}
      seoBodyHtml={item.seoBodyHtml}
      faq={item.faq}
      date={item.date}
      excerpt={item.excerpt}
      featured_image={item.featured_image}
      featured_image_alt={item.featured_image_alt}
      key_takeaways={item.key_takeaways}
    />
  );
}
