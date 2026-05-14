'use client';

import { useState, useEffect } from 'react';
import { Scholarship, CreateScholarshipPayload } from '@/types/scholarship.types';
import axiosInstance from '@/lib/axios';

interface ScholarshipFormProps {
    initialData?: Scholarship;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ScholarshipForm({ initialData, onSuccess, onCancel }: ScholarshipFormProps) {
    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [university, setUniversity] = useState('');
    const [deadline, setDeadline] = useState('');
    const [level, setLevel] = useState<'UG' | 'PG' | 'PhD'>('UG');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setCountry(initialData.country);
            setUniversity(initialData.university);
            setDeadline(initialData.deadline.split('T')[0]);
            setLevel(initialData.level);
            setDescription(initialData.description);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const payload: CreateScholarshipPayload = { title, country, university, deadline, level, description };
            if (initialData) {
                await axiosInstance.patch(`/scholarships/${initialData.id}`, payload);
            } else {
                await axiosInstance.post('/scholarships', payload);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save scholarship');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Scholarship' : 'Add Scholarship'}</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Country</label>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">University</label>
                        <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} className="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Deadline</label>
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Level</label>
                        <select value={level} onChange={(e) => setLevel(e.target.value as any)} className="w-full px-3 py-2 border rounded">
                            <option value="UG">Undergraduate (UG)</option>
                            <option value="PG">Postgraduate (PG)</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}