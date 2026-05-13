"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("./entities/application.entity");
const scholarship_entity_1 = require("../scholarships/entities/scholarship.entity");
const user_entity_1 = require("../users/entities/user.entity");
const status_enum_1 = require("../common/enums/status.enum");
const mail_service_1 = require("../mail/mail.service");
let ApplicationsService = class ApplicationsService {
    applicationRepository;
    scholarshipRepository;
    userRepository;
    mailService;
    constructor(applicationRepository, scholarshipRepository, userRepository, mailService) {
        this.applicationRepository = applicationRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }
    async create(userId, createDto) {
        const { scholarshipId } = createDto;
        const existing = await this.applicationRepository.findOne({
            where: { userId, scholarshipId },
        });
        if (existing) {
            throw new common_1.ConflictException('You have already applied to this scholarship');
        }
        const scholarship = await this.scholarshipRepository.findOne({ where: { id: scholarshipId } });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const application = this.applicationRepository.create({
            user,
            scholarship,
            status: status_enum_1.ApplicationStatus.PENDING,
        });
        const saved = await this.applicationRepository.save(application);
        console.log(`Application created: ${saved.id} for user ${userId}`);
        try {
            await this.mailService.sendApplicationReceived(user, scholarship);
        }
        catch (error) {
            console.error('Failed to send application received email:', error.message);
        }
        return saved;
    }
    async findMyApplications(userId) {
        return await this.applicationRepository.find({
            where: { userId },
            relations: ['scholarship'],
            order: { appliedAt: 'DESC' },
        });
    }
    async findOne(id, userId, isAdmin = false) {
        const application = await this.applicationRepository.findOne({
            where: { id },
            relations: ['scholarship', 'user', 'documents'],
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (!isAdmin && application.userId !== userId) {
            throw new common_1.NotFoundException('Application not found');
        }
        return application;
    }
    async findAll(query) {
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
    async updateStatus(id, updateDto) {
        const application = await this.applicationRepository.findOne({
            where: { id },
            relations: ['user', 'scholarship'],
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        const oldStatus = application.status;
        application.status = updateDto.status;
        const updated = await this.applicationRepository.save(application);
        console.log(`Application ${id} status changed from ${oldStatus} to ${updateDto.status}`);
        try {
            await this.mailService.sendStatusUpdated(application.user, application.scholarship, updateDto.status);
        }
        catch (error) {
            console.error('Failed to send status update email:', error.message);
        }
        return updated;
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(1, (0, typeorm_1.InjectRepository)(scholarship_entity_1.Scholarship)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map