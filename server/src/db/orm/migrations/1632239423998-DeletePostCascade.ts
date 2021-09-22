import { MigrationInterface, QueryRunner } from 'typeorm'

export class DeletePostCascade1632239423998 implements MigrationInterface {
    name = 'DeletePostCascade1632239423998'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."post" DROP CONSTRAINT "post_user_originalPosterId_id"')
      await queryRunner.query('ALTER TABLE "public"."post" ADD CONSTRAINT "post_user_originalPosterId_id" FOREIGN KEY ("originalPosterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."post" DROP CONSTRAINT "post_user_originalPosterId_id"')
      await queryRunner.query('ALTER TABLE "public"."post" ADD CONSTRAINT "post_user_originalPosterId_id" FOREIGN KEY ("originalPosterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }
}
