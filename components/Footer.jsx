'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BridgePlaybookLogo } from './Logo';
import { useTheme } from './ThemeProvider';

export function Footer() {
  const { theme } = useTheme();
  const gold = '#d4a843';
  const navy = '#0f1d3a';
  const bg = theme === 'deep' ? '#060d1a' : '#0f1d3a';

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'newsletter', email }).toString(),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const links = [
    ['Learn', [
      ['How to Play Bridge Online', '/how-to-play-bridge-online/'],
      ['Bidding Basics', '/bidding-basics/'],
      ['Card Play Strategy', '/card-play-strategy/'],
      ['Rules & Laws', '/rules/'],
    ]],
    ['Reviews & Compare', [
      ['All Platform Reviews', '/reviews/'],
      ['Bridge Base Online', '/reviews/bridge-base-online-bbo-review/'],
      ['Funbridge', '/reviews/funbridge-review/'],
      ['RealBridge', '/reviews/realbridge-review/'],
      ['BBO vs Funbridge 2026', '/compare/bbo-vs-funbridge-2026/'],
    ]],
    ['Community', [
      ['Glossary', '/glossary/'],
      ['Articles', '/articles/'],
      ['Community Hub', '/community/'],
      ['About Bridge Playbook', '/about/'],
      ['Contact Us', '/contact/'],
    ]],
  ];

  return (
    <footer style={{ background: bg, color: '#c8d4e8', fontFamily: "'Source Sans 3', sans-serif", padding: '56px 24px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 36, marginBottom: 48 }}>
          <div>
            <Link href="/"><BridgePlaybookLogo size="lg" variant="dark" showTagline={false} style={{ marginBottom: 14 }} /></Link>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', opacity: 0.8 }}>Independent guide to online bridge platforms, conventions, ACBL masterpoints, and bridge cruises. Pricing verified quarterly.</p>
            <div style={{ fontSize: 13, opacity: 0.4 }}>Pricing verified May 2026.</div>
          </div>

          {links.map(([heading, items]) => (
            <div key={heading}>
              <div style={{ color: gold, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{heading}</div>
              {items.map(([label, href]) => (
                <Link key={href} href={href}>
                  <div style={{ padding: '5px 0', fontSize: 15, opacity: 0.75 }}>{label}</div>
                </Link>
              ))}
            </div>
          ))}

          {/* Newsletter — Netlify form */}
          <div>
            <div style={{ color: gold, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Weekly Newsletter</div>
            {sent ? (
              <div style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, padding: '10px 0' }}>
                ✓ Subscribed — first issue arrives Tuesday.
              </div>
            ) : (
              <form
                name="newsletter"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleNewsletterSubmit}
              >
                <input type="hidden" name="form-name" value="newsletter" />
                <p style={{ display: 'none' }}><label>Skip: <input name="bot-field" /></label></p>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: 14, boxSizing: 'border-box', marginBottom: 8 }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', background: gold, color: navy, border: 'none', borderRadius: 6, padding: 10, fontSize: 14, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Subscribing…' : 'Subscribe Free'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, opacity: 0.4 }}>
          <span>© 2026 BridgePlaybook.com — Independent Online Bridge Guide. Affiliate disclosure: as of May 2026, no platform affiliate deals are active.</span>
          <span>♠ ♥ ♦ ♣</span>
        </div>
      </div>
    </footer>
  );
}
