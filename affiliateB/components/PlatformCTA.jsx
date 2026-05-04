'use client';
import { useTheme } from './ThemeProvider';

// PLATFORM CTA — single source of truth
// When an affiliate deal signs, flip `affiliateActive: true` for that platform.
// The disclosure text and link rel attributes update automatically site-wide.
const PLATFORMS = {
  bbo: {
    name: 'Bridge Base Online',
    ctaLabel: 'Try BBO free — no credit card required',
    url: 'https://www.bridgebase.com/',
    affiliateActive: false,
  },
  funbridge: {
    name: 'Funbridge',
    ctaLabel: 'Try Funbridge free — 1-month Premium trial',
    url: 'https://www.funbridge.com/',
    affiliateActive: false,
  },
  realbridge: {
    name: 'RealBridge',
    ctaLabel: 'Visit RealBridge — free for players',
    url: 'https://realbridge.online/',
    affiliateActive: false,
  },
  nofearbridge: {
    name: 'No Fear Bridge',
    ctaLabel: 'Start your No Fear Bridge 2-week free trial',
    url: 'https://www.nofearbridge.co.uk/',
    affiliateActive: false,
  },
  trickster: {
    name: 'Trickster Bridge',
    ctaLabel: 'Play free on Trickster Bridge',
    url: 'https://www.trickstercards.com/',
    affiliateActive: false,
  },
  bridgebaron: {
    name: 'Bridge Baron',
    ctaLabel: 'Try Bridge Baron',
    url: 'https://greatgameproducts.com/',
    affiliateActive: false,
  },
};

const gold = '#d4a843';
const navy = '#1c2f5e';

export function PlatformCTA({ platform, secondary, secondaryHref }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const p = PLATFORMS[platform];

  if (!p) {
    return null;
  }

  const disclosureBg = isDeep ? 'rgba(212,168,67,0.08)' : '#fff8e6';
  const disclosureBorder = isDeep ? 'rgba(212,168,67,0.3)' : '#e8c56a';
  const disclosureColor = isDeep ? 'rgba(255,255,255,0.7)' : '#7a5a00';

  return (
    <div style={{
      background: isDeep ? '#0f1d3a' : '#fff',
      border: `1px solid ${isDeep ? '#1a2e50' : '#e5e0d8'}`,
      borderRadius: 14,
      padding: '24px 28px',
      margin: '32px 0',
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <a
        href={p.url}
        target="_blank"
        rel={p.affiliateActive ? 'sponsored noopener nofollow' : 'noopener nofollow'}
        style={{
          display: 'inline-block',
          background: gold,
          color: navy,
          padding: '14px 28px',
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 17,
          textDecoration: 'none',
        }}
      >
        {p.ctaLabel} →
      </a>

      <div style={{
        background: disclosureBg,
        border: `1px solid ${disclosureBorder}`,
        borderRadius: 8,
        padding: '10px 14px',
        marginTop: 16,
        fontSize: 13,
        color: disclosureColor,
        lineHeight: 1.6,
      }}>
        {p.affiliateActive ? (
          <>
            <strong>Affiliate link.</strong> Bridge Playbook may earn a commission if you subscribe — at no extra cost to you. Pricing verified May 2026.
          </>
        ) : (
          <>
            <strong>Informational link only.</strong> Bridge Playbook receives no commission for {p.name} sign-ups at this time. Pricing verified May 2026.
          </>
        )}
      </div>

      {secondary && secondaryHref && (
        <div style={{ marginTop: 16 }}>
          <a
            href={secondaryHref}
            style={{
              color: gold,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            {secondary} →
          </a>
        </div>
      )}
    </div>
  );
}

export default PlatformCTA;
