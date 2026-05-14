import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import FunbridgeClient from './FunbridgeClient';

const dataPath = path.join(process.cwd(), 'content/platforms/funbridge.json');

async function mdToHtml(md) {
  if (!md) return '';
  return (await remark().use(html).process(md)).toString();
}

export async function generateMetadata() {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return {
    title: data.meta_title || 'Funbridge Review 2026',
    description: data.meta_description || '',
    alternates: { canonical: data.canonical || 'https://bridgeplaybook.com/reviews/funbridge-review/' },
    openGraph: {
      title: data.og_title || data.meta_title,
      description: data.og_description || data.meta_description,
      ...(data.og_image && { images: [{ url: data.og_image }] }),
    },
  };
}

export default async function FunbridgeReviewPage() {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const sections = await Promise.all(
    (data.sections || []).map(async (s) => ({
      ...s,
      bodyHtml: await mdToHtml(s.body),
    }))
  );

  const seoBodyHtml = await mdToHtml(data.seo_body || '');
  const processedData = { ...data, sections, seoBodyHtml };

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${data.name} Review 2026`,
    author: { '@type': 'Organization', name: 'Bridge Playbook' },
    publisher: { '@type': 'Organization', name: 'Bridge Playbook' },
    datePublished: '2026-01-01',
    dateModified: '2026-05-01',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: data.name,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web, iOS, Android',
    },
    reviewRating: { '@type': 'Rating', ratingValue: String(data.rating), bestRating: '5' },
    reviewBody: data.verdict || '',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <FunbridgeClient data={processedData} />
    </>
  );
}
