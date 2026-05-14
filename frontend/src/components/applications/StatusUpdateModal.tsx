'use client';

import { useState } from 'react';
import { ApplicationStatus } from '@/types/application.types';
import axiosInstance from '@/lib/axios';

interface StatusUpdateModalProps {
    applicationId: string;
    currentStatus: ApplicationStatus;
    onClose: () => void;
    onUpdated: () => void;
}

export default function StatusUpdateModal({ applicationId, currentStatus, onClose, onUpdated }: StatusUpdateModalProps) {
    const [status, setStatus] = useState<ApplicationStatus>(currentStatus);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.patch(`/applications/${applicationId}/status`, { status });
            onUpdated();
            onClose();
        } catch (error) {
            console.error('Failed to update status', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Update Application Status</h2>
                <form onSubmit={handleSubmit}>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                        className="w-full px-3 py-2 border rounded text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="under_review">Under Review</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-all duration-200 hover:scale-105 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}