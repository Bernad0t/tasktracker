import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteTypeProj1743726525189 implements MigrationInterface {
    name = 'DeleteTypeProj1743726525189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_orm" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."project_orm_type_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."project_orm_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "project_orm" ADD "type" "public"."project_orm_type_enum" NOT NULL`);
    }

}
