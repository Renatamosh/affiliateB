import Link from 'next/link';
import { PageHeader } from '../../components/PageHeader';

export const metadata = {
  title: 'Features — Bridge Playbook',
  description: 'New features coming to Bridge Playbook. Stay tuned for interactive tools, convention cards, and more.',
};

export default function FeaturesPage() {
  const navy = '#1c2f5e';
  const gold = '#d4a843';

  return (
    <div>
      <PageHeader
        title="Features"
        subtitle="Interactive Tools — Coming Soon"
        suit="♠"
      />
      <div style={{ background: '#f5f3ee', minHeight: '60vh', padding: '80px 24px', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>🃏</div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 32, color: navy, marginBottom: 16 }}>
            Coming Soon
          </h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: '#555', lineHeight: 1.8, marginBottom: 32 }}>
            We are building interactive bridge tools including a convention card builder, hand analyser, and bidding practice module. Check back soon.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/practice-boards/">
              <button style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>
                Practice Boards →
              </button>
            </Link>
            <Link href="/bidding-quiz/">
              <button style={{ background: 'transparent', color: navy, border: `2px solid ${navy}`, borderRadius: 8, padding: '14px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>
                Bidding Quiz →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
