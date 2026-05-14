'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'aspirant'>('aspirant');
    const [studyLevel, setStudyLevel] = useState<'UG' | 'PG' | 'PhD'>('UG');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const payload = { name, email, password, role, studyLevel: role === 'aspirant' ? studyLevel : undefined };
            await axiosInstance.post('/auth/register', payload);
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        minLength={6}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'admin' | 'aspirant')}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="aspirant">Aspirant (Student)</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {role === 'aspirant' && (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Study Level</label>
                        <select
                            value={studyLevel}
                            onChange={(e) => setStudyLevel(e.target.value as 'UG' | 'PG' | 'PhD')}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="UG">Undergraduate (UG)</option>
                            <option value="PG">Postgraduate (PG)</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}