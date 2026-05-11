import BiddingClient from './BiddingClient';
import { getPageData } from '../../lib/pages';

export async function generateMetadata() {
  const page = getPageData('bidding-basics');
  return {
    title: page?.meta_title || 'Bridge Bidding Basics — Learn the Auction',
    description: page?.meta_description || 'Master bridge bidding: HCP evaluation, suit openings, No Trump bids and simple conventions.',
    alternates: { canonical: page?.canonical || 'https://bridgeplaybook.com/bidding-basics/' },
    openGraph: {
      title: page?.og_title || page?.meta_title,
      description: page?.og_description || page?.meta_description,
      ...(page?.og_image && { images: [{ url: page.og_image }] }),
    },
  };
}

export default function BiddingPage() {
  const data = getPageData('bidding-basics');
  return <BiddingClient data={data} />;
}
