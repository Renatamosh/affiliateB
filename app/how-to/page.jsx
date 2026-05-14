import Link from 'next/link';
import { getAllCollectionItems } from '../../lib/collections';
import { PageHeader } from '../../components/PageHeader';

export const metadata = {
  title: 'How-To Guides — Bridge Playbook',
  description: 'Step-by-step how-to guides for online bridge players covering platform setup, bidding conventions, tournament entry and more.',
  alternates: { canonical: 'https://bridgeplaybook.com/how-to/' },
};

export default function HowToIndexPage() {
  const items = getAllCollectionItems('how-to').filter(g => g.status === 'published' || !g.status);

  const navy = '#1c2f5e';
  const gold = '#d4a843';

  return (
    <div>
      <PageHeader
        title="How-To Guides"
        subtitle="Step-by-Step Bridge Instructions"
        suit="♦"
      />
      <div style={{ background: '#f5f3ee', minHeight: '60vh', padding: '52px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, color: navy, marginBottom: 16 }}>
                How-to guides coming soon
              </div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: '#555', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
                We are currently publishing step-by-step bridge guides. In the meantime, browse our{' '}
                <Link href="/how-to-play-bridge-online/" style={{ color: gold, textDecoration: 'underline' }}>beginner guide</Link>.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {items.map((item, i) => (
                <Link key={i} href={`/how-to/${item.slug || ''}/`}>
                  <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 12, padding: 28, cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {item.featured_image && (
                      <img
                        src={item.featured_image}
                        alt={item.featured_image_alt || item.title || ''}
                        style={{ width: '100%', borderRadius: 8, marginBottom: 16, objectFit: 'cover', height: 180 }}
                      />
                    )}
                    <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: navy, marginBottom: 10, fontWeight: 700 }}>
                      {item.title}
                    </div>
                    {item.excerpt && (
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: '#555', lineHeight: 1.65, margin: '0 0 16px', flex: 1 }}>
                        {item.excerpt}
                      </p>
                    )}
                    {item.date && (
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: '#888', marginTop: 'auto' }}>
                        {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    )}
                    <div style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 14, marginTop: 12 }}>
                      Read guide →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
