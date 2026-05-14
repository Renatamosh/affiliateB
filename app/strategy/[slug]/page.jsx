import { getCollectionItemWithHtml, getCollectionSlugs } from '../../../lib/collections';
import ArticleLayout from '../../../components/ArticleLayout';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getCollectionSlugs('strategy');
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getCollectionItemWithHtml('strategy', slug);
  if (!item) return { title: 'Strategy Article Not Found' };
  return {
    title: item.meta_title || item.title || 'Bridge Strategy | Bridge Playbook',
    description: item.meta_description || item.excerpt || '',
    alternates: { canonical: item.canonical || `https://bridgeplaybook.com/strategy/${slug}/` },
    openGraph: {
      title: item.og_title || item.meta_title || item.title || '',
      description: item.og_description || item.meta_description || item.excerpt || '',
      ...(item.og_image && { images: [{ url: item.og_image }] }),
    },
  };
}

export default async function StrategySlugPage({ params }) {
  const { slug } = await params;
  const item = await getCollectionItemWithHtml('strategy', slug);
  if (!item) notFound();

  return (
    <ArticleLayout
      title={item.title}
      subtitle={item.excerpt || 'Bridge Strategy'}
      suit="♣"
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
