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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const status_enum_1 = require("../common/enums/status.enum");
let MailService = class MailService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendApplicationReceived(user, scholarship) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: `Application Received – ${scholarship.title}`,
            template: './application-received',
            context: {
                name: user.name,
                scholarshipTitle: scholarship.title,
                appliedAt: new Date().toLocaleDateString(),
                status: 'Pending',
            },
        });
    }
    async sendStatusUpdated(user, scholarship, status) {
        let message = '';
        if (status === status_enum_1.ApplicationStatus.ACCEPTED) {
            message = 'Congratulations! You have been accepted. Please check your email for further instructions.';
        }
        else if (status === status_enum_1.ApplicationStatus.REJECTED) {
            message = 'We regret to inform you that your application was not successful. Thank you for your interest.';
        }
        else {
            message = `Your application status has been updated to ${status}.`;
        }
        await this.mailerService.sendMail({
            to: user.email,
            subject: `Application Status Updated – ${scholarship.title}`,
            template: './status-updated',
            context: {
                name: user.name,
                scholarshipTitle: scholarship.title,
                newStatus: status,
                message,
            },
        });
    }
    async sendResetPassword(user, resetLink) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Password Reset Request',
            template: './reset-password',
            context: {
                name: user.name,
                resetLink,
                expiryMinutes: 15,
            },
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map