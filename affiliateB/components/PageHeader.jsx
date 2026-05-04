'use client';
import { useTheme } from './ThemeProvider';

export function PageHeader({ title, subtitle, suit, suitColor }) {
  const { theme } = useTheme();
  const gold = '#d4a843';
  const bg = theme === 'deep' ? 'linear-gradient(135deg,#060d1a,#0f1d3a)' : 'linear-gradient(135deg,#1c2f5e,#2d4a7a)';

  return (
    <div style={{ background: bg, color: '#fff', padding: 'clamp(36px,6vw,56px) 24px clamp(32px,5vw,48px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)', fontSize: 'clamp(80px,15vw,180px)', opacity: 0.05, color: suitColor || '#fff', userSelect: 'none' }}>{suit}</div>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: gold, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>{subtitle}</div>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(28px,5vw,44px)', margin: '0 0 10px', lineHeight: 1.2 }}>{title}</h1>
      </div>
    </div>
  );
}
