import HomePageClient from './HomePageClient';

export const metadata = {
  title: 'Bridge Playbook — Your Online Bridge Guide | BridgePlaybook.com',
  description: 'Bridge Playbook is your independent, trusted guide to online bridge. Compare platforms, learn to play with beginner guides, and join a community of players over 60.',
  openGraph: { title: 'Bridge Playbook — Online Bridge for Everyone', description: 'Independent reviews of online bridge platforms, beginner guides, bidding tips, practice boards and a welcoming community. Completely free.', url: 'https://bridgeplaybook.com/' },
  alternates: { canonical: 'https://bridgeplaybook.com/' },
};

export default function HomePage() {
  return <HomePageClient />;
}
