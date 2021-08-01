import { createConnection } from '~/database'
import { categoryFactory, transactionFactory } from '../factories'

async function runSeeds() {
  const connection = await createConnection(false)

  try {
    const categories = await categoryFactory(10)
    await Promise.all(categories.map((category) => category.save()))

    const transactions = await transactionFactory(10 * categories.length)
    await Promise.all(transactions.map((transaction) => transaction.save()))
  } finally {
    connection.close()
  }
}

runSeeds().then(() => console.log(' ✔ Seeds ran successfully!'))
