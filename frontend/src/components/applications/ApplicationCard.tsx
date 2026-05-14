import { Application } from '@/types/application.types';
import StatusBadge from '../common/StatusBadge';

interface ApplicationCardProps {
    application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{application.scholarship?.title}</h3>
                    <p className="text-gray-700">University: {application.scholarship?.university}</p>
                    <p className="text-gray-600 text-sm">Applied: {new Date(application.appliedAt).toLocaleDateString()}</p>
                </div>
                <StatusBadge status={application.status} />
            </div>
        </div>
    );
}