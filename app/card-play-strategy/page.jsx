import CardPlayClient from './CardPlayClient';
import { getPageData } from '../../lib/pages';

export async function generateMetadata() {
  const page = getPageData('card-play-strategy');
  return {
    title: page?.meta_title || 'Card Play Strategy — Essential Bridge Techniques',
    description: page?.meta_description || 'Learn essential bridge card play: finesses, hold-up plays, establishing suits and signalling in defence.',
    alternates: { canonical: page?.canonical || 'https://bridgeplaybook.com/card-play-strategy/' },
    openGraph: {
      title: page?.og_title || page?.meta_title,
      description: page?.og_description || page?.meta_description,
      ...(page?.og_image && { images: [{ url: page.og_image }] }),
    },
  };
}

export default function CardPlayPage() {
  return <CardPlayClient />;
}
