import { Repository } from 'typeorm';
import { Scholarship } from './entities/scholarship.entity';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { ScholarshipQueryDto } from './dto/scholarship-query.dto';
export declare class ScholarshipsService {
    private scholarshipRepository;
    constructor(scholarshipRepository: Repository<Scholarship>);
    create(createDto: CreateScholarshipDto, adminId: string): Promise<Scholarship>;
    findAll(query: ScholarshipQueryDto): Promise<{
        data: Scholarship[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Scholarship>;
    update(id: string, updateDto: UpdateScholarshipDto): Promise<Scholarship>;
    remove(id: string): Promise<Scholarship>;
}
