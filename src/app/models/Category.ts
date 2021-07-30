import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import Transaction from './Transaction'

@Entity()
class Category extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column()
  name: string

  @JoinColumn({ name: 'category_id' })
  @OneToMany(() => Transaction, (transaction) => transaction.category, {
    cascade: ['insert', 'update'],
  })
  transactions: Transaction[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date
}

export default Category
