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
        const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Application Received</title></head>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #4CAF50;">Application Received</h2>
          <p>Dear ${user.name},</p>
          <p>Thank you for applying to the <strong>${scholarship.title}</strong> scholarship.</p>
          <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Current Status:</strong> Pending</p>
          <p>We will review your application and notify you once a decision is made.</p>
          <p>Best regards,<br>Study Abroad Consultancy Team</p>
        </div>
      </body>
      </html>
    `;
        await this.mailerService.sendMail({
            to: user.email,
            subject: `Application Received – ${scholarship.title}`,
            html,
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
        const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Application Status Updated</title></head>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2196F3;">Application Status Updated</h2>
          <p>Dear ${user.name},</p>
          <p>Your application for <strong>${scholarship.title}</strong> has been updated.</p>
          <p><strong>New Status:</strong> ${status}</p>
          <p>${message}</p>
          <p>You can log in to your account to view more details.</p>
          <p>Best regards,<br>Study Abroad Consultancy Team</p>
        </div>
      </body>
      </html>
    `;
        await this.mailerService.sendMail({
            to: user.email,
            subject: `Application Status Updated – ${scholarship.title}`,
            html,
        });
    }
    async sendResetPassword(user, resetLink) {
        const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Password Reset</title></head>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #FF5722;">Password Reset Request</h2>
          <p>Dear ${user.name},</p>
          <p>We received a request to reset your password. Click the link below to set a new password:</p>
          <p><a href="${resetLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
          <p>This link will expire in 15 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br>Study Abroad Consultancy Team</p>
        </div>
      </body>
      </html>
    `;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Password Reset Request',
            html,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map