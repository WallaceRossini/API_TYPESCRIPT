import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUsersTable1614618725628 implements MigrationInterface {
    name = 'UpdateUsersTable1614618725628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `validation_mail` varchar(255) NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `password_reset_token` `password_reset_token` varchar(255) NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `password_reset_expires` `password_reset_expires` datetime NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `password_reset_expires` `password_reset_expires` datetime NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `password_reset_token` `password_reset_token` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `validation_mail`");
    }

}
