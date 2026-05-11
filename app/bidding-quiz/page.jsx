import BiddingQuizClient from './BiddingQuizClient';
import { getPageData } from '../../lib/pages';

export async function generateMetadata() {
  const page = getPageData('bidding-quiz');
  return {
    title: page?.meta_title || 'Bridge Bidding Quiz — Test Your Bidding Skills',
    description: page?.meta_description || 'Test your bridge bidding with our interactive quiz. Real hands, multiple choice answers, instant feedback and scoring.',
    alternates: { canonical: page?.canonical || 'https://bridgeplaybook.com/bidding-quiz/' },
    openGraph: {
      title: page?.og_title || page?.meta_title,
      description: page?.og_description || page?.meta_description,
      ...(page?.og_image && { images: [{ url: page.og_image }] }),
    },
  };
}

export default function BiddingQuizPage() {
  const data = getPageData('bidding-quiz');
  return <BiddingQuizClient data={data} />;
}
