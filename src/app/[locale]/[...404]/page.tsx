import { notFound } from 'next/navigation';

// Localized 404 page will not work without this catch-all
export default function CatchAllPage() {
  notFound();
}
