import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { FileType } from '../../common/enums/file-type.enum';
import { Application } from '../../applications/entities/application.entity';

@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: FileType })
    fileType: FileType;

    @Column()
    fileUrl: string;

    @CreateDateColumn()
    uploadedAt: Date;

    @ManyToOne(() => Application, { nullable: false })
    application: Application;
    @Column()
    applicationId: string;
}