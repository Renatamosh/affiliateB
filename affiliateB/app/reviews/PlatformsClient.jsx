'use client';
import Link from 'next/link';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const PLATFORMS = [
  { id: 'bbo', name: 'Bridge Base Online (BBO)', rating: 5, badge: 'Best Live Play & Masterpoints', badgeColor: navy, price: 'Free / BBO+ at $5.99/month', best: 'Best for: Live human play and online ACBL masterpoints', shortDesc: 'The world\'s largest online bridge platform — approximately 11.6 million monthly visits and the default home for online ACBL-sanctioned games.', pros: ['Genuinely complete free tier — full access to live tables, Vugraph and tournaments', 'Default platform for online ACBL masterpoints', 'Largest live community — partnership desk, virtual clubs, Vugraph theatre', 'Broadest bidding system support (SAYC, Acol, 2/1, Polish, Precision)', 'BBO+ at $5.99/month with 30-day free trial'], cons: ['Interface is dated by 2026 standards', 'Mobile apps still feel secondary to the web client', 'Free-tier robot bidding is competent but not at Funbridge\'s level'], href: '/reviews/bridge-base-online-bbo-review/' },
  { id: 'funbridge', name: 'Funbridge', rating: 4, badge: 'Best for Solo Improvement', badgeColor: '#27ae60', price: 'Premium $15.99/mo · Premium+ $24.99/mo', best: 'Best for: Solo AI training for intermediate-to-advanced improvers', shortDesc: 'Strongest solo AI bridge trainer in 2026 — Argine engine, replay-the-same-deals format, ~170,000 active users.', pros: ['Argine — strongest commercial bridge AI in 2026', 'Mobile apps designed mobile-first — best-in-class polish', 'Replay-same-deals format makes improvement measurable', '1-month free Premium trial', 'Deal Pack option for non-subscribers ($5.49 for 50 deals)'], cons: ['No ACBL masterpoints on standard play (eBridge Cup exception only)', 'No live human partnership desk — solo only', 'Acol support is functional but secondary to SAYC; 2/1 limited', 'Premium+ at $24.99/month is expensive without Bridgerama+ readership'], href: '/reviews/funbridge-review/' },
  { id: 'realbridge', name: 'RealBridge', rating: 4, badge: 'Best Video Bridge — ACBL Sanctioned', badgeColor: '#8e44ad', price: 'Free for players · Clubs pay ~$3–$5 per player per session', best: 'Best for: Club nights, regular partnerships, ACBL-sanctioned video play', shortDesc: 'Closest online experience to a face-to-face club night. ACBL-sanctioned since 2024 — masterpoints flow on sanctioned events.', pros: ['Free for players (clubs pay)', 'ACBL-sanctioned since 2024 — masterpoints flow', 'Video and audio for all four players', 'Browser-based — no app download', 'Supports all major bidding systems'], cons: ['Cost falls on the club — barrier for smaller clubs', 'No mobile apps — runs in browser', 'Smaller player base outside organised club sessions', 'Equipment matters — degrades on poor microphone or weak Wi-Fi'], href: '/reviews/realbridge-review/' },
  { id: 'nofearbridge', name: 'No Fear Bridge', rating: 4, badge: 'Best Structured Learning', badgeColor: gold, price: '$60/yr (US) · £72/yr (UK) — 2-week free trial', best: 'Best for: Returning players and intermediate fundamentals rebuilding', shortDesc: 'Most structured online learning environment. Subscription only. SAYC syllabus (US) or Acol syllabus (UK).', pros: ['Genuine structured curriculum — lessons, quizzes, deals chosen to teach concepts', 'Cheaper than Funbridge Premium ($60/yr vs $159.99/yr)', 'Strong for intermediate fundamentals rebuilding', '2-week free trial'], cons: ['No free tier — subscription only', 'No ACBL masterpoints', 'No live human partnership desk', 'Smaller player base than BBO or Funbridge'], href: '/reviews/' },
  { id: 'trickster', name: 'Trickster Bridge', rating: 4, badge: 'Best Free Casual Play', badgeColor: '#3498db', price: 'Free — optional ad-free upgrade', best: 'Best for: Casual play with friends, no commitment', shortDesc: 'Strong free option for casual play. Full free tier with ad-supported play; ad-free upgrade available.', pros: ['Genuinely free — full play access', 'Easy to set up a game with friends', 'Ad-free upgrade is inexpensive', 'SAYC support'], cons: ['No ACBL masterpoints', 'Smaller community than BBO', 'Less polished interface than Funbridge', 'Limited tournament structure'], href: '/reviews/' },
  { id: 'bridgebaron', name: 'Bridge Baron', rating: 3, badge: 'Best for Offline Analysis', badgeColor: '#888', price: '$4.99/mo (mobile) · ~$60–$80 (desktop)', best: 'Best for: Solo offline analysis with extensive convention support', shortDesc: 'Long-established analysis-first platform. 130+ supported conventions — the deepest convention support of any platform.', pros: ['Supports 130+ bidding conventions', 'Strong analysis tools', 'One-time desktop license option', 'Good for offline practice'], cons: ['No ACBL masterpoints', 'No live human play', 'Older interface design', 'Mobile app is functional but dated'], href: '/reviews/' },
];

const SEO_PARAS = [
  'Choosing an online bridge platform in 2026 is no longer a one-platform-fits-all decision. The six platforms reviewed on this page — BBO, Funbridge, RealBridge, No Fear Bridge, Trickster and Bridge Baron — each solve different problems, and most serious players use at least two of them. The right choice depends on three questions: do you want live human play or solo AI training, do you need ACBL masterpoints, and what is your monthly budget?',
  'Bridge Base Online (BBO) is the default for live human bridge online and the only sensible choice if you care about earning online ACBL masterpoints. With approximately 11.6 million monthly visits, the player base is unmatched. The free tier is genuinely complete — full access to live tables, the partnership desk, Vugraph kibitz, and tournament entry. BBO+ at $5.99 per month adds an ad-free experience and the advanced robots, with a 30-day free trial.',
  'Funbridge ($15.99/month Premium or $159.99/year) is the strongest solo AI bridge trainer in 2026. The proprietary Argine engine is the best commercial bridge AI we\'ve tested, and the replay-the-same-deals format makes improvement measurable in a way that no human-partnered platform can match. Important caveat for North American players: Funbridge does not award ACBL masterpoints on standard play. The eBridge Cup partnership with BBO is the single exception.',
  'RealBridge is video bridge — players see and hear each other on screen, recreating the social experience of a live club. Players pay nothing; clubs pay approximately $3 to $5 per player per session. Critically, RealBridge has been ACBL-sanctioned since 2024, so masterpoints flow on sanctioned events. RealBridge is the right platform if your local club has switched to video, or if you want a video-bridge alternative to BBO\'s text-and-cards interface.',
  'No Fear Bridge ($60/year US, £72/year UK) is the most structured online learning environment for intermediate improvers and returning players. The platform is built around a curriculum rather than open play — lessons, quizzes, and deals chosen to teach specific concepts. There is no free tier (2-week trial only) and no ACBL masterpoints. Trickster Bridge is the best free option for casual play with friends. Bridge Baron is the strongest offline analysis tool with 130+ supported conventions.',
  'Bridge Playbook is independent. As of May 2026 we have not signed any platform affiliate deals, so every link on this page is informational only and clearly disclosed. We never recommend a platform we wouldn\'t recommend without commission. All pricing is verified directly from the platform billing page and reviewed quarterly.',
];

const FAQS = [
  { q: 'Which online bridge platform is completely free?', a: 'BBO has the most complete free tier — full access to live tables, Vugraph, casual games, and tournament entry (some events require BB$ virtual currency). Trickster Bridge is also fully free with optional ad-free upgrade. Funbridge offers 2 free deals per day on its free tier. RealBridge is free for players (clubs pay session fees). No Fear Bridge has no free tier — 2-week trial only. Bridge Baron has no free tier — paid only.' },
  { q: 'Which platforms award ACBL masterpoints in 2026?', a: 'Two platforms reliably award ACBL masterpoints: Bridge Base Online (BBO) and RealBridge (sanctioned since 2024). Both award online masterpoints — a separate ACBL category that counts toward Life Master and other ranks. Funbridge does not award ACBL masterpoints on standard play; the eBridge Cup partnership with BBO is the single exception. No Fear Bridge, Trickster, and Bridge Baron do not award ACBL masterpoints.' },
  { q: 'Should I use one platform or two?', a: 'Most serious players in 2026 use two platforms: BBO for live human play and ACBL masterpoints, plus one trainer (Funbridge for AI work, or No Fear Bridge for structured learning). RealBridge is added as a third platform if your local club has switched to video bridge. The combined cost — $5.99/month BBO+ plus $13.33/month Funbridge annual — is under $20/month for a serious training setup.' },
  { q: 'Which bidding system does each platform support?', a: 'BBO supports the broadest range — SAYC, Acol, 2/1, EHAA, Polish Club, and Precision. Funbridge defaults to SAYC; Acol is supported but secondary; 2/1 support is limited. RealBridge supports all major systems. No Fear Bridge is region-locked: SAYC in the US, Acol in the UK. Trickster supports SAYC. Bridge Baron supports 130+ conventions across all major systems.' },
  { q: 'Can I play with my regular bridge partner online?', a: 'Yes — every major platform supports this. On BBO, invite your partner to a private table or use the partnership desk for pickup games. On Funbridge, set up a private game (though Funbridge is solo-AI focused). RealBridge is purpose-built for playing with known players and is the easiest option for regular partnerships. Trickster is excellent for casual games with friends.' },
];

function StarRow({ n }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? gold : '#ccc', fontSize: 18 }}>★</span>
      ))}
    </span>
  );
}

export default function PlatformsClient() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  return (
    <div>
      <PageHeader title="Best Online Bridge Platforms 2026" subtitle="Independent Reviews · Pricing Verified May 2026" suit="♠" />
      <div style={{ background: bg, padding: '48px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ background: '#fff8e6', border: '1px solid #e8c56a', borderRadius: 10, padding: '14px 20px', marginBottom: 32, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: '#7a5a00' }}>
            <strong>Independence disclosure:</strong> As of May 2026, Bridge Playbook has not signed any platform affiliate deals. All platform links on this page are informational only — we receive no commission for sign-ups. We participate in the Amazon Associates programme for book and equipment recommendations. Pricing on this page is verified directly from each platform's billing page within the last 30 days.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {PLATFORMS.map((p, i) => (
              <div key={p.id} style={{ background: cardBg, border: `1px solid ${i === 0 ? gold : bdr}`, borderRadius: 14, overflow: 'hidden', boxShadow: i === 0 ? '0 4px 24px rgba(212,168,67,0.12)' : 'none' }}>
                <div style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                      <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, color: headC, margin: 0 }}>{p.name}</h2>
                      <span style={{ fontSize: 13, background: p.badgeColor, color: '#fff', borderRadius: 20, padding: '4px 14px', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>{p.badge}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <StarRow n={p.rating} />
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: '#888', marginTop: 4 }}>{p.price}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.7, margin: '0 0 20px' }}>{p.shortDesc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: '#27ae60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Pros</div>
                      {p.pros.map(pro => <div key={pro} style={{ fontSize: 15, color: textC, fontFamily: "'Source Sans 3', sans-serif", padding: '3px 0', paddingLeft: 8 }}>• {pro}</div>)}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: red, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cons</div>
                      {p.cons.map(con => <div key={con} style={{ fontSize: 15, color: textC, fontFamily: "'Source Sans 3', sans-serif", padding: '3px 0', paddingLeft: 8 }}>• {con}</div>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: '#888', fontStyle: 'italic' }}>{p.best}</div>
                    {(p.id === 'bbo' || p.id === 'funbridge' || p.id === 'realbridge') && (
                      <Link href={p.href} style={{ background: 'none', border: `2px solid ${gold}`, color: gold, borderRadius: 8, padding: '10px 20px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Full Review →</Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SEOSection paras={SEO_PARAS} />
      <FAQSection items={FAQS} />
    </div>
  );
}
