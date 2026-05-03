'use client';
import Link from 'next/link';
import { BridgePlaybookLogo } from './Logo';
import { useTheme } from './ThemeProvider';

export function Footer() {
  const { theme } = useTheme();
  const gold = '#d4a843';
  const bg = theme === 'deep' ? '#060d1a' : '#0f1d3a';

  const links = [
    ['Learn', [['How to Play Bridge', '/how-to-play/'], ['Bidding Basics', '/bidding-basics/'], ['Card Play Strategy', '/card-play-strategy/'], ['Rules & Laws', '/rules/']]],
    ['Practice & Reviews', [['Practice Boards', '/practice-boards/'], ['Bidding Quiz', '/bidding-quiz/'], ['All Platform Reviews', '/platforms/'], ['Bridge Base Online', '/platforms/bridge-base-online/'], ['Funbridge', '/platforms/funbridge/']]],
    ['Community', [['Community Hub', '/community/'], ['Glossary', '/glossary/'], ['About Bridge Playbook', '/about/']]],
  ];

  return (
    <footer style={{ background: bg, color: '#c8d4e8', fontFamily: "'Source Sans 3', sans-serif", padding: '56px 24px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 36, marginBottom: 48 }}>
          <div>
            <Link href="/"><BridgePlaybookLogo size="lg" variant="dark" showTagline={false} style={{ marginBottom: 14 }} /></Link>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', opacity: 0.8 }}>Your friendly, trusted guide to online bridge. Independent reviews, beginner guides, and a welcoming community for players of all levels.</p>
            <div style={{ fontSize: 13, opacity: 0.4 }}>Some links are affiliate links.</div>
          </div>
          {links.map(([heading, items]) => (
            <div key={heading}>
              <div style={{ color: gold, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{heading}</div>
              {items.map(([label, href]) => (
                <Link key={href} href={href}><div style={{ padding: '5px 0', fontSize: 15, opacity: 0.75 }}>{label}</div></Link>
              ))}
            </div>
          ))}
          <div>
            <div style={{ color: gold, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Weekly Newsletter</div>
            <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '10px 14px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: 14, boxSizing: 'border-box', marginBottom: 8 }} />
            <button style={{ width: '100%', background: gold, color: '#0f1d3a', border: 'none', borderRadius: 6, padding: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Subscribe Free</button>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, opacity: 0.4 }}>
          <span>© 2026 BridgePlaybook.com — Independent Online Bridge Guide. Affiliate links help support this free site.</span>
          <span>♠ ♥ ♦ ♣</span>
        </div>
      </div>
    </footer>
  );
}
