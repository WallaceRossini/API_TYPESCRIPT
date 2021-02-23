import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleType } from "../../enum";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: RoleType;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: "password_reset_token", default: null, nullable: true })
    passwordResetToken: string

    @Column({ name: "password_reset_expires", default: null, nullable: true })
    passwordResetExpires: Date
}