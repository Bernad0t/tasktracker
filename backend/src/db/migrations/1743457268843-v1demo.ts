import { MigrationInterface, QueryRunner } from "typeorm";

export class V1demo1743457268843 implements MigrationInterface {
    name = 'V1demo1743457268843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_orm" DROP CONSTRAINT "FK_28f03cf0c461e5c0665da966125"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP CONSTRAINT "FK_f793b65719bc586f24e31b4b88c"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP COLUMN "reviewerIdId"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP COLUMN "assignedIdId"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD CONSTRAINT "UQ_cff49011c91cd32abc317b5fa04" UNIQUE ("parentId")`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD "childId" integer`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD CONSTRAINT "UQ_22194f5a058d5302c304ec6c091" UNIQUE ("childId")`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD "reviewerId" integer`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD "assignedId" integer`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD CONSTRAINT "FK_cff49011c91cd32abc317b5fa04" FOREIGN KEY ("parentId") REFERENCES "user_project_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD CONSTRAINT "FK_22194f5a058d5302c304ec6c091" FOREIGN KEY ("childId") REFERENCES "user_project_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD CONSTRAINT "FK_c4d2b68045dbf41bb1374604221" FOREIGN KEY ("reviewerId") REFERENCES "user_orm"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD CONSTRAINT "FK_5b3dcc242a53d2e14168cb0a0f5" FOREIGN KEY ("assignedId") REFERENCES "user_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_orm" DROP CONSTRAINT "FK_5b3dcc242a53d2e14168cb0a0f5"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP CONSTRAINT "FK_c4d2b68045dbf41bb1374604221"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP CONSTRAINT "FK_22194f5a058d5302c304ec6c091"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP CONSTRAINT "FK_cff49011c91cd32abc317b5fa04"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP COLUMN "assignedId"`);
        await queryRunner.query(`ALTER TABLE "task_orm" DROP COLUMN "reviewerId"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP CONSTRAINT "UQ_22194f5a058d5302c304ec6c091"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP CONSTRAINT "UQ_cff49011c91cd32abc317b5fa04"`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD "assignedIdId" integer`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD "reviewerIdId" integer`);
        await queryRunner.query(`ALTER TABLE "user_project_orm" ADD "priority" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD CONSTRAINT "FK_f793b65719bc586f24e31b4b88c" FOREIGN KEY ("assignedIdId") REFERENCES "user_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_orm" ADD CONSTRAINT "FK_28f03cf0c461e5c0665da966125" FOREIGN KEY ("reviewerIdId") REFERENCES "user_orm"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
