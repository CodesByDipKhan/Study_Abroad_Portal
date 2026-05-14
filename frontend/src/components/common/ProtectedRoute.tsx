'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUserRole } from '@/lib/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role?: 'admin' | 'aspirant';
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            if (!authenticated) {
                router.replace('/login');
                return;
            }

            if (role) {
                const userRole = getUserRole();
                if (userRole !== role) {
                    // Redirect to appropriate dashboard based on role
                    if (userRole === 'admin') {
                        router.replace('/admin/dashboard');
                    } else {
                        router.replace('/scholarships');
                    }
                    return;
                }
            }
            setIsAuthorized(true);
        };

        checkAuth();
    }, [router, role]);

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}