import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Bridge Playbook — Get in Touch',
  description: 'Have a question, correction, or content suggestion for Bridge Playbook? Send us a message — we reply within 48 hours.',
  alternates: { canonical: 'https://bridgeplaybook.com/contact/' },
  openGraph: {
    title: 'Contact Bridge Playbook',
    description: 'Have a question, correction, or content suggestion? Send us a message — we reply within 48 hours.',
    url: 'https://bridgeplaybook.com/contact/',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
