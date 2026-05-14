import { Application } from '@/types/application.types';
import StatusBadge from '../common/StatusBadge';

interface RecentApplicationsTableProps {
    applications: Application[];
}

export default function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Student</th>
                            <th className="px-4 py-2 text-left">Scholarship</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.id} className="border-t">
                                <td className="px-4 py-2">{app.user?.name}</td>
                                <td className="px-4 py-2">{app.scholarship?.title}</td>
                                <td className="px-4 py-2"><StatusBadge status={app.status} /></td>
                                <td className="px-4 py-2">{new Date(app.appliedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}