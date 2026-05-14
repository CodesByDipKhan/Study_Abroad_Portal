import { Application } from '@/types/application.types';
import StatusBadge from '../common/StatusBadge';

interface RecentApplicationsTableProps {
    applications: Application[];
}

export default function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
            {applications.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent applications</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-900 font-semibold">Student</th>
                                <th className="px-4 py-2 text-left text-gray-900 font-semibold">Scholarship</th>
                                <th className="px-4 py-2 text-left text-gray-900 font-semibold">Status</th>
                                <th className="px-4 py-2 text-left text-gray-900 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id} className="border-t">
                                    <td className="px-4 py-2 text-gray-800">{app.user?.name || 'N/A'}</td>
                                    <td className="px-4 py-2 text-gray-800">{app.scholarship?.title || 'N/A'}</td>
                                    <td className="px-4 py-2"><StatusBadge status={app.status} /></td>
                                    <td className="px-4 py-2 text-gray-800">{new Date(app.appliedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}