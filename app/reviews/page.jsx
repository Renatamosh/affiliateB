import PlatformsClient from './PlatformsClient';
import { getCategoryDataWithHtml } from '../../lib/collections';

export async function generateMetadata() {
  const cat = await getCategoryDataWithHtml('reviews');
  return {
    title:       cat?.meta_title       || 'Best Online Bridge Platforms 2026 — 6 Platforms Compared & Reviewed',
    description: cat?.meta_description || 'Independent reviews of the 6 best online bridge platforms 2026: BBO ($5.99/mo), Funbridge ($15.99/mo), RealBridge, No Fear Bridge, Trickster, and Bridge Baron. Verified pricing and ACBL masterpoint eligibility, May 2026.',
    alternates:  { canonical: cat?.canonical || 'https://bridgeplaybook.com/reviews/' },
    openGraph: {
      title:       cat?.og_title       || cat?.meta_title       || '',
      description: cat?.og_description || cat?.meta_description || '',
    },
  };
}

export default function ReviewsPage() {
  return <PlatformsClient />;
}
