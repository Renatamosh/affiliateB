'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';

const CAT_COLORS = { Features: '#8e44ad', Reviews: '#2980b9', Guides: '#27ae60', Strategy: '#d4a843', Community: '#c0392b', News: '#e67e22' };
const navy = '#1c2f5e';
const gold = '#d4a843';

function FAQItem({ question, answer, bdr, headC, textC }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${bdr}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '16px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 700, color: headC,
        }}
      >
        {question}
        <span style={{ fontSize: 20, color: gold, flexShrink: 0, marginLeft: 12 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.75, margin: '0 0 16px', paddingRight: 24 }}>
          {answer}
        </p>
      )}
    </div>
  );
}

function renderMarkdown(md, headC, textC) {
  if (!md) return null;
  const lines = md.split('\n');
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(22px,4vw,28px)', color: headC, margin: '40px 0 16px', lineHeight: 1.3 }}>{line.slice(3)}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={i} style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(26px,5vw,34px)', color: headC, margin: '0 0 20px' }}>{line.slice(2)}</h1>);
    } else if (line.startsWith('| ')) {
      // Simple table rendering
      const rows = [];
      let j = i;
      while (j < lines.length && lines[j].startsWith('|')) {
        rows.push(lines[j]);
        j++;
      }
      const isHeader = rows[1] && rows[1].match(/^\|[\s\-|]+\|$/);
      elements.push(
        <div key={i} style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15 }}>
            <tbody>
              {rows.filter((_, idx) => !(isHeader && idx === 1)).map((row, ridx) => {
                const cells = row.split('|').filter((_, ci) => ci > 0 && ci < row.split('|').length - 1);
                const Tag = ridx === 0 ? 'th' : 'td';
                return (
                  <tr key={ridx} style={{ background: ridx === 0 ? navy : ridx % 2 === 0 ? '#f9f8f5' : '#fff' }}>
                    {cells.map((cell, ci) => (
                      <Tag key={ci} style={{ padding: '10px 14px', color: ridx === 0 ? '#fff' : '#555', textAlign: 'left', borderBottom: '1px solid #e5e0d8', whiteSpace: 'nowrap' }}>
                        {cell.trim()}
                      </Tag>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      i = j;
      continue;
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      const parsed = line
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) =>
          `<a href="${url}" style="color:${gold};text-decoration:underline">${text}</a>`)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      elements.push(<p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85, margin: '0 0 18px' }} dangerouslySetInnerHTML={{ __html: parsed }} />);
    }
    i++;
  }
  return elements;
}

export default function ArticlePageClient({ article }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const headBg = isDeep ? 'linear-gradient(135deg,#060d1a,#0f1d3a)' : 'linear-gradient(135deg,#1c2f5e,#2d4a7a)';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.82)' : '#444';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const catColor = CAT_COLORS[article.category] || '#888';

  // Support both new snake_case and legacy camelCase field names
  const featuredImage = article.featured_image || article.featuredImage || '';
  const featuredImageAlt = article.featured_image_alt || article.featuredImageAlt || article.title;
  const keyTakeaways = article.key_takeaways || [];
  const faqItems = article.faq || [];
  const affiliateLinks = article.affiliate_links || [];

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

          {/* Featured Image */}
          {featuredImage && (
            <img src={featuredImage} alt={featuredImageAlt}
              style={{ width: '100%', borderRadius: 12, marginBottom: 40, display: 'block' }} />
          )}

          {/* Key Takeaways */}
          {keyTakeaways.length > 0 && (
            <div style={{ background: navy, borderRadius: 12, padding: '20px 28px', marginBottom: 40 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: gold, marginBottom: 14 }}>⚡ Key Takeaways</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {keyTakeaways.map((t, i) => (
                  <li key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 8 }}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Article body */}
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85 }}>
            {renderMarkdown(article.content, headC, textC)}
          </div>

          {/* Affiliate Links */}
          {affiliateLinks.length > 0 && (
            <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '20px 24px', margin: '40px 0' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: headC, marginBottom: 14 }}>Recommended Platforms</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {affiliateLinks.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel={`noopener${l.nofollow !== false ? ' nofollow' : ''}`}
                    style={{ background: navy, color: gold, borderRadius: 8, padding: '11px 22px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion */}
          {faqItems.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(20px,3vw,26px)', color: headC, margin: '0 0 4px' }}>Frequently Asked Questions</h2>
              {faqItems.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} bdr={bdr} headC={headC} textC={textC} />
              ))}
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${bdr}` }}>
            <Link href="/articles/" style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 16 }}>← Back to articles</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
