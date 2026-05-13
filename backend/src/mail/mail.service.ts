import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import { Scholarship } from '../scholarships/entities/scholarship.entity';
import { ApplicationStatus } from '../common/enums/status.enum';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendApplicationReceived(user: User, scholarship: Scholarship) {
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

    async sendStatusUpdated(user: User, scholarship: Scholarship, status: ApplicationStatus) {
        let message = '';
        if (status === ApplicationStatus.ACCEPTED) {
            message = 'Congratulations! You have been accepted. Please check your email for further instructions.';
        } else if (status === ApplicationStatus.REJECTED) {
            message = 'We regret to inform you that your application was not successful. Thank you for your interest.';
        } else {
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

    async sendResetPassword(user: User, resetLink: string) {
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
}