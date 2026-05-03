'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../../../components/ThemeProvider';
import { PageHeader } from '../../../components/PageHeader';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const DATA = {
  name: 'Bridge Base Online (BBO)',
  shortName: 'BBO',
  rating: 5,
  badge: 'Most Popular',
  price: 'Free (premium from $9.99/month)',
  tagline: 'The world\'s largest online bridge platform — free, vast and always busy.',
  overview: 'Bridge Base Online, universally known as BBO, is the dominant force in online bridge. With over seven million registered users and thousands of live tables running at every hour, it is the closest thing the bridge world has to a central hub. Founded by Fred Gitelman in 2001, BBO has been the platform of choice for everything from casual club games to the world\'s highest-profile tournaments. The Bermuda Bowl and World Bridge Championships are broadcast live on BBO every two years.',
  sections: [
    { title: 'Getting Started on BBO', body: 'Registering on BBO is free and takes under two minutes. Visit bridgebase.com and create an account with an email address and username. Once registered, the platform opens to a lobby showing all available game types. New players should start with \'BBO Stars\' robot games — these are well-calibrated, available immediately and let you play at your own pace with no pressure.' },
    { title: 'The Interface: What to Expect', body: 'BBO\'s interface is functional rather than beautiful. It reflects years of incremental development rather than a ground-up redesign, and first-time users often find it slightly overwhelming. The key areas are the main lobby (find live games), the \'Casual\' section (unrated games at any level), \'BBO Stars\' (robot games), and the \'Competitive\' section (rated pairs and team events). Give it a few sessions and the layout becomes intuitive.' },
    { title: 'Robot Play: BBO Stars', body: 'BBO offers robot games through its BBO Stars feature. You play as South with robot partners and opponents. The robots play to a solid intermediate standard and are excellent for practising declarer play. The robots bid SAYC (Standard American) by default, which can be adjusted in settings. Robot games are completely free and available at any time.' },
    { title: 'Live Play: Finding a Game', body: 'BBO\'s greatest strength is the sheer volume of live games at all hours. The lobby typically shows hundreds of open tables at any time, ranging from beginner-level casual tables to expert tournament events. The \'Speedball\' format (each hand timed) is extremely popular for quick sessions. Finding a live game within 30 seconds is entirely realistic at almost any time of day.' },
    { title: 'Pricing: Is BBO Worth Paying For?', body: 'The free version of BBO is genuinely usable for most players. Premium features include \'BB$\' (BBO\'s virtual currency, used for tournament entry fees), a few premium robot game modes, and some analytical tools. For casual play and club games, the free account is entirely sufficient. Most experienced BBO players spend $9.99–$19.99 per month on BB$ for tournament entry fees.' },
  ],
  verdict: 'BBO is indispensable. Its sheer scale — the volume of games, the quality of broadcasts, the range of events — makes it the default home of online bridge. The interface is not the most welcoming for beginners, but the community is unmatched.',
  scores: [{ label: 'Ease of Use', n: 3 }, { label: 'AI Opponents', n: 4 }, { label: 'Live Community', n: 5 }, { label: 'Value for Money', n: 5 }, { label: 'Mobile App', n: 3 }],
};

function StarRow({ n }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? gold : '#ccc', fontSize: 18 }}>★</span>
      ))}
    </span>
  );
}

export default function BBOClient() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  return (
    <div>
      <PageHeader title={DATA.name} subtitle={`In-Depth Review · ${DATA.badge}`} suit="♠" />
      <div style={{ background: bg, padding: '48px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ marginBottom: 20 }}>
            <Link href="/platforms/" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>← All Platforms</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 32, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: headC, fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 32px', borderLeft: `4px solid ${gold}`, paddingLeft: 20 }}>{DATA.tagline}</p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85, margin: '0 0 40px' }}>{DATA.overview}</p>
              {DATA.sections.map((s, i) => (
                <div key={i} style={{ marginBottom: 36 }}>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: headC, margin: '0 0 12px' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.85, margin: 0 }}>{s.body}</p>
                </div>
              ))}
              <div style={{ background: navy, borderRadius: 12, padding: 28, color: '#fff', marginTop: 8 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: gold, marginBottom: 12 }}>Our Verdict</div>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, lineHeight: 1.75, margin: 0, opacity: 0.9 }}>{DATA.verdict}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 88 }}>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 16 }}>Our Ratings</div>
                {DATA.scores.map(s => (
                  <div key={s.label} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC }}>{s.label}</span>
                      <StarRow n={s.n} />
                    </div>
                    <div style={{ height: 6, background: bdr, borderRadius: 3 }}>
                      <div style={{ height: 6, background: gold, borderRadius: 3, width: `${s.n * 20}%` }} />
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${bdr}`, paddingTop: 14, marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC }}>Overall</span>
                  <StarRow n={DATA.rating} />
                </div>
              </div>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 14 }}>Quick Facts</div>
                {[['Price', DATA.price], ['Rating', DATA.badge], ['Best for', 'Regular players wanting a massive live community']].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 0', borderBottom: `1px solid ${bdr}` }}>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
                <a href="https://www.bridgebase.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", textAlign: 'center', textDecoration: 'none', marginTop: 16, boxSizing: 'border-box' }}>Visit BBO →</a>
              </div>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: headC, marginBottom: 12 }}>Compare Other Platforms</div>
                <Link href="/platforms/funbridge/" style={{ display: 'block', padding: '10px 0', borderBottom: `1px solid ${bdr}`, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>Funbridge Review →</Link>
                <Link href="/platforms/realbridge/" style={{ display: 'block', padding: '10px 0', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>RealBridge Review →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
