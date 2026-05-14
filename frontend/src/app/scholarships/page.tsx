'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ScholarshipCard from '@/components/scholarships/ScholarshipCard';
import ScholarshipFilter from '@/components/scholarships/ScholarshipFilter';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import axiosInstance from '@/lib/axios';
import { Scholarship, ScholarshipQuery } from '@/types/scholarship.types';

export default function ScholarshipsPage() {
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<ScholarshipQuery>({ page: 1, limit: 10 });
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchScholarships = async () => {
        setLoading(true);
        try {
            const params = { ...filters, page: currentPage };
            const response = await axiosInstance.get('/scholarships', { params });
            setScholarships(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch scholarships', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScholarships();
    }, [filters, currentPage]);

    const handleFilter = (newFilters: ScholarshipQuery) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    return (
        <ProtectedRoute role="aspirant">
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-6">Available Scholarships</h1>
                    <ScholarshipFilter onFilter={handleFilter} />
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {scholarships.map((scholarship) => (
                                    <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </ProtectedRoute>
    );
}