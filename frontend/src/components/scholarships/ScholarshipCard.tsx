import Link from 'next/link';
import { Scholarship } from '@/types/scholarship.types';

interface ScholarshipCardProps {
    scholarship: Scholarship;
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-gray-900">{scholarship.title}</h3>
            <p className="text-gray-700 mb-1">{scholarship.university}</p>
            <p className="text-gray-600 mb-2">{scholarship.country}</p>
            <div className="flex justify-between items-center mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">{scholarship.level}</span>
                <span className="text-sm text-red-600">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">{scholarship.description}</p>
            <Link
                href={`/scholarships/${scholarship.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                View Details
            </Link>
        </div>
    );
}