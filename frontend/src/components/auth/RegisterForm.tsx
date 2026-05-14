'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState<'admin' | 'aspirant'>('aspirant');
    const [studyLevel, setStudyLevel] = useState<'UG' | 'PG' | 'PhD'>('UG');
    const [error, setError] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleClear = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('aspirant');
        setStudyLevel('UG');
        setError('');
        setPasswordMismatch(false);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (confirmPassword && e.target.value !== confirmPassword) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setPasswordMismatch(false);

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name,
                email,
                password,
                role,
                studyLevel: role === 'aspirant' ? studyLevel : undefined,
            };
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
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-800 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="mb-4 relative">
                    <label className="block text-gray-800 font-medium mb-1">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        required
                        minLength={6}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4 relative">
                    <label className="block text-gray-800 font-medium mb-1">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
                    >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                    {passwordMismatch && (
                        <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 font-medium mb-1">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'admin' | 'aspirant')}
                        className="w-full px-3 py-2 border rounded text-gray-900"
                    >
                        <option value="aspirant">Aspirant (Student)</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {role === 'aspirant' && (
                    <div className="mb-4">
                        <label className="block text-gray-800 font-medium mb-1">Study Level</label>
                        <select
                            value={studyLevel}
                            onChange={(e) => setStudyLevel(e.target.value as 'UG' | 'PG' | 'PhD')}
                            className="w-full px-3 py-2 border rounded text-gray-900"
                        >
                            <option value="UG">Undergraduate (UG)</option>
                            <option value="PG">Postgraduate (PG)</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleClear}
                        className="flex-1 bg-red-600 text-white py-2 rounded font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
}