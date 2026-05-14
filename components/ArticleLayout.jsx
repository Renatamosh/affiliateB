import { PageHeader } from './PageHeader';
import { SEOSection } from './SEOSection';
import { FAQSection } from './FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';

export default function ArticleLayout({
  title,
  subtitle,
  suit,
  bodyHtml,
  seo_section_title,
  seoBodyHtml,
  faq,
  date,
  excerpt,
  featured_image,
  featured_image_alt,
  key_takeaways,
}) {
  // Map CMS faq format {question, answer} → FAQSection format {q, a}
  const faqItems = faq
    ? faq.map(item => ({ q: item.question || item.q || '', a: item.answer || item.a || '' }))
    : [];

  return (
    <div>
      <style>{`
        .article-body img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; display: block; }
        .article-body h2 { font-family: 'Libre Baskerville', serif; font-size: 1.6rem; color: #1c2f5e; margin: 2rem 0 1rem; }
        .article-body h3 { font-family: 'Libre Baskerville', serif; font-size: 1.3rem; color: #1c2f5e; margin: 1.5rem 0 0.75rem; }
        .article-body p { font-family: 'Source Sans 3', sans-serif; font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.25rem; color: #444; }
        .article-body ul, .article-body ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .article-body li { font-family: 'Source Sans 3', sans-serif; font-size: 1.05rem; line-height: 1.75; color: #444; margin-bottom: 0.4rem; }
        .article-body a { color: #d4a843; text-decoration: underline; }
        .article-body strong { font-weight: 700; }
      `}</style>

      <PageHeader title={title} subtitle={subtitle} suit={suit} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        {/* Date */}
        {date && (
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: '#888', marginBottom: 24 }}>
            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        )}

        {/* Featured image */}
        {featured_image && (
          <img
            src={featured_image}
            alt={featured_image_alt || ''}
            style={{ width: '100%', borderRadius: 12, marginBottom: 32 }}
          />
        )}

        {/* Key takeaways box */}
        {key_takeaways && key_takeaways.length > 0 && (
          <div style={{
            background: '#eef2fa',
            border: `2px solid ${navy}`,
            borderRadius: 12,
            padding: '20px 28px',
            marginBottom: 36,
          }}>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: navy, fontWeight: 700, marginBottom: 12 }}>
              Key Takeaways
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
              {key_takeaways.map((item, i) => (
                <li key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 6 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body HTML */}
        {bodyHtml && (
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )}
      </div>

      {/* SEO Section */}
      {(seoBodyHtml || seo_section_title) && (
        <SEOSection
          title={seo_section_title || 'Full Guide'}
          seoBody={seoBodyHtml}
        />
      )}

      {/* FAQ Section */}
      {faqItems.length > 0 && (
        <FAQSection items={faqItems} />
      )}
    </div>
  );
}
