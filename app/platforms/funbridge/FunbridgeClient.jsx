'use client';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';
import { PageHeader } from '../../../components/PageHeader';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';


function StarRow({ n }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? gold : '#ccc', fontSize: 18 }}>★</span>
      ))}
    </span>
  );
}

export default function FunbridgeClient({ data }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  return (
    <div>
      <PageHeader title={data.name} subtitle={`In-Depth Review · ${data.badge}`} suit="♠" />
      <div style={{ background: bg, padding: '48px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ marginBottom: 20 }}>
            <Link href="/platforms/" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>← All Platforms</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 32, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: headC, fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 32px', borderLeft: `4px solid ${gold}`, paddingLeft: 20 }}>{data.tagline}</p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85, margin: '0 0 40px' }}>{data.overview}</p>
              {data.sections.map((s, i) => (
                <div key={i} style={{ marginBottom: 36 }}>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: headC, margin: '0 0 12px' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.85, margin: 0 }}>{s.body}</p>
                </div>
              ))}
              <div style={{ background: navy, borderRadius: 12, padding: 28, color: '#fff', marginTop: 8 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: gold, marginBottom: 12 }}>Our Verdict</div>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, lineHeight: 1.75, margin: 0, opacity: 0.9 }}>{data.verdict}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 88 }}>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 16 }}>Our Ratings</div>
                {data.scores.map(s => (
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
                  <StarRow n={data.rating} />
                </div>
              </div>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 14 }}>Quick Facts</div>
                {[['Price', data.price], ['Rating', data.badge], ['Best for', 'New players and solo practice']].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 0', borderBottom: `1px solid ${bdr}` }}>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
                <a href="https://www.funbridge.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", textAlign: 'center', textDecoration: 'none', marginTop: 16, boxSizing: 'border-box' }}>Visit Funbridge →</a>
              </div>
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: headC, marginBottom: 12 }}>Compare Other Platforms</div>
                <Link href="/platforms/bridge-base-online/" style={{ display: 'block', padding: '10px 0', borderBottom: `1px solid ${bdr}`, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>BBO Review →</Link>
                <Link href="/platforms/realbridge/" style={{ display: 'block', padding: '10px 0', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>RealBridge Review →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
