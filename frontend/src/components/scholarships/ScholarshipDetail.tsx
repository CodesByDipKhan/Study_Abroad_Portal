'use client';

import { useState } from 'react';
import { Scholarship } from '@/types/scholarship.types';
import StatusBadge from '../common/StatusBadge';
import axiosInstance from '@/lib/axios';
import { getToken } from '@/lib/auth';

interface ScholarshipDetailProps {
    scholarship: Scholarship;
    onApply?: () => void;
}

export default function ScholarshipDetail({ scholarship, onApply }: ScholarshipDetailProps) {
    const [applying, setApplying] = useState(false);
    const [message, setMessage] = useState('');

    const handleApply = async () => {
        if (!getToken()) {
            window.location.href = '/login';
            return;
        }
        setApplying(true);
        setMessage('');
        try {
            await axiosInstance.post('/applications', { scholarshipId: scholarship.id });
            setMessage('Application submitted successfully!');
            if (onApply) onApply();
        } catch (err: any) {
            if (err.response?.status === 409) {
                setMessage('You have already applied to this scholarship.');
            } else {
                setMessage('Failed to apply. Please try again.');
            }
        } finally {
            setApplying(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-2">{scholarship.title}</h1>
            <p className="text-xl text-gray-600 mb-1">{scholarship.university}</p>
            <p className="text-gray-500 mb-4">{scholarship.country}</p>
            <div className="mb-4">
                <StatusBadge status={scholarship.level} />
                <span className="ml-4 text-red-500">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{scholarship.description}</p>
            </div>
            {message && <div className="mb-4 p-2 rounded bg-blue-100 text-blue-700">{message}</div>}
            <button
                onClick={handleApply}
                disabled={applying}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
                {applying ? 'Applying...' : 'Apply Now'}
            </button>
        </div>
    );
}