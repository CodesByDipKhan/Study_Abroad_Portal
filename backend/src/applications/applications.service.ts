import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { Scholarship } from '../scholarships/entities/scholarship.entity';
import { User } from '../users/entities/user.entity';
import { ApplicationStatus } from '../common/enums/status.enum';

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
        @InjectRepository(Scholarship)
        private scholarshipRepository: Repository<Scholarship>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(userId: string, createDto: CreateApplicationDto) {
        const { scholarshipId } = createDto;

        // Check duplicate
        const existing = await this.applicationRepository.findOne({
            where: { userId, scholarshipId },
        });
        if (existing) {
            throw new ConflictException('You have already applied to this scholarship');
        }

        // Verify scholarship exists
        const scholarship = await this.scholarshipRepository.findOne({ where: { id: scholarshipId } });
        if (!scholarship) {
            throw new NotFoundException('Scholarship not found');
        }

        // Verify user exists
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Create application using relations (not just IDs)
        const application = this.applicationRepository.create({
            user,
            scholarship,
            status: ApplicationStatus.PENDING,
        });

        const saved = await this.applicationRepository.save(application);
        console.log(`Application created: ${saved.id} for user ${userId}`);

        return saved;
    }

    async findMyApplications(userId: string) {
        return await this.applicationRepository.find({
            where: { userId },
            relations: ['scholarship'],
            order: { appliedAt: 'DESC' },
        });
    }

    async findOne(id: string, userId?: string, isAdmin = false) {
        const application = await this.applicationRepository.findOne({
            where: { id },
            relations: ['scholarship', 'user', 'documents'],
        });
        if (!application) {
            throw new NotFoundException('Application not found');
        }
        if (!isAdmin && application.userId !== userId) {
            throw new NotFoundException('Application not found');
        }
        return application;
    }

    async findAll(query: ApplicationQueryDto) {
        const { page, limit } = query;
        const currentPage = page ?? 1;
        const currentLimit = limit ?? 10;
        const skip = (currentPage - 1) * currentLimit;

        const [data, total] = await this.applicationRepository.findAndCount({
            relations: ['user', 'scholarship'],
            skip,
            take: currentLimit,
            order: { appliedAt: 'DESC' },
        });

        return {
            data,
            total,
            page: currentPage,
            limit: currentLimit,
            totalPages: Math.ceil(total / currentLimit),
        };
    }

    async updateStatus(id: string, updateDto: UpdateStatusDto) {
        const application = await this.applicationRepository.findOne({
            where: { id },
            relations: ['user', 'scholarship'],
        });
        if (!application) {
            throw new NotFoundException('Application not found');
        }
        application.status = updateDto.status;
        const updated = await this.applicationRepository.save(application);
        console.log(`Application ${id} status changed to ${updateDto.status}`);
        return updated;
    }
}