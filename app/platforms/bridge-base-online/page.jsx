import fs from 'fs';
import path from 'path';
import BBOClient from './BBOClient';

export const metadata = {
  title: 'Bridge Base Online (BBO) Review 2026 — Is It Worth It?',
  description: 'Honest review of Bridge Base Online (BBO): features, pricing, interface, robot games and live play. The world\'s largest bridge platform reviewed in full.',
  alternates: { canonical: 'https://bridgeplaybook.com/platforms/bridge-base-online/' },
};

export default function BBOPage() {
  const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/platforms/bbo.json'), 'utf8'));
  return <BBOClient data={data} />;
}
