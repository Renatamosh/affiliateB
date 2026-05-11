'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

function useMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth < bp); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, [bp]);
  return m;
}

const DEALS = [
  { id: 1, title: 'Deal 1: A Simple No Trump Game', contract: '3NT by South', vulnerable: 'N/S', dealer: 'South',
    commentary: 'South opens 1NT (15–17 HCP). North with 10 HCP raises to 3NT. West leads the ♠5. Declarer should count nine sure tricks: two spades, three hearts, two diamonds and two clubs. Win the spade lead, cash three hearts, two diamonds, then two clubs. Make 3NT with an overtrick.',
    keyPlay: 'Count your winners first. You have 9 top tricks — take them in the right order before the opponents can establish their spades.',
    hands: { N: { S: ['K','7','3'], H: ['A','9','6'], D: ['Q','8','4'], C: ['J','10','7','2'] }, S: { S: ['A','Q','J'], H: ['K','Q','J'], D: ['A','K','3'], C: ['A','6','5'] }, E: { S: ['10','9','8','4'], H: ['10','8','3'], D: ['J','9','6'], C: ['K','Q','3'] }, W: { S: ['6','5','2'], H: ['7','5','4','2'], D: ['10','7','5','2'], C: ['9','8'] } },
    hint: 'Count your sure winners. You have 2 Spades + 3 Hearts + 2 Diamonds + 2 Clubs = 9 tricks. Just take them!' },
  { id: 2, title: 'Deal 2: A Finesse Opportunity', contract: '4♠ by South', vulnerable: 'None', dealer: 'North',
    commentary: 'South opens 1♠, North raises to 4♠. West leads the ♥K. Declarer wins the ♥A, draws trumps in two rounds, then needs a 10th trick. Lead the ♦J from hand — if West plays low, run it. The diamond finesse works when West holds the ♦K.',
    keyPlay: 'After drawing trumps, lead the ♦J toward Dummy\'s ♦A. If West has the King, the finesse gains you the critical 10th trick.',
    hands: { N: { S: ['K','8','5','3'], H: ['9','6','2'], D: ['A','J','3'], C: ['Q','8','4'] }, S: { S: ['A','Q','J','10','7'], H: ['A','5'], D: ['10','6','4'], C: ['A','K','3'] }, E: { S: ['6','2'], H: ['Q','J','8','4'], D: ['K','9','7','2'], C: ['J','10','7'] }, W: { S: ['9','4'], H: ['K','10','7','3'], D: ['Q','8','5'], C: ['9','6','5','2'] } },
    hint: 'You need one more trick. Lead toward the ♦AJ — if West has the ♦K, you get an extra trick by finessing.' },
  { id: 3, title: 'Deal 3: The Hold-Up Play', contract: '3NT by South', vulnerable: 'E/W', dealer: 'East',
    commentary: "West leads the ♠6 (fourth-best from ♠QJ1096). South holds ♠A-3 and must hold up — refuse to win — until the third round. This exhausts East of spades. Later, when East wins the ♦K, they have no spade to return.",
    keyPlay: "Do NOT win the first spade! Hold up your ♠A until the third round. When East gets in with the ♦K, they're cut off.",
    hands: { N: { S: ['K','4'], H: ['A','Q','J'], D: ['Q','J','9','4'], C: ['Q','10','8','3'] }, S: { S: ['A','3'], H: ['K','10','9'], D: ['A','10','8','2'], C: ['A','K','7','5'] }, E: { S: ['8','7','2'], H: ['8','6','5','3'], D: ['K','7','6','3'], C: ['J','9'] }, W: { S: ['Q','J','10','9','6'], H: ['7','4','2'], D: ['5'], C: ['6','4','2'] } },
    hint: "Don't take your ♠A straight away! Hold it up until the third round to cut East off from West's long suit." },
];

function PlayingCard({ rank, suit }) {
  const isRed = suit === '♥' || suit === '♦';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 40, height: 54, background: '#fff', border: '1px solid #ccc', borderRadius: 6, fontFamily: "'Libre Baskerville', serif", fontSize: 13, color: isRed ? red : '#1a1a2e', fontWeight: 700, boxShadow: '0 1px 4px rgba(0,0,0,0.1)', userSelect: 'none', flexShrink: 0 }}>
      <span style={{ lineHeight: 1 }}>{rank}</span>
      <span style={{ lineHeight: 1, fontSize: 14 }}>{suit}</span>
    </div>
  );
}

function HandDisplay({ label, cards, faceDown }) {
  const suitMap = { S: '♠', H: '♥', D: '♦', C: '♣' };
  const suitColors = { S: '#1a1a2e', H: red, D: red, C: '#1a1a2e' };
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{label}</div>
      {faceDown ? (
        <div style={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[...Array(13)].map((_, i) => <div key={i} style={{ width: 40, height: 54, background: 'linear-gradient(135deg,#1c2f5e,#2d4a7a)', border: '1px solid #1c2f5e', borderRadius: 6 }} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}>
          {['S','H','D','C'].map(suit => (
            <div key={suit} style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 20, fontSize: 16, color: suitColors[suit], textAlign: 'center' }}>{suitMap[suit]}</span>
              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {cards[suit].map((r, i) => <PlayingCard key={i} rank={r} suit={suitMap[suit]} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const SEO_PARAS = [
  "Practice hands are among the most valuable learning tools available to any bridge player. While reading about card play techniques is helpful, only through actually playing hands does the theory become instinct.",
  "The interactive hand viewer on this page presents carefully selected deals, each chosen to illustrate a specific and important card play concept: a No Trump plan based on counting sure winners, a finesse position, and the hold-up play.",
  "Professional bridge teachers recommend a structured approach to working through practice hands. Before looking at any hint or commentary, take time to form your own plan first — this active thinking process builds the mental patterns that transfer to real play.",
  "As your game progresses, you will find that the best bridge players read the full hand early — inferring the location of unseen cards from the opening lead, the bidding, and the cards played so far.",
  "For additional practice material, we recommend Bridge Base Online (BBO) for free hands at any time, and Funbridge for structured practice with performance scoring and comparison.",
];

const FAQS = [
  { q: 'What is the best way to use these practice boards?', a: 'Form your own plan before looking at the hint or commentary. Ask yourself: how many tricks do I need? Where are they coming from? Commit to a line of play first, then check the commentary to see if you were right.' },
  { q: 'How do I count winners in a No Trump contract?', a: 'Count every suit where you can win tricks without conceding the lead: Ace = 1 sure winner, A-K = 2, A-K-Q = 3, and so on. Add these up across all four suits.' },
  { q: 'What is the difference between counting winners and counting losers?', a: 'In No Trump contracts, count winners — the tricks you can take without losing the lead. In suit contracts, count losers — the tricks you expect to lose. Both approaches give you the information needed to form a plan.' },
  { q: "Why does the order I take my tricks matter?", a: "In No Trumps especially, taking tricks in the wrong order can strand you in the wrong hand or allow the opponents to establish their long suit. Planning the order of play is as important as knowing how many tricks you have." },
  { q: "What is a 'fourth best' lead?", a: "A fourth-best opening lead means playing your fourth-highest card in your longest suit. For example, from ♠K-J-9-6-3, you lead the ♠6. This traditional lead allows partner to apply the 'Rule of Eleven'." },
];

export default function PracticeBoardsClient({ data }) {
  const { theme } = useTheme();
  const seoParas = data?.seo_paras || SEO_PARAS;
  const faqs = data?.faq || FAQS;
  const isMobile = useMobile();
  const [dealIdx, setDealIdx] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showCommentary, setShowCommentary] = useState(false);
  const deal = DEALS[dealIdx];

  const isDeep = theme === 'deep';
  const cardBg = isDeep ? '#0f1d3a' : theme === 'bright' ? '#f8f6f2' : '#fff';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.75)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  return (
    <div>
      <PageHeader title="Practice Boards" subtitle="Interactive Hand Viewer · 3 Instructive Deals" suit="🃏" />
      <div style={{ background: bg, padding: '48px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ background: isDeep ? 'rgba(28,47,94,0.4)' : '#eef2fa', border: `1px solid ${isDeep ? '#1a2e50' : '#c5d3ee'}`, borderRadius: 10, padding: '16px 24px', marginBottom: 28, fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: headC }}>
            <strong>How to use this:</strong> South's cards are always visible. Try to make the contract before revealing the other hands. Use the Hint button if you get stuck.
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
            {DEALS.map((d, i) => (
              <button key={d.id} onClick={() => { setDealIdx(i); setShowAll(false); setShowHint(false); setShowCommentary(false); }}
                style={{ padding: '12px 24px', borderRadius: 8, border: `2px solid ${i === dealIdx ? navy : bdr}`, background: i === dealIdx ? navy : cardBg, color: i === dealIdx ? gold : headC, fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: i === dealIdx ? 700 : 400, cursor: 'pointer' }}>
                Deal {d.id}: {['NT Winner Count','Finesse','Hold-Up'][i]}
              </button>
            ))}
          </div>
          <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: navy, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: '#fff' }}>{deal.title}</div>
                <div style={{ fontSize: 15, color: gold, marginTop: 4, fontFamily: "'Source Sans 3', sans-serif" }}>
                  Contract: <strong>{deal.contract}</strong> · Dealer: <strong>{deal.dealer}</strong> · Vulnerable: <strong>{deal.vulnerable}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => { setShowHint(!showHint); setShowCommentary(false); }} style={{ background: showHint ? 'rgba(212,168,67,0.3)' : 'rgba(212,168,67,0.1)', border: '1px solid #d4a843', color: gold, borderRadius: 8, padding: '10px 18px', fontSize: 15, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>💡 Hint</button>
                <button onClick={() => { setShowCommentary(!showCommentary); setShowHint(false); }} style={{ background: showCommentary ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 8, padding: '10px 18px', fontSize: 15, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>📖 Commentary</button>
                <button onClick={() => setShowAll(!showAll)} style={{ background: showAll ? gold : 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.3)', color: showAll ? navy : '#fff', borderRadius: 8, padding: '10px 18px', fontSize: 15, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>{showAll ? 'Hide Hands' : 'Show All Hands'}</button>
              </div>
            </div>
            {showHint && <div style={{ background: 'rgba(212,168,67,0.1)', borderBottom: `1px solid ${bdr}`, padding: '16px 28px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: gold, borderLeft: '4px solid #d4a843' }}>💡 <strong>Hint:</strong> {deal.hint}</div>}
            {showCommentary && (
              <div style={{ background: isDeep ? 'rgba(28,47,94,0.3)' : '#f0f4ff', borderBottom: `1px solid ${bdr}`, padding: '20px 28px' }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 8 }}>Key Play: {deal.keyPlay}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.75 }}>{deal.commentary}</div>
              </div>
            )}
            <div style={{ padding: isMobile ? '24px 16px' : '32px 24px' }}>
              {isMobile ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, margin: '0 auto' }}>
                  {[['North', deal.hands.N, !showAll],['South (Declarer)', deal.hands.S, false],['East', deal.hands.E, !showAll],['West', deal.hands.W, !showAll]].map(([label, cards, fd]) => (
                    <HandDisplay key={label} label={label} cards={cards} faceDown={fd} />
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gridTemplateRows: 'auto auto auto', gap: 20, alignItems: 'center', maxWidth: 760, margin: '0 auto' }}>
                  <div /><div><HandDisplay label="North" cards={deal.hands.N} faceDown={!showAll} /></div><div />
                  <div style={{ justifySelf: 'end' }}><HandDisplay label="West" cards={deal.hands.W} faceDown={!showAll} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 80, height: 80, border: `3px solid ${navy}`, borderRadius: '50%', background: isDeep ? 'rgba(28,47,94,0.5)' : '#eef2fa', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {[['N','50%','8%'],['S','50%','68%'],['W','8%','38%'],['E','68%','38%']].map(([d,l,t]) => (
                        <span key={d} style={{ position: 'absolute', left: l, top: t, fontFamily: "'Libre Baskerville', serif", fontSize: 14, fontWeight: 700, color: gold }}>{d}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ justifySelf: 'start' }}><HandDisplay label="East" cards={deal.hands.E} faceDown={!showAll} /></div>
                  <div /><div><HandDisplay label="South (Declarer)" cards={deal.hands.S} faceDown={false} /></div><div />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SEOSection paras={seoParas} />
      <FAQSection items={faqs} />
    </div>
  );
}
