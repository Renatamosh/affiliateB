import HowToPlayClient from './HowToPlayClient';

export const metadata = {
  title: 'How to Play Bridge — Step-by-Step Beginner Guide',
  description: 'Learn how to play bridge from scratch with our plain-English step-by-step guide. Perfect for complete beginners — no jargon, no rush.',
  openGraph: { title: 'How to Play Bridge — Complete Beginner Guide', description: 'Our 7-step guide takes you from the very first deal to playing a complete hand.' },
  alternates: { canonical: 'https://bridgeplaybook.com/how-to-play/' },
};

export default function HowToPlayPage() {
  return <HowToPlayClient />;
}
