import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Application } from '../applications/entities/application.entity';
import { UploadDocumentDto } from './dto/upload-document.dto';
export declare class DocumentsService {
    private documentRepository;
    private applicationRepository;
    constructor(documentRepository: Repository<Document>, applicationRepository: Repository<Application>);
    upload(userId: string, uploadDto: UploadDocumentDto, file: Express.Multer.File): Promise<Document>;
    findMyDocuments(userId: string): Promise<Document[]>;
}
