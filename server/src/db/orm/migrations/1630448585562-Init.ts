import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1630448585562 implements MigrationInterface {
    name = 'Init1630448585562'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "user_email_unique" UNIQUE ("email"), CONSTRAINT "user_username_unique" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))')
      await queryRunner.query('CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "points" integer NOT NULL DEFAULT \'0\', "originalPosterId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))')
      await queryRunner.query('ALTER TABLE "post" ADD CONSTRAINT "FK_0c03be8e0ff64efa23835248d07" FOREIGN KEY ("originalPosterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "post" DROP CONSTRAINT "FK_0c03be8e0ff64efa23835248d07"')
      await queryRunner.query('DROP TABLE "post"')
      await queryRunner.query('DROP TABLE "user"')
    }
}
