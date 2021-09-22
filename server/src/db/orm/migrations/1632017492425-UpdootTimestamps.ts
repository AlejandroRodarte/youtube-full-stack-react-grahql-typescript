import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdootTimestamps1632017492425 implements MigrationInterface {
    name = 'UpdootTimestamps1632017492425'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "createdAt"')
    }
}
