import { IsUUID } from 'class-validator';

export class CreateApplicationDto {
    @IsUUID()
    scholarshipId: string;
}