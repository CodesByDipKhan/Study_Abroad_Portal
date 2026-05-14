import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import { Scholarship } from '../scholarships/entities/scholarship.entity';
import { ApplicationStatus } from '../common/enums/status.enum';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendApplicationReceived(user: User, scholarship: Scholarship) {
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

    async sendStatusUpdated(user: User, scholarship: Scholarship, status: ApplicationStatus) {
        let message = '';
        if (status === ApplicationStatus.ACCEPTED) {
            message = 'Congratulations! You have been accepted. Please check your email for further instructions.';
        } else if (status === ApplicationStatus.REJECTED) {
            message = 'We regret to inform you that your application was not successful. Thank you for your interest.';
        } else {
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

    async sendResetPassword(user: User, resetLink: string) {
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
}