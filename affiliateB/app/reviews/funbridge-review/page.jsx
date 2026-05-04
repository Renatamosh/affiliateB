import fs from 'fs';
import path from 'path';
import FunbridgeClient from './FunbridgeClient';

export const metadata = {
  title: 'Funbridge Review 2026 — Premium ($15.99/mo) vs Free Tier',
  description: 'Independent Funbridge review 2026. Pricing tiers ($15.99 Premium, $24.99 Premium+), Argine AI engine, ACBL masterpoints, bidding systems. How Funbridge compares to BBO. Verified May 2026.',
  alternates: { canonical: 'https://bridgeplaybook.com/reviews/funbridge-review/' },
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  name: 'Funbridge Review 2026',
  author: { '@type': 'Organization', name: 'Bridge Playbook' },
  publisher: { '@type': 'Organization', name: 'Bridge Playbook' },
  datePublished: '2026-01-01',
  dateModified: '2026-05-01',
  itemReviewed: {
    '@type': 'SoftwareApplication',
    name: 'Funbridge',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '15.99',
      priceCurrency: 'USD',
      description: 'Free tier with 2 deals/day. Premium $15.99/month or $159.99/year. Premium+ $24.99/month or $249.99/year. 1-month free trial for new subscribers.',
    },
  },
  reviewRating: { '@type': 'Rating', ratingValue: '4.3', bestRating: '5' },
  reviewBody: 'Funbridge is the strongest solo AI bridge trainer in 2026 — proprietary Argine engine, replay-the-same-deals format, approximately 170,000 active users. Caveat for North American players: standard play does not award ACBL masterpoints (eBridge Cup is the exception).',
};

export default function FunbridgeReviewPage() {
  const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/platforms/funbridge.json'), 'utf8'));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <FunbridgeClient data={data} />
    </>
  );
}
