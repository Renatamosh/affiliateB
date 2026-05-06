'use client';
import Link from 'next/link';

const navy = '#1c2f5e';
const gold = '#d4a843';

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: '#f5f3ee' }}>
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>♠</div>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 42, color: navy, margin: '0 0 12px' }}>404</h1>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 26, color: navy, margin: '0 0 20px', fontWeight: 400 }}>Page Not Found</h2>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: '#555', lineHeight: 1.7, marginBottom: 36 }}>
          The page you are looking for doesn't exist or has been moved. Return to the homepage or try one of our popular guides below.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <Link href="/" style={{ background: navy, color: gold, padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 16 }}>← Home</Link>
          <Link href="/how-to-play-bridge-online/" style={{ background: 'none', border: `2px solid ${navy}`, color: navy, padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 16 }}>How to Play</Link>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['Bidding Basics', '/bidding-basics/'], ['Practice Boards', '/practice-boards/'], ['Glossary', '/glossary/'], ['Platforms', '/reviews/']].map(([label, href]) => (
            <Link key={href} href={href} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: gold, textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
