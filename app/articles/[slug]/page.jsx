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
  return {
    title: article.metaTitle || `${article.title} | Bridge Playbook`,
    description: article.metaDescription || article.excerpt || '',
    openGraph: { title: article.title, description: article.excerpt || '', type: 'article' },
    alternates: { canonical: `https://bridgeplaybook.com/articles/${params.slug}/` },
  };
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  return <ArticlePageClient article={article} />;
}
