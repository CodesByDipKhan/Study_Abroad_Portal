'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/scholarships', label: 'Scholarships' },
        { href: '/admin/applications', label: 'Applications' },
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`block py-2 px-4 rounded mb-2 ${pathname === link.href ? 'bg-blue-600' : 'hover:bg-gray-700'
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}