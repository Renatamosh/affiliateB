'use client';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';
import { PageHeader } from '../../../components/PageHeader';
import { FAQSection } from '../../../components/FAQSection';

const navy = '#1c2f5e';
const gold  = '#d4a843';

// Hardcoded comparison table rows — visual element, not CMS-driven
const COMPARISON = [
  ['Free tier',          'Full access to live tables, Vugraph, tournaments (some events require BB$)', '2 deals/day'],
  ['Paid price',         '$5.99/mo BBO+',                         '$15.99/mo Premium · $24.99/mo Premium+'],
  ['Annual savings',     '—',                                     '$159.99/yr Premium (~17% saving)'],
  ['Trial',              '30-day BBO+ free',                      '1-month Premium free'],
  ['ACBL masterpoints',  '✓ Online points; some events black/silver/red', '✗ (eBridge Cup partnership exception)'],
  ['Live human play',    '✓ Partnership desk, virtual clubs',     '✗ Solo AI only'],
  ['AI strength',        'Competent (free) / Advanced (BBO+)',    'Argine — strongest in online bridge 2026'],
  ['Bidding systems',    'SAYC, Acol, 2/1, EHAA, Polish, Precision, more', 'SAYC primary; Acol secondary; 2/1 limited'],
  ['Mobile apps',        'iOS, Android (functional)',             'iOS, Android (best-in-class)'],
  ['Vugraph theatre',    '✓',                                     '✗'],
  ['Best for',           'Tournaments, masterpoints, community',  'Solo improvement, pocket bridge'],
];

// Fallback FAQ shown only when no CMS data is passed
const FALLBACK_FAQS = [
  { q: 'Is BBO better than Funbridge?',                    a: 'BBO and Funbridge solve different problems. BBO ($5.99/month BBO+) is better for live human play and ACBL masterpoints; Funbridge ($15.99/month Premium) is better for solo AI training with the strongest commercial bridge AI. Most serious players in 2026 use both.' },
  { q: 'Can I earn ACBL masterpoints on Funbridge?',       a: 'Funbridge does not award ACBL masterpoints on standard play. The eBridge Cup, an annual partnership with BBO, is the single exception. If your goal is masterpoint earning, BBO or RealBridge is the better choice.' },
  { q: 'Is Funbridge cheaper than BBO?',                   a: 'No. BBO is significantly cheaper for most users — the free tier is genuinely complete, and BBO+ is $5.99/month. Funbridge requires a $15.99/month Premium subscription to unlock unlimited play; the annual plan brings this down to $13.33/month effective.' },
  { q: 'Which is better for solo practice — BBO or Funbridge?', a: 'Funbridge is the stronger solo trainer. The Argine engine is the strongest commercial bridge AI in 2026, and the replay-the-same-deals format makes improvement measurable. BBO\'s robots are competent but not at the same level.' },
  { q: 'Do most bridge players use both BBO and Funbridge?', a: 'Yes — most serious players in 2026 use both. BBO for live human play and ACBL masterpoints; Funbridge for solo AI training. The combined cost (BBO+ at $5.99/mo plus Funbridge annual at $13.33/mo) is under $20/month.' },
];

const FALLBACK_TLDR = 'BBO and Funbridge solve different problems and most serious bridge players in 2026 use both. BBO ($5.99/mo BBO+ on top of a complete free tier) is the live human community and the only sensible choice for ACBL masterpoint earners. Funbridge ($15.99/mo Premium) is the strongest solo AI training platform — the Argine engine and replay-the-same-deals format make improvement measurable. If you must pick one: <strong>BBO if you play with humans for masterpoints; Funbridge if you train solo against AI.</strong>';

/**
 * Props (all CMS-driven, all optional with fallbacks):
 *   tldr           {string}   — quick answer text (may contain HTML)
 *   keyTakeaways   {string[]} — bullet list of key takeaways
 *   faq            {Array<{q,a}>} — FAQ items
 *   bodyHtml       {string}   — rendered markdown body from CMS
 *   seoBodyHtml    {string}   — rendered SEO body from CMS
 *   seoSectionTitle {string}  — heading for SEO section
 */
export default function CompareClient({ tldr, keyTakeaways, faq, bodyHtml, seoBodyHtml, seoSectionTitle }) {
  const { theme } = useTheme();
  const isDeep  = theme === 'deep';
  const bg      = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg  = isDeep ? '#0f1d3a' : '#fff';
  const headC   = isDeep ? '#fff' : navy;
  const textC   = isDeep ? 'rgba(255,255,255,0.8)' : '#444';
  const bdr     = isDeep ? '#1a2e50' : '#e5e0d8';
  const tldrBg  = isDeep ? 'rgba(212,168,67,0.08)' : '#fff8e6';

  const activeFaq  = (faq && faq.length > 0) ? faq : FALLBACK_FAQS;
  const activeTldr = tldr || FALLBACK_TLDR;

  return (
    <div>
      <style>{`
        .compare-body h2 { font-family: 'Libre Baskerville', serif; font-size: 1.6rem; color: #1c2f5e; margin: 2rem 0 1rem; }
        .compare-body h3 { font-family: 'Libre Baskerville', serif; font-size: 1.3rem; color: #1c2f5e; margin: 1.5rem 0 0.75rem; }
        .compare-body p  { font-family: 'Source Sans 3', sans-serif; font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.25rem; color: #444; }
        .compare-body ul, .compare-body ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .compare-body li { font-family: 'Source Sans 3', sans-serif; font-size: 1.05rem; line-height: 1.75; color: #444; margin-bottom: 0.4rem; }
        .compare-body a  { color: #d4a843; text-decoration: underline; }
        .compare-body strong { font-weight: 700; }
        .compare-body table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
        .compare-body th, .compare-body td { padding: 10px 14px; border: 1px solid #e5e0d8; font-family: 'Source Sans 3', sans-serif; font-size: 0.95rem; }
        .compare-body th { background: #1c2f5e; color: #fff; font-weight: 700; }
      `}</style>

      <PageHeader title="BBO vs Funbridge 2026" subtitle="Independent Head-to-Head · Pricing Verified May 2026" suit="♠" />

      <div style={{ background: bg, padding: '48px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>

          {/* TL;DR Box — CMS-driven */}
          <div style={{ background: tldrBg, border: `2px solid ${gold}`, borderRadius: 12, padding: '20px 28px', marginBottom: 40 }}>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: gold, fontWeight: 700, marginBottom: 10 }}>Quick Answer</div>
            <p
              style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: headC, lineHeight: 1.7, margin: 0 }}
              dangerouslySetInnerHTML={{ __html: activeTldr }}
            />
          </div>

          {/* Key Takeaways — CMS-driven */}
          {keyTakeaways && keyTakeaways.length > 0 && (
            <div style={{ background: cardBg, border: `2px solid ${navy}`, borderRadius: 12, padding: '20px 28px', marginBottom: 40 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, fontWeight: 700, marginBottom: 12 }}>Key Takeaways</div>
              <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
                {keyTakeaways.map((item, i) => (
                  <li key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.7, marginBottom: 6 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hardcoded comparison table */}
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, marginTop: 0, marginBottom: 20 }}>Head-to-Head Comparison</h2>
          <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, fontFamily: "'Source Sans 3', sans-serif" }}>
              <thead>
                <tr style={{ background: navy }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: gold, fontWeight: 700, fontSize: 13, letterSpacing: '0.06em' }}>Feature</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>BBO</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: '#fff', fontWeight: 700 }}>Funbridge</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feature, bbo, fb], i) => (
                  <tr key={feature} style={{ borderBottom: `1px solid ${bdr}`, background: i % 2 === 1 ? (isDeep ? 'rgba(255,255,255,0.025)' : '#faf8f5') : 'none' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: headC }}>{feature}</td>
                    <td style={{ padding: '14px 20px', color: textC, lineHeight: 1.5 }}>{bbo}</td>
                    <td style={{ padding: '14px 20px', color: textC, lineHeight: 1.5 }}>{fb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Decision cards */}
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, marginTop: 0, marginBottom: 20 }}>Which Should You Choose?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
            <div style={{ background: cardBg, border: `2px solid ${navy}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: navy, marginBottom: 14 }}>Choose BBO if</div>
              {['You want to earn ACBL masterpoints', 'You want to play with human partners', 'You play in ACBL or EBU tournaments', 'You want a complete free tier'].map(item => (
                <div key={item} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, padding: '6px 0', paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: gold, fontWeight: 700 }}>✓</span>{item}
                </div>
              ))}
            </div>
            <div style={{ background: cardBg, border: `2px solid #27ae60`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: '#27ae60', marginBottom: 14 }}>Choose Funbridge if</div>
              {['You want to improve against the strongest AI', 'You play in 20-minute mobile sessions', 'You want to compare scores against the platform', "You don't need ACBL masterpoints"].map(item => (
                <div key={item} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, padding: '6px 0', paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: gold, fontWeight: 700 }}>✓</span>{item}
                </div>
              ))}
            </div>
            <div style={{ background: navy, borderRadius: 12, padding: 24, color: '#fff' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: gold, marginBottom: 14 }}>Use both if</div>
              {["You're a serious player", 'You want masterpoints AND solo training', 'Total cost is under $20/mo combined', 'Most serious players use both'].map(item => (
                <div key={item} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.85)', padding: '6px 0', paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: gold, fontWeight: 700 }}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
            <Link href="/reviews/bridge-base-online-bbo-review/" style={{ display: 'block', background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 20, textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 6 }}>Read the full BBO review →</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC }}>Pricing, masterpoints, GIB robots, tournament types</div>
            </Link>
            <Link href="/reviews/funbridge-review/" style={{ display: 'block', background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 20, textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 6 }}>Read the full Funbridge review →</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC }}>Pricing tiers, Argine AI, replay format, ACBL caveat</div>
            </Link>
          </div>

          {/* CMS body content — shown after comparison table */}
          {bodyHtml && (
            <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '32px 36px', marginBottom: 40 }}>
              <div
                className="compare-body"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            </div>
          )}

          {/* Pricing disclaimer */}
          <div style={{ background: tldrBg, border: `1px solid ${gold}`, borderRadius: 10, padding: '14px 20px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC, lineHeight: 1.7 }}>
            <strong>Pricing source:</strong> Verified directly from each platform's billing page in May 2026. Bridge Playbook is independent — as of May 2026 we have not signed any platform affiliate deals, so all platform links are informational only.
          </div>

        </div>
      </div>

      {/* SEO section */}
      {seoBodyHtml && (
        <section style={{ background: isDeep ? '#060d1a' : '#f0ece3', padding: '64px 24px', borderTop: `1px solid ${bdr}` }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>In Depth</div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 30, color: headC, margin: '0 0 32px' }}>
              {seoSectionTitle || 'BBO vs Funbridge: Full Platform Analysis'}
            </h2>
            <div
              className="compare-body"
              dangerouslySetInnerHTML={{ __html: seoBodyHtml }}
              style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85 }}
            />
          </div>
        </section>
      )}

      {/* FAQ — CMS-driven with fallback */}
      <FAQSection items={activeFaq} />
    </div>
  );
}
