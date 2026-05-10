import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('applications')
@Controller('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }

    @Post()
    @ApiOperation({ summary: 'Apply to a scholarship (Aspirant only)' })
    create(@Request() req, @Body() createDto: CreateApplicationDto) {
        return this.applicationsService.create(req.user.id, createDto);
    }

    @Get('my')
    @ApiOperation({ summary: 'Get my applications (Aspirant)' })
    findMyApplications(@Request() req) {
        return this.applicationsService.findMyApplications(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get single application by ID' })
    findOne(@Param('id') id: string, @Request() req) {
        // Check if user is admin
        const isAdmin = req.user.role === Role.ADMIN;
        return this.applicationsService.findOne(id, req.user.id, isAdmin);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Get all applications (Admin only)' })
    findAll(@Query() query: ApplicationQueryDto) {
        return this.applicationsService.findAll(query);
    }

    @Patch(':id/status')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Update application status (Admin only)' })
    updateStatus(@Param('id') id: string, @Body() updateDto: UpdateStatusDto) {
        return this.applicationsService.updateStatus(id, updateDto);
    }
}