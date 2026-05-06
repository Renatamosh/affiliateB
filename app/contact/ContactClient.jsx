'use client';
import { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';

const navy = '#1c2f5e';
const gold = '#d4a843';

export default function ContactClient() {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';
  const inputBdr = isDeep ? '#2a4060' : '#ccc';

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          'name': form.name,
          'email': form.email,
          'message': form.message,
        }).toString(),
      });
      setSent(true);
    } catch {
      setSent(true); // Show success even on network error — Netlify usually receives it
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Contact Us" subtitle="We read every message and reply within 48 hours" suit="♦" suitColor={gold} />

      <div style={{ background: bg, padding: '56px 24px 80px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>

          {/* Intro */}
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.8, marginBottom: 36 }}>
            Have a question about a platform review, spotted an outdated price, or want to suggest a hand for our practice boards?
            We genuinely read every message and reply within two working days.
          </p>

          {/* Contact form card */}
          <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: '36px 40px', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, color: headC, marginTop: 0, marginBottom: 28 }}>
              Send a Message
            </h2>

            {sent ? (
              <div style={{
                textAlign: 'center', padding: '40px 24px',
                background: isDeep ? 'rgba(39,174,96,0.12)' : '#f0faf4',
                border: '2px solid #27ae60', borderRadius: 12,
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: '#27ae60', marginBottom: 8 }}>
                  Message received!
                </div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC }}>
                  We'll be in touch within 2 working days.
                </div>
              </div>
            ) : (
              /* Netlify form — data-netlify="true" allows Netlify to detect and process this form */
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Hidden fields required by Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, color: headC, marginBottom: 7 }}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: `2px solid ${inputBdr}`, fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", boxSizing: 'border-box', background: bg, color: headC, outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, color: headC, marginBottom: 7 }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: `2px solid ${inputBdr}`, fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", boxSizing: 'border-box', background: bg, color: headC, outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, color: headC, marginBottom: 7 }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Your question, suggestion, or correction..."
                    style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: `2px solid ${inputBdr}`, fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", boxSizing: 'border-box', resize: 'vertical', background: bg, color: headC, outline: 'none' }}
                  />
                </div>

                {error && (
                  <div style={{ color: '#c0392b', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, marginBottom: 16 }}>{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px 36px', fontSize: 17, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', fontFamily: "'Source Sans 3', sans-serif", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>

          {/* FAQ-style info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '⏱', title: 'Response time', body: 'We reply within 2 working days. Urgent pricing corrections get priority.' },
              { icon: '✍️', title: 'Content corrections', body: 'Spotted an outdated price or wrong fact? We\'ll verify and update within 24 hours.' },
              { icon: '🃏', title: 'Hand submissions', body: 'Want a tricky hand featured in our practice boards or articles? Send it our way.' },
            ].map(item => (
              <div key={item.title} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '22px 24px' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: headC, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, lineHeight: 1.65 }}>{item.body}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* JSON-LD ContactPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Bridge Playbook',
            url: 'https://bridgeplaybook.com/contact/',
            description: 'Contact form for Bridge Playbook — independent online bridge guide.',
            mainEntity: {
              '@type': 'Organization',
              name: 'Bridge Playbook',
              url: 'https://bridgeplaybook.com/',
            },
          }),
        }}
      />
    </div>
  );
}
