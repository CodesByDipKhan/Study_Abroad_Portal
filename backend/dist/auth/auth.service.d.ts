import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private mailService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, mailService: MailService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("../common/enums/role.enum").Role;
        };
    }>;
    getMe(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../common/enums/role.enum").Role;
        studyLevel: import("../common/enums/study-level.enum").StudyLevel;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
        createdAt: Date;
        applications: import("../applications/entities/application.entity").Application[];
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
