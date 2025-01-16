import Image from 'next/image';
import React from 'react';

import auth from '@/auth';

export default async function Header() {
  const user = await auth.getUser();
  return (
    <header>
      <div className="flex items-center gap-4">
        <Image src="/icons/profile-icon.svg" alt="alt" width={50} height={50} />
        {user && <strong>Bonjour {user?.name?.split(' ')[0] || user.email}</strong>}
      </div>

      <div>
        <form action={auth.deleteSession}>
          <button>Logout</button>
        </form>
      </div>
    </header>
  );
}
