import { StudyLevel } from '../../common/enums/study-level.enum';
import { User } from '../../users/entities/user.entity';
import { Application } from '../../applications/entities/application.entity';
export declare class Scholarship {
    id: string;
    title: string;
    country: string;
    university: string;
    deadline: Date;
    level: StudyLevel;
    description: string;
    createdAt: Date;
    createdBy: User;
    createdById: string;
    applications: Application[];
}
