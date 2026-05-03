import CommunityClient from './CommunityClient';

export const metadata = {
  title: 'Bridge Community — Forum, Partner Finder & Weekly Sessions',
  description: 'Join the Bridge Playbook community: discussion forum, partner finder, weekly online sessions and member stories. All levels welcome.',
  alternates: { canonical: 'https://bridgeplaybook.com/community/' },
};

export default function CommunityPage() {
  return <CommunityClient />;
}
