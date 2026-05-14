'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import StatsCard from '@/components/dashboard/StatsCard';
import ApplicationChart from '@/components/dashboard/ApplicationChart';
import RecentApplicationsTable from '@/components/dashboard/RecentApplicationsTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import axiosInstance from '@/lib/axios';

interface DashboardData {
    totalAspirants: number;
    totalScholarships: number;
    totalApplications: number;
    applicationsByStatus: {
        pending: number;
        under_review: number;
        accepted: number;
        rejected: number;
    };
    recentApplications: any[];
}

export default function AdminDashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axiosInstance.get('/admin/dashboard');
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch dashboard', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <ProtectedRoute role="admin">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 bg-gray-100">
                        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatsCard title="Total Aspirants" value={data?.totalAspirants || 0} color="border-blue-500" />
                            <StatsCard title="Total Scholarships" value={data?.totalScholarships || 0} color="border-green-500" />
                            <StatsCard title="Total Applications" value={data?.totalApplications || 0} color="border-purple-500" />
                            <StatsCard title="Pending Reviews" value={data?.applicationsByStatus?.pending || 0} color="border-yellow-500" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ApplicationChart data={data?.applicationsByStatus || { pending: 0, under_review: 0, accepted: 0, rejected: 0 }} />
                            <RecentApplicationsTable applications={data?.recentApplications || []} />
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}