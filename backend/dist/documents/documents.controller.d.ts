import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    uploadDocument(req: any, uploadDto: UploadDocumentDto, file: Express.Multer.File): Promise<import("./entities/document.entity").Document>;
    getMyDocuments(req: any): Promise<import("./entities/document.entity").Document[]>;
}
