import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableTrue1742784508683 implements MigrationInterface {
    name = 'NullableTrue1742784508683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_orm" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task_orm" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task_orm" ALTER COLUMN "deadline" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_orm" ALTER COLUMN "deadline" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task_orm" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_orm" ALTER COLUMN "description" SET NOT NULL`);
    }

}
