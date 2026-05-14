'use client';

import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import { FileType } from '@/types/document.types';

interface DocumentUploadProps {
    applicationId: string;
    onUploadSuccess: () => void;
}

export default function DocumentUpload({ applicationId, onUploadSuccess }: DocumentUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<FileType>('SOP');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setUploading(true);
        setMessage('');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('applicationId', applicationId);
        formData.append('fileType', fileType);
        try {
            await axiosInstance.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Upload successful!');
            setFile(null);
            onUploadSuccess();
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mt-4">
            <h3 className="font-semibold mb-2 text-gray-800">Upload Document</h3>
            <div className="flex flex-col gap-2">
                <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as FileType)}
                    className="px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="SOP">Statement of Purpose (SOP)</option>
                    <option value="Transcript">Transcript</option>
                    <option value="Passport">Passport Copy</option>
                </select>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="border rounded p-1 text-gray-900"
                    required
                />
                <button
                    type="submit"
                    disabled={uploading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                >
                    {uploading ? 'Uploading...' : 'Upload PDF'}
                </button>
                {message && <p className="text-sm text-green-600">{message}</p>}
            </div>
        </form>
    );
}