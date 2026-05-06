'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BridgePlaybookLogo } from './Logo';
import { useTheme } from './ThemeProvider';

const NAV_ITEMS = [
  { label: 'Platform Reviews', sub: [
    { label: 'All Platforms 2026', href: '/reviews/' },
    { label: 'Bridge Base Online (BBO)', href: '/reviews/bridge-base-online-bbo-review/' },
    { label: 'Funbridge', href: '/reviews/funbridge-review/' },
    { label: 'RealBridge', href: '/reviews/realbridge-review/' },
    { label: 'BBO vs Funbridge', href: '/compare/bbo-vs-funbridge-2026/' },
  ]},
  { label: 'Learn Bridge', sub: [
    { label: 'How to Play Bridge Online', href: '/how-to-play-bridge-online/' },
    { label: 'Bidding Basics', href: '/bidding-basics/' },
    { label: 'Card Play Strategy', href: '/card-play-strategy/' },
    { label: 'Rules & Laws', href: '/rules/' },
  ]},
  { label: 'Practice', sub: [
    { label: 'Practice Boards', href: '/practice-boards/' },
    { label: 'Bidding Quiz', href: '/bidding-quiz/' },
  ]},
  { label: 'Glossary', href: '/glossary/' },
  { label: 'Articles', href: '/articles/' },
  { label: 'Community', href: '/community/' },
  { label: 'About', sub: [
    { label: 'About Bridge Playbook', href: '/about/' },
    { label: 'Contact Us', href: '/contact/' },
  ]},
];

function useMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

export function Nav() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isMobile = useMobile(900);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const gold = '#d4a843';
  const bg = theme === 'deep' ? '#0f1d3a' : theme === 'bright' ? '#ffffff' : '#1c2f5e';
  const fg = theme === 'bright' ? '#1c2f5e' : '#ffffff';
  const dropBg = theme === 'bright' ? '#fff' : '#1c2f5e';
  const border = theme === 'bright' ? '#e5e0d8' : 'rgba(255,255,255,0.15)';
  const drawerBg = theme === 'bright' ? '#fff' : '#0f1d3a';

  const isActive = (item) => {
    if (item.href && (pathname === item.href || pathname === item.href.replace(/\/$/, ''))) return true;
    if (item.sub && item.sub.some(s => pathname === s.href || pathname === s.href.replace(/\/$/, ''))) return true;
    return false;
  };

  const close = () => { setMobileOpen(false); setMobileExpanded(null); setOpenMenu(null); };

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e) => { if (!e.target.closest('[data-nav]')) close(); };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav data-nav style={{ background: bg, borderBottom: `3px solid ${gold}`, position: 'sticky', top: 0, zIndex: 200, fontFamily: "'Source Sans 3', sans-serif" }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <Link href="/" onClick={close}>
            <BridgePlaybookLogo size={isMobile ? 'sm' : 'md'} variant={theme === 'bright' ? 'light' : 'dark'} />
          </Link>

          {!isMobile && (
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} style={{ position: 'relative' }}
                  onMouseEnter={() => item.sub && setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}>
                  {item.href ? (
                    <Link href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ background: isActive(item) ? 'rgba(212,168,67,0.15)' : 'none', color: isActive(item) ? gold : fg, fontSize: 15, fontFamily: "'Source Sans 3', sans-serif", padding: '8px 14px', borderRadius: 6, fontWeight: isActive(item) ? 700 : 400, whiteSpace: 'nowrap', display: 'block' }}>{item.label}</span>
                    </Link>
                  ) : (
                    <button style={{ background: isActive(item) ? 'rgba(212,168,67,0.15)' : 'none', border: 'none', cursor: 'pointer', color: isActive(item) ? gold : fg, fontSize: 15, fontFamily: "'Source Sans 3', sans-serif", padding: '8px 14px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4, fontWeight: isActive(item) ? 700 : 400, whiteSpace: 'nowrap' }}>
                      {item.label} <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>
                    </button>
                  )}
                  {item.sub && openMenu === item.label && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, background: dropBg, border: `1px solid ${border}`, borderRadius: 10, minWidth: 240, boxShadow: '0 8px 32px rgba(0,0,0,0.22)', padding: 8, zIndex: 300 }}>
                      {item.sub.map(s => (
                        <Link key={s.label} href={s.href} onClick={() => setOpenMenu(null)}>
                          <div style={{ display: 'block', background: pathname === s.href ? 'rgba(212,168,67,0.15)' : 'none', color: pathname === s.href ? gold : fg, fontSize: 15, padding: '11px 16px', fontFamily: "'Source Sans 3', sans-serif", borderRadius: 6, fontWeight: pathname === s.href ? 700 : 400 }}>{s.label}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {isMobile && (
            <button data-nav onClick={() => setMobileOpen(o => !o)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ display: 'block', width: 24, height: 2, background: fg, borderRadius: 2, transition: 'transform 0.2s, opacity 0.2s', transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: 24, height: 2, background: fg, borderRadius: 2, opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
              <span style={{ display: 'block', width: 24, height: 2, background: fg, borderRadius: 2, transition: 'transform 0.2s, opacity 0.2s', transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          )}
        </div>
      </nav>

      {isMobile && mobileOpen && (
        <div data-nav style={{ position: 'fixed', top: 71, left: 0, right: 0, bottom: 0, zIndex: 199, display: 'flex', flexDirection: 'column' }}>
          <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', background: drawerBg, borderBottom: `3px solid ${gold}`, overflowY: 'auto', maxHeight: 'calc(100vh - 71px)' }}>
            {NAV_ITEMS.map(item => (
              <div key={item.label}>
                {item.sub ? (
                  <>
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      style={{ width: '100%', background: 'none', border: 'none', borderBottom: `1px solid ${border}`, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', color: isActive(item) ? gold : fg, fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", fontWeight: isActive(item) ? 700 : 500, textAlign: 'left' }}>
                      {item.label}
                      <span style={{ color: gold, fontSize: 18, transition: 'transform 0.2s', display: 'block', transform: mobileExpanded === item.label ? 'rotate(45deg)' : 'none' }}>+</span>
                    </button>
                    {mobileExpanded === item.label && (
                      <div style={{ background: theme === 'bright' ? '#f8f6f2' : 'rgba(0,0,0,0.2)' }}>
                        {item.sub.map(s => (
                          <Link key={s.label} href={s.href} onClick={close}>
                            <div style={{ borderBottom: `1px solid ${border}`, padding: '15px 36px', color: pathname === s.href ? gold : fg, fontSize: 16, fontFamily: "'Source Sans 3', sans-serif", fontWeight: pathname === s.href ? 700 : 400, opacity: pathname === s.href ? 1 : 0.85 }}>{s.label}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} onClick={close}>
                    <div style={{ borderBottom: `1px solid ${border}`, padding: '18px 24px', color: isActive(item) ? gold : fg, fontSize: 17, fontFamily: "'Source Sans 3', sans-serif", fontWeight: isActive(item) ? 700 : 500 }}>{item.label}</div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
