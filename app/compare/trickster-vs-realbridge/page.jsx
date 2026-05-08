import CompareClient from './CompareClient';

export const metadata = {
  title: 'Trickster Cards vs RealBridge 2026 — Which Is Better for Online Bridge?',
  description: 'Trickster Cards vs RealBridge: free casual play vs live video club experience. Honest comparison of cost, webcam requirements, ACBL support, and who each platform is really for.',
  alternates: { canonical: 'https://bridgeplaybook.com/compare/trickster-vs-realbridge/' },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Trickster Cards vs RealBridge 2026 — Which Is Better for Online Bridge?',
  description: 'Independent head-to-head comparison of Trickster Cards and RealBridge for online bridge players. Covers cost, webcam requirements, ACBL sanctioning, social experience, and audience fit.',
  author: { '@type': 'Organization', name: 'Bridge Playbook' },
  publisher: { '@type': 'Organization', name: 'Bridge Playbook' },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Trickster Cards free to play bridge online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Trickster Cards is free to play on web, iOS, Android, and Windows. The free version includes ads skippable within 5 seconds. A VIP pass removes ads entirely. You can play with friends or bots with no subscription required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a webcam to use RealBridge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. RealBridge requires a working webcam — a phone camera, laptop webcam, or external webcam all work. Seeing all four players is central to how the platform works. Without a camera you cannot join a RealBridge game.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I earn ACBL masterpoints on RealBridge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Since July 1, 2025, clubs can host ACBL-sanctioned games on RealBridge, making it the only online platform where you can earn masterpoints in a setting that mirrors real club play with full video.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better for beginners — Trickster Cards or RealBridge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trickster Cards is more approachable for beginners. You can jump in anytime, play against bots to practice, and there is no pressure of being on camera. RealBridge is better once you are comfortable at club level and want the social experience from home.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I play bridge on Trickster Cards without other human players?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Trickster Cards has bots that fill in when human players are unavailable, so you can practice at any time without scheduling a session or finding three other players.',
      },
    },
  ],
};

export default function CompareTricksterRealBridgePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CompareClient />
    </>
  );
}
