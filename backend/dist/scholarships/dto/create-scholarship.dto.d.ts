import { StudyLevel } from '../../common/enums/study-level.enum';
export declare class CreateScholarshipDto {
    title: string;
    country: string;
    university: string;
    deadline: Date;
    level: StudyLevel;
    description: string;
}
