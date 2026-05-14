'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import ApplicationTable from '@/components/applications/ApplicationTable';
import StatusUpdateModal from '@/components/applications/StatusUpdateModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import axiosInstance from '@/lib/axios';
import { Application } from '@/types/application.types';

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/applications?limit=100');
            setApplications(response.data.data);
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusUpdate = (appId: string) => {
        const app = applications.find(a => a.id === appId);
        if (app) {
            setSelectedAppId(appId);
            setSelectedStatus(app.status);
        }
    };

    const handleModalClose = () => {
        setSelectedAppId(null);
        setSelectedStatus('');
    };

    const handleStatusUpdated = () => {
        fetchApplications();
        handleModalClose();
    };

    return (
        <ProtectedRoute role="admin">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 bg-gray-100">
                        <h1 className="text-2xl font-bold mb-6">All Applications</h1>
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <ApplicationTable applications={applications} onStatusUpdate={handleStatusUpdate} />
                        )}
                    </main>
                </div>
                <Footer />
            </div>
            {selectedAppId && (
                <StatusUpdateModal
                    applicationId={selectedAppId}
                    currentStatus={selectedStatus as any}
                    onClose={handleModalClose}
                    onUpdated={handleStatusUpdated}
                />
            )}
        </ProtectedRoute>
    );
}