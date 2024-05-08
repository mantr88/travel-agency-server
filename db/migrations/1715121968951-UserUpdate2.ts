import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpdate21715121968951 implements MigrationInterface {
    name = 'UserUpdate21715121968951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_of_birth" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_of_birth" TIMESTAMP NOT NULL`);
    }

}
