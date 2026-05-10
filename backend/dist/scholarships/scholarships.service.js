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
exports.ScholarshipsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const scholarship_entity_1 = require("./entities/scholarship.entity");
let ScholarshipsService = class ScholarshipsService {
    scholarshipRepository;
    constructor(scholarshipRepository) {
        this.scholarshipRepository = scholarshipRepository;
    }
    async create(createDto, adminId) {
        const scholarship = this.scholarshipRepository.create({
            ...createDto,
            createdById: adminId,
        });
        return await this.scholarshipRepository.save(scholarship);
    }
    async findAll(query) {
        const { country, level, q, page, limit } = query;
        const currentPage = page ?? 1;
        const currentLimit = limit ?? 10;
        const skip = (currentPage - 1) * currentLimit;
        const where = {};
        if (country) {
            where.country = country;
        }
        if (level) {
            where.level = level;
        }
        if (q) {
            where.title = (0, typeorm_2.Like)(`%${q}%`);
        }
        const [data, total] = await this.scholarshipRepository.findAndCount({
            where,
            skip,
            take: currentLimit,
            order: { createdAt: 'DESC' },
        });
        return {
            data,
            total,
            page: currentPage,
            limit: currentLimit,
            totalPages: Math.ceil(total / currentLimit),
        };
    }
    async findOne(id) {
        const scholarship = await this.scholarshipRepository.findOne({ where: { id } });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        return scholarship;
    }
    async update(id, updateDto) {
        const scholarship = await this.findOne(id);
        Object.assign(scholarship, updateDto);
        return await this.scholarshipRepository.save(scholarship);
    }
    async remove(id) {
        const scholarship = await this.findOne(id);
        return await this.scholarshipRepository.remove(scholarship);
    }
};
exports.ScholarshipsService = ScholarshipsService;
exports.ScholarshipsService = ScholarshipsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(scholarship_entity_1.Scholarship)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ScholarshipsService);
//# sourceMappingURL=scholarships.service.js.map