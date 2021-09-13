import { MigrationInterface, QueryRunner } from 'typeorm'

export class CustomConstraintNames1631492660191 implements MigrationInterface {
    name = 'CustomConstraintNames1631492660191'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP CONSTRAINT "FK_9df9e319a273ad45ce509cf2f68"')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP CONSTRAINT "FK_fd6b77bfdf9eae6691170bc9cb5"')
      await queryRunner.query('ALTER TABLE "public"."post" DROP CONSTRAINT "FK_0c03be8e0ff64efa23835248d07"')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD CONSTRAINT "updoot_user_userId_id" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD CONSTRAINT "updoot_post_postId_id" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
      await queryRunner.query('ALTER TABLE "public"."post" ADD CONSTRAINT "post_user_originalPosterId_id" FOREIGN KEY ("originalPosterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."post" DROP CONSTRAINT "post_user_originalPosterId_id"')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP CONSTRAINT "updoot_post_postId_id"')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP CONSTRAINT "updoot_user_userId_id"')
      await queryRunner.query('ALTER TABLE "public"."post" ADD CONSTRAINT "FK_0c03be8e0ff64efa23835248d07" FOREIGN KEY ("originalPosterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD CONSTRAINT "FK_fd6b77bfdf9eae6691170bc9cb5" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD CONSTRAINT "FK_9df9e319a273ad45ce509cf2f68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }
}
