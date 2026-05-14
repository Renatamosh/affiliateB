import Link from 'next/link';
import { getAllCollectionItems } from '../../lib/collections';
import { PageHeader } from '../../components/PageHeader';

export const metadata = {
  title: 'Bridge Platform Comparisons — Side-by-Side Reviews | Bridge Playbook',
  description: 'Compare online bridge platforms side-by-side. BBO vs Funbridge, RealBridge vs Trickster and more — pricing, masterpoints, features verified 2026.',
  alternates: { canonical: 'https://bridgeplaybook.com/compare/' },
};

// Hardcoded cards for existing static comparison pages
// (only needed for pages that don't have a CMS file in content/comparisons/)
const HARDCODED_COMPARISONS = [
  {
    title: 'BBO vs Funbridge 2026: Full Comparison',
    slug: 'bbo-vs-funbridge-2026',
    excerpt: 'Bridge Base Online vs Funbridge — pricing, ACBL masterpoints, AI training and which platform is right for you in 2026.',
    date: '2026-01-15',
    hardcoded: true,
  },
];

export default function CompareIndexPage() {
  const cmsItems = getAllCollectionItems('comparisons').filter(g => g.status === 'published' || !g.status);

  // Merge CMS items with hardcoded ones; deduplicate by slug
  const cmsSlug = new Set(cmsItems.map(i => i.slug));
  const hardcoded = HARDCODED_COMPARISONS.filter(h => !cmsSlug.has(h.slug));
  const allItems = [...hardcoded, ...cmsItems];

  const navy = '#1c2f5e';
  const gold = '#d4a843';

  return (
    <div>
      <PageHeader
        title="Platform Comparisons"
        subtitle="Side-by-Side Bridge Platform Reviews"
        suit="♠"
      />
      <div style={{ background: '#f5f3ee', minHeight: '60vh', padding: '52px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {allItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, color: navy, marginBottom: 16 }}>
                Comparisons coming soon
              </div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: '#555', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
                Detailed platform comparisons are on the way. In the meantime, browse our{' '}
                <Link href="/reviews/" style={{ color: gold, textDecoration: 'underline' }}>full platform reviews</Link>.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {allItems.map((item, i) => {
                const href = item.hardcoded
                  ? `/compare/${item.slug}/`
                  : `/compare/${item.slug || ''}/`;
                return (
                  <Link key={i} href={href}>
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
                        Read comparison →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
