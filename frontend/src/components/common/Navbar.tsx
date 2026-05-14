'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserRole, removeToken, isAuthenticated } from '@/lib/auth';

export default function Navbar() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated());
        setRole(getUserRole());
    }, []);

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    Study Abroad Portal
                </Link>
                <div className="flex space-x-6 items-center">
                    {authenticated ? (
                        <>
                            {role === 'admin' ? (
                                <>
                                    <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                                    <Link href="/admin/scholarships" className="text-gray-700 hover:text-blue-600">Manage Scholarships</Link>
                                    <Link href="/admin/applications" className="text-gray-700 hover:text-blue-600">All Applications</Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/scholarships" className="text-gray-700 hover:text-blue-600">Scholarships</Link>
                                    <Link href="/my-applications" className="text-gray-700 hover:text-blue-600">My Applications</Link>
                                </>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                            <Link href="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
                            <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}