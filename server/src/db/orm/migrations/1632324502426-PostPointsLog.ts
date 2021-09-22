import { MigrationInterface, QueryRunner } from 'typeorm'

export class PostPointsLog1632324502426 implements MigrationInterface {
    name = 'PostPointsLog1632324502426'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "post_points_log" ("id" SERIAL NOT NULL, "postId" integer NOT NULL, "delta" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "post_points_log_id" PRIMARY KEY ("id"))')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "createdAt"')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "post_points_log" ADD CONSTRAINT "post_points_log_post_postId_id" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "post_points_log" DROP CONSTRAINT "post_points_log_post_postId_id"')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
      await queryRunner.query('DROP TABLE "post_points_log"')
    }
}
