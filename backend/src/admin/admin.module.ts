import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../users/entities/user.entity';
import { Scholarship } from '../scholarships/entities/scholarship.entity';
import { Application } from '../applications/entities/application.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Scholarship, Application])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }