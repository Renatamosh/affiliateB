'use client';
import { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const QUESTIONS = [
  { q: 'You hold: ♠ A K J 7 4  ♥ K 8 3  ♦ Q 6  ♣ J 9 2. What do you open?', hand: { S: '♠ A K J 7 4', H: '♥ K 8 3', D: '♦ Q 6', C: '♣ J 9 2' }, hcp: 14, options: ['Pass', '1♣', '1♠', '1NT', '2♠'], correct: 2, explanation: 'Open 1♠. You have 14 HCP and your longest suit is spades (5 cards). With 12–21 HCP, always open your longest suit at the one level. 1NT requires 15–17 HCP balanced.' },
  { q: 'Partner opens 1NT (15–17 HCP, balanced). You hold: ♠ K 8 2  ♥ Q J 6  ♦ A 9 4 3  ♣ 10 7 4. What do you bid?', hand: { S: '♠ K 8 2', H: '♥ Q J 6', D: '♦ A 9 4 3', C: '♣ 10 7 4' }, hcp: 10, options: ['Pass', '2♦', '2NT', '3NT', '4NT'], correct: 2, explanation: 'Bid 2NT — an invitational raise. With 10 HCP you invite game: partner bids 3NT with a maximum 17 HCP or passes with 15–16.' },
  { q: 'You hold: ♠ 5  ♥ A K Q 10 6 5  ♦ K J 8  ♣ A 4 3. What do you open?', hand: { S: '♠ 5', H: '♥ A K Q 10 6 5', D: '♦ K J 8', C: '♣ A 4 3' }, hcp: 19, options: ['1♥', '2♥', '2♣', '4♥', 'Pass'], correct: 2, explanation: 'Open 2♣ — the only forcing-to-game opening bid. With 19 HCP and a powerful 6-card heart suit, this hand is too strong for 1♥ (partner could pass with nothing). 2♣ forces to game.' },
  { q: 'You open 1♥. Partner raises to 2♥ (6–9 HCP, 3+ hearts). You hold: ♠ A J 3  ♥ K Q 8 5 2  ♦ K Q 4  ♣ 8 3. What now?', hand: { S: '♠ A J 3', H: '♥ K Q 8 5 2', D: '♦ K Q 4', C: '♣ 8 3' }, hcp: 15, options: ['Pass', '3♥', '4♥', '2NT', '3NT'], correct: 2, explanation: 'Bid 4♥! You have 15 HCP; partner has shown at least 6. Even at the minimum (6+15=21), you have enough for game with a confirmed trump fit. Never settle for partscore when game is clearly available.' },
  { q: 'RHO opens 1♦. You hold: ♠ K Q J 10 7  ♥ A 9 3  ♦ 4 2  ♣ 8 6 5. What do you bid?', hand: { S: '♠ K Q J 10 7', H: '♥ A 9 3', D: '♦ 4 2', C: '♣ 8 6 5' }, hcp: 11, options: ['Pass', '1♠', '2♠', 'Double', '1NT'], correct: 1, explanation: 'Bid 1♠ — a simple overcall. You have 11 HCP and an excellent 5-card spade suit. An overcall at the one level typically shows 8–16 HCP and a good 5+ card suit.' },
  { q: 'Partner opens 1♠. You hold: ♠ Q 7 3  ♥ K J 10 6  ♦ A 8 4  ♣ 9 5 2. How do you respond?', hand: { S: '♠ Q 7 3', H: '♥ K J 10 6', D: '♦ A 8 4', C: '♣ 9 5 2' }, hcp: 11, options: ['Pass', '2♠', '3♠', '2♥', '1NT'], correct: 2, explanation: 'Bid 3♠ — a limit raise. With 11 HCP and three-card spade support, you invite game. A 3♠ response says "I have about 10–12 HCP and 3 trumps — bid 4♠ if you have more than a minimum."' },
];

const SEO_PARAS = [
  "A bidding quiz is one of the most effective ways to accelerate your development as a bridge player. Unlike playing full hands, a quiz focuses exclusively on the auction — presenting you with a hand and context, and asking you to find the best call.",
  "The quiz hands on this page have been selected to test the most important concepts in introductory and intermediate bidding: opening bid selection, responding to partner's bids, choosing between game and partscore, and the basic use of conventions.",
  "When taking a bidding quiz, resist the temptation to guess randomly or rush. Treat each question as a real hand: count your HCP, assess your distribution, and form a view before selecting an answer.",
  "The best bridge players develop an intuitive feel for hand value that goes beyond raw HCP — recognising that a five-card suit adds value, that a void in partner's suit can be catastrophic, that 'soft' values are often worth less than their nominal HCP suggest. Regular quiz practice is one of the fastest ways to develop this intuition.",
  "Once you have completed this quiz, we recommend trying it again from scratch — often the second run produces different results as the explanations settle in your thinking.",
];

const FAQS = [
  { q: 'What HCP do I need to open the bidding?', a: 'The standard minimum is 12 HCP for a one-level opening in a suit. With a strong 5-card suit and good shape, some experienced players open with 11 HCP. With 10 HCP or fewer, generally pass.' },
  { q: 'What is an overcall and how is it different from an opening bid?', a: 'An overcall is a bid made after an opponent has already opened. It typically shows 8–16 HCP and a good 5+ card suit. Unlike an opening bid, an overcall also has a lead-directing purpose.' },
  { q: 'What is a limit raise?', a: 'A limit raise is a raise of partner\'s suit that shows invitational values — typically 10–12 HCP and 3-card support. It invites partner to bid game with a maximum opening and to pass with a minimum.' },
  { q: 'When should I bid game rather than a partscore?', a: 'Bid game when your side collectively holds 25+ HCP and you have found a fit. If partner opens and you hold 13+ HCP, insist on game. If partner invites and you have 15+ HCP, accept.' },
  { q: 'Can I change my bid after I have made it?', a: "No — a bid is final once made and the next player has called. Think before you bid, not after." },
];

export default function BiddingQuizClient() {
  const { theme } = useTheme();
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState([]);

  const isDeep = theme === 'deep';
  const cardBg = isDeep ? '#0f1d3a' : theme === 'bright' ? '#f8f6f2' : '#fff';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.75)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const q = QUESTIONS[qIdx];
  const isCorrect = selected === q.correct;

  const handleNext = () => {
    const correct = selected === q.correct;
    if (correct) setScore(s => s + 1);
    setHistory(h => [...h, { correct, selected, answer: q.options[selected], right: q.options[q.correct] }]);
    if (qIdx < QUESTIONS.length - 1) { setQIdx(i => i + 1); setSelected(null); }
    else setDone(true);
  };
  const reset = () => { setQIdx(0); setSelected(null); setScore(0); setDone(false); setHistory([]); };

  return (
    <div>
      <PageHeader title="Bidding Quiz" subtitle="Test Your Knowledge · 6 Real Hands" suit="♣" />
      <div style={{ background: bg, padding: '48px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ background: isDeep ? 'rgba(28,47,94,0.4)' : '#eef2fa', border: `1px solid ${bdr}`, borderRadius: 10, padding: '16px 24px', marginBottom: 28, fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: headC }}>
            <strong>How to play:</strong> Study the hand and auction context, then choose your bid. You'll see an explanation after each answer.
          </div>
          {done ? (
            <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: '48px 36px', textAlign: 'center' }}>
              <div style={{ fontSize: 72, marginBottom: 16 }}>{score === QUESTIONS.length ? '🏆' : score >= 4 ? '👏' : '📚'}</div>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 34, color: headC, marginBottom: 8 }}>Quiz Complete!</h2>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 20, color: textC }}>You scored <strong style={{ color: gold, fontSize: 28 }}>{score}</strong> out of <strong>{QUESTIONS.length}</strong></p>
              <div style={{ textAlign: 'left', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {history.map((h, i) => (
                  <div key={i} style={{ background: h.correct ? 'rgba(39,174,96,0.1)' : 'rgba(192,57,43,0.1)', border: `1px solid ${h.correct ? '#27ae60' : red}`, borderRadius: 8, padding: '10px 16px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15 }}>
                    <span style={{ color: h.correct ? '#27ae60' : red, fontWeight: 700 }}>{h.correct ? '✓' : '✗'} Q{i+1}:</span> <span style={{ color: textC }}>You bid <strong>{h.answer}</strong>{!h.correct && <span style={{ color: gold }}> — correct was <strong>{h.right}</strong></span>}</span>
                  </div>
                ))}
              </div>
              <button onClick={reset} style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px 36px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>Try Again</button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC }}>Question {qIdx + 1} of {QUESTIONS.length}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {QUESTIONS.map((_, i) => <div key={i} style={{ width: 36, height: 8, borderRadius: 4, background: i < qIdx ? gold : i === qIdx ? navy : bdr }} />)}
                </div>
              </div>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ background: isDeep ? 'rgba(28,47,94,0.4)' : '#f0f4ff', borderBottom: `1px solid ${bdr}`, padding: '24px 28px' }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Your Hand</div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {Object.entries(q.hand).map(([s, v]) => (
                      <div key={s} style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: (s === 'H' || s === 'D') ? red : headC }}>{v}</div>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC }}>HCP: <strong style={{ color: gold }}>{q.hcp}</strong></div>
                </div>
                <div style={{ padding: 28 }}>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 21, color: headC, margin: '0 0 24px', lineHeight: 1.4 }}>{q.q}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                    {q.options.map((opt, i) => {
                      let bg2 = cardBg, border2 = `2px solid ${bdr}`, color2 = headC;
                      if (selected !== null) {
                        if (i === q.correct) { bg2 = '#e8f5e9'; border2 = '2px solid #27ae60'; color2 = '#1a6b35'; }
                        else if (i === selected) { bg2 = '#fdecea'; border2 = `2px solid ${red}`; color2 = red; }
                        else { bg2 = isDeep ? 'rgba(255,255,255,0.02)' : '#f5f5f5'; color2 = '#999'; }
                      }
                      return (
                        <button key={i} onClick={() => selected === null && setSelected(i)}
                          style={{ background: bg2, border: border2, color: color2, borderRadius: 10, padding: '16px 20px', fontSize: 20, fontWeight: 700, cursor: selected === null ? 'pointer' : 'default', fontFamily: "'Libre Baskerville', serif", transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selected !== null && (
                    <>
                      <div style={{ background: isCorrect ? 'rgba(39,174,96,0.1)' : 'rgba(192,57,43,0.1)', border: `1px solid ${isCorrect ? '#27ae60' : red}`, borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
                        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 17, color: isCorrect ? '#27ae60' : red, marginBottom: 6 }}>
                          {isCorrect ? '✓ Correct!' : `✗ Not quite — the correct answer is ${q.options[q.correct]}`}
                        </div>
                        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.75 }}>{q.explanation}</div>
                      </div>
                      <button onClick={handleNext} style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>
                        {qIdx < QUESTIONS.length - 1 ? 'Next Question →' : 'See My Results'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <SEOSection paras={SEO_PARAS} />
      <FAQSection items={FAQS} />
    </div>
  );
}
