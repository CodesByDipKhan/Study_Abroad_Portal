import { Document } from '@/types/document.types';

interface DocumentListProps {
    documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
    if (!documents.length) return <p className="text-gray-500">No documents uploaded yet.</p>;
    return (
        <div className="mt-2">
            <h4 className="font-medium">Uploaded Documents:</h4>
            <ul className="list-disc list-inside">
                {documents.map((doc) => (
                    <li key={doc.id}>
                        <a href={`${process.env.NEXT_PUBLIC_API_URL}${doc.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {doc.fileType}
                        </a> ({new Date(doc.uploadedAt).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}