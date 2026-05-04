'use client';

const LOGO_SIZES = {
  xs: { icon: 28, iconFont: 16, nameFont: 0,  tagFont: 0,  gap: 0  },
  sm: { icon: 34, iconFont: 19, nameFont: 16, tagFont: 0,  gap: 10 },
  md: { icon: 40, iconFont: 22, nameFont: 20, tagFont: 10, gap: 12 },
  lg: { icon: 52, iconFont: 28, nameFont: 26, tagFont: 12, gap: 14 },
  xl: { icon: 72, iconFont: 40, nameFont: 36, tagFont: 15, gap: 18 },
};

export function BridgePlaybookLogo({ size = 'md', variant = 'dark', showTagline, onClick, style = {} }) {
  const s = LOGO_SIZES[size] || LOGO_SIZES.md;
  const gold = '#d4a843';
  const navy = '#1c2f5e';
  const textColor = variant === 'light' ? navy : '#ffffff';
  const autoTagline = showTagline !== undefined ? showTagline : (size === 'md' || size === 'lg' || size === 'xl');

  return (
    <div onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap, cursor: onClick ? 'pointer' : 'default', userSelect: 'none', ...style }}>
      <div style={{ width: s.icon, height: s.icon, background: gold, borderRadius: Math.round(s.icon * 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s.iconFont, flexShrink: 0, lineHeight: 1 }}>♠</div>
      {size !== 'xs' && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: s.nameFont, fontWeight: 700, color: textColor, lineHeight: 1.1, letterSpacing: '-0.01em' }}>Bridge Playbook</div>
          {autoTagline && s.tagFont > 0 && (
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: s.tagFont, color: gold, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>Your Online Bridge Guide</div>
          )}
        </div>
      )}
    </div>
  );
}
