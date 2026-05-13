import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import { Scholarship } from '../scholarships/entities/scholarship.entity';
import { ApplicationStatus } from '../common/enums/status.enum';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendApplicationReceived(user: User, scholarship: Scholarship): Promise<void>;
    sendStatusUpdated(user: User, scholarship: Scholarship, status: ApplicationStatus): Promise<void>;
    sendResetPassword(user: User, resetLink: string): Promise<void>;
}
