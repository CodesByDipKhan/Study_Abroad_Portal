import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { StudyLevel } from '../../common/enums/study-level.enum';

export class ScholarshipQueryDto {
    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsEnum(StudyLevel)
    level?: StudyLevel;

    @IsOptional()
    @IsString()
    q?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit?: number = 10;
}