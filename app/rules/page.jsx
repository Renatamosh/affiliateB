import RulesClient from './RulesClient';
import { getPageData } from '../../lib/pages';

export async function generateMetadata() {
  const page = getPageData('rules');
  return {
    title: page?.meta_title || 'Bridge Rules & Laws — Complete Reference',
    description: page?.meta_description || 'All the official rules of bridge explained in plain English. Searchable, interactive accordion covering dealing, bidding, card play and scoring.',
    alternates: { canonical: page?.canonical || 'https://bridgeplaybook.com/rules/' },
    openGraph: {
      title: page?.og_title || page?.meta_title,
      description: page?.og_description || page?.meta_description,
      ...(page?.og_image && { images: [{ url: page.og_image }] }),
    },
  };
}

export default function RulesPage() {
  const data = getPageData('rules');
  return <RulesClient data={data} />;
}
