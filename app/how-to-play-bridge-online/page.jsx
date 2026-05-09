import HowToPlayClient from './HowToPlayClient';
import { getPageData } from '../../lib/pages';

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Play Bridge Online — Complete 2026 Guide',
  description: 'Step-by-step guide to playing bridge online: choosing a platform, creating an account, learning the basics, picking a bidding system, practicing with robots, finding a partner, and entering your first tournament.',
  totalTime: 'PT45M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'The Basics: What is Bridge?', text: 'Bridge is a trick-taking card game for four players in two partnerships. You sit North-South or East-West, opposite your partner. A standard 52-card deck is used.' },
    { '@type': 'HowToStep', position: 2, name: 'The Deal', text: 'The Dealer shuffles and deals all 52 cards clockwise, face down — one card at a time — giving 13 cards to each player.' },
    { '@type': 'HowToStep', position: 3, name: 'The Auction', text: 'Starting with the Dealer and going clockwise, each player bids or passes. A bid names a number (1-7) and a suit or No Trumps. When three players in a row pass, the auction ends.' },
    { '@type': 'HowToStep', position: 4, name: 'The Contract', text: 'The final bid is the contract. The number plus six tells you how many tricks you must win. So a 3 Hearts contract means 9 tricks with Hearts as trump.' },
    { '@type': 'HowToStep', position: 5, name: 'Dummy and Declarer Play', text: 'The player to Declarer\'s left leads the first card. Declarer\'s partner (Dummy) lays their hand face-up. Declarer plays both their own cards and Dummy\'s.' },
    { '@type': 'HowToStep', position: 6, name: 'Playing Tricks', text: 'Each player plays one card per trick, following suit if possible. The highest card of the suit led wins, unless a trump is played.' },
    { '@type': 'HowToStep', position: 7, name: 'Scoring', text: 'If Declarer wins at least the contract\'s required tricks, their side scores. Clubs/Diamonds score 20 per trick; Hearts/Spades score 30; No Trumps score 40 for the first then 30 each.' },
  ],
};

export async function generateMetadata() {
  const page = getPageData('how-to-play-bridge-online');
  return {
    title: page?.meta_title || 'How to Play Bridge Online — Complete 2026 Beginner Guide',
    description: page?.meta_description || 'Learn how to play bridge online in 2026 — step-by-step guide covering platforms, account setup, bidding systems, and your first robot game.',
    alternates: { canonical: page?.canonical || 'https://bridgeplaybook.com/how-to-play-bridge-online/' },
    openGraph: {
      title: page?.og_title || page?.meta_title || 'How to Play Bridge Online — Complete 2026 Guide',
      description: page?.og_description || page?.meta_description || 'Step-by-step guide to playing bridge online.',
      ...(page?.og_image && { images: [{ url: page.og_image }] }),
    },
  };
}

export default function HowToPlayBridgeOnlinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <HowToPlayClient />
    </>
  );
}
