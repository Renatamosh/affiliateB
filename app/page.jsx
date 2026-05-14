import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import HomePageClient from './HomePageClient';

function getHomeData() {
  try {
    const filepath = path.join(process.cwd(), 'content', 'home.md');
    if (!fs.existsSync(filepath)) return null;
    const raw = fs.readFileSync(filepath, 'utf8');
    const { data } = matter(raw);
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata() {
  const cms = getHomeData();
  return {
    title: cms?.meta_title || 'Independent Online Bridge Guide 2026 — Platforms, Conventions & Masterpoints | Bridge Playbook',
    description: cms?.meta_description || 'Independent reviews of the best online bridge platforms 2026 — BBO ($5.99/mo), Funbridge ($15.99/mo), RealBridge, No Fear Bridge. Convention guides, ACBL masterpoints and bridge cruise comparisons. Pricing verified May 2026.',
    openGraph: {
      title: cms?.og_title || cms?.meta_title || 'Bridge Playbook — Independent Guide to Online Bridge',
      description: cms?.og_description || cms?.meta_description || 'Independent reviews of online bridge platforms, convention guides, ACBL masterpoint information and bridge cruise comparisons.',
      url: 'https://bridgeplaybook.com/',
      ...(cms?.og_image && { images: [{ url: cms.og_image }] }),
    },
    alternates: { canonical: cms?.canonical || 'https://bridgeplaybook.com/' },
  };
}

export default function HomePage() {
  const cms = getHomeData();
  return <HomePageClient data={cms} />;
}
