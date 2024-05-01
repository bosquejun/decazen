import { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreHandle1714555900321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store" ADD "handle" character varying UNIQUE`
    );
    await queryRunner.query(
      `CREATE INDEX "StoreHandle" ON "store" ("handle") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."StoreHandle"`);
    await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "handle"`);
  }
}
