import CommunityClient from './CommunityClient';
import { getPageData } from '../../lib/pages';

export async function generateMetadata() {
  const page = getPageData('community');
  return {
    title: page?.meta_title || 'Bridge Community — Forum, Partner Finder & Weekly Sessions',
    description: page?.meta_description || 'Join the Bridge Playbook community: discussion forum, partner finder, weekly online sessions and member stories. All levels welcome.',
    alternates: { canonical: page?.canonical || 'https://bridgeplaybook.com/community/' },
    openGraph: {
      title: page?.og_title || page?.meta_title,
      description: page?.og_description || page?.meta_description,
      ...(page?.og_image && { images: [{ url: page.og_image }] }),
    },
  };
}

export default function CommunityPage() {
  const data = getPageData('community');
  return <CommunityClient data={data} />;
}
