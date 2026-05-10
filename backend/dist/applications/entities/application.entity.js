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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const typeorm_1 = require("typeorm");
const status_enum_1 = require("../../common/enums/status.enum");
const user_entity_1 = require("../../users/entities/user.entity");
const scholarship_entity_1 = require("../../scholarships/entities/scholarship.entity");
const document_entity_1 = require("../../documents/entities/document.entity");
let Application = class Application {
    id;
    status;
    appliedAt;
    user;
    userId;
    scholarship;
    scholarshipId;
    documents;
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: status_enum_1.ApplicationStatus, default: status_enum_1.ApplicationStatus.PENDING }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "appliedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    __metadata("design:type", user_entity_1.User)
], Application.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => scholarship_entity_1.Scholarship, { nullable: false }),
    __metadata("design:type", scholarship_entity_1.Scholarship)
], Application.prototype, "scholarship", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "scholarshipId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (document) => document.application),
    __metadata("design:type", Array)
], Application.prototype, "documents", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)('applications'),
    (0, typeorm_1.Unique)(['userId', 'scholarshipId'])
], Application);
//# sourceMappingURL=application.entity.js.map