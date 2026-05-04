import fs from 'fs';
import path from 'path';
import RealBridgeClient from './RealBridgeClient';

export const metadata = {
  title: 'RealBridge Review 2026 — Free for Players, ACBL Sanctioned',
  description: 'Independent RealBridge review 2026. Free for players, ~$3-5/player/session for clubs, ACBL-sanctioned since 2024. Video bridge that recreates the club experience online. Verified May 2026.',
  alternates: { canonical: 'https://bridgeplaybook.com/reviews/realbridge-review/' },
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  name: 'RealBridge Review 2026',
  author: { '@type': 'Organization', name: 'Bridge Playbook' },
  publisher: { '@type': 'Organization', name: 'Bridge Playbook' },
  datePublished: '2026-01-01',
  dateModified: '2026-05-01',
  itemReviewed: {
    '@type': 'SoftwareApplication',
    name: 'RealBridge',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web (browser-based)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free for players. Clubs pay approximately $3-$5 per player per session, billed to the club director. ACBL-sanctioned since 2024.',
    },
  },
  reviewRating: { '@type': 'Rating', ratingValue: '4.4', bestRating: '5' },
  reviewBody: 'RealBridge is the leading video-bridge platform — players see and hear each other, recreating the social experience of a live club. Free for players, ACBL-sanctioned since 2024. The closest online experience to a face-to-face club night.',
};

export default function RealBridgeReviewPage() {
  const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/platforms/realbridge.json'), 'utf8'));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <RealBridgeClient data={data} />
    </>
  );
}
