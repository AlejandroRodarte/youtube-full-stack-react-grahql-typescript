import { MigrationInterface, QueryRunner } from 'typeorm'

export class TimestampTz1632239948078 implements MigrationInterface {
    name = 'TimestampTz1632239948078'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "createdAt"')
      await queryRunner.query('ALTER TABLE "public"."user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "public"."user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "createdAt"')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."post" DROP COLUMN "createdAt"')
      await queryRunner.query('ALTER TABLE "public"."post" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."post" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "public"."post" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."post" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "public"."post" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."post" DROP COLUMN "createdAt"')
      await queryRunner.query('ALTER TABLE "public"."post" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."updoot" DROP COLUMN "createdAt"')
      await queryRunner.query('ALTER TABLE "public"."updoot" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "updatedAt"')
      await queryRunner.query('ALTER TABLE "public"."user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "createdAt"')
      await queryRunner.query('ALTER TABLE "public"."user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()')
    }
}
