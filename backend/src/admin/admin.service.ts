import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Scholarship } from '../scholarships/entities/scholarship.entity';
import { Application } from '../applications/entities/application.entity';
import { Role } from '../common/enums/role.enum';
import { ApplicationStatus } from '../common/enums/status.enum';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Scholarship)
        private scholarshipRepository: Repository<Scholarship>,
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
    ) { }

    async getDashboard() {
        const totalAspirants = await this.userRepository.count({
            where: { role: Role.ASPIRANT },
        });

        const totalScholarships = await this.scholarshipRepository.count();

        const totalApplications = await this.applicationRepository.count();

        const applicationsByStatus = {
            pending: await this.applicationRepository.count({ where: { status: ApplicationStatus.PENDING } }),
            under_review: await this.applicationRepository.count({ where: { status: ApplicationStatus.UNDER_REVIEW } }),
            accepted: await this.applicationRepository.count({ where: { status: ApplicationStatus.ACCEPTED } }),
            rejected: await this.applicationRepository.count({ where: { status: ApplicationStatus.REJECTED } }),
        };

        const recentApplications = await this.applicationRepository.find({
            relations: ['user', 'scholarship'],
            order: { appliedAt: 'DESC' },
            take: 10,
        });

        const formattedRecent = recentApplications.map(app => ({
            id: app.id,
            userName: app.user.name,
            userEmail: app.user.email,
            scholarshipTitle: app.scholarship.title,
            status: app.status,
            appliedAt: app.appliedAt,
        }));

        return {
            totalAspirants,
            totalScholarships,
            totalApplications,
            applicationsByStatus,
            recentApplications: formattedRecent,
        };
    }
}