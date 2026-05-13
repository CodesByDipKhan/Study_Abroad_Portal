import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private mailService: MailService, // Inject MailService
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password, name, role, studyLevel } = registerDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            role,
            studyLevel,
        });

        await this.userRepository.save(user);
        return { message: 'User registered successfully' };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        return { access_token: token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    }

    async getMe(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const { password, ...result } = user;
        return result;
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.userRepository.findOne({ where: { email } });

        // Always return same message for security
        if (!user) {
            return { message: 'If this email exists, a reset link has been sent' };
        }

        // Generate plain token
        const plainToken = crypto.randomBytes(32).toString('hex');
        // Hash token before storing
        const hashedToken = await bcrypt.hash(plainToken, 10);

        user.resetToken = hashedToken;
        user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        await this.userRepository.save(user);

        const resetLink = `http://localhost:3001/reset-password?token=${plainToken}`;

        // Send email using MailService
        try {
            await this.mailService.sendResetPassword(user, resetLink);
            console.log(`Reset email sent to ${email}`);
        } catch (error) {
            console.error('Failed to send reset email:', error.message);
        }

        return { message: 'If this email exists, a reset link has been sent' };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const { token, newPassword } = resetPasswordDto;

        // Find user with unexpired token
        const user = await this.userRepository.findOne({
            where: { resetTokenExpiry: MoreThan(new Date()) },
        });

        if (!user || !user.resetToken) {
            throw new BadRequestException('Invalid or expired token');
        }

        // Compare plain token with stored hash
        const isTokenValid = await bcrypt.compare(token, user.resetToken);
        if (!isTokenValid) {
            throw new BadRequestException('Invalid or expired token');
        }

        // Hash new password and clear reset fields
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await this.userRepository.save(user);

        return { message: 'Password reset successful' };
    }
}