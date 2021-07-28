import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTransactionsTable1627441527339 implements MigrationInterface {
  private readonly TABLE_NAME = 'transactions'

  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(new Table({
      name: this.TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'value',
          type: 'money',
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'NOW()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'NOW()',
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable(this.TABLE_NAME)
  }
}
