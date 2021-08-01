import { Category, Transaction } from '~/app/models'
import { faker } from '~/utils'

function makeTransaction(categories: Category[]) {
  const transaction = new Transaction()

  transaction.value = (Math.round(Math.random() * 100 * 100) / 100) || 1
  transaction.description = faker.random.arrayElement([undefined, faker.commerce.productName()])
  transaction.category = faker.random.arrayElement([undefined, ...categories])

  return transaction
}

async function transactionFactory(): Promise<Transaction>
async function transactionFactory(count: number): Promise<Transaction[]>
async function transactionFactory(count?: number) {
  const categories = await Category.find()

  if (typeof count === 'undefined') {
    return makeTransaction(categories)
  }

  return new Array(count).fill(null).map(() => makeTransaction(categories))
}

export default transactionFactory
