import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniqueDefaultSalesChannel1714557020626
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store" DROP CONSTRAINT "UQ_61b0f48cccbb5f41c750bac7286"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store" ADD CONSTRAINT "UQ_61b0f48cccbb5f41c750bac7286" UNIQUE ("default_sales_channel_id")`
    );
  }
}
