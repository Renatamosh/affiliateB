'use client';
import { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const RULES_CATS = [
  { cat: 'The Deal & Cards', items: [
    { q: 'How are the cards dealt?', a: 'Cards are dealt one at a time clockwise, starting left of the Dealer. Each player receives exactly 13 cards. After the deal, each player picks up their hand and keeps it private.' },
    { q: 'What is a misdeal?', a: 'A misdeal occurs if cards are incorrectly distributed — a player has more or fewer than 13 cards, or cards were exposed during the deal. The cards are collected, re-shuffled and re-dealt by the same Dealer.' },
    { q: "What is a 'board' in duplicate bridge?", a: 'In duplicate bridge, pre-dealt hands are kept in a board (a tray with four pockets). Each board shows its number, Dealer and vulnerability. The same hands are played at every table so scores can be compared fairly.' },
  ]},
  { cat: 'The Auction (Bidding)', items: [
    { q: 'What can I call in the auction?', a: 'You can: Pass, make a bid (name a number 1–7 and a suit or NT), Double (only on an opponent\'s bid) or Redouble (only after your side has been doubled). Each bid must be higher than the previous.' },
    { q: 'What order do suits rank in bidding?', a: 'From lowest to highest: Clubs (♣), Diamonds (♦), Hearts (♥), Spades (♠), No Trumps (NT). So 1♦ outranks 1♣, but 1♥ outranks both.' },
    { q: 'When does the auction end?', a: 'The auction ends when three players pass consecutively after any bid, double or redouble. The last bid made is the final contract.' },
    { q: 'What is an insufficient bid?', a: 'An insufficient bid does not rank above the previous call. The offender may correct it (with possible restrictions) or accept a designated penalty under the Laws of Bridge.' },
  ]},
  { cat: 'Card Play', items: [
    { q: 'Who leads first?', a: "The player to Declarer's left always leads to the first trick. After the opening lead, Dummy's hand is laid face-up. The winner of each trick leads to the next." },
    { q: 'Do I have to follow suit?', a: "Yes — if you hold a card in the suit led, you must play one. This is called 'following suit'. Only if you have no cards in the led suit may you play a different suit (or a trump)." },
    { q: 'What is a revoke?', a: 'A revoke is when a player fails to follow suit despite holding a card in the suit led. It is a serious irregularity. Once established, penalties apply.' },
    { q: 'How does Dummy work?', a: "After the opening lead, Dummy lays their hand face-up on the table and takes no further active part in play. Only Declarer decides which card to play from Dummy's hand." },
  ]},
  { cat: 'Scoring', items: [
    { q: 'How are trick points calculated?', a: 'Tricks bid and made score: ♣/♦ (minors) = 20 points per trick; ♥/♠ (majors) = 30 per trick; NT = 40 for first odd trick, 30 for each subsequent. Reach 100 trick points and you have made a Game.' },
    { q: 'What is a Game bonus?', a: 'Bidding and making a game earns a bonus of 300 points (not vulnerable) or 500 points (vulnerable), in addition to the trick score.' },
    { q: 'What is a Slam?', a: 'A Small Slam bids and makes 12 tricks (bid 6). A Grand Slam bids and makes all 13 tricks (bid 7). Both earn large bonuses — up to 1500 extra points for a vulnerable Grand Slam.' },
    { q: 'What are undertrick penalties?', a: 'Each trick short of the contract scores for the defenders: 50 not vulnerable, 100 vulnerable (undoubled). Doubled undertricks are significantly higher.' },
    { q: "What does 'vulnerable' mean?", a: 'A side is vulnerable if they have already won one game in the rubber. Vulnerable bonuses and penalties are both higher than not-vulnerable.' },
  ]},
];

const SEO_PARAS = [
  "The Laws of Bridge are maintained by the World Bridge Federation (WBF) and updated periodically. Our accordion guide presents the most important rules in everyday English, covering every situation that arises in normal social and competitive play.",
  "Understanding the rules of bridge matters for two distinct reasons. First, it allows you to play correctly and avoid inadvertently breaking the laws. Second, knowing your rights when an opponent commits an irregularity prevents misunderstandings and ensures the game remains fair.",
  "For online bridge players, most laws are enforced automatically by the platform software. You cannot make an insufficient bid — the software will not permit it. You cannot revoke — the platform will prompt you to follow suit. This makes online bridge particularly forgiving for new players.",
  "The scoring system is one of the features that makes bridge uniquely strategic. Every bid carries a risk: bid too high and you face potentially large penalties; bid too conservatively and you leave valuable bonuses on the table.",
  "Many new players find the doubling and redoubling rules confusing at first. A Double on an opponent's contract effectively says: 'I don't think you can make this.' If right, the defending side's score increases substantially.",
  "The Laws are sometimes seen as intimidating, but in social bridge most of the complex situations rarely arise. The core rules — follow suit, lead in turn, bid in sequence — are simple and intuitive.",
];

const FAQS = [
  { q: 'What happens if I play a card out of turn?', a: "If a defender leads out of turn, the Declarer has options: accept the lead, require the correct player to lead, or treat the card as a penalty card. The Laws provide specific remedies for each situation." },
  { q: 'Can I take back a card I have already played?', a: "Generally no — once a card is played and the next player has played, it cannot be withdrawn. On some online platforms, there is an 'undo' facility for obvious errors, but this requires opponents' agreement." },
  { q: "What is a 'claim' in bridge?", a: "A claim is when Declarer states they will win all (or a specific number of) remaining tricks, laying their hand face-up. The claim must be accompanied by a statement of the intended line of play." },
  { q: 'What should I do if I think my opponent has revoked?', a: "In live play, say 'I believe there may be a revoke' at the end of the hand — not mid-play. In online bridge, the platform prevents revokes automatically." },
  { q: "Are bridge laws the same everywhere?", a: "The core Laws are universal, published by the World Bridge Federation. Individual countries may issue supplementary regulations for their competitions. Online platforms have their own specific additional rules." },
];

export default function RulesClient({ data }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const [open, setOpen] = useState({});
  const [search, setSearch] = useState('');
  const ruleCats = data?.rule_categories || RULES_CATS;
  const seoParas = data?.seo_paras || SEO_PARAS;
  const faqs = data?.faq || FAQS;
  const cardBg = isDeep ? '#0f1d3a' : theme === 'bright' ? '#f8f6f2' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.75)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';

  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));
  const filtered = ruleCats.map(cat => ({
    ...cat,
    items: cat.items.filter(item => !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase()))
  })).filter(cat => cat.items.length > 0);

  return (
    <div>
      <PageHeader title="Bridge Rules & Laws" subtitle="Official Rules · Explained Simply · Searchable" suit="♦" suitColor={red} />
      <div style={{ background: bg, minHeight: '40vh', padding: 'clamp(32px,5vw,48px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.8, marginTop: 0, marginBottom: 32 }}>
            {data?.intro || 'The official Laws of Bridge explained in plain English. Click any question to expand the answer. Use the search box to find any specific rule instantly.'}
          </p>
          <input type="text" placeholder="Search rules — e.g. 'revoke', 'scoring', 'double'…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '16px 20px', borderRadius: 10, border: `2px solid ${bdr}`, fontSize: 18, fontFamily: "'Source Sans 3', sans-serif", marginBottom: 32, boxSizing: 'border-box', outline: 'none', background: cardBg, color: headC }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {filtered.map(cat => (
              <div key={cat.cat} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ background: navy, padding: '16px 24px' }}>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: gold, margin: 0 }}>{cat.cat}</h3>
                </div>
                {cat.items.map((item, i) => {
                  const key = `${cat.cat}-${i}`;
                  const isOpen = open[key];
                  return (
                    <div key={key} style={{ borderBottom: i < cat.items.length - 1 ? `1px solid ${bdr}` : 'none' }}>
                      <button onClick={() => toggle(key)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: headC, fontWeight: 600, paddingRight: 16 }}>{item.q}</span>
                        <span style={{ fontSize: 24, color: gold, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', display: 'block' }}>+</span>
                      </button>
                      {isOpen && <div style={{ padding: '0 24px 20px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.8 }}>{item.a}</div>}
                    </div>
                  );
                })}
              </div>
            ))}
            {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 48, color: '#888', fontFamily: "'Source Sans 3', sans-serif", fontSize: 18 }}>No rules found for "{search}"</div>}
          </div>
        </div>
      </div>
      <SEOSection paras={seoParas} />
      <FAQSection items={faqs} />
    </div>
  );
}
