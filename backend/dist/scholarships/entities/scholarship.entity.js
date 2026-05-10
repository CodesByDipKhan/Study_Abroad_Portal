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
exports.Scholarship = void 0;
const typeorm_1 = require("typeorm");
const study_level_enum_1 = require("../../common/enums/study-level.enum");
const user_entity_1 = require("../../users/entities/user.entity");
const application_entity_1 = require("../../applications/entities/application.entity");
let Scholarship = class Scholarship {
    id;
    title;
    country;
    university;
    deadline;
    level;
    description;
    createdAt;
    createdBy;
    createdById;
    applications;
};
exports.Scholarship = Scholarship;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Scholarship.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Scholarship.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Scholarship.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Scholarship.prototype, "university", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Scholarship.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: study_level_enum_1.StudyLevel }),
    __metadata("design:type", String)
], Scholarship.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Scholarship.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Scholarship.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], Scholarship.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Scholarship.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_entity_1.Application, (application) => application.scholarship),
    __metadata("design:type", Array)
], Scholarship.prototype, "applications", void 0);
exports.Scholarship = Scholarship = __decorate([
    (0, typeorm_1.Entity)('scholarships')
], Scholarship);
//# sourceMappingURL=scholarship.entity.js.map