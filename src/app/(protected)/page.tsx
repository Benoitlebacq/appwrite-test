import { Suspense } from 'react';

import ClientList from './clients/page';

export default function Home() {
  return (
    <main className="container mx-auto max-w-[800]">
      <Suspense fallback={<div>Chargement...</div>}>
        <div>bleblablab</div>
      </Suspense>
    </main>
  );
}
