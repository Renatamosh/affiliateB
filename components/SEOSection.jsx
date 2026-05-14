'use client';
import { useTheme } from './ThemeProvider';

export function SEOSection({ paras, title, seoBody }) {
  const { theme } = useTheme();
  const gold = '#d4a843';
  const navy = '#1c2f5e';
  const bg = theme === 'deep' ? '#060d1a' : theme === 'bright' ? '#f8f6f2' : '#f0ece3';
  const textC = theme === 'deep' ? 'rgba(255,255,255,0.72)' : '#444';
  const headC = theme === 'deep' ? '#fff' : navy;
  const border = theme === 'deep' ? '#1a2e50' : '#e5e0d8';

  const displayTitle = title || 'Full Guide';

  return (
    <section style={{ background: bg, padding: '64px 24px', borderTop: `1px solid ${border}` }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>In Depth</div>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 30, color: headC, margin: '0 0 32px' }}>{displayTitle}</h2>
        {seoBody ? (
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: seoBody }}
            style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85 }}
          />
        ) : (
          paras && paras.map((p, i) => (
            <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85, marginBottom: 24, marginTop: 0 }}>{p}</p>
          ))
        )}
      </div>
    </section>
  );
}
