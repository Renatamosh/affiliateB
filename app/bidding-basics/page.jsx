import BiddingClient from './BiddingClient';

export const metadata = {
  title: 'Bridge Bidding Basics — Learn the Auction',
  description: 'Master bridge bidding: HCP evaluation, suit openings, No Trump bids and simple conventions. Learn the language of bridge step by step.',
  alternates: { canonical: 'https://bridgeplaybook.com/bidding-basics/' },
};

export default function BiddingPage() {
  return <BiddingClient />;
}
