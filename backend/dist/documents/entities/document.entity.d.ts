import { FileType } from '../../common/enums/file-type.enum';
import { Application } from '../../applications/entities/application.entity';
export declare class Document {
    id: string;
    fileType: FileType;
    fileUrl: string;
    uploadedAt: Date;
    application: Application;
    applicationId: string;
}
