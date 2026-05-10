import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ScholarshipsService } from './scholarships.service';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { ScholarshipQueryDto } from './dto/scholarship-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('scholarships')
@Controller('scholarships')
export class ScholarshipsController {
    constructor(private readonly scholarshipsService: ScholarshipsService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new scholarship (Admin only)' })
    create(@Body() createDto: CreateScholarshipDto, @Request() req) {
        return this.scholarshipsService.create(createDto, req.user.id);
    }

    @Get()
    @ApiOperation({ summary: 'List all scholarships with filters and pagination' })
    @ApiQuery({ name: 'country', required: false })
    @ApiQuery({ name: 'level', required: false, enum: Role })
    @ApiQuery({ name: 'q', required: false, description: 'Search by title' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    findAll(@Query() query: ScholarshipQueryDto) {
        return this.scholarshipsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single scholarship by ID' })
    findOne(@Param('id') id: string) {
        return this.scholarshipsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a scholarship (Admin only)' })
    update(@Param('id') id: string, @Body() updateDto: UpdateScholarshipDto) {
        return this.scholarshipsService.update(id, updateDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a scholarship (Admin only)' })
    remove(@Param('id') id: string) {
        return this.scholarshipsService.remove(id);
    }
}