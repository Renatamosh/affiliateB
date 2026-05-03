'use client';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';
import { PageHeader } from '../../../components/PageHeader';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const DATA = {
  name: 'RealBridge',
  shortName: 'RealBridge',
  rating: 4,
  badge: 'Best Club Feel',
  price: 'From £10/year for clubs',
  tagline: 'See and hear your partner — online bridge that actually feels like the real thing.',
  overview: 'RealBridge takes a fundamentally different approach from every other bridge platform. Rather than focusing on competitive metrics or AI quality, RealBridge\'s entire design philosophy centres on recreating the social experience of physical bridge. Every game includes video and audio for all four players — you can see and hear your partner and opponents throughout the session, just as you would across a real table. The result is an experience that many players describe as genuinely moving: familiar faces in familiar positions, doing what they love together despite the miles between them.',
  sections: [
    { title: 'Getting Started on RealBridge', body: 'RealBridge runs through a web browser — no download required. Visit realbridge.online and create a free account. Setting up a game is remarkably simple: create a room, share the link with three others, and you are playing within minutes. The platform also offers pre-scheduled club games that anyone can join, making it easy to find other players even without an established group.' },
    { title: 'The Video and Audio Experience', body: 'The video and audio quality on RealBridge is genuinely good, and the layout — four player video feeds arranged around a virtual card table — is intuitive and natural-feeling. Most players report that after the first few minutes, the technology fades into the background and the experience simply feels like bridge. A reliable broadband connection is recommended; on a poor connection, video quality can be affected though the game itself continues reliably.' },
    { title: 'The Bridge Interface', body: 'The card play interface is clean and functional, if less polished than Funbridge\'s. Cards are clearly displayed, the bidding box is straightforward, and the overall flow of a game is smooth. The focus is clearly on social play rather than competitive analysis — there are no robot games, no solo practice modes, and limited statistical tracking. This makes RealBridge slightly limited for practising and improving compared to BBO or Funbridge.' },
    { title: 'Club and Society Use', body: 'RealBridge has been widely adopted by bridge clubs and societies as their online platform. The club pricing model (from £10/year for a club account) makes it very accessible for organisations. Many clubs run their regular weekly session on RealBridge, with the same players they would have seen in person, in the same pairings. The results can be managed through the platform\'s built-in director functions.' },
    { title: 'Pricing for Individual Players', body: 'Individual players can use RealBridge free for casual games. A premium individual subscription (approximately £20/year) unlocks additional features including club membership integration. Compared to Funbridge, RealBridge is very competitively priced — particularly for players whose primary motivation is social play rather than competitive improvement.' },
  ],
  verdict: 'RealBridge is unmatched for social bridge — playing with friends and regular partners while enjoying the connection that video and audio brings. It is less suitable for solo practice or competitive improvement, but as a replacement for club bridge it is extraordinarily good.',
  scores: [{ label: 'Ease of Use', n: 4 }, { label: 'AI Opponents', n: 1 }, { label: 'Live Community', n: 4 }, { label: 'Value for Money', n: 5 }, { label: 'Mobile App', n: 3 }],
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

export default function RealBridgeClient() {
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
                {[['Price', DATA.price], ['Rating', DATA.badge], ['Best for', 'Club games, societies and playing with friends']].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 0', borderBottom: `1px solid ${bdr}` }}>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
                <a href="https://www.realbridge.online" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", textAlign: 'center', textDecoration: 'none', marginTop: 16, boxSizing: 'border-box' }}>Visit RealBridge →</a>
              </div>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: headC, marginBottom: 12 }}>Compare Other Platforms</div>
                <Link href="/platforms/bridge-base-online/" style={{ display: 'block', padding: '10px 0', borderBottom: `1px solid ${bdr}`, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>BBO Review →</Link>
                <Link href="/platforms/funbridge/" style={{ display: 'block', padding: '10px 0', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>Funbridge Review →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
