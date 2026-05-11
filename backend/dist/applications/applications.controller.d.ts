import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApplicationQueryDto } from './dto/application-query.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    create(req: any, createDto: CreateApplicationDto): Promise<import("./entities/application.entity").Application>;
    findMyApplications(req: any): Promise<import("./entities/application.entity").Application[]>;
    findOne(id: string, req: any): Promise<import("./entities/application.entity").Application>;
    findAll(query: ApplicationQueryDto): Promise<{
        data: import("./entities/application.entity").Application[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateStatus(id: string, updateDto: UpdateStatusDto): Promise<import("./entities/application.entity").Application>;
}
