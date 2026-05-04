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
            <span style={{ color: gold, fontSize: 13, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}>♠ ♥ ♦ ♣ &nbsp; Independent · Pricing Verified May 2026</span>
          </div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 34 : 52, fontWeight: 700, lineHeight: 1.18, margin: '0 0 20px', color: '#fff' }}>
            The Independent <span style={{ color: gold }}>Online Bridge</span> Guide
          </h1>
          <p style={{ fontSize: isMobile ? 17 : 20, lineHeight: 1.75, margin: '0 0 28px', opacity: 0.88, fontFamily: "'Source Sans 3', sans-serif", maxWidth: 560 }}>Platform reviews, convention guides, and ACBL masterpoint information for intermediate and advanced players in the US, UK, Australia and Canada. All platform pricing verified May 2026.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/reviews/"><button style={{ background: gold, color: navy, border: 'none', borderRadius: 10, padding: isMobile ? '14px 24px' : '16px 32px', fontSize: isMobile ? 16 : 18, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>Compare Platforms →</button></Link>
            <Link href="/how-to-play-bridge-online/"><button style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 10, padding: isMobile ? '14px 24px' : '16px 32px', fontSize: isMobile ? 16 : 18, fontWeight: 600, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>New to Bridge?</button></Link>
          </div>
          <div style={{ display: 'flex', gap: isMobile ? 16 : 32, marginTop: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            <div><div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 22 : 28, color: gold, fontWeight: 700 }}>6</div><div style={{ fontSize: 14, opacity: 0.7, fontFamily: "'Source Sans 3', sans-serif" }}>Platforms reviewed</div></div>
            <div><div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 22 : 28, color: gold, fontWeight: 700 }}>May 2026</div><div style={{ fontSize: 14, opacity: 0.7, fontFamily: "'Source Sans 3', sans-serif" }}>Pricing last verified</div></div>
            <div><div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 22 : 28, color: gold, fontWeight: 700 }}>Independent</div><div style={{ fontSize: 14, opacity: 0.7, fontFamily: "'Source Sans 3', sans-serif" }}>No platform deals signed</div></div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: isMobile ? 22 : 32, backdropFilter: 'blur(10px)' }}>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: gold, marginBottom: 16 }}>Where would you like to start?</div>
          {[
            { icon: '🏆', title: 'Compare Platforms', desc: 'BBO, Funbridge, RealBridge — pricing & masterpoints.', href: '/reviews/' },
            { icon: '📚', title: 'Convention Guides', desc: 'Stayman, Jacoby Transfers, Blackwood RKCB.', href: '/bidding-basics/' },
            { icon: '⭐', title: 'Earn Masterpoints', desc: 'ACBL online masterpoints — colors and ranks explained.', href: '/articles/' },
            { icon: '🚢', title: 'Bridge Cruises 2026', desc: 'Larry Cohen, Silversea, river cruises with bridge.', href: '/articles/' },
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
        {['Bridge Base Online', 'Funbridge', 'RealBridge', 'No Fear Bridge', 'Trickster', 'Bridge Baron'].map(p => (
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
    { suit: '♠', suitColor: isDeep ? '#a0b8d8' : '#1a1a2e', title: 'How to Play Bridge', desc: 'A gentle, step-by-step introduction perfect for complete beginners — from the deal to scoring.', href: '/how-to-play-bridge-online/', tag: 'Beginner' },
    { suit: '♥', suitColor: red, title: 'Bidding Basics', desc: 'Master the language of bridge. Learn to communicate with your partner through the auction.', href: '/bidding-basics/', tag: 'Essential' },
    { suit: '♦', suitColor: red, title: 'Card Play Strategy', desc: 'Finessing, hold-up plays and more — techniques that win contracts and defeat opponents.', href: '/card-play-strategy/', tag: 'Intermediate' },
    { suit: '♣', suitColor: isDeep ? '#a0b8d8' : '#1a1a2e', title: 'Rules & Laws', desc: 'All the official rules explained in plain English, with a searchable interactive accordion.', href: '/rules/', tag: 'Reference' },
    { suit: '🃏', suitColor: gold, title: 'Practice Boards', desc: 'Play through real bridge hands with our interactive deal viewer and expert commentary.', href: '/practice-boards/', tag: 'Interactive' },
    { suit: '🏆', suitColor: gold, title: 'Best Online Platforms', desc: 'Honest, independent reviews of the top bridge platforms — compare features and pricing.', href: '/reviews/', tag: 'Reviews' },
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
    { n: '01', title: 'Compare the Platforms', body: 'Start with our independent platform comparison. We rank BBO, Funbridge, RealBridge, No Fear Bridge, Trickster and Bridge Baron by verified pricing, ACBL masterpoint eligibility, bidding system support and audience fit.', cta: 'Compare platforms →', href: '/reviews/' },
    { n: '02', title: 'Pick Based on What You Want', body: 'Live human play and ACBL masterpoints? Use BBO or RealBridge. Solo AI training? Use Funbridge. Structured curriculum? No Fear Bridge. Casual free play? Trickster. Most serious players use two platforms — typically BBO plus one trainer.', cta: 'See full comparison →', href: '/reviews/' },
    { n: '03', title: 'Try Before You Subscribe', body: 'Every major platform offers a free tier or free trial. BBO+ has a 30-day trial. Funbridge Premium has a 1-month trial. RealBridge is free for players. No Fear Bridge has a 2-week trial. Test before committing.', cta: 'Browse reviews →', href: '/reviews/' },
  ];
  return (
    <section style={{ background: bg, padding: isMobile ? '52px 20px' : '72px 24px', borderTop: `1px solid ${bdr}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 52 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Getting Started</div>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 28 : 38, color: headC, margin: '0 0 16px' }}>How to Choose Your Online Bridge Platform</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: isMobile ? 16 : 19, color: textC, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>Three steps. Compare verified data, match the platform to how you actually want to play, and try before you subscribe.</p>
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
    { name: 'Bridge Base Online', badge: 'Best Live Play & Masterpoints', free: true, ai: true, video: false, mobile: true, bf: 'ACBL', rating: 4.5, href: '/reviews/bridge-base-online-bbo-review/' },
    { name: 'Funbridge', badge: 'Best for Solo Improvement', free: 'Limited', ai: true, video: false, mobile: true, bf: 'AI training', rating: 4.3, href: '/reviews/funbridge-review/' },
    { name: 'RealBridge', badge: 'Best Video Bridge — ACBL Sanctioned', free: true, ai: false, video: true, mobile: 'Browser', bf: 'ACBL', rating: 4.4, href: '/reviews/realbridge-review/' },
    { name: 'No Fear Bridge', badge: 'Best Structured Learning', free: 'Trial', ai: true, video: false, mobile: true, bf: 'Curriculum', rating: 4.0, href: '/reviews/' },
    { name: 'Trickster', badge: 'Best Free Casual Play', free: true, ai: true, video: false, mobile: true, bf: 'Free play', rating: 3.8, href: '/reviews/' },
    { name: 'Bridge Baron', badge: 'Best for Offline Analysis', free: false, ai: true, video: false, mobile: true, bf: '130+ conv', rating: 3.5, href: '/reviews/' },
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
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isMobile ? 28 : 38, color: headC, margin: '0 0 16px' }}>The 6 Online Bridge Platforms That Matter in 2026</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: isMobile ? 16 : 19, color: textC, maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>BBO, Funbridge, RealBridge, No Fear Bridge, Trickster and Bridge Baron — pricing verified May 2026, ACBL masterpoint eligibility flagged.</p>
        </div>
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {platforms.map(p => (
              <div key={p.name} style={{ background: tableBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div><div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: headC, marginBottom: 4 }}>{p.name}</div><div style={{ fontSize: 12, background: isDeep ? 'rgba(212,168,67,0.12)' : '#eef2fa', color: isDeep ? gold : navy, borderRadius: 12, padding: '2px 10px', display: 'inline-block', fontWeight: 600 }}>{p.badge}</div></div>
                  <div style={{ display: 'flex', gap: 1 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ color: n <= Math.round(p.rating) ? gold : bdr, fontSize: 14 }}>★</span>)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 14, fontSize: 14, color: textC }}>
                  <div>Free: {tick(p.free)}</div><div>AI: {tick(p.ai)}</div>
                  <div>Video: {tick(p.video)}</div><div>Mobile: {tick(p.mobile)}</div>
                  <div style={{ gridColumn: '1/3' }}>Best for: <span style={{ color: gold }}>{p.bf}</span></div>
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
                  {['Free Play','AI Robots','Video','Mobile','Best For','Rating'].map(h => (
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
                    <td style={{ textAlign: 'center', padding: 16, color: gold, fontSize: 14, fontWeight: 600 }}>{p.bf}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ color: n <= Math.round(p.rating) ? gold : bdr, fontSize: 14 }}>★</span>)}</td>
                    <td style={{ padding: '16px 18px 16px 10px' }}><Link href={p.href}><button style={{ background: 'none', border: `1px solid ${gold}`, color: gold, borderRadius: 6, padding: '6px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Review →</button></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/reviews/"><button style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>Read Full Platform Reviews →</button></Link>
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
    { q: 'What is the best online bridge platform in 2026?', a: 'For most intermediate and advanced players in 2026, Bridge Base Online (BBO) is the default choice — free at its core with BBO+ at $5.99/month, the largest live community, and the home of online ACBL-sanctioned masterpoints. Funbridge ($15.99/month Premium) is the strongest solo AI training platform. RealBridge is the best video-bridge experience and ACBL-sanctioned since 2024. The platform you choose depends on whether you want live human play, solo training, or video-bridge club nights.' },
    { q: 'Which platforms award ACBL masterpoints in 2026?', a: 'Two platforms reliably award ACBL masterpoints in 2026: Bridge Base Online (BBO) and RealBridge (sanctioned since 2024). Both award online masterpoints — a separate ACBL category created in 2020 that counts toward Life Master and other ranks. Funbridge does not award ACBL masterpoints on standard play; the eBridge Cup partnership with BBO is the single exception.' },
    { q: 'How much does BBO cost in 2026?', a: 'The BBO free tier is genuinely complete — full access to live tables, Vugraph kibitz, casual games, and tournament entry (some events require BB$ virtual currency). BBO+ at $5.99 per month adds an ad-free experience, advanced robots, and the digital Bridgerama+ magazine, with a 30-day free trial. Robot tournament entries cost approximately $2 per event. Pricing verified May 2026.' },
    { q: 'Is Funbridge worth the subscription?', a: 'Funbridge Premium at $15.99/month (or $159.99/year — about 17% cheaper) is worth it for any intermediate-to-advanced player who plays more than ~10 deals per week and wants the strongest AI training in online bridge. The Argine engine is the best commercial bridge AI in 2026. Skip it if you primarily play with humans for ACBL masterpoints — use BBO instead.' },
    { q: 'How does Bridge Playbook make money?', a: 'Bridge Playbook earns through affiliate commissions on platform subscriptions and Amazon Associates links to bridge books and equipment. Every link is clearly labelled — affiliate links are disclosed at the link itself and at the page footer. As of May 2026 we have not signed any platform affiliate deals, so all platform links are informational only. We never recommend a platform we wouldn\'t recommend without commission.' },
    { q: 'Are the reviews on Bridge Playbook independent?', a: 'Yes. Every platform pricing figure on this site is verified directly from the platform\'s billing page within the last 30 days, every review is written by a player with verifiable ACBL credentials, and every recommendation is filtered for our actual audience: intermediate-to-advanced players in the US, UK, Australia and Canada. We don\'t publish ranked comparisons of platforms we haven\'t personally used.' },
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
    "Online bridge in 2026 is no longer a smaller sibling of the live game. The American Contract Bridge League (ACBL) reports approximately 128,000 active members, and BBO alone draws an estimated 11.6 million monthly visits — a player base no single live tournament could rival. The question for most players is no longer whether to play online, but which platform to play on, which conventions to add to your card, and how to actually earn the masterpoints that count toward your ACBL rank.",
    "Bridge Playbook is an independent guide to those decisions. We don't run tournaments, sell subscriptions, or take recommendation fees on platforms we haven't personally used. Every review on this site is written by a working player with verifiable ACBL credentials, every pricing figure is verified directly from the platform's billing page within the last 30 days, and every recommendation is filtered for the audience this site exists for: intermediate and advanced players who already know what a Stayman bid is and now want to compare which online environment is worth their subscription.",
    "The six platforms that matter in 2026 are Bridge Base Online (BBO), Funbridge, RealBridge, No Fear Bridge, Trickster, and Bridge Baron. BBO is the default for live human play and online ACBL masterpoints. Funbridge is the strongest solo AI trainer with the Argine engine. RealBridge is video bridge — ACBL-sanctioned since 2024 and the closest online experience to a live club night. No Fear Bridge is the most structured learning environment for intermediate improvers. Trickster is the best free option for casual play with friends. Bridge Baron is the strongest offline analysis tool with 130+ supported conventions.",
    "If you're choosing between platforms, our reviews cover verified pricing, ACBL masterpoint eligibility, bidding system support, mobile experience and the honest pros and cons. If you're shopping conventions to add to your partnership, our convention guides cover Stayman, Jacoby Transfers, Blackwood and Roman Key Card Blackwood (RKCB), Negative Doubles, Michaels, Lebensohl, and the major card-play and defensive techniques.",
    "Bridge Playbook is independent, intermediate-and-advanced focused, US/UK/AU/CA in scope, and quarterly verified. If you've never played a hand of bridge in your life, our How to Play Bridge guide will walk you through it — but everything else on this site assumes you already know the basics.",
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
              {[['Choosing a platform?', 'Compare 6 platforms →', '/reviews/'], ['Earn ACBL masterpoints?', 'BBO and RealBridge →', '/reviews/bridge-base-online-bbo-review/'], ['Solo AI training?', 'Funbridge review →', '/reviews/funbridge-review/'], ['New to bridge?', 'How to Play guide →', '/how-to-play-bridge-online/']].map(([step, action, href]) => (
                <div key={step} style={{ padding: '10px 0', borderBottom: `1px solid ${bdr}`, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15 }}>
                  <div style={{ color: textC, marginBottom: 2 }}>{step}</div>
                  <Link href={href}><div style={{ color: gold, fontWeight: 700, cursor: 'pointer' }}>{action}</div></Link>
                </div>
              ))}
            </div>
            <div style={{ background: navy, borderRadius: 14, padding: 24, color: '#fff' }}>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: gold, marginBottom: 10 }}>✉ Free Weekly Tips</div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, opacity: 0.8, lineHeight: 1.6, marginBottom: 16 }}>Bridge tips, platform pricing updates and convention guides every Tuesday. Independent. Free forever.</p>
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
