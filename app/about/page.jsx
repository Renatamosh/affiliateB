import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Bridge Playbook — Our Story & Mission',
  description: 'Bridge Playbook is an independent guide to online bridge for players of all levels. Learn about our mission, our team and how to get in touch.',
  alternates: { canonical: 'https://bridgeplaybook.com/about/' },
};

export default function AboutPage() {
  return <AboutClient />;
}
