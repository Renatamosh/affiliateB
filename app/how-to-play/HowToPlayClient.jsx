'use client';
import Link from 'next/link';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const STEPS = [
  { n: 1, title: 'The Basics: What is Bridge?', body: 'Bridge is a trick-taking card game for four players in two partnerships. You sit North–South or East–West, opposite your partner. A standard 52-card deck is used — no jokers. The Ace is the highest card; then King, Queen, Jack, 10 down to 2.' },
  { n: 2, title: 'The Deal: Getting Your Cards', body: 'One player (the Dealer) shuffles and deals all 52 cards clockwise, face down — one card at a time — giving 13 cards to each player. Pick up your cards and sort them by suit. Keep them hidden from the other players.' },
  { n: 3, title: 'The Auction: Making Your Bid', body: 'Starting with the Dealer and going clockwise, each player bids or passes. A bid names a number (1–7) and a suit (♣ ♦ ♥ ♠) or \'No Trumps\'. Each bid must be higher than the last. When three players in a row say \'Pass\', the auction ends and the last bid becomes the contract.' },
  { n: 4, title: 'The Contract: What You Must Win', body: 'The final bid is the contract. The number in the bid plus six tells you how many tricks you must win. So a contract of \'3 Hearts\' means you must win 9 tricks (3+6) with Hearts as the trump suit. The player from the winning side who first bid the trump suit becomes the Declarer.' },
  { n: 5, title: "Dummy's Hand: The Face-Up Cards", body: "The player to Declarer's left leads the first card face-up on the table. Then Declarer's partner (called Dummy) lays their entire hand face-up for everyone to see. Declarer now plays both their own cards and Dummy's cards — trying to win the contract." },
  { n: 6, title: 'Playing Tricks: How to Win', body: 'Each player plays one card per trick, following suit if possible. If you have no cards in the suit led, you may play any card — including a trump. The highest card of the suit led wins the trick, unless a trump is played, which beats all other suits. The winner of a trick leads the next.' },
  { n: 7, title: 'Scoring: How Points Are Counted', body: 'If Declarer wins at least as many tricks as the contract required, their side scores points. Win fewer and the defenders score penalty points. Club and Diamond tricks score 20 points each; Hearts and Spades score 30; No Trumps score 40 for the first then 30 each. First side to 100 points wins a Game!' },
];

const SEO_PARAS = [
  'Bridge is widely regarded as the most intellectually rewarding card game ever devised — and with over 60 million players worldwide, its enduring appeal is no mystery. The game rewards memory, logical thinking, strategic planning and the subtle art of communication with a partner.',
  'Learning bridge as an adult — even for the very first time — is entirely achievable. Many of the game\'s most accomplished players took it up in their 50s or 60s and went on to reach a high standard. The basics can be grasped in an afternoon; becoming a confident social player typically takes a few weeks of regular practice.',
  'The move to online bridge has been transformative. Where once you needed to find three other players, arrange a time and meet in person, today you can open a tablet or laptop and find a game within seconds. Major platforms like Bridge Base Online (BBO), Funbridge and RealBridge offer games against computer opponents (called robots) that are ideal for beginners.',
  'Counting your High Card Points (HCP) before the auction is one of the first skills every new bridge player should develop. The standard scale awards Ace=4, King=3, Queen=2 and Jack=1, giving the entire deck 40 HCP. Typically 12+ HCP is needed to open the bidding.',
  'The best way to consolidate what you have learned is to play real hands as soon as possible. All major online platforms offer \'robot\' games — you play against computer opponents who bid and play to a reasonable standard. Funbridge in particular is excellent for beginners, with a guided learning path and opponents at multiple difficulty levels.',
  'Bridge is fundamentally a partnership game, and that partnership dimension is part of what makes it so rewarding. You and your partner are trying to communicate the contents of your hands through the auction — telling each other about your strength, your suit lengths, and your overall intentions, all through a sequence of coded bids.',
  'Understanding the scoring system early makes the game much more enjoyable. The most important threshold is 100 trick points, which constitutes a \'game\'. In major suits (Hearts and Spades), you need to bid and make 4 of a kind (10 tricks) to reach 100. In No Trumps, just 3NT (9 tricks) is enough.',
];

const FAQS = [
  { q: 'How long does it take to learn to play bridge?', a: 'Most players understand the basics within a few hours of reading. Confident, enjoyable play typically develops within a few weeks of regular games. Bridge is a game that rewards practice and patience.' },
  { q: 'Is bridge suitable for complete beginners with no card game experience?', a: 'Yes, absolutely. While bridge is complex, it is taught in a logical sequence and the rules build on each other. If you can follow suit in a simple card game and count to 13, you have everything you need to start.' },
  { q: 'What is the easiest way to learn bridge on my own?', a: 'The best starting point is to read a clear beginner guide (like the one on this page) and then immediately play robot (AI) games on a platform like Funbridge or BBO. Playing against computer opponents lets you learn at your own pace with no pressure.' },
  { q: 'Do I need four people to play bridge?', a: 'For live bridge, yes — bridge is a game for exactly four players. However, online platforms allow you to play with three robot opponents filling in, so you can play solo at any time.' },
  { q: 'What is the difference between rubber bridge and duplicate bridge?', a: 'Rubber bridge is the traditional home/club form, played across multiple hands until one side wins two games (a rubber). Duplicate bridge uses the same pre-dealt hands at multiple tables and compares results, removing luck.' },
  { q: 'Can people over 60 learn bridge easily?', a: 'Many bridge teachers say older adult learners often make the fastest progress — they bring patience, life experience, and the ability to think carefully before acting. Bridge rewards those qualities. Age is no barrier whatsoever.' },
  { q: 'How do I find a beginner bridge course near me?', a: 'Most national bridge organisations offer beginner courses — search for your local English Bridge Union (EBU) affiliated club, or the American Contract Bridge League (ACBL) in North America. Many clubs now offer online beginner courses via Zoom.' },
];

export default function HowToPlayClient() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.8)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const bgTip = isDeep ? 'rgba(28,47,94,0.5)' : '#eef2fa';

  return (
    <div>
      <PageHeader title="How to Play Bridge" subtitle="Complete Beginner's Guide · 7 Easy Steps" suit="♠" />
      <div style={{ background: bg, minHeight: '40vh', padding: 'clamp(32px,5vw,48px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: bgTip, border: `2px solid ${navy}`, borderRadius: 12, padding: '20px 28px', marginBottom: 48, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>💡</span>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: headC, lineHeight: 1.65 }}>
              <strong>Don't worry if this seems complicated at first.</strong> Bridge has lots of rules, but they follow a clear logic. Read each step, then try a <Link href="/practice-boards/" style={{ color: gold, fontWeight: 700, textDecoration: 'underline' }}>practice hand →</Link>
            </div>
          </div>
          {STEPS.map((step, i) => (
            <div key={step.n} style={{ display: 'flex', gap: 28, padding: '32px 0', borderBottom: i < STEPS.length - 1 ? `1px solid ${bdr}` : 'none', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: 58, height: 58, background: navy, color: gold, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700 }}>{step.n}</div>
              <div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 23, color: headC, margin: '0 0 10px' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.8, margin: 0 }}>{step.body}</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 48, background: theme === 'deep' ? 'rgba(28,47,94,0.3)' : '#f8f6f2', borderRadius: 12, padding: 28, border: `1px solid ${bdr}` }}>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: headC, marginTop: 0, marginBottom: 20 }}>Quick Reference: The Four Suits</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
              {[['♣','Clubs','Black','Minor — 20pts/trick'],['♦','Diamonds','Red','Minor — 20pts/trick'],['♥','Hearts','Red','Major — 30pts/trick'],['♠','Spades','Black','Major — 30pts/trick']].map(([suit,name,colour,desc]) => (
                <div key={suit} style={{ textAlign: 'center', padding: 16, background: isDeep ? 'rgba(255,255,255,0.05)' : '#fff', borderRadius: 10, border: `1px solid ${bdr}` }}>
                  <div style={{ fontSize: 40, color: colour === 'Red' ? red : (isDeep ? '#fff' : '#1a1a2e'), marginBottom: 8 }}>{suit}</div>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: headC, marginBottom: 4 }}>{name}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: textC, lineHeight: 1.4 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: navy, borderRadius: 12, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 40 }}>
            <div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: '#fff', marginBottom: 6 }}>Ready to practise?</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>Try our interactive practice boards — real hands with expert commentary.</div>
            </div>
            <Link href="/practice-boards/"><button style={{ background: gold, color: navy, border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", whiteSpace: 'nowrap' }}>Play a Practice Hand →</button></Link>
          </div>
        </div>
      </div>
      <SEOSection paras={SEO_PARAS} />
      <FAQSection items={FAQS} />
    </div>
  );
}
