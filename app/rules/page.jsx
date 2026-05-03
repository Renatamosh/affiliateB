import RulesClient from './RulesClient';

export const metadata = {
  title: 'Bridge Rules & Laws — Complete Reference',
  description: 'All the official rules of bridge explained in plain English. Searchable, interactive accordion covering dealing, bidding, card play and scoring.',
  alternates: { canonical: 'https://bridgeplaybook.com/rules/' },
};

export default function RulesPage() {
  return <RulesClient />;
}
