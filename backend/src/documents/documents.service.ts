import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Application } from '../applications/entities/application.entity';
import { UploadDocumentDto } from './dto/upload-document.dto';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
    ) { }

    async upload(userId: string, uploadDto: UploadDocumentDto, file: Express.Multer.File) {
        const { applicationId, fileType } = uploadDto;

        const application = await this.applicationRepository.findOne({
            where: { id: applicationId, userId },
        });
        if (!application) {
            throw new NotFoundException('Application not found or does not belong to you');
        }

        const document = this.documentRepository.create({
            fileType,
            fileUrl: `/uploads/${file.filename}`,
            application,
        });

        return await this.documentRepository.save(document);
    }

    async findMyDocuments(userId: string) {
        return await this.documentRepository.find({
            where: { application: { userId } },
            relations: ['application'],
            order: { uploadedAt: 'DESC' },
        });
    }
}