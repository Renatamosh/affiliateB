import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { getArticleBySlug, getAllArticleParams } from '../../../lib/articles';

export async function generateStaticParams() {
  return getAllArticleParams();
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article) return {};
  return {
    title: article.meta_title || `${article.title} — Bridge Playbook`,
    description: article.meta_description || article.excerpt || '',
    alternates: {
      canonical: article.canonical || `https://bridgeplaybook.com/${category}/${slug}/`,
    },
    openGraph: {
      title: article.og_title || article.meta_title || article.title,
      description: article.og_description || article.meta_description || article.excerpt || '',
      images: article.og_image || article.featured_image
        ? [{ url: article.og_image || article.featured_image }]
        : [],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article) notFound();

  // Render markdown body
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(article.content || '');
  const contentHtml = processed.toString();

  // FAQ JSON-LD schema
  const faqSchema = article.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;

  // Article JSON-LD schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || '',
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'Bridge Playbook' },
    publisher: { '@type': 'Organization', name: 'Bridge Playbook', url: 'https://bridgeplaybook.com' },
    ...(article.featured_image && { image: `https://bridgeplaybook.com${article.featured_image}` }),
  };

  return (
    <>
      {/* ── Schema markup ─────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── Scoped styles for article body content ────────────── */}
      <style>{`
        .article-body img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 24px 0;
          display: block;
        }
        .article-body h2 {
          font-family: 'Libre Baskerville', serif;
          font-size: 26px;
          color: #1c2f5e;
          margin: 40px 0 16px;
          line-height: 1.3;
        }
        .article-body h3 {
          font-family: 'Libre Baskerville', serif;
          font-size: 20px;
          color: #1c2f5e;
          margin: 28px 0 12px;
        }
        .article-body p {
          margin: 0 0 20px;
        }
        .article-body ul, .article-body ol {
          padding-left: 24px;
          margin: 0 0 20px;
        }
        .article-body li {
          margin-bottom: 8px;
        }
        .article-body a {
          color: #d4a843;
          text-decoration: underline;
        }
        .article-body blockquote {
          border-left: 4px solid #d4a843;
          margin: 24px 0;
          padding: 12px 20px;
          background: #fff8ee;
          color: #555;
          border-radius: 0 8px 8px 0;
        }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 15px;
        }
        .article-body th {
          background: #1c2f5e;
          color: #fff;
          padding: 10px 14px;
          text-align: left;
        }
        .article-body td {
          padding: 10px 14px;
          border-bottom: 1px solid #e5e0d8;
        }
        .article-body tr:nth-child(even) td {
          background: #faf8f5;
        }

        /* FAQ accordion */
        .faq-item {
          border: 1px solid #e5e0d8;
          border-radius: 8px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        .faq-item summary {
          padding: 16px 20px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #1c2f5e;
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          user-select: none;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary::after {
          content: '+';
          font-size: 22px;
          color: #d4a843;
          font-weight: 400;
          transition: transform 0.2s;
          flex-shrink: 0;
          margin-left: 12px;
        }
        .faq-item[open] summary::after {
          content: '−';
        }
        .faq-item[open] summary {
          border-bottom: 1px solid #e5e0d8;
        }
        .faq-answer {
          padding: 16px 20px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 15px;
          color: #444;
          line-height: 1.7;
          background: #faf8f5;
        }
      `}</style>

      <div style={{ background: 'var(--bg, #f5f3ee)', minHeight: '100vh', padding: '48px 24px' }}>
        <article style={{ maxWidth: 780, margin: '0 auto' }}>

          {/* ── Category + date ─────────────────────────────────── */}
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 13,
            color: '#d4a843',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 12,
          }}>
            {article.category || category} · {String(article.date).slice(0, 10)}
          </div>

          {/* ── Title ───────────────────────────────────────────── */}
          <h1 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 36,
            color: '#1c2f5e',
            margin: '0 0 20px',
            lineHeight: 1.25,
          }}>
            {article.title}
          </h1>

          {/* ── Excerpt ─────────────────────────────────────────── */}
          {article.excerpt && (
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 18,
              color: '#555',
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}>
              {article.excerpt}
            </p>
          )}

          {/* ── Featured image ──────────────────────────────────── */}
          {article.featured_image && (
            <img
              src={article.featured_image}
              alt={article.featured_image_alt || article.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 10,
                marginBottom: 36,
                display: 'block',
              }}
            />
          )}

          {/* ── Key takeaways ───────────────────────────────────── */}
          {article.key_takeaways?.length > 0 && (
            <div style={{
              background: '#fff',
              border: '1px solid #e5e0d8',
              borderLeft: '4px solid #d4a843',
              borderRadius: 8,
              padding: '20px 24px',
              marginBottom: 36,
            }}>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#d4a843',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 12,
              }}>
                Key Takeaways
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
                {article.key_takeaways.map((point, i) => (
                  <li key={i} style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: 15,
                    color: '#333',
                    lineHeight: 1.6,
                    marginBottom: 6,
                  }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Article body ────────────────────────────────────── */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 17,
              color: '#333',
              lineHeight: 1.8,
              marginBottom: 48,
            }}
          />

          {/* ── FAQ accordion ───────────────────────────────────── */}
          {article.faq?.length > 0 && (
            <section style={{ marginTop: 48, borderTop: '1px solid #e5e0d8', paddingTop: 40 }}>
              <h2 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 26,
                color: '#1c2f5e',
                margin: '0 0 24px',
              }}>
                Frequently Asked Questions
              </h2>
              {article.faq.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary>{item.question}</summary>
                  <div className="faq-answer">{item.answer}</div>
                </details>
              ))}
            </section>
          )}

        </article>
      </div>
    </>
  );
}
