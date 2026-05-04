import HomePageClient from './HomePageClient';

export const metadata = {
  title: 'Independent Online Bridge Guide 2026 — Platforms, Conventions & Masterpoints | Bridge Playbook',
  description: 'Independent reviews of the best online bridge platforms 2026 — BBO ($5.99/mo), Funbridge ($15.99/mo), RealBridge, No Fear Bridge. Convention guides, ACBL masterpoints and bridge cruise comparisons. Pricing verified May 2026.',
  openGraph: { title: 'Bridge Playbook — Independent Guide to Online Bridge', description: 'Independent reviews of online bridge platforms, convention guides, ACBL masterpoint information and bridge cruise comparisons. Verified pricing, intermediate-and-advanced focus.', url: 'https://bridgeplaybook.com/' },
  alternates: { canonical: 'https://bridgeplaybook.com/' },
};

export default function HomePage() {
  return <HomePageClient />;
}
