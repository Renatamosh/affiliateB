'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../components/ThemeProvider';

const navy = '#1c2f5e';
const gold = '#d4a843';
const green = '#27ae60';
const red = '#e74c3c';

function StarDisplay({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= full ? gold : (half && i === full + 1) ? gold : '#ccc', fontSize: 20 }}>
          {i <= full ? '★' : (half && i === full + 1) ? '⯨' : '☆'}
        </span>
      ))}
      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: '#888', marginLeft: 6 }}>
        {rating}/5
      </span>
    </span>
  );
}

function FAQItem({ question, answer, bdr, headC, textC }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${bdr}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '16px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 700, color: headC,
        }}
      >
        {question}
        <span style={{ fontSize: 20, color: gold, flexShrink: 0, marginLeft: 12 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.75, margin: '0 0 16px', paddingRight: 24 }}>
          {answer}
        </p>
      )}
    </div>
  );
}

export default function ReviewClient({ review }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.75)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const greenBg = isDeep ? '#0d2a1a' : '#f0faf4';
  const redBg = isDeep ? '#2a0d0d' : '#fff5f5';

  const {
    title, rating, best_for, last_verified, acbl_masterpoints, free_trial,
    featured_image, featured_image_alt, pricing, pros, cons, screenshots,
    cta_label, cta_url, affiliate_links, key_takeaways, faq, verdict, content,
    entity_tags,
  } = review;

  function renderMarkdown(md) {
    if (!md) return null;
    return md.split('\n').map((line, i) => {
      if (!line.trim()) return null;
      if (line.startsWith('## '))
        return <h2 key={i} style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(20px,3.5vw,26px)', color: headC, margin: '36px 0 12px' }}>{line.slice(3)}</h2>;
      if (line.startsWith('# '))
        return <h1 key={i} style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(24px,4vw,32px)', color: headC, margin: '0 0 16px' }}>{line.slice(2)}</h1>;
      const parsed = line
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${u}" style="color:${gold};text-decoration:underline">${t}</a>`)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      return <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, lineHeight: 1.85, margin: '0 0 16px' }} dangerouslySetInnerHTML={{ __html: parsed }} />;
    });
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${navy},#2d4a7a)`, color: '#fff', padding: 'clamp(36px,6vw,64px) 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <Link href="/reviews/" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>← All Platform Reviews</Link>
          </div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(28px,5vw,44px)', margin: '0 0 16px', lineHeight: 1.2 }}>
            {title} Review 2026
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {rating && <StarDisplay rating={rating} />}
            {best_for && (
              <span style={{ background: gold + '22', color: gold, border: `1px solid ${gold}44`, borderRadius: 20, padding: '4px 16px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700 }}>
                {best_for}
              </span>
            )}
          </div>
          {last_verified && (
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, opacity: 0.6, marginTop: 12 }}>
              Pricing verified: {last_verified}
            </p>
          )}
        </div>
      </div>

      <div style={{ background: bg, padding: 'clamp(32px,5vw,56px) 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 40, alignItems: 'start' }}>

            {/* ── LEFT COLUMN ── */}
            <div>
              {/* Featured Image */}
              {featured_image && (
                <img src={featured_image} alt={featured_image_alt || title}
                  style={{ width: '100%', borderRadius: 12, marginBottom: 36, display: 'block' }} />
              )}

              {/* Key Takeaways */}
              {key_takeaways && key_takeaways.length > 0 && (
                <div style={{ background: navy, borderRadius: 12, padding: '24px 28px', marginBottom: 40 }}>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: gold, marginBottom: 16 }}>
                    ⚡ Key Takeaways
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {key_takeaways.map((t, i) => (
                      <li key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 8 }}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick badges */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                <span style={{ background: acbl_masterpoints ? green + '22' : red + '22', color: acbl_masterpoints ? green : red, border: `1px solid ${(acbl_masterpoints ? green : red) + '44'}`, borderRadius: 20, padding: '5px 14px', fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>
                  {acbl_masterpoints ? '✓ ACBL Masterpoints' : '✗ No ACBL Masterpoints'}
                </span>
                {free_trial && (
                  <span style={{ background: green + '22', color: green, border: `1px solid ${green}44`, borderRadius: 20, padding: '5px 14px', fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>
                    ✓ Free Trial Available
                  </span>
                )}
              </div>

              {/* Body content */}
              <div style={{ marginBottom: 40 }}>{renderMarkdown(content)}</div>

              {/* Pricing Table */}
              {pricing && pricing.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(20px,3vw,26px)', color: headC, margin: '0 0 20px' }}>Pricing Plans</h2>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15 }}>
                      <thead>
                        <tr style={{ background: navy, color: '#fff' }}>
                          <th style={{ padding: '12px 16px', textAlign: 'left' }}>Plan</th>
                          <th style={{ padding: '12px 16px', textAlign: 'left' }}>Price</th>
                          <th style={{ padding: '12px 16px', textAlign: 'left' }}>Billing</th>
                          <th style={{ padding: '12px 16px', textAlign: 'left' }}>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pricing.map((p, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? cardBg : (isDeep ? '#0d1930' : '#f9f8f5'), borderBottom: `1px solid ${bdr}` }}>
                            <td style={{ padding: '12px 16px', fontWeight: 700, color: headC }}>{p.plan_name}</td>
                            <td style={{ padding: '12px 16px', color: gold, fontWeight: 700 }}>{p.price}</td>
                            <td style={{ padding: '12px 16px', color: textC }}>{p.billing}</td>
                            <td style={{ padding: '12px 16px', color: textC }}>{p.notes || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Pros & Cons */}
              {((pros && pros.length > 0) || (cons && cons.length > 0)) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
                  {pros && pros.length > 0 && (
                    <div style={{ background: greenBg, border: `1px solid ${green}33`, borderRadius: 12, padding: '20px 24px' }}>
                      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: green, marginBottom: 14 }}>✓ Pros</div>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {pros.map((p, i) => (
                          <li key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC, lineHeight: 1.65, padding: '6px 0', borderBottom: i < pros.length - 1 ? `1px solid ${bdr}` : 'none', display: 'flex', gap: 8 }}>
                            <span style={{ color: green, flexShrink: 0 }}>✓</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {cons && cons.length > 0 && (
                    <div style={{ background: redBg, border: `1px solid ${red}33`, borderRadius: 12, padding: '20px 24px' }}>
                      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: red, marginBottom: 14 }}>✗ Cons</div>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {cons.map((c, i) => (
                          <li key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC, lineHeight: 1.65, padding: '6px 0', borderBottom: i < cons.length - 1 ? `1px solid ${bdr}` : 'none', display: 'flex', gap: 8 }}>
                            <span style={{ color: red, flexShrink: 0 }}>✗</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Screenshots Gallery */}
              {screenshots && screenshots.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: headC, margin: '0 0 16px' }}>Screenshots</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
                    {screenshots.map((s, i) => (
                      <figure key={i} style={{ margin: 0 }}>
                        <img src={s.image} alt={s.alt} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
                        {s.caption && <figcaption style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: textC, marginTop: 6, textAlign: 'center' }}>{s.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Verdict */}
              {verdict && (
                <div style={{ background: navy, borderRadius: 12, padding: '24px 28px', marginBottom: 40 }}>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: gold, marginBottom: 12 }}>Our Verdict</div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.88)', margin: 0 }}>{verdict}</p>
                </div>
              )}

              {/* FAQ Accordion */}
              {faq && faq.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(20px,3vw,26px)', color: headC, margin: '0 0 4px' }}>Frequently Asked Questions</h2>
                  {faq.map((item, i) => (
                    <FAQItem key={i} question={item.question} answer={item.answer} bdr={bdr} headC={headC} textC={textC} />
                  ))}
                </div>
              )}

              {/* Additional affiliate links */}
              {affiliate_links && affiliate_links.length > 0 && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
                  {affiliate_links.map((l, i) => (
                    <a key={i} href={l.url} target="_blank" rel={`noopener${l.nofollow !== false ? ' nofollow' : ''}`}
                      style={{ background: cardBg, border: `1px solid ${gold}`, color: gold, borderRadius: 8, padding: '10px 20px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
                      {l.label} →
                    </a>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${bdr}` }}>
                <Link href="/reviews/" style={{ color: gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 16 }}>← Back to all reviews</Link>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 88 }}>
              {/* CTA */}
              {cta_url && (
                <div style={{ background: navy, borderRadius: 14, padding: 24, textAlign: 'center' }}>
                  {rating && (
                    <div style={{ marginBottom: 14 }}>
                      <StarDisplay rating={rating} />
                    </div>
                  )}
                  <a href={cta_url} target="_blank" rel="noopener nofollow"
                    style={{ display: 'block', background: gold, color: navy, borderRadius: 8, padding: '14px 20px', fontSize: 17, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif", textDecoration: 'none', marginBottom: 10 }}>
                    {cta_label || `Visit ${title} →`}
                  </a>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>
                    Affiliate link — we may earn a commission at no extra cost to you.
                  </p>
                </div>
              )}

              {/* Quick Facts */}
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: headC, marginBottom: 16 }}>Quick Facts</div>
                {[
                  ['Best for', best_for],
                  ['ACBL Masterpoints', acbl_masterpoints ? 'Yes' : 'No'],
                  ['Free Trial', free_trial ? 'Yes' : 'No'],
                  ['Last Verified', last_verified],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 0', borderBottom: `1px solid ${bdr}` }}>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, marginTop: 3 }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Compare */}
              <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: headC, marginBottom: 12 }}>Compare Other Platforms</div>
                {[
                  ['BBO Review', '/reviews/bridge-base-online/'],
                  ['Funbridge Review', '/reviews/funbridge/'],
                  ['RealBridge Review', '/reviews/realbridge/'],
                  ['BBO vs Funbridge 2026', '/compare/bbo-vs-funbridge-2026/'],
                ].map(([label, href]) => (
                  <Link key={label} href={href} style={{ display: 'block', padding: '10px 0', borderBottom: `1px solid ${bdr}`, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>
                    {label} →
                  </Link>
                ))}
              </div>

              {/* Entity tags (hidden for semantic SEO) */}
              {entity_tags && entity_tags.length > 0 && (
                <div style={{ display: 'none' }} aria-hidden="true">
                  {entity_tags.join(', ')}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
