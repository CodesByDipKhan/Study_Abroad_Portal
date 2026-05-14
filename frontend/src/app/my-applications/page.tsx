'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ApplicationCard from '@/components/applications/ApplicationCard';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import axiosInstance from '@/lib/axios';
import { Application } from '@/types/application.types';

export default function MyApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/applications/my');
            setApplications(response.data);
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [refresh]);

    const handleDocumentUpload = () => setRefresh(!refresh);

    return (
        <ProtectedRoute role="aspirant">
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-6">My Applications</h1>
                    {loading ? (
                        <LoadingSpinner />
                    ) : applications.length === 0 ? (
                        <p className="text-gray-500">You haven't applied to any scholarships yet.</p>
                    ) : (
                        applications.map((app) => (
                            <div key={app.id} className="mb-6 border rounded-lg p-4 bg-white shadow">
                                <ApplicationCard application={app} />
                                <DocumentList documents={app.documents || []} />
                                <DocumentUpload applicationId={app.id} onUploadSuccess={handleDocumentUpload} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </ProtectedRoute>
    );
}