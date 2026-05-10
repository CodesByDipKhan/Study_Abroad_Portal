import { IsString, IsDate, IsEnum, MinDate } from 'class-validator';
import { Type } from 'class-transformer';
import { StudyLevel } from '../../common/enums/study-level.enum';

export class CreateScholarshipDto {
    @IsString()
    title: string;

    @IsString()
    country: string;

    @IsString()
    university: string;

    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    deadline: Date;

    @IsEnum(StudyLevel)
    level: StudyLevel;

    @IsString()
    description: string;
}