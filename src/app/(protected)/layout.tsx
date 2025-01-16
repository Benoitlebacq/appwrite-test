// app/layout.tsx

import { ReactNode } from 'react';

import Header from '@/partials/Header';
import Sidebar from '@/partials/Sidebar';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
