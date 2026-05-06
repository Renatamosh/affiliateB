import { getReviewBySlug, getAllReviewSlugs } from '../../../lib/reviews';
import { notFound } from 'next/navigation';
import ReviewClient from './ReviewClient';

export async function generateStaticParams() {
  const slugs = getAllReviewSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const review = getReviewBySlug(params.slug);
  if (!review) return { title: '404 — Not Found' };

  const metaTitle = review.meta_title || `${review.title} Review 2026 | Bridge Playbook`;
  const metaDesc = review.meta_description || review.excerpt || '';
  const ogTitle = review.og_title || metaTitle;
  const ogDesc = review.og_description || metaDesc;
  const ogImage = review.og_image || review.featured_image || '';
  const canonical = review.canonical || `https://bridgeplaybook.com/reviews/${params.slug}/`;

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
  };
}

export default function ReviewPage({ params }) {
  const review = getReviewBySlug(params.slug);
  if (!review) notFound();

  // Build JSON-LD schemas
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: review.meta_title || `${review.title} Review`,
    description: review.meta_description || '',
    datePublished: review.date ? new Date(review.date).toISOString().split('T')[0] : '',
    dateModified: review.date ? new Date(review.date).toISOString().split('T')[0] : '',
    author: { '@type': 'Organization', name: 'Bridge Playbook' },
    publisher: { '@type': 'Organization', name: 'Bridge Playbook' },
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: review.title,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web, iOS, Android',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(review.rating || 0),
      bestRating: '5',
    },
    ...(review.verdict && { reviewBody: review.verdict }),
  };

  const faqSchema = review.faq && review.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: review.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ReviewClient review={review} />
    </>
  );
}
