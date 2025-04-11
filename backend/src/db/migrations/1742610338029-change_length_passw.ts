import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLengthPassw1742610338029 implements MigrationInterface {
    name = 'ChangeLengthPassw1742610338029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_orm" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user_orm" ADD "password" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_orm" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user_orm" ADD "password" character varying NOT NULL`);
    }

}
