import { MigrationInterface, QueryRunner } from "typeorm";

export class Changeaskrm1743788654455 implements MigrationInterface {
    name = 'Changeaskrm1743788654455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_orm" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "task_orm" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_orm" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD "priority" integer NOT NULL`);
    }

}
