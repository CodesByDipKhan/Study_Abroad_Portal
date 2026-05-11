import { IsUUID, IsEnum } from 'class-validator';
import { FileType } from '../../common/enums/file-type.enum';

export class UploadDocumentDto {
    @IsUUID()
    applicationId: string;

    @IsEnum(FileType)
    fileType: FileType;
}