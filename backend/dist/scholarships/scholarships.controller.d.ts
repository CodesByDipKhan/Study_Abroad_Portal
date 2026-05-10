import { ScholarshipsService } from './scholarships.service';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { ScholarshipQueryDto } from './dto/scholarship-query.dto';
export declare class ScholarshipsController {
    private readonly scholarshipsService;
    constructor(scholarshipsService: ScholarshipsService);
    create(createDto: CreateScholarshipDto, req: any): Promise<import("./entities/scholarship.entity").Scholarship>;
    findAll(query: ScholarshipQueryDto): Promise<{
        data: import("./entities/scholarship.entity").Scholarship[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./entities/scholarship.entity").Scholarship>;
    update(id: string, updateDto: UpdateScholarshipDto): Promise<import("./entities/scholarship.entity").Scholarship>;
    remove(id: string): Promise<import("./entities/scholarship.entity").Scholarship>;
}
