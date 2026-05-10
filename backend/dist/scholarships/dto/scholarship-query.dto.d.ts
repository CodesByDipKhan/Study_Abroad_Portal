import { StudyLevel } from '../../common/enums/study-level.enum';
export declare class ScholarshipQueryDto {
    country?: string;
    level?: StudyLevel;
    q?: string;
    page?: number;
    limit?: number;
}
