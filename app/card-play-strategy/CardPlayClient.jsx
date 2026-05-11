'use client';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const TIPS = [
  { suit: '♠', title: 'Plan Before You Play', body: 'Before touching a single card, count your winners (in NT) or your losers (in a suit contract). Form a complete plan. The golden rule: plan the whole hand at trick one. A plan made early beats a reaction made late.' },
  { suit: '♥', title: 'The Finesse', body: 'Lead towards a tenace (e.g. K-Q) hoping the Ace is held by the right-hand opponent. If it is, you make both honours without losing a trick. Finesses work roughly half the time — use them when you have no better option.' },
  { suit: '♦', title: 'The Hold-Up Play', body: "In No Trumps, don't always win the first trick with your stopper! Holding up (refusing to win) until the third round exhausts one defender of their suit, so they can't lead it when they gain the lead later." },
  { suit: '♣', title: 'Drawing Trumps', body: "Usually draw the opponents' trumps early in a suit contract — before they ruff your winners. Count how many trumps are outstanding and lead trumps until they are all gone. Exception: if you need Dummy's trumps to ruff losers first." },
  { suit: '♠', title: 'Establishing a Long Suit', body: "Repeatedly lead your long suit to drive out the opponents' high cards. Once their stoppers are gone, your small cards become winners. Manage your entries carefully — you must be able to reach the established winners." },
  { suit: '♥', title: 'Defensive Signals', body: 'Defenders signal to each other through the cards they play. A high card followed by a low card encourages the suit. A low card first discourages. Always agree your signalling methods with your partner before playing.' },
];

const SEO_PARAS = [
  "Card play is where bridge theory becomes bridge skill — and where the game truly comes alive. The bidding determines your destination; card play is the journey. The single most important habit to develop is planning: before playing a single card from Dummy, count your winners, count your losers, and commit to a complete plan for the hand.",
  "The finesse is the most fundamental card play technique in bridge. In its basic form, you lead towards a card combination — say K-Q in Dummy — hoping the Ace is held by the opponent on your right. The finesse works roughly 50% of the time, but good players know when to take a finesse and when a different line is more reliable.",
  "Suit establishment is the process of playing a suit repeatedly until the opponents' high cards are exhausted, leaving your smaller cards as winners. This is the engine of most declarer plans: identify a suit where you can establish long tricks, play it early, and eventually cash the established winners for discards on your losers.",
  "The hold-up play is essential in No Trump contracts. When the opponents lead a long suit, resisting the temptation to win early — holding up your stopper until the third round — can exhaust one defender of their suit entirely. Later, when that defender gains the lead, they have nothing dangerous to play.",
  "Defence in bridge is widely considered the most demanding aspect of the game, largely because defenders cannot see each other's cards. Successful defence depends on correct analysis of the hand from the auction and play so far, and accurate signalling with your partner.",
  "For players who have mastered the basics, the intermediate techniques open an entirely new dimension of the game. The squeeze forces an opponent to unguard one of two suits simultaneously — an extraordinarily satisfying play when it works.",
  "Online bridge platforms have made studying card play much more accessible. Most record complete hand histories, and some offer computer-assisted analysis of the optimal line of play. We strongly recommend reviewing your hands after each session.",
];

const FAQS = [
  { q: "What is a 'trick' in bridge?", a: "A trick consists of one card played by each of the four players, in clockwise order. The player who wins the trick (by playing the highest card of the suit led, or a trump) collects all four cards face-down and leads the first card to the next trick." },
  { q: 'When should I draw trumps?', a: "As a general rule, draw trumps early — before opponents can ruff your winners. Count the outstanding trumps and lead trumps until they are all gone. The main exception is when you need to ruff losers in Dummy before drawing trumps." },
  { q: "What is a 'ruff'?", a: "A ruff is playing a trump card on a trick when you have no cards in the suit led. This wins the trick regardless of the rank of other cards played. Ruffs are one of the key advantages of a suit contract over No Trumps." },
  { q: "What does 'entry' mean in card play?", a: "An entry is a card that allows you to reach a particular hand (yours or Dummy's) at a specific point in the play. Managing entries — ensuring you can get to the right hand when you need to — is a crucial aspect of declarer play." },
  { q: 'What is a squeeze play?', a: "A squeeze is an advanced technique where you play winners in one suit, forcing an opponent to unguard another suit. The opponent cannot protect two suits at once and must let one go, giving you an extra trick." },
  { q: 'How do I know which suit to lead as a defender?', a: "Partner's bid suits are generally good leads. Against No Trumps, lead your longest and strongest suit. Against suit contracts, leading from three or four to an honour or leading partner's suit is usually safe." },
];

export default function CardPlayClient({ data }) {
  const { theme } = useTheme();
  const tips = data?.tips || TIPS;
  const seoParas = data?.seo_paras || SEO_PARAS;
  const faqs = data?.faq || FAQS;
  const isDeep = theme === 'deep';
  const cardBg = isDeep ? '#0f1d3a' : theme === 'bright' ? '#f8f6f2' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.75)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';

  return (
    <div>
      <PageHeader title="Card Play Strategy" subtitle="Intermediate Techniques · Essential Skills" suit="♥" suitColor={red} />
      <div style={{ background: bg, minHeight: '40vh', padding: 'clamp(32px,5vw,48px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.8, marginTop: 0, marginBottom: 40 }}>
            {data?.intro || 'Once you understand bidding, card play is where bridge truly comes alive. Here are the six core techniques every bridge player should know.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
            {tips.map(tip => (
              <div key={tip.title} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 28 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontSize: 36, color: (tip.suit === '♥' || tip.suit === '♦') ? red : (isDeep ? '#aac4e8' : navy) }}>{tip.suit}</span>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 21, color: headC, margin: 0 }}>{tip.title}</h3>
                </div>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.75, margin: 0 }}>{tip.body}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <div style={{ background: navy, borderRadius: 12, padding: 24, color: '#fff' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: gold, marginBottom: 14 }}>As Declarer</div>
              {['Count your losers at trick one','Draw trumps early (usually)','Use Dummy\'s entries wisely','Establish your long suit','Use finesses when necessary','Plan before playing to trick one'].map(t => (
                <div key={t} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.85)', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>✓ {t}</div>
              ))}
            </div>
            <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: gold, marginBottom: 14 }}>As a Defender</div>
              {["Lead partner's bid suit","Signal your count & attitude","Count Declarer's hand from bids","Return partner's led suit","Cover an honour with an honour","Communicate — don't keep secrets"].map(t => (
                <div key={t} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, padding: '5px 0', borderBottom: `1px solid ${bdr}` }}>✓ {t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SEOSection paras={seoParas} />
      <FAQSection items={faqs} />
    </div>
  );
}
