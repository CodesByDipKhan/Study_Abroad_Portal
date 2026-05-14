export type FileType = 'SOP' | 'Transcript' | 'Passport';

export interface Document {
    id: string;
    fileType: FileType;
    fileUrl: string;
    uploadedAt: string;
    applicationId: string;
}

export interface UploadDocumentPayload {
    applicationId: string;
    fileType: FileType;
    file: File;
}