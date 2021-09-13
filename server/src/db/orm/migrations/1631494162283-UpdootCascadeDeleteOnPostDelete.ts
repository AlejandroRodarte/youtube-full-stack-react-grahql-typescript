import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdootCascadeDeleteOnPostDelete1631494162283 implements MigrationInterface {
    name = 'UpdootCascadeDeleteOnPostDelete1631494162283'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP CONSTRAINT "updoot_post_postId_id"')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD CONSTRAINT "updoot_post_postId_id" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP CONSTRAINT "updoot_post_postId_id"')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD CONSTRAINT "updoot_post_postId_id" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }
}
