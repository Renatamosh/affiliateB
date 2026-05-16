'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';

const gold = '#d4a843';
const navy = '#1c2f5e';
const red = '#c0392b';


function HeroSection({ heading, subheading, cta1Text, cta1Url, cta2Text, cta2Url, trustPill1, trustPill2, trustPill3, quickStartLinks, heroImage }) {
  const pill1 = trustPill1 || '✦ Independent Reviews & Comparisons';
  const pill2 = trustPill2 || '✦ Pricing Verified May 2026';
  const pill3 = trustPill3 || '✦ Beginner-Friendly Recommendations';
  const h1Text = heading || 'Learn, Play & Improve at Bridge';
  const subText = subheading || 'Beginner-friendly bridge lessons, bidding guides, strategy resources, conventions explained in plain English, and honest online bridge platform comparisons — all in one independent resource.';
  const btn1 = cta1Text || 'Start Learning Bridge →';
  const url1 = cta1Url || '/guides/how-to-play-bridge/';
  const btn2 = cta2Text || 'Compare Platforms →';
  const url2 = cta2Url || '/reviews/';
  const imgSrc = heroImage || '/images/hero-bridge.jpg';

  const defaultLinks = [
    { icon: '🎓', title: 'New to Bridge?', desc: 'Start with the basics — your first hand in 10 minutes.', href: '/guides/how-to-play-bridge/' },
    { icon: '📈', title: 'Improve Your Game', desc: 'Bidding systems, strategy, and conventions explained.', href: '/strategy/' },
    { icon: '🖥️', title: 'Find Your Platform', desc: 'Compare BBO, Funbridge, RealBridge and more.', href: '/reviews/' },
    { icon: '🔧', title: 'Bridge Tools', desc: 'Cheat sheets, quizzes, and practice resources — free.', href: '/tools/' },
  ];
  const sidebarLinks = (quickStartLinks && quickStartLinks.length > 0) ? quickStartLinks : defaultLinks;

  return (
    <section
      className="bp-hero"
      style={{ backgroundImage: `linear-gradient(to right, rgba(6,13,26,0.93) 0%, rgba(6,13,26,0.78) 50%, rgba(6,13,26,0.5) 100%), url('${imgSrc}')` }}
    >
      <div className="bp-hero-inner">
        <div className="bp-hero-grid">
          <div>
            <div className="bp-trust-pills">
              {[pill1, pill2, pill3].map((pill, i) => (
                <span key={i} style={{ background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.4)', borderRadius: 24, padding: '5px 14px', color: gold, fontSize: 13, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}>{pill}</span>
              ))}
            </div>
            <h1 className="bp-h1">{h1Text}</h1>
            <p className="bp-hero-sub">{subText}</p>
            <div className="bp-cta-row">
              <Link href={url1}><button className="bp-btn-gold">{btn1}</button></Link>
              <Link href={url2}><button className="bp-btn-ghost">{btn2}</button></Link>
            </div>
          </div>
          <div className="bp-hero-sidebar">
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: gold, marginBottom: 16 }}>Where would you like to start?</div>
            {sidebarLinks.map((item, i) => (
              <Link key={i} href={item.href}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: i < sidebarLinks.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, color: '#fff', fontSize: 16 }}>{item.title}</div>
                    <div style={{ fontSize: 13, opacity: 0.65, fontFamily: "'Source Sans 3', sans-serif", marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', opacity: 0.4, alignSelf: 'center', fontSize: 20 }}>›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningPathwaySection({ title, subtitle, steps }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.7)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const sectionTitle = title || 'A Structured Path From First Hand to Confident Play';
  const sectionSubtitle = subtitle || "BridgePlaybook is built around a clear learning progression — wherever you're starting, there's a next step.";

  const defaultSteps = [
    { number: '01', level: 'Beginner', title: 'Learn the Game', desc: 'Deals, tricks, scoring, and the basics of auction bidding — everything you need to play your first hand.', cta: 'Start Here →', href: '/guides/how-to-play-bridge/' },
    { number: '02', level: 'Foundation', title: 'Master Bidding', desc: 'Learn to communicate with your partner through the auction — point counts, suit priorities, and opening bids.', cta: 'Learn Bidding →', href: '/strategy/bidding-basics/' },
    { number: '03', level: 'Intermediate', title: 'Add Conventions', desc: 'Stayman, Jacoby Transfers, Blackwood — the conventions that unlock serious partnership bridge.', cta: 'Explore Conventions →', href: '/guides/bridge-conventions/' },
    { number: '04', level: 'Intermediate', title: 'Improve Strategy', desc: 'Card play technique, defensive strategy, declarer planning — the techniques that win contracts.', cta: 'Improve →', href: '/strategy/' },
    { number: '05', level: 'Advanced', title: 'Play Online', desc: 'Choose the right platform, earn ACBL masterpoints, and play live bridge from wherever you are.', cta: 'Find a Platform →', href: '/reviews/' },
  ];

  const stepsData = (steps && steps.length > 0) ? steps : defaultSteps;

  const levelColor = (level) => {
    if (level === 'Beginner') return { bg: 'rgba(39,174,96,0.18)', color: '#27ae60' };
    if (level === 'Advanced') return { bg: 'rgba(155,89,182,0.18)', color: '#9b59b6' };
    return { bg: 'rgba(52,152,219,0.18)', color: '#3498db' };
  };

  return (
    <section className="bp-section" style={{ background: bg }}>
      <div className="bp-inner">
        <div className="bp-section-head">
          <div className="bp-label">Your Bridge Journey</div>
          <h2 className="bp-h2" style={{ color: headC }}>{sectionTitle}</h2>
          <p className="bp-sub" style={{ color: textC }}>{sectionSubtitle}</p>
        </div>
        <div className="bp-grid-pathway">
          {stepsData.map((step, i) => {
            const lc = levelColor(step.level);
            return (
              <div key={i} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 36, color: gold, opacity: 0.25, lineHeight: 1, marginBottom: 10 }}>{step.number || `0${i + 1}`}</div>
                <div style={{ display: 'inline-flex', background: lc.bg, borderRadius: 20, padding: '3px 12px', marginBottom: 12, alignSelf: 'flex-start' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: lc.color, fontFamily: "'Source Sans 3', sans-serif" }}>{step.level}</span>
                </div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, margin: '0 0 10px' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, lineHeight: 1.65, margin: '0 0 16px', flex: 1 }}>{step.desc}</p>
                <Link href={step.href || '#'}><span style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 14 }}>{step.cta || 'Learn more →'}</span></Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RoutingCardsSection({ title, subtitle, cards }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#060d1a' : '#fff';
  const cardBg = isDeep ? '#0f1d3a' : '#f8f6f2';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.7)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const sectionTitle = title || 'Four Paths Into Bridge';
  const sectionSubtitle = subtitle || 'Pick the path that matches where you are right now.';

  const defaultCards = [
    { icon: '🎓', tag: 'Beginner', title: 'New to Bridge', desc: 'Complete guide from your first deal to your first online game — no experience needed.', cta: 'Start Here →', href: '/guides/how-to-play-bridge/' },
    { icon: '📈', tag: 'Intermediate', title: 'Improve Your Game', desc: 'Bidding systems, card play strategy, and conventions — all in plain English.', cta: 'Level Up →', href: '/strategy/' },
    { icon: '🖥️', tag: 'Play Online', title: 'Find Your Platform', desc: 'Compare BBO, Funbridge, RealBridge and more — independent reviews, verified pricing.', cta: 'Compare Platforms →', href: '/reviews/' },
    { icon: '🔧', tag: 'Tools & Resources', title: 'Bridge Tools', desc: 'Cheat sheets, convention cards, quizzes, practice hands — free downloadable resources.', cta: 'Get Tools →', href: '/tools/' },
  ];
  const cardsData = (cards && cards.length > 0) ? cards : defaultCards;

  return (
    <section className="bp-section" style={{ background: bg }}>
      <div className="bp-inner">
        <div className="bp-section-head">
          <div className="bp-label">Where Would You Like to Start?</div>
          <h2 className="bp-h2" style={{ color: headC }}>{sectionTitle}</h2>
          <p className="bp-sub" style={{ color: textC }}>{sectionSubtitle}</p>
        </div>
        <div className="bp-grid-4">
          {cardsData.map((card, i) => (
            <Link key={i} href={card.href || '#'}>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: '28px 24px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: gold, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Source Sans 3', sans-serif", marginBottom: 8 }}>{card.tag}</div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: headC, margin: '0 0 10px' }}>{card.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, lineHeight: 1.65, margin: '0 0 18px', flex: 1 }}>{card.desc}</p>
                <div style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 14 }}>{card.cta || 'Learn more →'}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyBridgeSection({ title, subtitle, cards: cmsCards }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const sectionTitle = title || 'Why Millions Are Playing Bridge Right Now';
  const sectionSubtitle = subtitle || "Bridge is uniquely rewarding — here's why players of all ages, many discovering it later in life, consider it the perfect game.";

  const defaultBenefits = [
    { icon: '🧠', title: 'Keeps Your Mind Sharp', body: 'Bridge exercises memory, logical reasoning, pattern recognition and forward planning — all in one session.' },
    { icon: '🤝', title: 'A True Partnership Game', body: 'You and your partner communicate through bids, building shared understanding that deepens over time.' },
    { icon: '🌍', title: 'Play Anytime, Anywhere', body: 'Online bridge means no scheduling, no travel. Log on and find a game within seconds.' },
    { icon: '📈', title: 'Always Something New', body: "Bridge rewards players at every level — whether you've played 3 months or 30 years." },
    { icon: '♟️', title: 'Strategy Over Speed', body: 'Bridge rewards careful thought and patience over reflexes. A game that genuinely improves with age.' },
    { icon: '💛', title: '60 Million Players', body: "One of the world's most popular card games, with active communities in every country." },
  ];
  const benefits = (cmsCards && cmsCards.length > 0) ? cmsCards : defaultBenefits;

  return (
    <section className="bp-section" style={{ background: bg }}>
      <div className="bp-inner">
        <div className="bp-section-head">
          <div className="bp-label">Why Bridge?</div>
          <h2 className="bp-h2" style={{ color: headC }}>{sectionTitle}</h2>
          <p className="bp-sub" style={{ color: textC }}>{sectionSubtitle}</p>
        </div>
        <div className="bp-grid-3">
          {benefits.map((b, i) => (
            <div key={i} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '26px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 30, flexShrink: 0, lineHeight: 1 }}>{b.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, margin: '0 0 8px' }}>{b.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.7, margin: 0 }}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConventionsSection({ title, subtitle, cards }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#060d1a' : '#fff';
  const cardBg = isDeep ? '#0f1d3a' : '#f8f6f2';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.7)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const sectionTitle = title || 'Master the Building Blocks of Better Bridge';
  const sectionSubtitle = subtitle || 'From essential conventions to advanced card play — written for players at every level, in plain English.';

  const levelBadge = (level) => {
    if (level === 'Essential') return { bg: 'rgba(39,174,96,0.18)', color: '#27ae60' };
    if (level === 'Advanced') return { bg: 'rgba(155,89,182,0.18)', color: '#9b59b6' };
    return { bg: 'rgba(52,152,219,0.18)', color: '#3498db' };
  };

  const defaultCards = [
    { suit: '♠', title: 'Stayman Convention', desc: 'Find a 4-4 major fit after partner opens 1NT. The most-used convention in bridge.', level: 'Essential', href: '/guides/stayman-convention/' },
    { suit: '♥', title: 'Jacoby Transfers', desc: 'Transfer the contract to opener after 1NT — keeps the strong hand concealed from opponents.', level: 'Essential', href: '/guides/jacoby-transfers/' },
    { suit: '♦', title: 'Blackwood & RKCB', desc: 'Investigate aces and key cards before bidding slam. Roman Key Card is the modern standard.', level: 'Intermediate', href: '/guides/blackwood-rkcb/' },
    { suit: '♣', title: 'Negative Doubles', desc: "Respond to an overcall with a double to show unbid majors — the modern competitive standard.", level: 'Intermediate', href: '/guides/negative-doubles/' },
    { suit: '♥', title: 'Michaels Cuebid', desc: "Show a two-suited hand with a cuebid over opponent's opening bid — powerful in competition.", level: 'Intermediate', href: '/guides/michaels-cuebid/' },
    { suit: '♠', title: 'Finesse Technique', desc: 'The core card-play skill every bridge player must master — when and how to take a finesse.', level: 'Essential', href: '/strategy/finesse-technique/' },
  ];
  const cardsData = (cards && cards.length > 0) ? cards : defaultCards;

  return (
    <section className="bp-section" style={{ background: bg }}>
      <div className="bp-inner">
        <div className="bp-section-head">
          <div className="bp-label">Bridge Strategy & Conventions</div>
          <h2 className="bp-h2" style={{ color: headC }}>{sectionTitle}</h2>
          <p className="bp-sub" style={{ color: textC }}>{sectionSubtitle}</p>
        </div>
        <div className="bp-grid-3">
          {cardsData.map((card, i) => {
            const lc = levelBadge(card.level);
            return (
              <Link key={i} href={card.href || '#'}>
                <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '24px 22px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontSize: 32, color: gold, fontFamily: "'Libre Baskerville', serif" }}>{card.suit}</span>
                    <span style={{ background: lc.bg, color: lc.color, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif" }}>{card.level}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 19, color: headC, margin: '0 0 10px' }}>{card.title}</h3>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, lineHeight: 1.65, margin: '0 0 16px', flex: 1 }}>{card.desc}</p>
                  <div style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 14 }}>Read guide →</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ToolsSection({ title, subtitle, cards }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.7)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const sectionTitle = title || 'Practical Tools to Help You Learn and Play Better';
  const sectionSubtitle = subtitle || 'Free downloads, quizzes, cheat sheets, and practice utilities — designed to make bridge easier and less intimidating.';

  const defaultCards = [
    { icon: '📄', type: 'Free Download', title: 'Bidding Cheat Sheet', desc: 'A one-page printable reference covering opening bids, responses, and point count ranges — keep it next to you at the table.', ctaStyle: 'filled', cta: 'Download Free →', href: '/tools/bidding-cheat-sheet/' },
    { icon: '🃏', type: 'Free Download', title: 'Convention Card Template', desc: 'A blank ACBL-style convention card you can fill in with your partnership agreements — printable PDF.', ctaStyle: 'filled', cta: 'Download Free →', href: '/tools/convention-card/' },
    { icon: '🧠', type: 'Interactive Quiz', title: 'Bridge Bidding Quiz', desc: 'Test your bidding knowledge with 20 scenario-based questions — beginner to intermediate level, with explanations.', ctaStyle: 'ghost', cta: 'Take the Quiz →', href: '/tools/bidding-quiz/' },
    { icon: '🤚', type: 'Practice Hands', title: 'Interactive Practice Boards', desc: 'Play through real bridge hands with expert commentary — practice declarer play, defence, and bidding decisions.', ctaStyle: 'ghost', cta: 'Practice Now →', href: '/tools/practice-boards/' },
    { icon: '📖', type: 'Reference', title: 'Beginner Glossary', desc: 'Every bridge term explained in plain English — from "finesse" to "rubber" to "ACBL masterpoints." Searchable.', ctaStyle: 'ghost', cta: 'Open Glossary →', href: '/glossary/' },
    { icon: '🎯', type: 'Practice Tool', title: 'Bidding Practice Tool', desc: 'Enter a hand and practice the auction — see what an experienced player would bid and why.', ctaStyle: 'ghost', cta: 'Practice Bidding →', href: '/tools/bidding-practice/' },
  ];
  const cardsData = (cards && cards.length > 0) ? cards : defaultCards;

  return (
    <section className="bp-section" style={{ background: bg }}>
      <div className="bp-inner">
        <div className="bp-section-head">
          <div className="bp-label">Bridge Tools & Resources</div>
          <h2 className="bp-h2" style={{ color: headC }}>{sectionTitle}</h2>
          <p className="bp-sub" style={{ color: textC }}>{sectionSubtitle}</p>
        </div>
        <div className="bp-grid-3">
          {cardsData.map((card, i) => (
            <div key={i} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '24px 22px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{card.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: gold, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Source Sans 3', sans-serif", marginBottom: 4 }}>{card.type}</div>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, margin: 0 }}>{card.title}</h3>
                </div>
              </div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, lineHeight: 1.65, margin: '0 0 18px', flex: 1 }}>{card.desc}</p>
              <Link href={card.href || '#'}>
                {card.ctaStyle === 'filled' ? (
                  <button style={{ background: gold, color: navy, border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", width: '100%' }}>{card.cta || 'Download Free →'}</button>
                ) : (
                  <button style={{ background: 'none', border: `1px solid ${bdr}`, color: gold, borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", width: '100%' }}>{card.cta || 'Access Free →'}</button>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformComparisonSection({ title, subtitle, ctaText, ctaUrl }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#060d1a' : '#f5f3ee';
  const tableBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const rowAlt = isDeep ? 'rgba(255,255,255,0.025)' : '#faf8f5';

  const sectionTitle = title || 'Find Your Platform — 6 Online Bridge Options Compared';
  const sectionSubtitle = subtitle || "Whether you're earning ACBL masterpoints, training solo with AI, or playing casually with friends — there's a platform built for you.";
  const cta = ctaText || 'Read Full Platform Reviews →';
  const ctaHref = ctaUrl || '/reviews/';

  const platforms = [
    { name: 'Bridge Base Online', badge: 'Most Popular', free: true, ai: true, video: false, mobile: true, bestFor: 'ACBL masterpoints', rating: 5, href: '/reviews/bridge-base-online-bbo-review/' },
    { name: 'Funbridge', badge: null, free: 'Limited', ai: true, video: false, mobile: true, bestFor: 'AI training', rating: 5, href: '/reviews/funbridge-review/' },
    { name: 'RealBridge', badge: null, free: true, ai: false, video: true, mobile: 'Browser', bestFor: 'Video play', rating: 5, href: '/reviews/realbridge-review/' },
    { name: 'No Fear Bridge', badge: null, free: 'Trial', ai: true, video: false, mobile: true, bestFor: 'Curriculum', rating: 5, href: '/reviews/' },
    { name: 'Trickster', badge: null, free: true, ai: true, video: false, mobile: true, bestFor: 'Free casual', rating: 5, href: '/reviews/' },
    { name: 'Bridge Baron', badge: null, free: false, ai: true, video: false, mobile: true, bestFor: '130+ conventions', rating: 5, href: '/reviews/' },
  ];

  const tick = (v) => {
    if (v === true) return <span style={{ color: '#27ae60', fontSize: 18 }}>✓</span>;
    if (v === false) return <span style={{ color: red, fontSize: 16 }}>✗</span>;
    return <span style={{ color: gold, fontSize: 14, fontWeight: 600 }}>{v}</span>;
  };
  const stars = (n) => [1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: i <= n ? gold : bdr, fontSize: 14 }}>★</span>);

  return (
    <section className="bp-section" style={{ background: bg }}>
      <div className="bp-inner">
        <div className="bp-section-head">
          <div className="bp-label">Platform Comparison · Verified May 2026</div>
          <h2 className="bp-h2" style={{ color: headC }}>{sectionTitle}</h2>
          <p className="bp-sub" style={{ color: textC }}>{sectionSubtitle}</p>
        </div>

        <div className="bp-table-wrap">
          <div style={{ background: tableBg, border: `1px solid ${bdr}`, borderRadius: 14, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, fontFamily: "'Source Sans 3', sans-serif" }}>
              <thead>
                <tr style={{ background: navy }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: gold, fontWeight: 700, fontSize: 13, letterSpacing: '0.06em' }}>Platform</th>
                  {['Free', 'AI Training', 'Video', 'Mobile', 'Best For', 'Rating'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 13 }}>{h}</th>
                  ))}
                  <th style={{ padding: '14px 16px' }}></th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p, i) => (
                  <tr key={p.name} style={{ borderBottom: `1px solid ${bdr}`, background: i % 2 === 1 ? rowAlt : 'none' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: headC }}>{p.name}</span>
                        {p.badge && <span style={{ fontSize: 11, background: 'rgba(212,168,67,0.15)', color: gold, borderRadius: 10, padding: '2px 8px', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.badge}</span>}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{tick(p.free)}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{tick(p.ai)}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{tick(p.video)}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{tick(p.mobile)}</td>
                    <td style={{ textAlign: 'center', padding: 16, color: gold, fontSize: 14, fontWeight: 600 }}>{p.bestFor}</td>
                    <td style={{ textAlign: 'center', padding: 16 }}>{stars(p.rating)}</td>
                    <td style={{ padding: '16px 18px 16px 10px' }}>
                      <Link href={p.href}><button style={{ background: 'none', border: `1px solid ${gold}`, color: gold, borderRadius: 6, padding: '6px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Review →</button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bp-cards-wrap">
          {platforms.map(p => (
            <div key={p.name} style={{ background: tableBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: headC, marginBottom: 4 }}>{p.name}</div>
                  {p.badge && <span style={{ fontSize: 11, background: 'rgba(212,168,67,0.15)', color: gold, borderRadius: 10, padding: '2px 8px', fontWeight: 700 }}>{p.badge}</span>}
                </div>
                <div>{stars(p.rating)}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 14, fontSize: 14, color: textC }}>
                <div>Free: {tick(p.free)}</div>
                <div>AI: {tick(p.ai)}</div>
                <div>Video: {tick(p.video)}</div>
                <div>Mobile: {tick(p.mobile)}</div>
                <div style={{ gridColumn: '1/3' }}>Best for: <span style={{ color: gold }}>{p.bestFor}</span></div>
              </div>
              <Link href={p.href}><button style={{ width: '100%', background: 'none', border: `1px solid ${gold}`, color: gold, borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Read Full Review →</button></Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link href={ctaHref}><button style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>{cta}</button></Link>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection({ title, subtitle, weekTags, ctaText }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0d1e38' : navy;

  const sectionTitle = title || 'Free 12-Week Bridge Improvement Course';
  const sectionSubtitle = subtitle || 'One practical lesson each week covering bidding, strategy, conventions, and real bridge play — designed to make bridge easier and less intimidating, one email at a time.';
  const btnText = ctaText || 'Start the Free Course →';

  const defaultWeekTags = [
    { label: 'Week 1: First Hand', highlighted: true },
    { label: 'Week 2: Point Count', highlighted: true },
    { label: 'Week 3: Opening Bids', highlighted: true },
    { label: 'Week 4: Stayman', highlighted: false },
    { label: 'Week 5: Transfers', highlighted: false },
    { label: '+ 7 more →', highlighted: false },
  ];
  const tags = (weekTags && weekTags.length > 0) ? weekTags : defaultWeekTags;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'newsletter', email }).toString(),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bp-section" style={{ background: bg, color: '#fff' }}>
      <div className="bp-inner">
        <div className="bp-newsletter-grid">
          <div>
            <div className="bp-label">Free 12-Week Course</div>
            <h2 className="bp-h2" style={{ color: '#fff' }}>{sectionTitle}</h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)', margin: '0 0 24px' }}>{sectionSubtitle}</p>
            <div className="bp-week-tags">
              {tags.map((tag, i) => (
                <span key={i} style={{
                  background: tag.highlighted ? 'rgba(212,168,67,0.2)' : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${tag.highlighted ? 'rgba(212,168,67,0.5)' : 'rgba(255,255,255,0.15)'}`,
                  color: tag.highlighted ? gold : 'rgba(255,255,255,0.55)',
                  borderRadius: 20,
                  padding: '5px 14px',
                  fontSize: 13,
                  fontWeight: tag.highlighted ? 700 : 400,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>{tag.label}</span>
              ))}
            </div>
          </div>
          <div>
            {sent ? (
              <div style={{ background: 'rgba(212,168,67,0.15)', border: '2px solid rgba(212,168,67,0.5)', borderRadius: 12, padding: '28px 24px', color: gold, fontSize: 18, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                ✓ You are in — your first lesson arrives next Tuesday.
              </div>
            ) : (
              <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="newsletter" />
                <p style={{ display: 'none' }}><label>Skip: <input name="bot-field" /></label></p>
                <div style={{ marginBottom: 12 }}>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '15px 20px', borderRadius: 8, border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", outline: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', background: gold, color: navy, border: 'none', borderRadius: 8, padding: '15px 28px', fontSize: 17, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', fontFamily: "'Source Sans 3', sans-serif", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Signing you up…' : btnText}
                </button>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 12, textAlign: 'center', fontFamily: "'Source Sans 3', sans-serif" }}>Completely free. No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFAQSection() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0d1828' : '#f5f3ee';
  const cardBg = isDeep ? '#132035' : '#fff';
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const headC = isDeep ? '#fff' : navy;
  const border = isDeep ? '#1e3255' : '#e5e0d8';
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: 'What is the best online bridge platform in 2026?', a: 'For most intermediate and advanced players in 2026, Bridge Base Online (BBO) is the default choice — free at its core, the largest live community, and the home of ACBL-sanctioned online masterpoints. Funbridge is the strongest solo AI training platform. RealBridge is best for video-bridge play. The right platform depends on whether you want live human play, solo training, or video-bridge club nights.' },
    { q: 'Which platforms award ACBL masterpoints in 2026?', a: 'Two platforms reliably award ACBL masterpoints in 2026: Bridge Base Online (BBO) and RealBridge (ACBL-sanctioned since 2024). Both award online masterpoints — a separate ACBL category that counts toward Life Master and other ranks.' },
    { q: 'How much does BBO cost in 2026?', a: 'The BBO free tier gives full access to live tables, casual games, and most tournaments. BBO+ at $5.99 per month adds an ad-free experience, advanced robots, and Bridgerama+ magazine, with a 30-day free trial. Pricing verified May 2026.' },
    { q: 'Is Funbridge worth the subscription?', a: 'Funbridge Premium at $15.99/month (or $159.99/year) is worth it for any player who trains more than 10 deals per week and wants the strongest AI training in online bridge. Skip it if you primarily play with humans for ACBL masterpoints — use BBO instead.' },
    { q: 'How does Bridge Playbook make money?', a: 'Bridge Playbook earns through affiliate commissions on platform subscriptions and Amazon Associates links. Every affiliate link is clearly labelled. As of May 2026 we have not signed any platform affiliate deals, so all platform links are informational only.' },
    { q: 'Are the reviews on Bridge Playbook independent?', a: "Yes. Every platform pricing figure is verified directly from the platform's billing page within the last 30 days, every review is written by a player with verifiable ACBL credentials, and every recommendation is filtered for intermediate-to-advanced players in the US, UK, Australia and Canada." },
  ];

  return (
    <section className="bp-section" style={{ background: bg }}>
      <div className="bp-inner-md">
        <div className="bp-section-head">
          <div className="bp-label">Got Questions?</div>
          <h2 className="bp-h2" style={{ color: headC }}>Frequently Asked Questions</h2>
          <p className="bp-sub" style={{ color: textC }}>Everything you need to know about Bridge Playbook and online bridge.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ background: cardBg, border: `1px solid ${isOpen ? gold : border}`, borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', gap: 12 }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, fontWeight: 600, color: headC, lineHeight: 1.4 }}>{item.q}</span>
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

export default function HomePageClient({ data }) {
  return (
    <div>
        <HeroSection
          heading={data?.hero_heading}
          subheading={data?.hero_subheading}
          cta1Text={data?.cta1_text}
          cta1Url={data?.cta1_url}
          cta2Text={data?.cta2_text}
          cta2Url={data?.cta2_url}
          trustPill1={data?.trust_pill_1}
          trustPill2={data?.trust_pill_2}
          trustPill3={data?.trust_pill_3}
          quickStartLinks={data?.quick_start_links}
          heroImage={data?.hero_image}
        />
        <LearningPathwaySection
          title={data?.pathway_title}
          subtitle={data?.pathway_subtitle}
          steps={data?.pathway_steps}
        />
        <RoutingCardsSection
          title={data?.routing_title}
          subtitle={data?.routing_subtitle}
          cards={data?.routing_cards}
        />
        <WhyBridgeSection
          title={data?.why_bridge_title}
          subtitle={data?.why_bridge_subtitle}
          cards={data?.why_bridge_cards}
        />
        <ConventionsSection
          title={data?.conventions_title}
          subtitle={data?.conventions_subtitle}
          cards={data?.conventions_cards}
        />
        <ToolsSection
          title={data?.tools_title}
          subtitle={data?.tools_subtitle}
          cards={data?.tools_cards}
        />
        <PlatformComparisonSection
          title={data?.platform_title}
          subtitle={data?.platform_subtitle}
          ctaText={data?.platform_cta_text}
          ctaUrl={data?.platform_cta_url}
        />
        <NewsletterSection
          title={data?.newsletter_title}
          subtitle={data?.newsletter_subtitle}
          weekTags={data?.newsletter_week_tags}
          ctaText={data?.newsletter_cta_text}
        />
        <HomeFAQSection />
    </div>
  );
}
