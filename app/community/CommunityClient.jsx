'use client';
import { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import { PageHeader } from '../../components/PageHeader';
import { SEOSection } from '../../components/SEOSection';
import { FAQSection } from '../../components/FAQSection';

const navy = '#1c2f5e';
const gold = '#d4a843';
const red = '#c0392b';

const FORUM_POSTS = [
  { author: 'Margaret T., 71', location: 'Brighton', avatar: 'M', color: red, post: 'Has anyone tried RealBridge for a regular foursome? We used to meet on Tuesdays at the club and I really miss seeing everyone\'s faces.', replies: 14, time: '2 hours ago', category: 'Platforms' },
  { author: 'David H., 67', location: 'Edinburgh', avatar: 'D', color: '#2980b9', post: 'Looking for a patient partner for BBO — I\'m an improver, play standard ACOL, available most weekday mornings. Would love a regular game.', replies: 7, time: '4 hours ago', category: 'Partner Finder' },
  { author: 'Susan & Bob', location: 'Surrey', avatar: 'S', color: '#27ae60', post: 'Just made our first online Grand Slam together — 7♠ doubled and made! Absolute joy. Thank you to everyone here who helped us get started.', replies: 31, time: 'Yesterday', category: 'Member Stories' },
  { author: 'Patricia K., 64', location: 'Dublin', avatar: 'P', color: '#8e44ad', post: 'Which platform is better for beginners wanting to learn through play — Funbridge or BBO robots? Would love opinions from people who\'ve tried both.', replies: 19, time: 'Yesterday', category: 'Beginners' },
  { author: 'Alan B., 65', location: 'Manchester', avatar: 'A', color: gold, post: 'I\'ve been using Funbridge for three months now. My play has noticeably improved — the hand analysis afterwards is gold. Happy to answer questions.', replies: 11, time: '2 days ago', category: 'Learning' },
  { author: 'Joan & Peter W.', location: 'Norfolk', avatar: 'J', color: '#16a085', post: 'We play on RealBridge every Sunday with our old club partners. Seeing each other\'s faces makes it feel almost normal. Can\'t recommend it enough.', replies: 22, time: '2 days ago', category: 'Member Stories' },
];

const PARTNER_LISTINGS = [
  { name: 'Jane H., 66', system: 'ACOL', platform: 'BBO', time: 'Weekday mornings', location: 'Surrey', level: 'Improver' },
  { name: 'Colin W., 71', system: 'Standard American', platform: 'Funbridge', time: 'Evenings (any)', location: 'Glasgow', level: 'Intermediate' },
  { name: 'Mary & Tom R.', system: 'ACOL (Beginners)', platform: 'Any', time: 'Weekend afternoons', location: 'Bristol', level: 'Beginner' },
  { name: 'Robert J., 68', system: 'ACOL', platform: 'RealBridge', time: 'Tue/Thu evenings', location: 'Leeds', level: 'Club player' },
];

const EVENTS = [
  { day: 'Tuesday', time: '7:00 PM (UK)', name: 'Beginners Night', desc: 'A gentle, no-pressure online session on BBO. Experts on hand to answer questions.', platform: 'BBO', badge: 'Free', badgeC: '#27ae60' },
  { day: 'Thursday', time: '2:00 PM (UK)', name: 'Improvers Session', desc: 'Play hands at a supported pace with post-game discussion. Suitable for 6–18 months experience.', platform: 'Funbridge', badge: 'Free', badgeC: '#27ae60' },
  { day: 'Saturday', time: '10:00 AM (UK)', name: 'Social Morning', desc: 'A relaxed social pairs game on RealBridge. All levels welcome — come and meet the community.', platform: 'RealBridge', badge: 'Free', badgeC: '#27ae60' },
];

const TESTIMONIALS = [
  { name: 'Robert M.', age: 68, location: 'Leeds', text: 'I hadn\'t played bridge in 20 years. Bridge Playbook helped me find Funbridge and within six weeks I was playing online daily. The beginner guides here are the clearest I\'ve found anywhere.', initial: 'R', color: '#2980b9' },
  { name: 'Joan & Peter', age: '70 & 73', location: 'Norfolk', text: 'We use RealBridge for our regular foursome — seeing each other\'s faces makes it feel just like the real thing. Bridge Playbook\'s review is what convinced us to try it.', initial: 'J', color: red },
  { name: 'Alan B.', age: 65, location: 'Manchester', text: 'After my wife passed I was worried I\'d have to give up bridge. Bridge Playbook\'s community section pointed me to the BBO partnership desk and I now have three regular partners.', initial: 'A', color: '#27ae60' },
  { name: 'Margaret T.', age: 71, location: 'Brighton', text: 'The community forum here is exactly what I needed — friendly, helpful and full of people who understand bridge. It\'s like having a club without leaving home.', initial: 'M', color: '#8e44ad' },
];

const SEO_PARAS = [
  'Community is at the very heart of bridge — always has been. Long before online bridge existed, bridge clubs served as more than places to play cards: they were social hubs, meeting places, and sources of genuine friendship. Online bridge has extended this spirit to reach players who might never have had access to a physical club.',
  'Our community forum brings together bridge players of all levels from across the UK and beyond. Whether you are a complete beginner looking for reassurance before your first online game, an improver with a question about a specific hand, or an experienced player wanting to discuss a subtle point of card play, you will find knowledgeable and friendly fellow players ready to help.',
  'The partner finder is one of the most valued features of Bridge Playbook\'s community. Finding a reliable regular partner is one of the main challenges of online bridge, particularly for new players who are not already connected to a club or group.',
  'Weekly sessions provide structure and regularity that many players find invaluable. Our Tuesday Beginners Night, Thursday Improvers Session and Saturday Social Morning are all free to attend and run on the major platforms.',
  'The social dimension of bridge has been shown in research to carry real benefits beyond entertainment. Regular social activity, combined with the cognitive demands of bridge, is associated with improved mental wellbeing and reduced social isolation.',
  'Member stories are a regular feature of our community. Players who found new regular partners after the loss of a spouse. Couples who rediscovered the game they played on their first date. Friends separated by distance who stay connected through a weekly game on RealBridge.',
];

const FAQS = [
  { q: 'How do I join the Bridge Playbook community?', a: 'The community forum and partner finder are free to access — simply create a free Bridge Playbook account. You can post to the forum, add your partner listing, and register for weekly sessions all from your account dashboard.' },
  { q: 'How do the weekly sessions work?', a: 'Our weekly sessions run on the major online platforms (BBO, Funbridge and RealBridge). You register your attendance on Bridge Playbook, and we send you the platform link and connection details before the session. Sessions are free and run by experienced Bridge Playbook members.' },
  { q: 'I\'m a complete beginner — is the community welcoming to newcomers?', a: 'Absolutely. Our Beginners Night on Tuesdays is specifically designed for players new to online bridge. The forum has a dedicated Beginners section where no question is too basic. Bridge players are, in our experience, exceptionally patient and welcoming.' },
  { q: 'I don\'t have a regular partner — can I still play in community sessions?', a: 'Yes — our sessions assign partners so you can come solo. This is also a great way to meet potential regular partners, and many of our most valued regular partnerships began at a Bridge Playbook session.' },
  { q: 'How do I find a regular partner through Bridge Playbook?', a: 'Post a listing in our Partner Finder with your availability, preferred bidding system, platform and approximate level. Browse other listings and reach out to compatible players. Most players find a regular partner within two or three weeks of posting.' },
  { q: 'Can I suggest a topic for the community forum?', a: 'Yes — we welcome topic suggestions, particularly from newer players. Use the "Suggest a Thread" button in the forum or contact us through the About page.' },
];

const TABS = [['forum', 'Forum'], ['partners', 'Partner Finder'], ['events', 'Weekly Sessions'], ['stories', 'Member Stories']];

export default function CommunityClient() {
  const { theme } = useTheme();
  const [tab, setTab] = useState('forum');
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#0a1525' : theme === 'bright' ? '#fff' : '#f5f3ee';
  const cardBg = isDeep ? '#0f1d3a' : '#fff';
  const headC = isDeep ? '#fff' : navy;
  const textC = isDeep ? 'rgba(255,255,255,0.72)' : '#555';
  const bdr = isDeep ? '#1a2e50' : '#e5e0d8';

  return (
    <div>
      <PageHeader title="Community" subtitle="Forums · Partner Finder · Weekly Sessions · Member Stories" suit="♥" suitColor={red} />

      <div style={{ background: navy, padding: '0 24px', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {TABS.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ background: 'none', border: 'none', borderBottom: `3px solid ${tab === id ? gold : 'transparent'}`, color: tab === id ? gold : 'rgba(255,255,255,0.6)', padding: '16px 24px', fontSize: 16, fontFamily: "'Source Sans 3', sans-serif", fontWeight: tab === id ? 700 : 400, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ background: bg, padding: '48px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>

          {tab === 'forum' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, margin: 0 }}>Community Forum</h2>
                <button style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>+ Start a New Thread</button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {['All', 'Platforms', 'Partner Finder', 'Beginners', 'Learning', 'Member Stories'].map(cat => (
                  <span key={cat} style={{ padding: '6px 16px', borderRadius: 20, background: cardBg, border: `1px solid ${bdr}`, fontSize: 14, fontFamily: "'Source Sans 3', sans-serif", color: textC, cursor: 'pointer' }}>{cat}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {FORUM_POSTS.map((post, i) => (
                  <div key={i} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '20px 24px', cursor: 'pointer', display: 'flex', gap: 16 }}>
                    <div style={{ width: 46, height: 46, borderRadius: '50%', background: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#fff', fontWeight: 700, flexShrink: 0 }}>{post.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 16, color: gold }}>{post.author}</span>
                        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: textC, opacity: 0.7 }}>{post.location}</span>
                        <span style={{ background: navy, color: gold, fontSize: 12, borderRadius: 12, padding: '2px 10px', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>{post.category}</span>
                      </div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: headC, lineHeight: 1.55, marginBottom: 8 }}>{post.post}</div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: textC, opacity: 0.6 }}>{post.time} · {post.replies} replies</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'partners' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, margin: 0 }}>Find a Bridge Partner</h2>
                <button style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>+ Post Your Profile</button>
              </div>
              <div style={{ background: isDeep ? 'rgba(28,47,94,0.4)' : '#eef2fa', borderRadius: 10, padding: '16px 24px', marginBottom: 28, fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: headC }}>
                <strong>How it works:</strong> Browse listings below or post your own profile with your availability, bidding system and preferred platform. Players with compatible profiles can then contact each other to arrange a game.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PARTNER_LISTINGS.map((p, i) => (
                  <div key={i} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 12, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: headC, marginBottom: 6 }}>{p.name}</div>
                      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {[['System', p.system], ['Platform', p.platform], ['Availability', p.time], ['Location', p.location], ['Level', p.level]].map(([k, v]) => (
                          <span key={k} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC }}><strong style={{ color: gold }}>{k}:</strong> {v}</span>
                        ))}
                      </div>
                    </div>
                    <button style={{ background: navy, color: gold, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", whiteSpace: 'nowrap' }}>Connect →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'events' && (
            <div>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, marginTop: 0, marginBottom: 24 }}>Weekly Online Sessions</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                {EVENTS.map((ev, i) => (
                  <div key={i} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, overflow: 'hidden' }}>
                    <div style={{ background: navy, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: '#fff' }}>{ev.name}</div>
                      <span style={{ background: ev.badgeC, color: '#fff', borderRadius: 12, padding: '3px 12px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700 }}>{ev.badge}</span>
                    </div>
                    <div style={{ padding: 24 }}>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: gold, fontWeight: 700, marginBottom: 8 }}>{ev.day} · {ev.time}</div>
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: textC, lineHeight: 1.7, margin: '0 0 16px' }}>{ev.desc}</p>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC, marginBottom: 16 }}>Platform: <strong style={{ color: headC }}>{ev.platform}</strong></div>
                      <button style={{ width: '100%', background: gold, color: navy, border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>Reserve a Seat</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'stories' && (
            <div>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: headC, marginTop: 0, marginBottom: 24 }}>Member Stories</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 14, padding: 28 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff', fontWeight: 700 }}>{t.initial}</div>
                      <div>
                        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 17, color: headC }}>{t.name}, {t.age}</div>
                        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: textC }}>{t.location}</div>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: headC, lineHeight: 1.75, margin: '0 0 14px', fontStyle: 'italic' }}>"{t.text}"</p>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1,2,3,4,5].map(j => <span key={j} style={{ color: gold, fontSize: 18 }}>★</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      <SEOSection paras={SEO_PARAS} />
      <FAQSection items={FAQS} />
    </div>
  );
}
