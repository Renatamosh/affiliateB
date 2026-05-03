'use client';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export function FAQSection({ items }) {
  const { theme } = useTheme();
  const navy = '#1c2f5e';
  const gold = '#d4a843';
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#080f1e' : theme === 'bright' ? '#f0ece3' : '#e8e2d8';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const headC = isDeep ? '#fff' : navy;
  const border = isDeep ? '#1a2e50' : '#e5e0d8';
  const [open, setOpen] = useState(null);

  return (
    <section style={{ background: bg, padding: '64px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</div>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 30, color: headC, margin: '0 0 32px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ background: cardBg, border: `1px solid ${isOpen ? gold : border}`, borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, fontWeight: 600, color: headC, paddingRight: 16, lineHeight: 1.4 }}>{item.q}</span>
                  <span style={{ color: gold, fontSize: 26, flexShrink: 0, lineHeight: 1, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', display: 'block' }}>+</span>
                </button>
                {isOpen && <div style={{ padding: '0 24px 22px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.85 }}>{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
