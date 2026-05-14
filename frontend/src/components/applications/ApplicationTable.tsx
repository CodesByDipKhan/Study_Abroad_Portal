import { Application } from '@/types/application.types';
import StatusBadge from '../common/StatusBadge';

interface ApplicationTableProps {
    applications: Application[];
    onStatusUpdate: (appId: string) => void;
}

export default function ApplicationTable({ applications, onStatusUpdate }: ApplicationTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Student Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Scholarship</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Applied Date</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id} className="border-t">
                            <td className="px-4 py-2">{app.user?.name}</td>
                            <td className="px-4 py-2">{app.user?.email}</td>
                            <td className="px-4 py-2">{app.scholarship?.title}</td>
                            <td className="px-4 py-2"><StatusBadge status={app.status} /></td>
                            <td className="px-4 py-2">{new Date(app.appliedAt).toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    onClick={() => onStatusUpdate(app.id)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                >
                                    Update Status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}