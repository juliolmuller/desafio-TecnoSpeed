import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class alterTransactionsTable1627595364878 implements MigrationInterface {
  private readonly TABLE_NAME = 'transactions'

  public async up(queryRunner: QueryRunner) {
    await queryRunner.addColumn(this.TABLE_NAME, new TableColumn({
      name: 'category_id',
      type: 'integer',
      unsigned: true,
      isNullable: true,
    }))

    await queryRunner.createForeignKey(this.TABLE_NAME, new TableForeignKey({
      columnNames: ['category_id'],
      referencedTableName: 'categories',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }))
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropColumn(this.TABLE_NAME, 'category_id')
  }
}
