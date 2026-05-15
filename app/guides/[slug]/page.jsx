import { getCollectionItemWithHtml, getCollectionSlugs } from '../../../lib/collections';
import ArticleLayout from '../../../components/ArticleLayout';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getCollectionSlugs('guides');
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getCollectionItemWithHtml('guides', slug);
  if (!item) return { title: 'Guide Not Found' };
  return {
    title: item.meta_title || item.title || 'Bridge Guide | Bridge Playbook',
    description: item.meta_description || item.excerpt || '',
    alternates: { canonical: item.canonical || `https://bridgeplaybook.com/guides/${slug}/` },
    openGraph: {
      title: item.og_title || item.meta_title || item.title || '',
      description: item.og_description || item.meta_description || item.excerpt || '',
      ...(item.og_image && { images: [{ url: item.og_image }] }),
    },
  };
}

export default async function GuideSlugPage({ params }) {
  const { slug } = await params;
  const item = await getCollectionItemWithHtml('guides', slug);
  if (!item) notFound();

  return (
    <ArticleLayout
      title={item.title}
      subtitle={item.excerpt || 'Bridge Guide'}
      suit="♠"
      bodyHtml={item.bodyHtml}
      seo_section_title={item.seo_section_title}
      seo_section_title_level={item.seo_section_title_level}
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
