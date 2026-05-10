'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
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


const FAQS = [
  { q: 'What is the best online bridge site for beginners in 2026?', a: 'Funbridge is the best online bridge site for beginners. The AI plays at an adjustable skill level, explains your mistakes, and scores every hand against thousands of players worldwide so you see exactly how your decisions compare. You can play at your own pace without the pressure of a live game. Once comfortable, Bridge Base Online (BBO) is the natural next step for live human opponents and ACBL masterpoints.' },
  { q: 'Can I play bridge online free without downloading anything?', a: 'Yes. Bridge Base Online (BBO) runs entirely in your browser and has a genuinely complete free tier — live human tables, Vugraph tournament watching, and casual games with no download required. RealBridge is also browser-based and free for players (clubs cover the session cost). Trickster Bridge is completely free with an optional ad-free upgrade for a cleaner experience.' },
  { q: 'Which online bridge platforms award ACBL masterpoints in 2026?', a: 'Two platforms reliably award ACBL masterpoints: Bridge Base Online (BBO) and RealBridge (ACBL-sanctioned since 2024). Both award online masterpoints that count toward Life Master and other ranks. Funbridge does not award ACBL masterpoints on standard play — the eBridge Cup is the one exception. No Fear Bridge, Trickster Bridge, and Bridge Baron do not award masterpoints.' },
  { q: 'What is the difference between BBO and Funbridge?', a: 'Bridge Base Online is a live game platform — you play in real time against human opponents, join ACBL-sanctioned tournaments, and access games at every skill level around the clock. Funbridge is a solo training tool: every game is against the Argine AI, your score is benchmarked against the global field, and the AI provides teaching feedback after key decisions. Most serious players use both — BBO for live competition, Funbridge for solo improvement.' },
  { q: 'Which online bridge platform works best on iPad and tablet?', a: 'Funbridge has the most polished iPad and tablet experience in the category — built for touch from the ground up with smooth card animations and a clean bidding interface. RealBridge also performs well in a tablet browser. BBO works on tablet but the desktop web client is more comfortable for extended sessions. If a tablet is your primary device, Funbridge is the clear choice.' },
  { q: 'How do I play bridge online with friends?', a: 'Three platforms make it easy to play bridge online with specific people. BBO lets you set up a private table in under two minutes and invite anyone by username — it is free and requires no download. RealBridge is the best option for regular group play because built-in video makes the session feel like a real gathering. Trickster Bridge is the simplest setup for a quick casual game with no configuration required.' },
];

const PICKER_RECS = {
  'live-desktop':  { platform: 'Bridge Base Online (BBO)', reason: 'The desktop web client is where BBO shines — hundreds of live tables at any hour, ACBL masterpoints, and the most complete free tier in online bridge.' },
  'live-tablet':   { platform: 'Bridge Base Online (BBO)', reason: 'BBO works on tablet via browser, though the desktop experience is stronger. For solo practice on tablet, Funbridge is the best complement.' },
  'live-any':      { platform: 'Bridge Base Online (BBO)', reason: '11.6 million monthly visits, ACBL masterpoints, and a genuinely complete free tier. The default choice for live human bridge online.' },
  'improve-desktop': { platform: 'Funbridge', reason: 'The Argine AI is the strongest commercial bridge engine in 2026. Your scores are benchmarked against thousands of players on the same deals — improvement is measurable.' },
  'improve-tablet':  { platform: 'Funbridge', reason: 'The iPad and tablet app is the most polished in the category. Built for touch from the ground up with smooth animations and a clean bidding interface.' },
  'improve-any':     { platform: 'Funbridge', reason: 'Replay-the-same-deals format, Argine AI feedback, and global field scoring. The clearest path to measurable improvement in 2026.' },
  'social-desktop':  { platform: 'RealBridge', reason: 'Video with all four players, ACBL-sanctioned since 2024, and no app to download. For casual pickup games with strangers, add BBO.' },
  'social-tablet':   { platform: 'Trickster Bridge', reason: 'The simplest setup for a casual game with friends on any device. RealBridge also works in a tablet browser for organised group sessions.' },
  'social-any':      { platform: 'RealBridge', reason: 'The only platform where you see and hear your partner and opponents. Purpose-built for regular groups and club sessions.' },
  'points-desktop':  { platform: 'Bridge Base Online (BBO)', reason: 'Daily sanctioned games, a full virtual club structure, and the partnership desk — all free. BBO+ at $5.99/mo adds premium tournaments.' },
  'points-tablet':   { platform: 'Bridge Base Online (BBO)', reason: 'BBO works via browser on tablet for sanctioned games, though the desktop client is more comfortable for extended sessions.' },
  'points-any':      { platform: 'Bridge Base Online (BBO)', reason: 'BBO and RealBridge are the only two platforms that award ACBL masterpoints in 2026. BBO has the broadest set of sanctioned games daily.' },
};

function QuickPicker({ isDeep, headC, textC, cardBg, bdr }) {
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);

  const key = q1 && q2 ? `${q1}-${q2}` : null;
  const rec = key ? PICKER_RECS[key] : null;

  const btnStyle = (active) => ({
    padding: '7px 16px',
    borderRadius: 20,
    fontSize: 14,
    fontFamily: "'Source Sans 3', sans-serif",
    cursor: 'pointer',
    border: `1.5px solid ${active ? navy : (isDeep ? '#2a3f6a' : '#d0c8b8')}`,
    background: active ? navy : 'transparent',
    color: active ? '#fff' : (isDeep ? 'rgba(255,255,255,0.7)' : '#555'),
    fontWeight: active ? 700 : 400,
  });

  return (
    <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: '24px 28px', marginBottom: 24 }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: gold, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
        Find your platform in two questions
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, color: headC, marginBottom: 10 }}>
          1. What matters most to you?
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { val: 'live',    label: 'Live human games' },
            { val: 'improve', label: 'Improving my game' },
            { val: 'social',  label: 'Playing with friends' },
            { val: 'points',  label: 'ACBL masterpoints' },
          ].map(opt => (
            <button key={opt.val} style={btnStyle(q1 === opt.val)} onClick={() => setQ1(opt.val)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, color: headC, marginBottom: 10 }}>
          2. Where do you play most?
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { val: 'desktop', label: 'Desktop / laptop' },
            { val: 'tablet',  label: 'iPad / tablet' },
            { val: 'any',     label: "Doesn't matter" },
          ].map(opt => (
            <button key={opt.val} style={btnStyle(q2 === opt.val)} onClick={() => setQ2(opt.val)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: isDeep ? '#0a1525' : '#f9f6ef',
        border: `1px solid ${rec ? gold : bdr}`,
        borderRadius: 10,
        padding: '14px 18px',
        minHeight: 52,
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 15,
        color: textC,
        lineHeight: 1.6,
      }}>
        {rec ? (
          <>
            <span style={{ fontWeight: 700, color: headC }}>Recommendation: {rec.platform}. </span>
            {rec.reason}
          </>
        ) : (
          <span style={{ color: isDeep ? 'rgba(255,255,255,0.35)' : '#bbb' }}>
            Choose your answers above to get a personalised recommendation.
          </span>
        )}
      </div>
    </div>
  );
}

function ComparisonStrip({ isDeep, headC, textC, cardBg, bdr }) {
  const rows = [
    { label: 'Live human opponents',  bbo: '✓',          fun: '✗',              rb: '✓'          },
    { label: 'ACBL masterpoints',     bbo: '✓',          fun: '✗',              rb: '✓ (2024+)'  },
    { label: 'Free tier',             bbo: 'Full',       fun: 'Trial',          rb: 'Players free'},
    { label: 'Mobile app',            bbo: 'OK',         fun: 'Best-in-class',  rb: 'Browser'    },
    { label: 'Video play',            bbo: '✗',          fun: '✗',              rb: '✓'          },
    { label: 'AI teaching',           bbo: 'Basic',      fun: 'Argine AI',      rb: '✗'          },
  ];

  const colorFor = (val) => {
    if (val === '✓' || val === 'Full' || val === 'Best-in-class' || val === 'Players free' || val === 'Argine AI' || val === '✓ (2024+)') return '#27ae60';
    if (val === '✗') return red;
    return gold;
  };

  const cellBase = {
    padding: '9px 14px',
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: 13,
    textAlign: 'center',
    borderBottom: `1px solid ${isDeep ? '#1a2e50' : '#ebe5d8'}`,
    verticalAlign: 'middle',
  };

  return (
    <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['', 'BBO', 'Funbridge', 'RealBridge'].map((h, i) => (
              <th key={i} style={{ ...cellBase, textAlign: i === 0 ? 'left' : 'center', fontWeight: 700, color: headC, fontSize: 14, background: isDeep ? '#0a1525' : '#f5f0e6', borderBottom: `2px solid ${gold}`, paddingTop: 13, paddingBottom: 13, width: i === 0 ? '34%' : '22%' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td style={{ ...cellBase, textAlign: 'left', color: isDeep ? 'rgba(255,255,255,0.55)' : '#888', fontWeight: 500 }}>{row.label}</td>
              {[row.bbo, row.fun, row.rb].map((val, j) => (
                <td key={j} style={{ ...cellBase, color: colorFor(val), fontWeight: val === '✓' || val === '✗' ? 700 : 500, fontSize: val === '✓' || val === '✗' ? 16 : 13 }}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

  const sharedProps = { isDeep, headC, textC, cardBg, bdr };

  return (
    <div>
      <PageHeader title="Best Online Bridge Platforms 2026" subtitle="Independent Reviews · Pricing Verified May 2026" suit="♠" />
      <div style={{ background: bg, padding: '48px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>

          <div style={{ background: '#fff8e6', border: '1px solid #e8c56a', borderRadius: 10, padding: '14px 20px', marginBottom: 32, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: '#7a5a00' }}>
            <strong>Independence disclosure:</strong> As of May 2026, Bridge Playbook has not signed any platform affiliate deals. All platform links on this page are informational only — we receive no commission for sign-ups. We participate in the Amazon Associates programme for book and equipment recommendations. Pricing on this page is verified directly from each platform's billing page within the last 30 days.
          </div>

          <QuickPicker {...sharedProps} />
          <ComparisonStrip {...sharedProps} />

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
      {/* SEO content section — keyword-rich with internal links */}
      <div style={{ background: isDeep ? '#070f1e' : '#f0ece3', padding: '56px 24px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', fontFamily: "'Source Sans 3', sans-serif" }}>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, marginBottom: 28, lineHeight: 1.3 }}>
            How to Choose the Best Online Bridge Site for You
          </h2>
          <p style={{ fontSize: 17, color: textC, lineHeight: 1.8, marginBottom: 22 }}>
            Choosing the best online bridge platform in 2026 is not a one-size-fits-all decision. The six platforms reviewed on this page — BBO, Funbridge, RealBridge, No Fear Bridge, Trickster and Bridge Baron — each solve a different problem, and most serious players use at least two. The decision comes down to three questions: do you want live human play or solo AI training, do you need ACBL masterpoints, and what is your monthly budget?
          </p>
          <p style={{ fontSize: 17, color: textC, lineHeight: 1.8, marginBottom: 22 }}>
            <Link href="/reviews/bridge-base-online-bbo-review/" style={{ color: gold, textDecoration: 'underline', fontWeight: 600 }}>Bridge Base Online (BBO)</Link> is the default choice if you want to play bridge online free against real human opponents. With approximately 11.6 million monthly visits, the player base is unmatched — games run at every skill level around the clock. The free tier is genuinely complete: live tables, the partnership desk, Vugraph broadcasts, and tournament entry, all without a subscription. BBO+ at $5.99 per month adds premium tournaments and removes ads, with a 30-day free trial.
          </p>
          <p style={{ fontSize: 17, color: textC, lineHeight: 1.8, marginBottom: 22 }}>
            <Link href="/reviews/funbridge-review/" style={{ color: gold, textDecoration: 'underline', fontWeight: 600 }}>Funbridge</Link> is the strongest solo bridge training platform available in 2026. The Argine AI engine benchmarks every hand against the global field of players who played the same deal — improvement is measurable in a way no live-opponent platform can match. The iPad and mobile app is the most polished in the category. Important for North American players: Funbridge does not award ACBL masterpoints on standard play. For a direct side-by-side breakdown, see our <Link href="/compare/bbo-vs-funbridge-2026/" style={{ color: gold, textDecoration: 'underline', fontWeight: 600 }}>BBO vs Funbridge 2026 comparison</Link>.
          </p>
          <p style={{ fontSize: 17, color: textC, lineHeight: 1.8, marginBottom: 22 }}>
            <Link href="/reviews/realbridge-review/" style={{ color: gold, textDecoration: 'underline', fontWeight: 600 }}>RealBridge</Link> is the only online bridge platform where you see and hear your partner and opponents on screen — the closest experience to a face-to-face club night available online. Players pay nothing; clubs cover the session cost at approximately $3 to $5 per player. RealBridge has been ACBL-sanctioned since 2024, so masterpoints flow on sanctioned events. If you want to play bridge online with friends in a regular group, RealBridge is built for exactly that situation.
          </p>
          <p style={{ fontSize: 17, color: textC, lineHeight: 1.8, marginBottom: 22 }}>
            The combination that works for most active players is BBO for live competition and online ACBL masterpoints, plus Funbridge for solo practice between sessions. Combined cost for BBO+ and Funbridge annual is under $20 per month — less than a single club entry night in most cities. New to online bridge altogether? Our <Link href="/how-to-play-bridge-online/" style={{ color: gold, textDecoration: 'underline', fontWeight: 600 }}>guide to playing bridge online</Link> covers setup on every platform step by step.
          </p>
          <p style={{ fontSize: 17, color: textC, lineHeight: 1.8, marginBottom: 0 }}>
            Every review on Bridge Playbook is independent. As of May 2026 we have not signed any platform affiliate deals — all platform links are informational only and every recommendation reflects what we would suggest without commission. Pricing is verified directly from each platform's billing page and reviewed quarterly.
          </p>
        </div>
      </div>
      <FAQSection items={FAQS} />
    </div>
  );
}
