'use client';
import { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const TERMS = [
  { term: 'Acol', def: 'The most popular bidding system in the United Kingdom. Features a weak No Trump (12–14 HCP) and four-card major openings. Named after the Acol Bridge Club in London.' },
  { term: 'Auction', def: 'The bidding process. Players take turns clockwise making bids, passes, doubles or redoubles. Ends after three consecutive passes.' },
  { term: 'Balanced Hand', def: 'A hand with no void, no singleton, and at most one doubleton. Shapes 4-3-3-3, 4-4-3-2 and 5-3-3-2 are balanced. Balanced hands are typically opened in No Trumps.' },
  { term: 'Blackwood', def: 'A convention where 4NT asks partner how many Aces they hold. Responses: 5♣=0 or 4 Aces, 5♦=1, 5♥=2, 5♠=3. Used to investigate slam.' },
  { term: 'Board', def: 'In duplicate bridge, a tray with four pockets holding the pre-dealt hands. Each board shows its number, Dealer and vulnerability.' },
  { term: 'Contract', def: 'The final bid in the auction. The declaring side must win at least 6 plus the contract number of tricks.' },
  { term: 'Conventions', def: 'Agreed artificial bid meanings that supplement the natural bidding system. Common conventions include Stayman, Blackwood and Transfer bids.' },
  { term: 'Dealer', def: 'The player who deals the cards for a hand. The Dealer bids first in the auction.' },
  { term: 'Declarer', def: "The player who plays the contract. The first player in the declaring partnership to name the trump suit of the final contract. Declarer plays both their own hand and Dummy's." },
  { term: 'Defender', def: "Either opponent of Declarer. Defenders try to win enough tricks to defeat the contract. They cannot see each other's cards." },
  { term: 'Double', def: "A call that increases penalties if the contract fails, and bonuses if it makes. Can only be made by a defender on an opponent's bid." },
  { term: 'Doubleton', def: 'Exactly two cards in a suit.' },
  { term: 'Dummy', def: "Declarer's partner. After the opening lead, Dummy lays their hand face-up on the table and takes no active part in play." },
  { term: 'Endplay', def: 'An advanced technique where Declarer arranges for a specific opponent to gain the lead at a point where every card they play gives Declarer a trick.' },
  { term: 'Entry', def: "A card that allows you to reach a specific hand (Declarer's or Dummy's) at a key point in the play." },
  { term: 'Finesse', def: 'A technique attempting to win a trick with a card lower than the opponents\' highest card, by leading towards it and hoping the high card is held on your right.' },
  { term: 'Follow Suit', def: 'Playing a card in the suit that was led. Mandatory if you hold a card of that suit. Failure to follow suit when able is a revoke.' },
  { term: 'Forcing Bid', def: "A bid that partner cannot pass — the auction must continue. A 2♣ opening is forcing to game." },
  { term: 'Game', def: 'A contract scoring 100+ trick points when bid and made. Games are 3NT, 4♥, 4♠, 5♣ and 5♦.' },
  { term: 'Grand Slam', def: 'Bidding and making all 13 tricks — a contract of 7-of-anything.' },
  { term: 'HCP', def: 'High Card Points. Standard hand evaluation: Ace=4, King=3, Queen=2, Jack=1. The full deck holds 40 HCP.' },
  { term: 'Hold-Up', def: 'Deliberately refusing to win a trick with a stopper in order to exhaust a defender of their long suit.' },
  { term: 'Invitational', def: "A bid that invites partner to bid game with a maximum hand, but allows a pass with minimum values." },
  { term: 'Jump Bid', def: 'A bid that skips one or more levels. Often shows extra strength.' },
  { term: 'Lead', def: "The first card played to a trick. The player to Declarer's left leads to the first trick." },
  { term: 'Limit Raise', def: 'A raise of partner\'s suit showing invitational values — typically 10–12 HCP and 3-card support.' },
  { term: 'Major Suits', def: 'Hearts (♥) and Spades (♠). Worth 30 points per trick. Game requires 10 tricks (4-level).' },
  { term: 'Minor Suits', def: 'Clubs (♣) and Diamonds (♦). Worth 20 points per trick. Game requires 11 tricks (5-level).' },
  { term: 'No Trumps (NT)', def: 'A denomination where there is no trump suit. 3NT (9 tricks) is the most common game contract.' },
  { term: 'Opening Lead', def: "The first card played, by the player to Declarer's left, before Dummy's hand is tabled." },
  { term: 'Overcall', def: "A bid made after an opponent has opened. Typically shows 8–16 HCP and a good 5+ card suit." },
  { term: 'Overtrick', def: "A trick won by Declarer beyond the number required by the contract." },
  { term: 'Partscore', def: 'A contract worth fewer than 100 trick points — below game level.' },
  { term: 'Pass', def: 'Declining to make a bid, double or redouble on your turn.' },
  { term: 'Pre-empt', def: 'A jump bid showing a long suit but weak high-card strength (typically 5–9 HCP).' },
  { term: 'Redouble', def: "A call after an opponent's Double, further multiplying scores." },
  { term: 'Revoke', def: 'Failing to follow suit when you held a card of the suit led. A serious irregularity.' },
  { term: 'Rubber', def: 'The traditional unit of scoring in home bridge. Won by the first side to make two games.' },
  { term: 'Sacrifice', def: 'Bidding a contract you expect to fail because the penalty is less than the opponents\' game or slam bonus.' },
  { term: 'Singleton', def: 'Exactly one card in a suit.' },
  { term: 'Slam', def: 'A contract of 6 (Small Slam, 12 tricks) or 7 (Grand Slam, all 13 tricks). Both earn large bonuses.' },
  { term: 'Stayman', def: 'A response of 2♣ to a 1NT opening, asking opener to show a 4-card major.' },
  { term: 'Stopper', def: 'A high card (or combination) that will eventually win a trick in a suit the opponents attack.' },
  { term: 'Transfer', def: 'A convention after a 1NT opening where responder bids one below their suit, asking opener to bid the target suit.' },
  { term: 'Trump', def: 'The suit named in the final contract. A trump card beats any card of any other suit.' },
  { term: 'Undertrick', def: 'Each trick short of the contract number. Defenders score penalty points for undertricks.' },
  { term: 'Void', def: 'Having no cards at all in a suit.' },
  { term: 'Vulnerable', def: 'A side that has already won one game in a rubber. Vulnerable bonuses are higher, but so are undertrick penalties.' },
];

const SEO_PARAS = [
  "Bridge has a rich vocabulary built up over a century of competitive and social play. Many terms have precise technical meanings that differ from everyday usage — 'contract', 'entry', 'transfer' and 'void' all mean specific things in bridge.",
  "The most important terms for beginners to learn first are the basic structural ones: Declarer, Dummy, Defender, Contract, Auction and Trick. Once you understand what these refer to, the rest of the vocabulary builds naturally.",
  "Conventions form a significant part of bridge vocabulary. A convention is an agreed artificial meaning for a bid. The most important conventions for beginners are Stayman and Blackwood.",
  "Online bridge has introduced some additional vocabulary specific to digital play. 'Robot' refers to an AI opponent or partner. 'BBO' refers to Bridge Base Online, the world's largest platform.",
];

const FAQS = [
  { q: "What is the difference between HCP and total points?", a: "HCP (High Card Points) counts only the face value of high cards: Ace=4, King=3, Queen=2, Jack=1. Total points can also include distributional points for long suits or short suits." },
  { q: "What does 'shape' mean in bridge?", a: "Shape refers to the distribution of cards across the four suits. A 4-3-3-3 hand is 'balanced'. A 6-4-2-1 hand is 'unbalanced'. Shape affects both the bidding and card play significantly." },
  { q: "What is a 'fit' in bridge?", a: "A fit (or trump fit) means that you and your partner together hold 8 or more cards in the same suit. An 8-card fit is the standard minimum for a trump contract." },
  { q: "What is a 'cuebid' in bridge?", a: "A cuebid has two meanings depending on context. An 'overcall cuebid' bids the opponent's suit artificially, usually showing a strong hand. A 'slam cuebid' shows first-round control when investigating a slam." },
];

export default function GlossaryClient({ data }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState(null);
  const terms = data?.terms || TERMS;
  const seoParas = data?.seo_paras || SEO_PARAS;
  const faqs = data?.faq || FAQS;
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const filtered = terms.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q);
    const matchLetter = !activeLetter || t.term[0].toUpperCase() === activeLetter;
    return matchSearch && matchLetter;
  });
  const letters = [...new Set(terms.map(t => t.term[0].toUpperCase()))].sort();

  return (
    <div>
      <PageHeader title="Bridge Glossary" subtitle="45+ Terms Explained in Plain English" suit="♦" suitColor={red} />
      <div style={{ background: bg, padding: '48px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <input type="text" placeholder="Search terms — e.g. 'finesse', 'slam', 'Blackwood'…" value={search}
            onChange={e => { setSearch(e.target.value); setActiveLetter(null); }}
            style={{ width: '100%', padding: '16px 20px', borderRadius: 10, border: `2px solid ${bdr}`, fontSize: 18, fontFamily: "'Source Sans 3', sans-serif", marginBottom: 20, boxSizing: 'border-box', outline: 'none', background: cardBg, color: headC }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            <button onClick={() => { setActiveLetter(null); setSearch(''); }} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${!activeLetter ? navy : bdr}`, background: !activeLetter ? navy : cardBg, color: !activeLetter ? '#fff' : textC, fontSize: 15, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>All</button>
            {letters.map(l => (
              <button key={l} onClick={() => { setActiveLetter(l === activeLetter ? null : l); setSearch(''); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${l === activeLetter ? navy : bdr}`, background: l === activeLetter ? navy : cardBg, color: l === activeLetter ? '#fff' : textC, fontSize: 15, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>{l}</button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 48, color: '#888', fontFamily: "'Source Sans 3', sans-serif", fontSize: 18 }}>No terms found for "{search}"</div>
            ) : filtered.map(term => (
              <div key={term.term} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 8, padding: '18px 24px', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ minWidth: 160, fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: gold, fontWeight: 700, flexShrink: 0 }}>{term.term}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.65, flex: 1 }}>{term.def}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SEOSection paras={seoParas} />
      <FAQSection items={faqs} />
    </div>
  );
}
