import { Role } from '../../common/enums/role.enum';
import { StudyLevel } from '../../common/enums/study-level.enum';
import { Application } from '../../applications/entities/application.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    studyLevel: StudyLevel;
    resetToken: string;
    resetTokenExpiry: Date;
    createdAt: Date;
    applications: Application[];
}
