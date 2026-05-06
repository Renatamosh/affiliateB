'use client';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';

const CAT_COLORS = { Features: '#8e44ad', Reviews: '#2980b9', Guides: '#27ae60', Strategy: '#d4a843', Community: '#c0392b' };

function renderMarkdown(md) {
  if (!md) return null;
  const lines = md.split('\n');
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(22px,4vw,28px)', margin: '40px 0 16px', lineHeight: 1.3 }}>{line.slice(3)}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={i} style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(26px,5vw,34px)', margin: '0 0 20px' }}>{line.slice(2)}</h1>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} style={{ fontWeight: 700, margin: '12px 0' }}><strong>{line.slice(2, -2)}</strong></p>);
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      const parsed = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) =>
        `<a href="${url}" style="color:#d4a843;text-decoration:underline">${text}</a>`
      ).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      elements.push(<p key={i} style={{ margin: '0 0 18px' }} dangerouslySetInnerHTML={{ __html: parsed }} />);
    }
    i++;
  }
  return elements;
}

export default function ArticlePageClient({ article }) {
  const { theme } = useTheme();
  const navy = '#1c2f5e';
  const gold = '#d4a843';
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const headBg = isDeep ? 'linear-gradient(135deg,#060d1a,#0f1d3a)' : 'linear-gradient(135deg,#1c2f5e,#2d4a7a)';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.82)' : '#444';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const catColor = CAT_COLORS[article.category] || '#888';

  return (
    <div>
      {/* Hero */}
      <div style={{ background: headBg, color: '#fff', padding: 'clamp(36px,6vw,64px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: 'clamp(120px,20vw,280px)', opacity: 0.04, userSelect: 'none' }}>♠</div>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, background: catColor + '22', color: catColor, border: `1px solid ${catColor}44`, borderRadius: 12, padding: '4px 14px', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>{article.category}</span>
            <span style={{ fontSize: 14, opacity: 0.6, fontFamily: "'Source Sans 3', sans-serif" }}>{article.date}</span>
          </div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(26px,5vw,42px)', lineHeight: 1.25, margin: '0 0 20px' }}>{article.title}</h1>
          {article.excerpt && <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 19, opacity: 0.85, lineHeight: 1.7, maxWidth: 640, margin: 0 }}>{article.excerpt}</p>}
        </div>
      </div>

      {/* Body */}
      <div style={{ background: bg, padding: 'clamp(32px,6vw,56px) 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {article.featuredImage && (
            <img src={article.featuredImage} alt={article.featuredImageAlt || article.title}
              style={{ width: '100%', borderRadius: 12, marginBottom: 40, display: 'block' }} />
          )}
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85 }}>
            {renderMarkdown(article.content)}
          </div>
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${bdr}` }}>
            <Link href="/articles/" style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 16 }}>← Back to articles</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
