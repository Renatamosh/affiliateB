import Link from 'next/link';
import { getAllCollectionItems, getCategoryDataWithHtml } from '../../lib/collections';
import { PageHeader } from '../../components/PageHeader';
import { FAQSection } from '../../components/FAQSection';

const CATEGORY_SLUG = 'guides';
const COLLECTION    = 'guides';
const DEFAULTS = {
  title:       'Bridge Guides — Strategy, Conventions & Tips | Bridge Playbook',
  description: 'In-depth bridge guides covering strategy, conventions, bidding systems and tips for intermediate and advanced players.',
  canonical:   'https://bridgeplaybook.com/guides/',
  subtitle:    'Strategy, Conventions & Tips',
};

export async function generateMetadata() {
  const cat = await getCategoryDataWithHtml(CATEGORY_SLUG);
  return {
    title:       cat?.meta_title       || DEFAULTS.title,
    description: cat?.meta_description || DEFAULTS.description,
    alternates:  { canonical: cat?.canonical || DEFAULTS.canonical },
    openGraph: {
      title:       cat?.og_title       || cat?.meta_title       || '',
      description: cat?.og_description || cat?.meta_description || '',
    },
  };
}

export default async function GuidesIndexPage() {
  const cat    = await getCategoryDataWithHtml(CATEGORY_SLUG);
  const guides = getAllCollectionItems(COLLECTION).filter(g => g.status === 'published' || !g.status);

  const navy = '#1c2f5e';
  const gold = '#d4a843';

  const faqItems = (cat?.faq || []).map(f => ({ q: f.question || f.q || '', a: f.answer || f.a || '' }));

  return (
    <div>
      <PageHeader
        title="Bridge Guides"
        subtitle={cat?.hero_subtitle || DEFAULTS.subtitle}
        suit="♠"
      />

      {/* CMS intro body */}
      {cat?.bodyHtml && (
        <div style={{ background: '#fff', padding: '40px 24px', borderBottom: '1px solid #e5e0d8' }}>
          <div
            className="article-body"
            style={{ maxWidth: 900, margin: '0 auto', fontFamily: "'Source Sans 3', sans-serif", fontSize: '1.05rem', lineHeight: 1.8, color: '#444' }}
            dangerouslySetInnerHTML={{ __html: cat.bodyHtml }}
          />
        </div>
      )}

      {/* Article grid */}
      <div style={{ background: '#f5f3ee', minHeight: '40vh', padding: '52px 24px' }}>
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

      {/* Internal links */}
      {cat?.internal_links && cat.internal_links.length > 0 && (
        <div style={{ background: '#fff', padding: '40px 24px', borderTop: '1px solid #e5e0d8' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
              Related Reading
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {cat.internal_links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url}
                  style={{
                    display: 'inline-block',
                    background: '#f5f3ee',
                    border: '1px solid #e5e0d8',
                    borderRadius: 8,
                    padding: '10px 18px',
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: 15,
                    color: navy,
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && <FAQSection items={faqItems} />}
    </div>
  );
}
