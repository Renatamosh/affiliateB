import { getArticleBySlug, getAllArticleSlugs } from '../../../lib/articles';
import { notFound } from 'next/navigation';
import ArticlePageClient from './ArticlePageClient';

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: '404 — Not Found' };

  // Support both new snake_case fields and legacy camelCase
  const metaTitle = article.meta_title || article.metaTitle || `${article.title} | Bridge Playbook`;
  const metaDesc = article.meta_description || article.metaDescription || article.excerpt || '';
  const ogTitle = article.og_title || metaTitle;
  const ogDesc = article.og_description || metaDesc;
  const ogImage = article.og_image || article.featured_image || article.featuredImage || '';
  const canonical = article.canonical || `https://bridgeplaybook.com/articles/${params.slug}/`;

  // Build FAQ JSON-LD if present
  const faqSchema = article.faq && article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      type: 'article',
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    alternates: { canonical },
    ...(faqSchema && { other: { 'script:ld+json': JSON.stringify(faqSchema) } }),
  };
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const faqSchema = article.faq && article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ArticlePageClient article={article} />
    </>
  );
}
