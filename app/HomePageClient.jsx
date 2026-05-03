'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';

const gold = '#d4a843';
const navy = '#1c2f5e';
const red = '#c0392b';

function useMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth < bp); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, [bp]);
  return m;
}

function HeroSection() {
  const { theme } = useTheme();
  const isMobile = useMobile();
  const isDeep = theme === 'deep';
  const heroBg = isDeep ? 'linear-gradient(135deg, #060d1a 0%, #0f1d3a 55%, #0d2318 100%)' : 'linear-gradient(135deg, #1c2f5e 0%, #2d4a7a 60%, #1a3040 100%)';
  return (
    <section style={{ background: heroBg, color: '#fff', padding: isMobile ? '48px 20px 44px' : '80px 24px 72px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -20, top: -20, fontSize: isMobile ? 140 : 320, opacity: 0.04, userSelect: 'none', lineHeight: 1 }}>♠</div>
      <div style={{ position: 'absolute', left: -40, bottom: -40, fontSize: isMobile ? 110 : 260, opacity: 0.04, userSelect: 'none', lineHeight: 1, color: red }}>♥</div>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 420px', gap: isMobile ? 32 : 48, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', gap: 8, background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.4)', borderRadius: 24, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: gold, fontSize: 13, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}>♠ ♥ ♦ ♣ &nbsp; Independent · Trusted · Free</span>
          </div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 34 : 52, fontWeight: 700, lineHeight: 1.18, margin: '0 0 20px', color: '#fff' }}>
            Your Guide to <span style={{ color: gold }}>Online Bridge</span>
          </h1>
          <p style={{ fontSize: isMobile ? 17 : 20, lineHeight: 1.75, margin: '0 0 28px', opacity: 0.88, fontFamily: "'Source Sans 3', sans-serif", maxWidth: 560 }}>Whether you're new to bridge or a seasoned player, Bridge Playbook helps you learn the game, practise your skills, and find the best online platforms to play with friends worldwide.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/how-to-play/"><button style={{ background: gold, color: navy, border: 'none', borderRadius: 10, padding: isMobile ? '14px 24px' : '16px 32px', fontSize: isMobile ? 16 : 18, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>Start Learning →</button></Link>
            <Link href="/platforms/"><button style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 10, padding: isMobile ? '14px 24px' : '16px 32px', fontSize: isMobile ? 16 : 18, fontWeight: 600, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>Find a Platform</button></Link>
          </div>
          <div style={{ display: 'flex', gap: isMobile ? 24 : 40, marginTop: 32, flexWrap: 'wrap' }}>
            {[['50,000+','Players helped'],['12','Top platforms reviewed'],['200+','Practice deals']].map(([n, l]) => (
              <div key={l}><div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 26 : 32, color: gold, fontWeight: 700 }}>{n}</div><div style={{ fontSize: 14, opacity: 0.7, fontFamily: "'Source Sans 3', sans-serif" }}>{l}</div></div>
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: isMobile ? 22 : 32, backdropFilter: 'blur(10px)' }}>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: gold, marginBottom: 16 }}>Where would you like to start?</div>
          {[
            { icon: '🎓', title: 'Complete Beginner', desc: 'Never played bridge? Start here — step by step.', href: '/how-to-play/' },
            { icon: '📖', title: 'Learn the Rules', desc: 'Bidding, scoring, laws — all explained simply.', href: '/rules/' },
            { icon: '🃏', title: 'Practice a Hand', desc: 'Try a real bridge deal right now.', href: '/practice-boards/' },
            { icon: '💻', title: 'Explore Platforms', desc: 'Find the best site to play online.', href: '/platforms/' },
          ].map(item => (
            <Link key={item.href} href={item.href}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div><div style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, color: '#fff', fontSize: 16 }}>{item.title}</div><div style={{ fontSize: 13, opacity: 0.65, fontFamily: "'Source Sans 3', sans-serif", marginTop: 2 }}>{item.desc}</div></div>
                <span style={{ marginLeft: 'auto', opacity: 0.4, alignSelf: 'center', fontSize: 20 }}>›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : '#f5f3ee';
  const textC = isDeep ? 'rgba(255,255,255,0.45)' : '#888';
  const chipBg = isDeep ? '#0f1d3a' : '#fff';
  const chipBorder = isDeep ? '#1a2e50' : '#ddd';
  const chipText = isDeep ? '#a0b8d8' : '#555';
  return (
    <div style={{ background: bg, borderBottom: `1px solid ${isDeep ? '#1a2e50' : '#e0d8cc'}`, padding: '14px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: textC, fontFamily: "'Source Sans 3', sans-serif", marginRight: 4, flexShrink: 0 }}>Platforms reviewed:</span>
        {['Bridge Base Online', 'Funbridge', 'RealBridge', 'Bridge Winners', 'OK Bridge'].map(p => (
          <span key={p} style={{ fontSize: 14, color: chipText, background: chipBg, border: `1px solid ${chipBorder}`, borderRadius: 20, padding: '4px 16px', fontFamily: "'Source Sans 3', sans-serif" }}>{p}</span>
        ))}
      </div>
    </div>
  );
}

function ContentSection() {
  const { theme } = useTheme();
  const isMobile = useMobile();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.7)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const cards = [
    { suit: '♠', suitColor: isDeep ? '#a0b8d8' : '#1a1a2e', title: 'How to Play Bridge', desc: 'A gentle, step-by-step introduction perfect for complete beginners — from the deal to scoring.', href: '/how-to-play/', tag: 'Beginner' },
    { suit: '♥', suitColor: red, title: 'Bidding Basics', desc: 'Master the language of bridge. Learn to communicate with your partner through the auction.', href: '/bidding-basics/', tag: 'Essential' },
    { suit: '♦', suitColor: red, title: 'Card Play Strategy', desc: 'Finessing, hold-up plays and more — techniques that win contracts and defeat opponents.', href: '/card-play-strategy/', tag: 'Intermediate' },
    { suit: '♣', suitColor: isDeep ? '#a0b8d8' : '#1a1a2e', title: 'Rules & Laws', desc: 'All the official rules explained in plain English, with a searchable interactive accordion.', href: '/rules/', tag: 'Reference' },
    { suit: '🃏', suitColor: gold, title: 'Practice Boards', desc: 'Play through real bridge hands with our interactive deal viewer and expert commentary.', href: '/practice-boards/', tag: 'Interactive' },
    { suit: '🏆', suitColor: gold, title: 'Best Online Platforms', desc: 'Honest, independent reviews of the top bridge platforms — compare features and pricing.', href: '/platforms/', tag: 'Reviews' },
  ];
  return (
    <section style={{ background: bg, padding: isMobile ? '52px 20px' : '72px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 56 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Everything You Need</div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 28 : 38, color: headC, margin: '0 0 16px' }}>Learn, Practise & Play</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: isMobile ? 16 : 19, color: textC, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>From your very first hand to confident online play — we've got you covered at every step.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {cards.map(card => (
            <Link key={card.href} href={card.href}>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: 28, cursor: 'pointer', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <span style={{ fontSize: 36, color: card.suitColor }}>{card.suit}</span>
                  <span style={{ fontSize: 12, background: isDeep ? 'rgba(212,168,67,0.15)' : '#eef2fa', color: isDeep ? gold : navy, borderRadius: 20, padding: '3px 12px', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>{card.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: headC, margin: '0 0 10px' }}>{card.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.65, margin: '0 0 20px' }}>{card.desc}</p>
                <div style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 15 }}>Learn more →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyBridgeSection() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#060d1a' : theme === 'bright' ? '#f8f6f2' : '#ede8de';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const benefits = [
    { icon: '🧠', title: 'Keeps Your Mind Sharp', body: 'Research consistently shows that bridge exercises memory, logical reasoning, pattern recognition and forward planning simultaneously — all in one enjoyable session.' },
    { icon: '🤝', title: 'A True Partnership Game', body: 'Bridge is fundamentally about teamwork. You and your partner communicate strategy through your bids, building a shared understanding that grows over time.' },
    { icon: '🌍', title: 'Play Anytime, Anywhere', body: 'Online bridge means no scheduling, no travel, no finding four people in the same room. Log on whenever you like and find a game within seconds.' },
    { icon: '📈', title: 'Always Something New to Learn', body: 'Bridge rewards players at every level. Whether you\'ve played for three months or thirty years, there are always new techniques, conventions and situations to discover.' },
    { icon: '♟️', title: 'Strategy Over Speed', body: 'Unlike many card games, bridge rewards careful thought, experience and patience over quick reflexes. It\'s a game that genuinely gets better with age.' },
    { icon: '💛', title: 'Over 60 Million Players', body: 'Bridge is one of the world\'s most popular card games, with active communities in every country. You\'re joining a global family of enthusiasts.' },
  ];
  return (
    <section style={{ background: bg, padding: '72px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Why Bridge?</div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 38, color: headC, margin: '0 0 16px' }}>Six Reasons to Love Bridge</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 19, color: textC, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>Bridge is uniquely rewarding — here's why millions of players, many of them over 60, consider it the perfect game.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '28px 26px', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, flexShrink: 0, lineHeight: 1 }}>{b.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 19, color: headC, margin: '0 0 8px' }}>{b.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.7, margin: 0 }}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { theme } = useTheme();
  const isMobile = useMobile();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const stepBg = isDeep ? '#0f1d3a' : '#f5f3ee';
  const steps = [
    { n: '01', title: 'Read Our Beginner Guide', body: 'Start with our step-by-step "How to Play Bridge" guide. Written in plain English with no jargon, it takes you from the very first deal to playing a complete hand.', cta: 'Start the guide →', href: '/how-to-play/' },
    { n: '02', title: 'Choose Your Platform', body: 'Browse our honest, independent reviews of the top online bridge platforms. We\'ll help you find the right fit — whether you want free play, polished design or video with friends.', cta: 'See reviews →', href: '/platforms/' },
    { n: '03', title: 'Start Playing Today', body: 'Create a free account on your chosen platform and start playing immediately. Every platform offers solo games against AI opponents — perfect for learning at your own pace.', cta: 'Browse platforms →', href: '/platforms/' },
  ];
  return (
    <section style={{ background: bg, padding: isMobile ? '52px 20px' : '72px 24px', borderTop: `1px solid ${bdr}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 52 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Getting Started</div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 28 : 38, color: headC, margin: '0 0 16px' }}>Playing Bridge Online in 3 Simple Steps</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: isMobile ? 16 : 19, color: textC, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>From complete beginner to playing your first online hand — it's easier than you think.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 16 : 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: stepBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: isMobile ? '24px 22px' : 32, position: 'relative' }}>
              {!isMobile && i < 2 && <div style={{ position: 'absolute', top: '50%', right: -13, transform: 'translateY(-50%)', fontSize: 22, color: gold, zIndex: 2 }}>→</div>}
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 40, color: gold, opacity: 0.25, lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 19 : 22, color: headC, margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.75, margin: '0 0 16px' }}>{s.body}</p>
              <Link href={s.href}><span style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>{s.cta}</span></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformComparisonSection() {
  const { theme } = useTheme();
  const isMobile = useMobile();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#060d1a' : '#f5f3ee';
  const tableBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const rowAlt = isDeep ? 'rgba(255,255,255,0.025)' : '#faf8f5';
  const platforms = [
    { name: 'Bridge Base Online', badge: 'Most Popular', free: true, ai: true, video: false, mobile: true, bf: '★★★', rating: 5, href: '/platforms/bridge-base-online/' },
    { name: 'Funbridge', badge: 'Best for Beginners', free: 'Trial', ai: true, video: false, mobile: true, bf: '★★★★★', rating: 4, href: '/platforms/funbridge/' },
    { name: 'RealBridge', badge: 'Best Club Feel', free: 'Trial', ai: false, video: true, mobile: 'Browser', bf: '★★★★', rating: 4, href: '/platforms/realbridge/' },
    { name: 'Bridge Winners', badge: 'Community Hub', free: true, ai: false, video: false, mobile: true, bf: '★★★', rating: 4, href: '/platforms/' },
    { name: 'OK Bridge', badge: 'Classic', free: false, ai: true, video: false, mobile: 'Limited', bf: '★★★', rating: 3, href: '/platforms/' },
  ];
  const tick = (v) => {
    if (v === true) return <span style={{ color: '#27ae60', fontSize: 18 }}>✓</span>;
    if (v === false) return <span style={{ color: red, fontSize: 16 }}>✗</span>;
    return <span style={{ color: gold, fontSize: 14, fontWeight: 600 }}>{v}</span>;
  };
  return (
    <section style={{ background: bg, padding: isMobile ? '52px 20px' : '72px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Platform Comparison</div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 28 : 38, color: headC, margin: '0 0 16px' }}>Which Platform Is Right for You?</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: isMobile ? 16 : 19, color: textC, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>A quick side-by-side comparison of the five major online bridge platforms.</p>
        </div>
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {platforms.map(p => (
              <div key={p.name} style={{ background: tableBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div><div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: headC, marginBottom: 4 }}>{p.name}</div><div style={{ fontSize: 12, background: isDeep ? 'rgba(212,168,67,0.12)' : '#eef2fa', color: isDeep ? gold : navy, borderRadius: 12, padding: '2px 10px', display: 'inline-block', fontWeight: 600 }}>{p.badge}</div></div>
                  <div style={{ display: 'flex', gap: 1 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ color: n <= p.rating ? gold : bdr, fontSize: 14 }}>★</span>)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 14, fontSize: 14, color: textC }}>
                  <div>Free: {tick(p.free)}</div><div>AI: {tick(p.ai)}</div>
                  <div>Video: {tick(p.video)}</div><div>Mobile: {tick(p.mobile)}</div>
                  <div style={{ gridColumn: '1/3' }}>Beginner: <span style={{ color: gold }}>{p.bf}</span></div>
                </div>
                <Link href={p.href}><button style={{ width: '100%', background: 'none', border: `1px solid ${gold}`, color: gold, borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Read Full Review →</button></Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: tableBg, border: `1px solid ${bdr}`, borderRadius: 14, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, fontFamily: "'Source Sans 3', sans-serif" }}>
              <thead>
                <tr style={{ background: navy }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: gold, fontWeight: 700, fontSize: 13, letterSpacing: '0.06em' }}>Platform</th>
                  {['Free Play','AI Robots','Video','Mobile','Beginner Friendly','Rating'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 13 }}>{h}</th>
                  ))}
                  <th style={{ padding: '14px 16px' }}></th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p, i) => (
                  <tr key={p.name} style={{ borderBottom: `1px solid ${bdr}`, background: i % 2 === 1 ? rowAlt : 'none' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: headC, marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 12, background: isDeep ? 'rgba(212,168,67,0.12)' : '#eef2fa', color: isDeep ? gold : navy, borderRadius: 12, padding: '2px 10px', display: 'inline-block', fontWeight: 600 }}>{p.badge}</div>
                    </td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{tick(p.free)}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{tick(p.ai)}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{tick(p.video)}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{tick(p.mobile)}</td>
                    <td style={{ textAlign: 'center', padding: 16, color: gold, fontSize: 16 }}>{p.bf}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ color: n <= p.rating ? gold : bdr, fontSize: 14 }}>★</span>)}</td>
                    <td style={{ padding: '16px 18px 16px 10px' }}><Link href={p.href}><button style={{ background: 'none', border: `1px solid ${gold}`, color: gold, borderRadius: 6, padding: '6px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Review →</button></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/platforms/"><button style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>Read Full Platform Reviews →</button></Link>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0d1e38' : '#1c2f5e';
  return (
    <section style={{ background: bg, padding: '72px 24px', color: '#fff' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✉️</div>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 34, margin: '0 0 16px', color: '#fff' }}>Free Weekly Bridge Tips</h2>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, lineHeight: 1.75, opacity: 0.85, margin: '0 0 32px' }}>Get a practice hand, a bidding tip, and the latest online bridge news delivered to your inbox every Tuesday. Completely free — unsubscribe anytime.</p>
        {sent ? (
          <div style={{ background: 'rgba(212,168,67,0.2)', border: '2px solid #d4a843', borderRadius: 12, padding: '20px 32px', color: gold, fontSize: 18, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>✓ Thank you! Your first issue arrives Tuesday.</div>
        ) : (
          <div style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
            <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && email && setSent(true)}
              style={{ flex: 1, minWidth: 200, padding: '15px 20px', borderRadius: 8, border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", outline: 'none' }} />
            <button onClick={() => email && setSent(true)} style={{ background: gold, color: navy, border: 'none', borderRadius: 8, padding: '15px 28px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", whiteSpace: 'nowrap' }}>Subscribe Free</button>
          </div>
        )}
        <p style={{ fontSize: 13, opacity: 0.45, marginTop: 16, fontFamily: "'Source Sans 3', sans-serif" }}>No spam. No card tricks. Just great bridge content.</p>
      </div>
    </section>
  );
}

function HomeFAQSection() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0d1828' : theme === 'bright' ? '#f8f6f2' : '#f5f3ee';
  const cardBg = isDeep ? '#132035' : '#fff';
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const headC = isDeep ? '#fff' : navy;
  const border = isDeep ? '#1e3255' : '#e5e0d8';
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'What is Bridge Playbook and who is it for?', a: 'Bridge Playbook is an independent guide to online bridge. We review the major online bridge platforms, explain the rules and strategy, and host a community for players of all levels. We are particularly focused on helping players over 60 who are new to online bridge or returning after a break.' },
    { q: 'Do I need to pay to use Bridge Playbook?', a: 'No — everything on Bridge Playbook is completely free. Our guides, reviews, quizzes, glossary and community forum are all free to read and use. We earn a small affiliate commission when readers sign up to certain platforms through our links, but this never affects our editorial independence or ratings.' },
    { q: 'Which online bridge platform do you recommend for a complete beginner?', a: 'For complete beginners, we most often recommend Funbridge for its clean design, excellent AI opponents and built-in learning path. Bridge Base Online (BBO) is our top pick for free play and for finding live opponents quickly. For players who want the social feel of a real club, RealBridge (with video) is outstanding.' },
    { q: 'Can I play bridge online without any prior experience?', a: 'Absolutely. All major platforms offer games against robot (AI) opponents, which are ideal for beginners. You can take your time, make mistakes without pressure, and learn the game at your own pace. We recommend reading our "How to Play Bridge" guide before you start, then jumping straight into robot games.' },
    { q: 'Is online bridge suitable for older players?', a: 'Yes — online bridge has become increasingly accessible, and many of our most enthusiastic readers are in their 60s, 70s and beyond. Platforms like Funbridge and RealBridge are particularly well-designed for ease of use. We recommend starting on a tablet (larger screen, larger touch targets) rather than a smartphone.' },
    { q: 'How do I get started — what should I do first?', a: 'Step one: read our "How to Play Bridge" beginner guide. Step two: browse our Platform Reviews to find the site that suits you best. Step three: create a free account and play a few robot games. Step four: join our forum and introduce yourself — the community will be glad to help!' },
  ];
  return (
    <section style={{ background: bg, padding: '72px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: gold, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Got Questions?</div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 36, color: headC, margin: '0 0 12px' }}>Frequently Asked Questions</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC }}>Everything you need to know about Bridge Playbook and online bridge.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ background: cardBg, border: `1px solid ${isOpen ? gold : border}`, borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, fontWeight: 600, color: headC, paddingRight: 16, lineHeight: 1.4 }}>{item.q}</span>
                  <span style={{ color: gold, fontSize: 24, flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none', display: 'block' }}>+</span>
                </button>
                {isOpen && <div style={{ padding: '0 24px 22px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.8 }}>{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePageClient() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const seoParagraphs = [
    "Bridge has endured for over a century as one of the world's most beloved card games — and with good reason. No other game combines strategic depth, memory, logic and the remarkable challenge of communicating with a partner without revealing your hand.",
    "The move to online bridge has been transformative, particularly for players over 60. Today, you can open your laptop, tablet or smartphone, and within seconds find a game on one of several major platforms — playing against real opponents from across the globe or practising solo against sophisticated artificial intelligence.",
    "Choosing the right online platform is one of the first and most important decisions any new online player faces. The major options — Bridge Base Online (BBO), Funbridge, RealBridge, Bridge Winners and OK Bridge — each have distinct strengths and weaknesses.",
    "At Bridge Playbook, our purpose is to make those choices easier. We are an independent website — not affiliated with any single platform — and every review we publish reflects genuine, unsponsored experience with the product.",
    "Beyond platform reviews, Bridge Playbook offers comprehensive guides to bridge rules and strategy, written in plain English for players of all levels. Our beginner section assumes no prior knowledge and takes you from the very first deal through to understanding the auction, planning a contract and keeping score.",
  ];

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      <HeroSection />
      <TrustBar />
      <ContentSection />
      <WhyBridgeSection />
      <HowItWorksSection />
      <PlatformComparisonSection />

      {/* SEO section */}
      <section style={{ background: isDeep ? '#0a1220' : theme === 'bright' ? '#fff' : '#f5f3ee', padding: '72px 24px', borderTop: `1px solid ${bdr}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56 }}>
          <div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: gold, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>About Bridge Playbook</div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 36, color: headC, margin: '0 0 32px', lineHeight: 1.2 }}>Your Trusted Guide to Online Bridge</h2>
            {seoParagraphs.map((p, i) => <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.85, marginBottom: 22 }}>{p}</p>)}
          </div>
          <div style={{ paddingTop: 8 }}>
            <div style={{ background: isDeep ? '#111f35' : '#f8f6f2', border: `1px solid ${bdr}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: gold, marginBottom: 16 }}>Quick Start Guide</div>
              {[['Complete beginner?', 'Start with How to Play →', '/how-to-play/'], ['Know the rules?', 'Browse Platform Reviews →', '/platforms/'], ['Looking for community?', 'Join our Forum →', '/community/'], ['Want to improve?', 'Read Strategy Guides →', '/bidding-basics/']].map(([step, action, href]) => (
                <div key={step} style={{ padding: '10px 0', borderBottom: `1px solid ${bdr}`, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15 }}>
                  <div style={{ color: textC, marginBottom: 2 }}>{step}</div>
                  <Link href={href}><div style={{ color: gold, fontWeight: 700, cursor: 'pointer' }}>{action}</div></Link>
                </div>
              ))}
            </div>
            <div style={{ background: navy, borderRadius: 14, padding: 24, color: '#fff' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: gold, marginBottom: 10 }}>✉ Free Weekly Tips</div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, opacity: 0.8, lineHeight: 1.6, marginBottom: 16 }}>Join 12,000+ players. Bridge tips, platform news and practice hands every Tuesday. Free forever.</p>
              <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 15, boxSizing: 'border-box', marginBottom: 10 }} />
              <button style={{ width: '100%', background: gold, color: navy, border: 'none', borderRadius: 8, padding: '12px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>Subscribe Free</button>
            </div>
          </div>
        </div>
      </section>

      <HomeFAQSection />
      <NewsletterSection />
    </div>
  );
}
