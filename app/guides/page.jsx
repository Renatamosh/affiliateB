import Link from 'next/link';
import { getAllCollectionItems } from '../../lib/collections';
import { PageHeader } from '../../components/PageHeader';

export const metadata = {
  title: 'Bridge Guides — Strategy, Conventions & Tips | Bridge Playbook',
  description: 'In-depth bridge guides covering strategy, conventions, bidding systems and tips for intermediate and advanced players.',
  alternates: { canonical: 'https://bridgeplaybook.com/guides/' },
};

export default function GuidesIndexPage() {
  const guides = getAllCollectionItems('guides').filter(g => g.status === 'published' || !g.status);

  const navy = '#1c2f5e';
  const gold = '#d4a843';

  return (
    <div>
      <PageHeader
        title="Bridge Guides"
        subtitle="Strategy, Conventions & Tips"
        suit="♠"
      />
      <div style={{ background: '#f5f3ee', minHeight: '60vh', padding: '52px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {guides.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, color: navy, marginBottom: 16 }}>
                Guides coming soon
              </div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: '#555', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
                We are currently publishing in-depth bridge guides. Check back shortly or browse our{' '}
                <Link href="/reviews/" style={{ color: gold, textDecoration: 'underline' }}>platform reviews</Link>.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {guides.map((guide, i) => (
                <Link key={i} href={`/guides/${guide.slug || ''}/`}>
                  <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 12, padding: 28, cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {guide.featured_image && (
                      <img
                        src={guide.featured_image}
                        alt={guide.featured_image_alt || guide.title || ''}
                        style={{ width: '100%', borderRadius: 8, marginBottom: 16, objectFit: 'cover', height: 180 }}
                      />
                    )}
                    <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: navy, marginBottom: 10, fontWeight: 700 }}>
                      {guide.title}
                    </div>
                    {guide.excerpt && (
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: '#555', lineHeight: 1.65, margin: '0 0 16px', flex: 1 }}>
                        {guide.excerpt}
                      </p>
                    )}
                    {guide.date && (
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: '#888', marginTop: 'auto' }}>
                        {new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
