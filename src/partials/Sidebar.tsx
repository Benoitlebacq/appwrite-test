'use client';
// components/Sidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isUnauthorized = false }: { isUnauthorized?: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/clients', label: 'Clients' },
    { href: '/profils', label: 'Profils' },
    { href: '/admin', label: 'Administration' },
  ];

  return (
    <nav className="w-64 bg-gray-100 min-h-screen pt-8 pl-4 pr-2">
      <ul className="space-y-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block p-2 rounded transition-colors ${
                pathname === item.href ? 'bg-upman text-white' : 'hover:bg-gray-200'
              } ${isUnauthorized && item.href === '/admin' ? 'bg-upman text-white' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
