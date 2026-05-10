import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { StudyLevel } from '../../common/enums/study-level.enum';
import { Application } from '../../applications/entities/application.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.ASPIRANT })
    role: Role;

    @Column({ type: 'enum', enum: StudyLevel, nullable: true })
    studyLevel: StudyLevel;

    @Column({ type: 'varchar', nullable: true })
    resetToken: string | null;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiry: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Application, (application) => application.user)
    applications: Application[];
}