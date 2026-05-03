import fs from 'fs';
import path from 'path';
import FunbridgeClient from './FunbridgeClient';

export const metadata = {
  title: 'Funbridge Review 2026 — Best Bridge App for Beginners?',
  description: 'Honest Funbridge review: is it worth the subscription? Interface, AI opponents, competitive deals, pricing and verdict from real bridge players.',
  alternates: { canonical: 'https://bridgeplaybook.com/platforms/funbridge/' },
};

export default function FunbridgePage() {
  const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/platforms/funbridge.json'), 'utf8'));
  return <FunbridgeClient data={data} />;
}
