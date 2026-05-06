import { ThemeProvider } from '../components/ThemeProvider';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import Script from 'next/script';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://bridgeplaybook.com'),
  title: { default: 'Independent Online Bridge Guide 2026 — Platforms, Conventions & Masterpoints | Bridge Playbook', template: '%s | Bridge Playbook' },
  description: 'Independent reviews of the best online bridge platforms 2026 — BBO ($5.99/mo), Funbridge ($15.99/mo), RealBridge, No Fear Bridge. Convention guides, ACBL masterpoints and bridge cruise comparisons for intermediate and advanced players.',
  robots: { index: true, follow: true },
  openGraph: { siteName: 'Bridge Playbook', locale: 'en_US', type: 'website', images: [{ url: '/og-image.jpg' }] },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#0f1d3a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://bridgeplaybook.com/#website',
                  url: 'https://bridgeplaybook.com/',
                  name: 'Bridge Playbook',
                  description: 'Independent reviews of online bridge platforms, convention guides, ACBL masterpoint information, and bridge cruise comparisons for intermediate and advanced players.',
                  inLanguage: 'en-US',
                  publisher: { '@id': 'https://bridgeplaybook.com/#organization' },
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://bridgeplaybook.com/#organization',
                  name: 'Bridge Playbook',
                  url: 'https://bridgeplaybook.com/',
                  description: 'Independent guide to online bridge platforms, conventions, masterpoints and cruises. Focused on intermediate and advanced players in the US, UK, Australia and Canada. Pricing verified quarterly.',
                  sameAs: [],
                },
              ],
            }),
          }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LBLEDSBS2V" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LBLEDSBS2V');
        `}</Script>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `}</Script>
      </head>
      <body>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
