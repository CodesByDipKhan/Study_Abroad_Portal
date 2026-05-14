import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Scholarship } from '../scholarships/entities/scholarship.entity';
import { Application } from '../applications/entities/application.entity';
import { ApplicationStatus } from '../common/enums/status.enum';
export declare class AdminService {
    private userRepository;
    private scholarshipRepository;
    private applicationRepository;
    constructor(userRepository: Repository<User>, scholarshipRepository: Repository<Scholarship>, applicationRepository: Repository<Application>);
    getDashboard(): Promise<{
        totalAspirants: number;
        totalScholarships: number;
        totalApplications: number;
        applicationsByStatus: {
            pending: number;
            under_review: number;
            accepted: number;
            rejected: number;
        };
        recentApplications: {
            id: string;
            userName: string;
            userEmail: string;
            scholarshipTitle: string;
            status: ApplicationStatus;
            appliedAt: Date;
        }[];
    }>;
}
