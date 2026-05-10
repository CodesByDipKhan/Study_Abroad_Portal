import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Scholarship } from './entities/scholarship.entity';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { ScholarshipQueryDto } from './dto/scholarship-query.dto';

@Injectable()
export class ScholarshipsService {
    constructor(
        @InjectRepository(Scholarship)
        private scholarshipRepository: Repository<Scholarship>,
    ) { }

    async create(createDto: CreateScholarshipDto, adminId: string) {
        const scholarship = this.scholarshipRepository.create({
            ...createDto,
            createdById: adminId,
        });
        return await this.scholarshipRepository.save(scholarship);
    }

    async findAll(query: ScholarshipQueryDto) {
        const { country, level, q, page, limit } = query;

        // Ensure defaults
        const currentPage = page ?? 1;
        const currentLimit = limit ?? 10;
        const skip = (currentPage - 1) * currentLimit;

        const where: any = {};

        if (country) {
            where.country = country;
        }
        if (level) {
            where.level = level;
        }
        if (q) {
            where.title = Like(`%${q}%`);
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
    async findOne(id: string) {
        const scholarship = await this.scholarshipRepository.findOne({ where: { id } });
        if (!scholarship) {
            throw new NotFoundException('Scholarship not found');
        }
        return scholarship;
    }

    async update(id: string, updateDto: UpdateScholarshipDto) {
        const scholarship = await this.findOne(id);
        Object.assign(scholarship, updateDto);
        return await this.scholarshipRepository.save(scholarship);
    }

    async remove(id: string) {
        const scholarship = await this.findOne(id);
        return await this.scholarshipRepository.remove(scholarship);
    }
}