import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleType } from "../../enum";

@Entity('users')
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

  @Column({ name: "password_reset_token", type: "varchar", default: null, nullable: true })
  passwordResetToken: string | null

  @Column({ name: "password_reset_expires", default: null, nullable: true })
  passwordResetExpires: Date

  @Column({ name: "validation_mail", type: "varchar", default: null, nullable: true })
  validationMail: string | null
}