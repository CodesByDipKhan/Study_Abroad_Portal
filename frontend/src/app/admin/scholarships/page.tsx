'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import ScholarshipForm from '@/components/scholarships/ScholarshipForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import axiosInstance from '@/lib/axios';
import { Scholarship } from '@/types/scholarship.types';

export default function AdminScholarshipsPage() {
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingScholarship, setEditingScholarship] = useState<Scholarship | undefined>();

    const fetchScholarships = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/scholarships?limit=50');
            setScholarships(response.data.data);
        } catch (error) {
            console.error('Failed to fetch scholarships', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScholarships();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this scholarship?')) {
            try {
                await axiosInstance.delete(`/scholarships/${id}`);
                fetchScholarships();
            } catch (error) {
                console.error('Delete failed', error);
            }
        }
    };

    const handleEdit = (scholarship: Scholarship) => {
        setEditingScholarship(scholarship);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingScholarship(undefined);
        fetchScholarships();
    };

    return (
        <ProtectedRoute role="admin">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 bg-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Manage Scholarships</h1>
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                            >
                                + Add Scholarship
                            </button>
                        </div>
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="bg-white rounded shadow overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-gray-900">Title</th>
                                            <th className="px-4 py-2 text-left text-gray-900">University</th>
                                            <th className="px-4 py-2 text-left text-gray-900">Country</th>
                                            <th className="px-4 py-2 text-left text-gray-900">Level</th>
                                            <th className="px-4 py-2 text-left text-gray-900">Deadline</th>
                                            <th className="px-4 py-2 text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scholarships.map((sch) => (
                                            <tr key={sch.id} className="border-t">
                                                <td className="px-4 py-2 text-gray-900">{sch.title}</td>
                                                <td className="px-4 py-2 text-gray-900">{sch.university}</td>
                                                <td className="px-4 py-2 text-gray-900">{sch.country}</td>
                                                <td className="px-4 py-2 text-gray-900">{sch.level}</td>
                                                <td className="px-4 py-2 text-gray-900">{new Date(sch.deadline).toLocaleDateString()}</td>
                                                <td className="px-4 py-2 text-center space-x-2">
                                                    <button onClick={() => handleEdit(sch)} className="text-blue-600 hover:underline cursor-pointer">Edit</button>
                                                    <button onClick={() => handleDelete(sch.id)} className="text-red-600 hover:underline cursor-pointer">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </main>
                </div>
                <Footer />
            </div>
            {showForm && (
                <ScholarshipForm
                    initialData={editingScholarship}
                    onSuccess={handleFormSuccess}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingScholarship(undefined);
                    }}
                />
            )}
        </ProtectedRoute>
    );
}