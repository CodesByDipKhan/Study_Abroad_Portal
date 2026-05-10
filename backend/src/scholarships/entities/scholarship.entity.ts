import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { StudyLevel } from '../../common/enums/study-level.enum';
import { User } from '../../users/entities/user.entity';
import { Application } from '../../applications/entities/application.entity';

@Entity('scholarships')
export class Scholarship {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    country: string;

    @Column()
    university: string;

    @Column({ type: 'date' })
    deadline: Date;

    @Column({ type: 'enum', enum: StudyLevel })
    level: StudyLevel;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'createdById' })
    createdBy: User;

    @Column()
    createdById: string;

    @OneToMany(() => Application, (application) => application.scholarship)
    applications: Application[];
}