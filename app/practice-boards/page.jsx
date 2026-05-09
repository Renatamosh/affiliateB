import PracticeBoardsClient from './PracticeBoardsClient';
import { getPageData } from '../../lib/pages';

export async function generateMetadata() {
  const page = getPageData('practice-boards');
  return {
    title: page?.meta_title || 'Practice Bridge Hands — Interactive Deal Viewer',
    description: page?.meta_description || 'Practice real bridge deals with our interactive hand viewer.',
    alternates: { canonical: page?.canonical || 'https://bridgeplaybook.com/practice-boards/' },
    openGraph: {
      title: page?.og_title || page?.meta_title,
      description: page?.og_description || page?.meta_description,
      ...(page?.og_image && { images: [{ url: page.og_image }] }),
    },
  };
}

export default function PracticeBoardsPage() {
  return <PracticeBoardsClient />;
}
