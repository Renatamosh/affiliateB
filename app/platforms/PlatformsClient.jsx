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
  { id: 'bbo', name: 'Bridge Base Online (BBO)', rating: 5, badge: 'Most Popular', badgeColor: navy, price: 'Free (premium available)', best: 'Best for: Regular players who want a massive live community', shortDesc: 'The world\'s largest online bridge platform with millions of players and free robot games 24/7.', pros: ['Completely free to play', 'Huge player base — games at all hours', 'Tournaments and Speedball events', 'Excellent robot games for solo practice', 'Mobile app (iOS & Android)'], cons: ['Interface can feel dated to new users', 'Steeper learning curve for beginners'], href: '/platforms/bridge-base-online/' },
  { id: 'funbridge', name: 'Funbridge', rating: 4, badge: 'Best for Beginners', badgeColor: '#27ae60', price: 'Free basic / from £9.99/month', best: 'Best for: New players and solo practice', shortDesc: 'A beautifully designed app with a welcoming interface and excellent AI opponents at multiple levels.', pros: ['Clean, modern interface', 'Outstanding AI opponents', 'Built-in tutorials and learning path', 'Mobile app with great reviews', 'Regular competitive deals to compare scores'], cons: ['Premium features require subscription', 'Smaller live player community than BBO'], href: '/platforms/funbridge/' },
  { id: 'realbridge', name: 'RealBridge', rating: 4, badge: 'Best for Club Feel', badgeColor: '#8e44ad', price: 'From £10/year for clubs', best: 'Best for: Club games, societies and playing with friends', shortDesc: 'Video and audio built in — play with your friends and see each other, just like a real table.', pros: ['Video and audio with all four players', 'Feels genuinely like club bridge', 'Ideal for club and society games', 'Very easy to set up a private game', 'Growing community and regular events'], cons: ['Requires good internet connection', 'Less suitable for solo practice'], href: '/platforms/realbridge/' },
  { id: 'bridgewinners', name: 'Bridge Winners', rating: 4, badge: 'Best Community', badgeColor: gold, price: 'Free', best: 'Best for: Intermediate+ players wanting to improve and discuss', shortDesc: 'More than a platform — a thriving community discussing hands, conventions and strategy.', pros: ['Active expert discussion forums', 'Hand records from top tournaments', 'Deep analysis of interesting deals', 'Free to use'], cons: ['Playing features are limited', 'Better as a learning resource than a playing platform'], href: '/platforms/' },
  { id: 'okbridge', name: 'OK Bridge', rating: 3, badge: 'Classic Option', badgeColor: '#888', price: 'Subscription required', best: 'Best for: Players who prefer a straightforward, traditional experience', shortDesc: 'One of the original online bridge platforms, with a loyal following and a no-fuss interface.', pros: ['Simple, familiar interface', 'Long-established with loyal player base', 'Regular scheduled events'], cons: ['Older interface design', 'Smaller player base than BBO'], href: '/platforms/' },
];

const SEO_PARAS = [
  'Choosing the right online bridge platform is one of the most important decisions any new online player faces — and the choice matters more than most people realise. The major platforms differ significantly in their interface design, community size, quality of AI opponents, pricing model and overall philosophy. The right choice depends entirely on what kind of bridge experience you are looking for.',
  'Bridge Base Online (BBO) is the world\'s largest bridge platform by some margin, with millions of registered users and thousands of live tables running at any hour of the day or night. It is completely free to play at a basic level, which makes it the natural starting point for most new online players. The main drawbacks are a learning curve associated with its somewhat complex interface, and the fact that robot games — while available — are less polished than those on specialist platforms.',
  'Funbridge has carved out a strong niche as the most beginner-friendly platform on the market. Its interface is clean and modern, its AI opponents are widely considered the most realistic available, and its built-in learning path and daily competitive deals provide excellent structure for improving players. The main limitation is its subscription model: the free tier is quite restricted, and meaningful use typically requires the monthly subscription.',
  'RealBridge occupies a completely different space from the other platforms. Rather than focusing on competitive bridge, it prioritises the social experience — building video and audio into every game so you can see and hear your partner and opponents, just as you would at a physical table.',
  'Bridge Winners is primarily a community and analysis platform rather than a playing site. Its forums are unrivalled for the quality of bridge discussion — expert players analyse interesting hands in detail, discuss conventions and bidding theory, and share hand records from major tournaments.',
  'When choosing a platform, we recommend considering three key factors: how you plan to practise (solo against robots, or with live opponents), how important the social element is to you (video play vs text-based), and your budget. All platforms offer a free option or free trial, so we always recommend trying before committing to a subscription.',
];

const FAQS = [
  { q: 'Which platform is completely free?', a: 'Bridge Base Online (BBO) and Bridge Winners are both completely free. Funbridge and RealBridge offer free tiers but restrict features. BBO is the best free option for live play against real opponents; Funbridge\'s free tier is best for robot games.' },
  { q: 'Do I need to create an account to play online?', a: 'Yes — all major platforms require a free account registration. This takes less than two minutes on any platform. You will need an email address and a username. You do not need to provide payment details to create a free account.' },
  { q: 'Can I play on a tablet rather than a computer?', a: 'Yes — all major platforms are accessible on tablets. Funbridge and BBO have dedicated iOS and Android apps. RealBridge works through a web browser on tablets. We recommend tablets over smartphones for bridge, as the larger screen makes the cards and bidding box much easier to see.' },
  { q: 'Is there a platform specifically designed for older players?', a: 'While no platform specifically targets older players, Funbridge is generally considered the most accessible for those less familiar with technology, due to its clean interface and excellent onboarding. RealBridge is popular with older club players because the video element makes it feel most like real bridge.' },
  { q: 'Can I play with my regular bridge partner online?', a: 'Yes — all platforms allow you to play with a specific partner. On BBO, you can invite a partner to a private table. On Funbridge, you can set up a private game. RealBridge is specifically designed for playing with known players, making it the easiest option for regular partner games.' },
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
      <PageHeader title="Best Online Bridge Platforms" subtitle="Honest Independent Reviews · Updated 2026" suit="♠" />
      <div style={{ background: bg, padding: '48px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ background: '#fff8e6', border: '1px solid #e8c56a', borderRadius: 10, padding: '14px 20px', marginBottom: 32, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: '#7a5a00' }}>
            <strong>Disclosure:</strong> Some links on this page are affiliate links. We may earn a small commission if you sign up through them. This never affects our ratings.
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
