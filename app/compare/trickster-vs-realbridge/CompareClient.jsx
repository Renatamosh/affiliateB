'use client';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';
import { PageHeader } from '../../../components/PageHeader';
import { FAQSection } from '../../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';

const COMPARISON = [
  ['Cost for players', 'Free (ads) or VIP pass (~$30/yr)', 'Free to join; $5–15 per session'],
  ['Webcam required', '✗ No', '✓ Yes — mandatory'],
  ['Play anytime', '✓ Yes — 24/7', '✗ No — scheduled sessions only'],
  ['Bot/AI opponents', '✓ Yes', '✗ No'],
  ['Video with opponents', 'Optional', '✓ Built-in, all 4 players'],
  ['ACBL sanctioned', '✗ No', '✓ Yes (from July 2025)'],
  ['Platform', 'Web, iOS, Android, Windows', 'Browser only'],
  ['Best for', 'Casual, flexible play', 'Club-style, social play'],
];

const FAQS = [
  { q: 'Is Trickster Cards free to play bridge online?', a: 'Yes. Trickster Cards is free to play on web, iOS, Android, and Windows. The free version includes ads skippable within 5 seconds. A VIP pass removes ads entirely. You can play with friends or bots with no subscription required.' },
  { q: 'Do I need a webcam to use RealBridge?', a: 'Yes. RealBridge requires a working webcam — a phone camera, laptop webcam, or external webcam all work. Seeing all four players is central to how the platform works. Without a camera you cannot join a RealBridge game.' },
  { q: 'Can I earn ACBL masterpoints on RealBridge?', a: 'Yes. Since July 1, 2025, clubs can host ACBL-sanctioned games on RealBridge, making it the only online platform where you can earn masterpoints in a setting that mirrors real club play with full video.' },
  { q: 'Which is better for beginners — Trickster Cards or RealBridge?', a: 'Trickster Cards is more approachable for beginners. You can jump in anytime, play against bots to practice, and there is no pressure of being on camera. RealBridge is better once you are comfortable at club level and want the social experience from home.' },
  { q: 'Can I play bridge on Trickster Cards without other human players?', a: 'Yes. Trickster Cards has bots that fill in when human players are unavailable, so you can practice at any time without scheduling a session or finding three other players.' },
];

export default function CompareClient() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.8)' : '#444';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const tldrBg = isDeep ? 'rgba(212,168,67,0.08)' : '#fff8e6';

  return (
    <div>
      <PageHeader title="Trickster Cards vs RealBridge" subtitle="Independent Head-to-Head · Verified May 2026" suit="♠" />
      <div style={{ background: bg, padding: '48px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>

          {/* Quick Answer */}
          <div style={{ background: tldrBg, border: `2px solid ${gold}`, borderRadius: 12, padding: '20px 28px', marginBottom: 40 }}>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: gold, fontWeight: 700, marginBottom: 10 }}>Quick Answer</div>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: headC, lineHeight: 1.7, margin: 0 }}>
              Trickster Cards and RealBridge solve different problems. Trickster is free, always available, and works without a webcam — perfect for casual play with friends or solo practice against bots. RealBridge puts you on live video with all four players visible, exactly like a club table. <strong>Choose Trickster for flexibility and zero cost; choose RealBridge if you miss the social side of the game.</strong> Many players use both.
            </p>
          </div>

          {/* Comparison table */}
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, marginTop: 0, marginBottom: 20 }}>Head-to-Head Comparison</h2>
          <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, fontFamily: "'Source Sans 3', sans-serif" }}>
              <thead>
                <tr style={{ background: navy }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: gold, fontWeight: 700, fontSize: 13, letterSpacing: '0.06em' }}>Feature</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Trickster Cards</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>RealBridge</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feature, trickster, rb], i) => (
                  <tr key={feature} style={{ borderBottom: `1px solid ${bdr}`, background: i % 2 === 1 ? (isDeep ? 'rgba(255,255,255,0.025)' : '#faf8f5') : 'none' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: headC }}>{feature}</td>
                    <td style={{ padding: '14px 20px', color: textC, lineHeight: 1.5 }}>{trickster}</td>
                    <td style={{ padding: '14px 20px', color: textC, lineHeight: 1.5 }}>{rb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Decision boxes */}
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, marginTop: 0, marginBottom: 20 }}>Which Should You Choose?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
            <div style={{ background: cardBg, border: `2px solid ${navy}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: navy, marginBottom: 14 }}>Choose Trickster if</div>
              {[
                'You want to play anytime, no scheduling',
                'You do not have a webcam',
                'You want to practice with bots',
                'You want to play for free with no session fees',
              ].map(item => (
                <div key={item} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, padding: '6px 0', paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: gold, fontWeight: 700 }}>✓</span>{item}
                </div>
              ))}
            </div>
            <div style={{ background: cardBg, border: `2px solid #27ae60`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: '#27ae60', marginBottom: 14 }}>Choose RealBridge if</div>
              {[
                'You miss the social side of club bridge',
                'You want to see your partner and opponents',
                'You play in ACBL-sanctioned club games',
                'You want the most authentic online experience',
              ].map(item => (
                <div key={item} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, padding: '6px 0', paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: gold, fontWeight: 700 }}>✓</span>{item}
                </div>
              ))}
            </div>
            <div style={{ background: navy, borderRadius: 12, padding: 24, color: '#fff' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: gold, marginBottom: 14 }}>Use both if</div>
              {[
                'You want flexible practice AND club play',
                'You use Trickster to warm up during the week',
                'You join RealBridge for your weekly club session',
                'Most serious players use both',
              ].map(item => (
                <div key={item} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.85)', padding: '6px 0', paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: gold, fontWeight: 700 }}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>

          {/* Review CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
            <a href="https://www.trickstercards.com/games/bridge/" rel="nofollow noopener" target="_blank" style={{ display: 'block', background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 20, textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 6 }}>Play on Trickster Cards Free →</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC }}>Free on web, iOS, Android, and Windows</div>
            </a>
            <a href="https://realbridge.online/" rel="nofollow noopener" target="_blank" style={{ display: 'block', background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 20, textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 6 }}>Try RealBridge →</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC }}>Free for players — find a club session near you</div>
            </a>
          </div>

          {/* Also compare */}
          <div style={{ background: tldrBg, border: `1px solid ${gold}`, borderRadius: 10, padding: '14px 20px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC, lineHeight: 1.7 }}>
            <strong>Also comparing:</strong>{' '}
            <Link href="/compare/bbo-vs-funbridge-2026/" style={{ color: navy }}>BBO vs Funbridge</Link>
            {' · '}
            <Link href="/reviews/bridge-base-online-bbo-review/" style={{ color: navy }}>Full BBO Review</Link>
            {' · '}
            <Link href="/reviews/realbridge-review/" style={{ color: navy }}>Full RealBridge Review</Link>
          </div>

        </div>
      </div>
      <FAQSection items={FAQS} />
    </div>
  );
}
