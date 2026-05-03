import fs from 'fs';
import path from 'path';
import RealBridgeClient from './RealBridgeClient';

export const metadata = {
  title: 'RealBridge Review 2026 — Online Bridge with Video & Audio',
  description: 'Honest RealBridge review: is it the best platform for social bridge? Video play, club use, pricing and verdict from real players.',
  alternates: { canonical: 'https://bridgeplaybook.com/platforms/realbridge/' },
};

export default function RealBridgePage() {
  const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/platforms/realbridge.json'), 'utf8'));
  return <RealBridgeClient data={data} />;
}
