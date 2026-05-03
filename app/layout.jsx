import { ThemeProvider } from '../components/ThemeProvider';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import Script from 'next/script';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://bridgeplaybook.com'),
  title: { default: 'Bridge Playbook — Your Online Bridge Guide | BridgePlaybook.com', template: '%s | Bridge Playbook' },
  description: 'Bridge Playbook is your independent, trusted guide to online bridge. Compare platforms, learn to play with beginner guides, and join a community of players over 60.',
  robots: { index: true, follow: true },
  openGraph: { siteName: 'Bridge Playbook', locale: 'en_GB', type: 'website', images: [{ url: '/og-image.jpg' }] },
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LBLEDSBS2V" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LBLEDSBS2V');
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
