import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getMe(req: any): Promise<{
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
}
