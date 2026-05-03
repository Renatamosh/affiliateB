import GlossaryClient from './GlossaryClient';

export const metadata = {
  title: 'Bridge Glossary — 45+ Terms Explained in Plain English',
  description: 'Complete bridge glossary with 45+ terms explained clearly. Searchable and filterable A–Z — the definitive online bridge dictionary.',
  alternates: { canonical: 'https://bridgeplaybook.com/glossary/' },
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
