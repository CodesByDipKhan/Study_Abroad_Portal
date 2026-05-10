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
exports.ScholarshipsController = void 0;
const common_1 = require("@nestjs/common");
const scholarships_service_1 = require("./scholarships.service");
const create_scholarship_dto_1 = require("./dto/create-scholarship.dto");
const update_scholarship_dto_1 = require("./dto/update-scholarship.dto");
const scholarship_query_dto_1 = require("./dto/scholarship-query.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let ScholarshipsController = class ScholarshipsController {
    scholarshipsService;
    constructor(scholarshipsService) {
        this.scholarshipsService = scholarshipsService;
    }
    create(createDto, req) {
        return this.scholarshipsService.create(createDto, req.user.id);
    }
    findAll(query) {
        return this.scholarshipsService.findAll(query);
    }
    findOne(id) {
        return this.scholarshipsService.findOne(id);
    }
    update(id, updateDto) {
        return this.scholarshipsService.update(id, updateDto);
    }
    remove(id) {
        return this.scholarshipsService.remove(id);
    }
};
exports.ScholarshipsController = ScholarshipsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new scholarship (Admin only)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scholarship_dto_1.CreateScholarshipDto, Object]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all scholarships with filters and pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'country', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'level', required: false, enum: role_enum_1.Role }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false, description: 'Search by title' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [scholarship_query_dto_1.ScholarshipQueryDto]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single scholarship by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a scholarship (Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_scholarship_dto_1.UpdateScholarshipDto]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a scholarship (Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "remove", null);
exports.ScholarshipsController = ScholarshipsController = __decorate([
    (0, swagger_1.ApiTags)('scholarships'),
    (0, common_1.Controller)('scholarships'),
    __metadata("design:paramtypes", [scholarships_service_1.ScholarshipsService])
], ScholarshipsController);
//# sourceMappingURL=scholarships.controller.js.map