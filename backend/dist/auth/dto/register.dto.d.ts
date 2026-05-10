import { Role } from '../../common/enums/role.enum';
import { StudyLevel } from '../../common/enums/study-level.enum';
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: Role;
    studyLevel?: StudyLevel;
}
