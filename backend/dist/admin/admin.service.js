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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const scholarship_entity_1 = require("../scholarships/entities/scholarship.entity");
const application_entity_1 = require("../applications/entities/application.entity");
const role_enum_1 = require("../common/enums/role.enum");
const status_enum_1 = require("../common/enums/status.enum");
let AdminService = class AdminService {
    userRepository;
    scholarshipRepository;
    applicationRepository;
    constructor(userRepository, scholarshipRepository, applicationRepository) {
        this.userRepository = userRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.applicationRepository = applicationRepository;
    }
    async getDashboard() {
        const totalAspirants = await this.userRepository.count({
            where: { role: role_enum_1.Role.ASPIRANT },
        });
        const totalScholarships = await this.scholarshipRepository.count();
        const totalApplications = await this.applicationRepository.count();
        const applicationsByStatus = {
            pending: await this.applicationRepository.count({ where: { status: status_enum_1.ApplicationStatus.PENDING } }),
            under_review: await this.applicationRepository.count({ where: { status: status_enum_1.ApplicationStatus.UNDER_REVIEW } }),
            accepted: await this.applicationRepository.count({ where: { status: status_enum_1.ApplicationStatus.ACCEPTED } }),
            rejected: await this.applicationRepository.count({ where: { status: status_enum_1.ApplicationStatus.REJECTED } }),
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(scholarship_entity_1.Scholarship)),
    __param(2, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map