import PracticeBoardsClient from './PracticeBoardsClient';

export const metadata = {
  title: 'Practice Bridge Hands — Interactive Deal Viewer',
  description: 'Practice real bridge deals with our interactive hand viewer. Show and hide cards, get hints and read expert commentary on each deal.',
  alternates: { canonical: 'https://bridgeplaybook.com/practice-boards/' },
};

export default function PracticeBoardsPage() {
  return <PracticeBoardsClient />;
}
