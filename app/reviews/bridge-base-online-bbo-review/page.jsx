import fs from 'fs';
import path from 'path';
import BBOClient from './BBOClient';

export const metadata = {
  title: 'Bridge Base Online (BBO) Review 2026 — Free vs BBO+ ($5.99/mo)',
  description: 'Independent BBO review for 2026. Free tier, BBO+ at $5.99/mo, ACBL masterpoints, GIB robots, tournaments. Pricing verified May 2026. Compare with Funbridge and RealBridge.',
  alternates: { canonical: 'https://bridgeplaybook.com/reviews/bridge-base-online-bbo-review/' },
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  name: 'Bridge Base Online (BBO) Review 2026',
  author: { '@type': 'Organization', name: 'Bridge Playbook' },
  publisher: { '@type': 'Organization', name: 'Bridge Playbook' },
  datePublished: '2026-01-01',
  dateModified: '2026-05-01',
  itemReviewed: {
    '@type': 'SoftwareApplication',
    name: 'Bridge Base Online',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free tier with full access to live tables; BBO+ at $5.99/month adds ad-free play, advanced robots, and Bridgerama+ digital magazine. 30-day free trial.',
    },
  },
  reviewRating: { '@type': 'Rating', ratingValue: '4.5', bestRating: '5' },
  reviewBody: 'BBO is the world\'s largest online bridge platform — the default home for online ACBL-sanctioned games, with approximately 11.6 million monthly visits. Free tier is genuinely complete. BBO+ at $5.99/month is reasonably priced.',
};

export default function BBOReviewPage() {
  const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/platforms/bbo.json'), 'utf8'));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <BBOClient data={data} />
    </>
  );
}
