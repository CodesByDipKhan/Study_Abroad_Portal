import { ApplicationStatus } from '../../common/enums/status.enum';
import { User } from '../../users/entities/user.entity';
import { Scholarship } from '../../scholarships/entities/scholarship.entity';
import { Document } from '../../documents/entities/document.entity';
export declare class Application {
    id: string;
    status: ApplicationStatus;
    appliedAt: Date;
    user: User;
    userId: string;
    scholarship: Scholarship;
    scholarshipId: string;
    documents: Document[];
}
