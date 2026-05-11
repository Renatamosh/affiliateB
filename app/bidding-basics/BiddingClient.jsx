'use client';
import Link from 'next/link';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';

const CONCEPTS = [
  { icon: '🔢', title: 'Counting Your Points (HCP)', body: 'Before bidding, count your High Card Points: Ace = 4, King = 3, Queen = 2, Jack = 1. The full deck holds 40 HCP. With 12+ you can open the bidding. Combined with partner, aim for 25–26 for game, 33+ for slam.' },
  { icon: '1️⃣', title: 'Opening the Bidding', body: 'With 12–21 HCP, open at the one level in your longest suit. With 15–17 HCP and a balanced hand (no void, no singleton, at most one doubleton), open 1NT. With 22+ HCP or a very powerful hand, open 2♣ — the only artificial opening.' },
  { icon: '🤝', title: "Responding to Partner's Opening", body: "With 6–9 HCP, give a minimum response. With 10–12 HCP, make an invitational bid. With 13+ HCP, insist on game — don't let the auction die below 3NT or 4 of a major." },
  { icon: '🎯', title: 'Game & Slam Targets', body: 'Games: 3NT (9 tricks), 4♥/4♠ (10 tricks), 5♣/5♦ (11 tricks). Small Slam: 12 tricks (bid 6). Grand Slam: all 13 tricks (bid 7). Use Blackwood (4NT) to ask for Aces before committing to a slam.' },
  { icon: '🔄', title: 'Stayman Convention', body: 'After partner opens 1NT, bid 2♣ (Stayman) to ask if they hold a four-card major. Partner responds 2♦ (no major), 2♥ or 2♠. Use it when you have 11+ HCP and at least one four-card major.' },
  { icon: '➡️', title: 'Transfer Bids', body: 'After partner opens 1NT, a response of 2♦ asks partner to bid 2♥; a 2♥ response asks for 2♠. This transfers the contract to the stronger hand (the NT opener), keeping their cards hidden from the opening lead.' },
];

const SEO_PARAS = [
  "Bidding is the language of bridge — the system by which you and your partner communicate the strength and shape of your hands without being able to show each other your cards. It is a language of constraint: through your sequence of bids you can convey your hand strength, and your partner can understand it.",
  "The foundation of virtually all modern bidding systems is hand evaluation by High Card Points (HCP). The simple scale — Ace=4, King=3, Queen=2, Jack=1 — provides a standardised way to measure hand strength. HCP alone will take you a very long way as a beginner and intermediate player.",
  "In the United Kingdom, the standard bidding system is ACOL, featuring a weak No Trump (12–14 HCP) and four-card major openings. In North America, Standard American (SAYC) is more common, featuring a strong No Trump (15–17 HCP) and five-card major openings. Both systems are widely supported by online platforms.",
  "Conventions are agreed artificial meanings for specific bids. The two most important for beginners are Stayman (asking for a four-card major after a 1NT opening) and Blackwood (asking for Aces before a slam). These two conventions alone cover a huge proportion of the situations where natural bidding would leave you guessing.",
  "One of the most common mistakes new bridge players make is to bid too much with moderate hands. The forcing bid concept is crucial: certain bids are forcing, meaning partner cannot pass. Understanding which bids are forcing ensures that the partnership always lands in the right contract.",
  "Online bridge has made practising the auction far easier. On platforms like BBO and Funbridge, you can review every auction after each hand, compare your choices to computer-optimal play, and use hands as the basis for discussion with your partner.",
  "Pre-emptive bidding — making a high-level opening bid with a long suit but weak high cards — is one of the most interesting aspects of bridge bidding. A pre-empt of 3♠ or 4♥ uses up the opponents' bidding space and makes it hard for them to find their best contract.",
];

const FAQS = [
  { q: 'What is the minimum number of points to open the bidding?', a: 'The standard minimum is 12 High Card Points (HCP) for an opening bid in a suit at the one level. With a very strong 5-card suit and good shape, some experienced players open with 11 HCP.' },
  { q: 'What is the difference between ACOL and Standard American?', a: 'ACOL (UK) opens 1NT with 12–14 HCP and uses four-card major openings. Standard American (US) opens 1NT with 15–17 HCP and generally requires five cards to open a major suit. Both systems are valid.' },
  { q: "When is a bid 'forcing'?", a: 'A bid is forcing when partner cannot pass — the auction must continue. Common forcing bids include a new suit at the 2-level by responder, a jump shift, and a 2♣ opening.' },
  { q: 'What is Blackwood and when do I use it?', a: 'Blackwood is a bid of 4NT asking partner how many Aces they hold. Responses: 5♣ = 0 or 4 Aces, 5♦ = 1 Ace, 5♥ = 2 Aces, 5♠ = 3 Aces. Use it when interested in slam and needing to check for Aces.' },
  { q: "What is a pre-emptive bid?", a: 'A pre-emptive bid jumps to a high level with a long suit but weak high cards (typically 5–9 HCP and a 6–7 card suit). Its purpose is to use up the opponents\' bidding space.' },
  { q: 'Can my partner and I agree on any bidding system we like?', a: 'Yes — partnerships are free to agree any bidding system. However, you must disclose your agreements to opponents: any artificial or conventional bid must be alerted and explained if asked.' },
];

export default function BiddingClient({ data }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const concepts = data?.concepts || CONCEPTS;
  const seoParas = data?.seo_paras || SEO_PARAS;
  const faqs = data?.faq || FAQS;
  const cardBg = isDeep ? '#0f1d3a' : theme === 'bright' ? '#f8f6f2' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.75)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';

  return (
    <div>
      <PageHeader title="Bidding Basics" subtitle="The Language of Bridge · Essential Concepts" suit="♣" />
      <div style={{ background: bg, minHeight: '40vh', padding: 'clamp(32px,5vw,48px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.8, marginTop: 0, marginBottom: 40 }}>
            {data?.intro || "Bidding lets you and your partner communicate the strength and shape of your hands — all without showing your cards. Master these six concepts and you'll be bidding confidently."}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
            {concepts.map(c => (
              <div key={c.title} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 21, color: headC, margin: '0 0 12px' }}>{c.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.75, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: headC, marginTop: 0, marginBottom: 20 }}>HCP Quick Reference</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[['12–14 HCP','Open 1NT (ACOL)'],['12–21 HCP','Open 1 of a suit'],['15–17 HCP','Open 1NT (Standard American)'],['22+ HCP','Open 2♣ (strong)'],['6–9 HCP','Minimum response'],['10–12 HCP','Invitational bid'],['13+ HCP','Force to game'],['25–26 HCP','Combined game target'],['33+ HCP','Combined slam target']].map(([pts, action]) => (
                <div key={pts} style={{ background: isDeep ? 'rgba(255,255,255,0.04)' : '#f0ece3', borderRadius: 8, padding: '12px 16px' }}>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: gold, fontWeight: 700 }}>{pts}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC }}>{action}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: navy, borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: '#fff', marginBottom: 4 }}>Test your bidding knowledge</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>Try our interactive bidding quiz — 6 real hands with instant explanations.</div>
            </div>
            <Link href="/bidding-quiz/"><button style={{ background: gold, color: navy, border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", whiteSpace: 'nowrap' }}>Take the Quiz →</button></Link>
          </div>
        </div>
      </div>
      <SEOSection paras={seoParas} />
      <FAQSection items={faqs} />
    </div>
  );
}
