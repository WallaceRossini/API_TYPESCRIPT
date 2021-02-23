import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUsersTable1614107058225 implements MigrationInterface {
    name = 'UpdateUsersTable1614107058225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `password_reset_token` varchar(255) NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD `password_reset_expires` datetime NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `password_reset_expires`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `password_reset_token`");
    }

}
