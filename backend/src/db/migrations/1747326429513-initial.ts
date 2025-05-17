import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1747326429513 implements MigrationInterface {
    name = 'Initial1747326429513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."task_orm_status_enum" RENAME TO "task_orm_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."task_orm_status_enum" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "task_orm" ALTER COLUMN "status" TYPE "public"."task_orm_status_enum" USING "status"::"text"::"public"."task_orm_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_orm_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_orm_status_enum_old" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "task_orm" ALTER COLUMN "status" TYPE "public"."task_orm_status_enum_old" USING "status"::"text"::"public"."task_orm_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."task_orm_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."task_orm_status_enum_old" RENAME TO "task_orm_status_enum"`);
    }

}
