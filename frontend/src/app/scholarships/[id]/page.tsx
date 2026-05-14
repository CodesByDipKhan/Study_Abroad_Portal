'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ScholarshipDetail from '@/components/scholarships/ScholarshipDetail';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import axiosInstance from '@/lib/axios';
import { Scholarship } from '@/types/scholarship.types';

export default function ScholarshipDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [scholarship, setScholarship] = useState<Scholarship | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const response = await axiosInstance.get(`/scholarships/${params.id}`);
                setScholarship(response.data);
            } catch (error) {
                console.error('Scholarship not found', error);
                router.push('/scholarships');
            } finally {
                setLoading(false);
            }
        };
        fetchScholarship();
    }, [params.id, router]);

    return (
        <ProtectedRoute role="aspirant">
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <LoadingSpinner />
                    ) : scholarship ? (
                        <ScholarshipDetail scholarship={scholarship} />
                    ) : (
                        <p className="text-center text-red-600">Scholarship not found</p>
                    )}
                </div>
            </div>
            <Footer />
        </ProtectedRoute>
    );
}