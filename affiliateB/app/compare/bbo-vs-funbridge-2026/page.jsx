import CompareClient from './CompareClient';

export const metadata = {
  title: 'BBO vs Funbridge 2026 — Pricing, Masterpoints & Features Compared',
  description: 'BBO vs Funbridge 2026 head-to-head: BBO ($5.99/mo BBO+) for live human play and ACBL masterpoints vs Funbridge ($15.99/mo Premium) for solo AI training. Verified pricing May 2026.',
  alternates: { canonical: 'https://bridgeplaybook.com/compare/bbo-vs-funbridge-2026/' },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'BBO vs Funbridge 2026 — Pricing, Masterpoints & Features Compared',
  description: 'Independent head-to-head comparison of Bridge Base Online (BBO) and Funbridge in 2026. Verified pricing, ACBL masterpoint eligibility, AI strength, bidding systems, and audience fit.',
  author: { '@type': 'Organization', name: 'Bridge Playbook' },
  publisher: { '@type': 'Organization', name: 'Bridge Playbook' },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is BBO better than Funbridge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BBO and Funbridge solve different problems. BBO ($5.99/month BBO+) is better for live human play and ACBL masterpoints; Funbridge ($15.99/month Premium) is better for solo AI training with the strongest commercial bridge AI. Most serious players in 2026 use both.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I earn ACBL masterpoints on Funbridge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Funbridge does not award ACBL masterpoints on standard play. The eBridge Cup, an annual partnership with BBO, is the single exception. If your goal is masterpoint earning, BBO or RealBridge is the better choice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Funbridge cheaper than BBO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. BBO is significantly cheaper for most users — the free tier is genuinely complete, and BBO+ is $5.99/month. Funbridge requires a $15.99/month Premium subscription to unlock unlimited play; the annual plan brings this down to $13.33/month effective.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better for solo practice — BBO or Funbridge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Funbridge is the stronger solo trainer. The Argine engine is the strongest commercial bridge AI in 2026, and the replay-the-same-deals format makes improvement measurable. BBO\'s robots are competent but not at the same level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do most bridge players use both BBO and Funbridge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — most serious players in 2026 use both. BBO for live human play and ACBL masterpoints; Funbridge for solo AI training. The combined cost (BBO+ at $5.99/mo plus Funbridge annual at $13.33/mo) is under $20/month.',
      },
    },
  ],
};

export default function CompareBBOFunbridge2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CompareClient />
    </>
  );
}
