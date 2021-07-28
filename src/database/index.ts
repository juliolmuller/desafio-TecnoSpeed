import { createConnection, getConnectionOptions } from 'typeorm'
import NamingStrategy from './NamingStrategy'
import 'reflect-metadata'

async function connect() {
  const options = await getConnectionOptions()
  const namingStrategy = new NamingStrategy()
  const logging = process.env.NODE_ENV === 'development'
  const database = process.env.NODE_ENV === 'test'
    ? 'tests/db.test.sqlite'
    : options.database

  return createConnection(
    Object.assign(options, {
      namingStrategy,
      database,
      logging,
    }),
  )
}

export { connect as createConnection }
