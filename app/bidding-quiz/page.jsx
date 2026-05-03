import BiddingQuizClient from './BiddingQuizClient';

export const metadata = {
  title: 'Bridge Bidding Quiz — Test Your Bidding Skills',
  description: 'Test your bridge bidding with our 6-question interactive quiz. Real hands, multiple choice answers, instant feedback and scoring.',
  alternates: { canonical: 'https://bridgeplaybook.com/bidding-quiz/' },
};

export default function BiddingQuizPage() {
  return <BiddingQuizClient />;
}
