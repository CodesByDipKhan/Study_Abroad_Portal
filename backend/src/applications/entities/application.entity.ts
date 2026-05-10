import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { ApplicationStatus } from '../../common/enums/status.enum';
import { User } from '../../users/entities/user.entity';
import { Scholarship } from '../../scholarships/entities/scholarship.entity';
import { Document } from '../../documents/entities/document.entity';

@Entity('applications')
@Unique(['userId', 'scholarshipId'])
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.PENDING })
    status: ApplicationStatus;

    @CreateDateColumn()
    appliedAt: Date;

    @ManyToOne(() => User, { nullable: false })
    user: User;
    @Column()
    userId: string;

    @ManyToOne(() => Scholarship, { nullable: false })
    scholarship: Scholarship;
    @Column()
    scholarshipId: string;

    @OneToMany(() => Document, (document) => document.application)
    documents: Document[];
}