import GlossaryClient from './GlossaryClient';
import { getPageData } from '../../lib/pages';

export async function generateMetadata() {
  const page = getPageData('glossary');
  return {
    title: page?.meta_title || 'Bridge Glossary — 45+ Terms Explained in Plain English',
    description: page?.meta_description || 'Complete bridge glossary with 45+ terms explained clearly. Searchable and filterable A–Z.',
    alternates: { canonical: page?.canonical || 'https://bridgeplaybook.com/glossary/' },
    openGraph: {
      title: page?.og_title || page?.meta_title,
      description: page?.og_description || page?.meta_description,
      ...(page?.og_image && { images: [{ url: page.og_image }] }),
    },
  };
}

export default function GlossaryPage() {
  return <GlossaryClient />;
}
