'use client';

import { useState } from 'react';
import { ScholarshipQuery } from '@/types/scholarship.types';

interface ScholarshipFilterProps {
    onFilter: (filters: ScholarshipQuery) => void;
}

export default function ScholarshipFilter({ onFilter }: ScholarshipFilterProps) {
    const [country, setCountry] = useState('');
    const [level, setLevel] = useState('');
    const [search, setSearch] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const filters: ScholarshipQuery = {};
        if (country) filters.country = country;
        if (level) filters.level = level as any;
        if (search) filters.q = search;
        onFilter(filters);
    };

    const handleReset = () => {
        setCountry('');
        setLevel('');
        setSearch('');
        onFilter({});
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Levels</option>
                    <option value="UG">Undergraduate (UG)</option>
                    <option value="PG">Postgraduate (PG)</option>
                    <option value="PhD">PhD</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                        Filter
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </form>
    );
}