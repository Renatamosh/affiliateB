'use client';
import { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const VALUES = [
  { icon: '♠', title: 'Independent', body: 'Not affiliated with any single platform. Our reviews reflect genuine, unsponsored experience.' },
  { icon: '♥', title: 'Beginner Friendly', body: 'Written for real people — especially those new to online bridge. No jargon, no assumptions.' },
  { icon: '♦', title: 'Always Free', body: 'Every guide, quiz, glossary and community feature is completely free to use.' },
  { icon: '♣', title: '60+ Focused', body: 'We design for our core audience: players over 60 who want clear, large-text, intuitive resources.' },
];

const ABOUT_PARAS = [
  'Bridge is one of the world\'s great games — a perfect blend of logic, memory, partnership and strategy. But for too many people, particularly those new to online play, the internet\'s bridge resources feel fragmented, intimidating or commercial. We wanted something different.',
  'Bridge Playbook was built by a small team of passionate bridge players who wanted a single, trusted place for newcomers and returning players alike — written in plain English, free of jargon, and genuinely independent. Every review, guide and article on this site has been written and tested by real bridge players.',
  'We are transparent about our affiliate relationships: some links on this site earn us a small commission, which helps keep the site free. But our editorial opinions are never for sale. We only recommend what we genuinely believe in — and we will tell you just as clearly when something is not worth your money.',
];

export default function AboutClient() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return;
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          name: form.name,
          email: form.email,
          message: form.msg,
        }).toString(),
      });
    } catch {}
    setSent(true);
  };

  return (
    <div>
      <PageHeader title="About Bridge Playbook" subtitle="Our Story · Our Mission" suit="♥" suitColor={red} />
      <div style={{ background: bg, padding: '56px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, marginBottom: 48, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 30, color: headC, marginTop: 0 }}>Why We Built Bridge Playbook</h2>
              {ABOUT_PARAS.map((p, i) => (
                <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: textC, lineHeight: 1.85, marginBottom: 22 }}>{p}</p>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {VALUES.map(v => (
                <div key={v.title} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '18px 22px', display: 'flex', gap: 14 }}>
                  <div style={{ fontSize: 26, color: gold, width: 32, flexShrink: 0, textAlign: 'center' }}>{v.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: headC, marginBottom: 4 }}>{v.title}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: textC, lineHeight: 1.6 }}>{v.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: 36 }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 26, color: headC, marginTop: 0 }}>Get in Touch</h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: textC, marginBottom: 28, lineHeight: 1.7 }}>Have a question, a suggestion, or a hand you'd like us to feature? We read every message and reply within 48 hours.</p>
            {sent ? (
              <div style={{ textAlign: 'center', padding: 32, color: '#27ae60', fontFamily: "'Libre Baskerville', serif", fontSize: 22 }}>
                ✓ Message sent — we'll be in touch within 2 working days.
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}><label>Skip: <input name="bot-field" /></label></p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 16 }}>
                  {[['Name', 'name', 'text'], ['Email address', 'email', 'email']].map(([label, key, type]) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: headC, fontWeight: 600, marginBottom: 8 }}>{label}</label>
                      <input type={type} name={key} required value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: `2px solid ${bdr}`, fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", boxSizing: 'border-box', outline: 'none', background: bg, color: headC }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: headC, fontWeight: 600, marginBottom: 8 }}>Your message</label>
                  <textarea name="message" rows={5} required value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                    style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: `2px solid ${bdr}`, fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", boxSizing: 'border-box', resize: 'vertical', outline: 'none', background: bg, color: headC }} />
                </div>
                <button type="submit"
                  style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
