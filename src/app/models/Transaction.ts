import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import Category from './Category'

@Entity()
class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column()
  value: number

  @Column()
  description?: string

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => Category, (category) => category.transactions)
  category?: Category

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date
}

export default Transaction
