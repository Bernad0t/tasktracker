import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1742608466438 implements MigrationInterface {
    name = 'Initial1742608466438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_orm" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_4fdc636f375e88848512de33d6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."project_orm_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "project_orm" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."project_orm_type_enum" NOT NULL, CONSTRAINT "PK_5f8d434d3bb945f1d3e2249a305" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_project_orm_role_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "user_project_orm" ("id" SERIAL NOT NULL, "role" "public"."user_project_orm_role_enum" NOT NULL, "priority" integer NOT NULL, "userId" integer, "projectId" integer, CONSTRAINT "PK_248df87dba6b3d44e8c5d38d100" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."task_orm_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "task_orm" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."task_orm_status_enum" NOT NULL, "deadline" TIMESTAMP NOT NULL, "priority" integer NOT NULL, "reviewerIdId" integer, "assignedIdId" integer, "projectId" integer, CONSTRAINT "PK_b4600fddb484d915b1d711b0cc4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_orm" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "reviewerId" integer, "taskId" integer, CONSTRAINT "PK_ea080b50bc3a9a0aca3b664e63f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD CONSTRAINT "FK_5ba9514ca4ad53adee16e568201" FOREIGN KEY ("userId") REFERENCES "user_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD CONSTRAINT "FK_ce123cdcf4281f340c6a7c7f701" FOREIGN KEY ("projectId") REFERENCES "project_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD CONSTRAINT "FK_28f03cf0c461e5c0665da966125" FOREIGN KEY ("reviewerIdId") REFERENCES "user_orm"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD CONSTRAINT "FK_f793b65719bc586f24e31b4b88c" FOREIGN KEY ("assignedIdId") REFERENCES "user_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD CONSTRAINT "FK_e552d2c9ea44f0ec9521e424de2" FOREIGN KEY ("projectId") REFERENCES "project_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_orm" ADD CONSTRAINT "FK_42e267609d1a958671626597144" FOREIGN KEY ("reviewerId") REFERENCES "user_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_orm" ADD CONSTRAINT "FK_22c5fd58101c5d4144ae3c2dc2d" FOREIGN KEY ("taskId") REFERENCES "task_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_orm" DROP CONSTRAINT "FK_22c5fd58101c5d4144ae3c2dc2d"`);
        await queryRunner.query(`ALTER TABLE "comments_orm" DROP CONSTRAINT "FK_42e267609d1a958671626597144"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP CONSTRAINT "FK_e552d2c9ea44f0ec9521e424de2"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP CONSTRAINT "FK_f793b65719bc586f24e31b4b88c"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP CONSTRAINT "FK_28f03cf0c461e5c0665da966125"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP CONSTRAINT "FK_ce123cdcf4281f340c6a7c7f701"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP CONSTRAINT "FK_5ba9514ca4ad53adee16e568201"`);
        await queryRunner.query(`DROP TABLE "comments_orm"`);
        await queryRunner.query(`DROP TABLE "task_orm"`);
        await queryRunner.query(`DROP TYPE "public"."task_orm_status_enum"`);
        await queryRunner.query(`DROP TABLE "user_project_orm"`);
        await queryRunner.query(`DROP TYPE "public"."user_project_orm_role_enum"`);
        await queryRunner.query(`DROP TABLE "project_orm"`);
        await queryRunner.query(`DROP TYPE "public"."project_orm_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_orm"`);
    }

}
