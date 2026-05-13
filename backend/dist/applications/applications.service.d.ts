import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { Scholarship } from '../scholarships/entities/scholarship.entity';
import { User } from '../users/entities/user.entity';
import { MailService } from '../mail/mail.service';
export declare class ApplicationsService {
    private applicationRepository;
    private scholarshipRepository;
    private userRepository;
    private mailService;
    constructor(applicationRepository: Repository<Application>, scholarshipRepository: Repository<Scholarship>, userRepository: Repository<User>, mailService: MailService);
    create(userId: string, createDto: CreateApplicationDto): Promise<Application>;
    findMyApplications(userId: string): Promise<Application[]>;
    findOne(id: string, userId?: string, isAdmin?: boolean): Promise<Application>;
    findAll(query: ApplicationQueryDto): Promise<{
        data: Application[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateStatus(id: string, updateDto: UpdateStatusDto): Promise<Application>;
}
