import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../common/enums/role.enum';
import { StudyLevel } from '../../common/enums/study-level.enum';

export class RegisterDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;

    @IsEnum(StudyLevel)
    @IsOptional()
    studyLevel?: StudyLevel;
}