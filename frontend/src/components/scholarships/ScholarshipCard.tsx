import Link from 'next/link';
import { Scholarship } from '@/types/scholarship.types';
import StatusBadge from '../common/StatusBadge';

interface ScholarshipCardProps {
    scholarship: Scholarship;
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{scholarship.title}</h3>
            <p className="text-gray-600 mb-1">{scholarship.university}</p>
            <p className="text-gray-500 mb-2">{scholarship.country}</p>
            <div className="flex justify-between items-center mb-3">
                <StatusBadge status={scholarship.level} />
                <span className="text-sm text-red-500">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">{scholarship.description}</p>
            <Link
                href={`/scholarships/${scholarship.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                View Details
            </Link>
        </div>
    );
}