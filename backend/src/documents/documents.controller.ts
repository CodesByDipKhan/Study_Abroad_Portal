import { Controller, Post, Get, UseInterceptors, UploadedFile, Body, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('documents')
@Controller('documents')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueName = uuidv4();
                const extension = extname(file.originalname);
                callback(null, `${uniqueName}${extension}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            // Check MIME type
            if (file.mimetype !== 'application/pdf') {
                return callback(new BadRequestException('Only PDF files are allowed'), false);
            }
            // Check file extension
            const allowedExt = ['.pdf'];
            const ext = extname(file.originalname).toLowerCase();
            if (!allowedExt.includes(ext)) {
                return callback(new BadRequestException('Only PDF files are allowed'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
    }))
    @ApiOperation({ summary: 'Upload a document (PDF, max 5MB)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
                applicationId: { type: 'string' },
                fileType: { enum: ['SOP', 'Transcript', 'Passport'] },
            },
        },
    })
    async uploadDocument(
        @Request() req,
        @Body() uploadDto: UploadDocumentDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        return this.documentsService.upload(req.user.id, uploadDto, file);
    }

    @Get('my')
    @ApiOperation({ summary: 'Get my documents (Aspirant)' })
    getMyDocuments(@Request() req) {
        return this.documentsService.findMyDocuments(req.user.id);
    }
}