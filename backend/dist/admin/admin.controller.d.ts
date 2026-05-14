import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
            status: import("../common/enums/status.enum").ApplicationStatus;
            appliedAt: Date;
        }[];
    }>;
}
