import { type } from 'os'
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
  csv(models) {
    const header = ['ID', 'Data & Hora', 'Valor (R$)', 'Categoria', 'Descrição'].join(',')
    const fields: (keyof TransactionResource)[] = ['id', 'created_at', 'value', 'category', 'description']

    const csv: string[] = [header]
    this.many(models).forEach((transaction) => {
      const row = fields.map((field) => {
        if (field === 'category') {
          return transaction.category?.name ?? ''
        }
        if (transaction[field] instanceof Date) {
          return transaction[field]?.toString() ?? ''
        }
        if (transaction[field] === null) {
          return ''
        }

        return String(transaction[field])
      })

      csv.push(row.join(','))
    })

    return csv.join('\n')
  },
}

export default transactionsResource
