import { Transaction } from '../models'
import { ModelSerializer } from './types'

export type TransactionResource = {
  id: number
  value: number
  description: string | null
  created_at: Date | null
  updated_at: Date | null
}

const transactionsResource: ModelSerializer<Transaction, TransactionResource> = {
  one(model) {
    return {
      id: model.id,
      value: Math.round(model.value * 100) / 100,
      description: model.description || null,
      created_at: model.createdAt || null,
      updated_at: model.updatedAt || null,
    }
  },
  many(models) {
    return models.map(this.one)
  },
}

export default transactionsResource
