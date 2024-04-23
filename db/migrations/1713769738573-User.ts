import { MigrationInterface, QueryRunner } from "typeorm";

export class User1713769738573 implements MigrationInterface {
    name = 'User1713769738573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('man', 'woman', 'not_determined')`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'not_determined', "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }

}
