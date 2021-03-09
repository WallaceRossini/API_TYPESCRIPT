import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUsersTable1614630603253 implements MigrationInterface {
    name = 'UpdateUsersTable1614630603253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `password_reset_token` `password_reset_token` varchar(255) NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `password_reset_expires` `password_reset_expires` datetime NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `validation_mail` `validation_mail` varchar(255) NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `validation_mail` `validation_mail` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `password_reset_expires` `password_reset_expires` datetime NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `password_reset_token` `password_reset_token` varchar(255) NULL");
    }

}
