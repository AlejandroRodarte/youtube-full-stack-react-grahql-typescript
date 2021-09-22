import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdootTimestamps1632326354693 implements MigrationInterface {
    name = 'UpdootTimestamps1632326354693'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "createdAt"')
    }
}
