import Link from 'next/link';
import { getAllArticles } from '../../lib/articles';
import { PageHeader } from '../../components/PageHeader';

export const metadata = {
  title: 'Articles — Bridge Playbook',
  description: 'Guides, reviews and features about online bridge from Bridge Playbook.',
  alternates: { canonical: 'https://bridgeplaybook.com/articles/' },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div>
      <PageHeader title="Articles" subtitle="Guides, reviews and features" suit="♣" />
      <div style={{ background: 'var(--bg, #f5f3ee)', padding: '48px 24px', minHeight: '60vh' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {articles.length === 0 && (
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: '#777', fontSize: 18 }}>No articles published yet.</p>
          )}
          {articles.map(article => (
            <Link key={article.slug} href={`/articles/${article.slug}/`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 12, padding: '28px 32px', transition: 'box-shadow 0.15s' }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: '#d4a843', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  {article.category} · {article.date}
                </div>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: '#1c2f5e', margin: '0 0 12px', lineHeight: 1.35 }}>{article.title}</h2>
                {article.excerpt && (
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: '#555', lineHeight: 1.7, margin: '0 0 16px' }}>{article.excerpt}</p>
                )}
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: '#d4a843', fontWeight: 600 }}>Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
