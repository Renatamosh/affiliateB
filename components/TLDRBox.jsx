'use client';
import { useTheme } from './ThemeProvider';

/**
 * TLDRBox — Quick summary / TL;DR box for top of content pages.
 * Targets featured snippets (AEO) and gives AI models a clear, extractable answer.
 *
 * Props:
 *   summary  {string}   — 1–2 sentence overview shown above the bullet list
 *   points   {string[]} — Key takeaway bullets (optional)
 *   label    {string}   — Override the "TL;DR" label (e.g. "Quick Summary", "Key Takeaways")
 */
export function TLDRBox({ summary, points = [], label = 'TL;DR — Quick Summary' }) {
  const { theme } = useTheme();
  const isDeep = theme === 'deep';
  const bg = isDeep ? '#071627' : '#f0f6ff';
  const border = isDeep ? '#1b3558' : '#b8d0f0';
  const textC = isDeep ? 'rgba(255,255,255,0.82)' : '#2d3f55';
  const bulletC = isDeep ? 'rgba(255,255,255,0.65)' : '#444';
  const gold = '#d4a843';

  return (
    <div
      aria-label={label}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderLeft: `4px solid ${gold}`,
        borderRadius: 10,
        padding: '20px 24px 18px',
        marginBottom: 32,
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      <div style={{
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: gold,
        marginBottom: 10,
      }}>
        {label}
      </div>

      {summary && (
        <p style={{
          fontSize: 17,
          color: textC,
          lineHeight: 1.72,
          margin: points.length ? '0 0 12px' : 0,
          fontWeight: 400,
        }}>
          {summary}
        </p>
      )}

      {points.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: 22 }}>
          {points.map((pt, i) => (
            <li key={i} style={{
              fontSize: 16,
              color: bulletC,
              lineHeight: 1.65,
              marginBottom: i < points.length - 1 ? 6 : 0,
            }}>
              {pt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
