import Link from 'next/link';
import { getAllArticles } from '../../lib/articles';
import { getCategoryDataWithHtml } from '../../lib/collections';
import { PageHeader } from '../../components/PageHeader';
import { FAQSection } from '../../components/FAQSection';

const CATEGORY_SLUG = 'articles';
const DEFAULTS = {
  title:       'Articles — Bridge Playbook',
  description: 'Guides, reviews and features about online bridge from Bridge Playbook.',
  canonical:   'https://bridgeplaybook.com/articles/',
  subtitle:    'Guides, reviews and features',
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

export default async function ArticlesPage() {
  const cat      = await getCategoryDataWithHtml(CATEGORY_SLUG);
  const articles = getAllArticles();

  const navy = '#1c2f5e';
  const gold = '#d4a843';

  const faqItems = (cat?.faq || []).map(f => ({ q: f.question || f.q || '', a: f.answer || f.a || '' }));

  return (
    <div>
      <PageHeader
        title="Articles"
        subtitle={cat?.hero_subtitle || DEFAULTS.subtitle}
        suit="♣"
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

      {/* Article list */}
      <div style={{ background: 'var(--bg, #f5f3ee)', padding: '48px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {articles.length === 0 && (
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: '#777', fontSize: 18 }}>No articles published yet.</p>
          )}
          {articles.map(article => (
            <Link key={article.slug} href={`/${article.categorySlug}/${article.slug}/`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 12, padding: '28px 32px', transition: 'box-shadow 0.15s' }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  {article.category} · {article.date}
                </div>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: navy, margin: '0 0 12px', lineHeight: 1.35 }}>{article.title}</h2>
                {article.excerpt && (
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: '#555', lineHeight: 1.7, margin: '0 0 16px' }}>{article.excerpt}</p>
                )}
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, fontWeight: 600 }}>Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Internal links */}
      {cat?.internal_links && cat.internal_links.length > 0 && (
        <div style={{ background: '#fff', padding: '40px 24px', borderTop: '1px solid #e5e0d8' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
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
