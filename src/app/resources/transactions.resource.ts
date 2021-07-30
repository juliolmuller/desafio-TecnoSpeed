import { Transaction } from '../models'
import categoriesResource from './categories.resource'
import { ModelSerializer, TransactionResource } from './types'

const transactionsResource: ModelSerializer<Transaction, TransactionResource> = {
  one(model) {
    return {
      id: model.id,
      value: Math.round(model.value * 100) / 100,
      description: model.description || null,
      created_at: model.createdAt || null,
      updated_at: model.updatedAt || null,
      category: model.category
        ? categoriesResource.one(model.category)
        : null,
    }
  },
  many(models) {
    return models.map(this.one)
  },
}

export default transactionsResource
