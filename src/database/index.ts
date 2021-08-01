import { createConnection, getConnectionOptions } from 'typeorm'
import NamingStrategy from './NamingStrategy'
import 'reflect-metadata'

async function connect(logQueries?: boolean) {
  const options = await getConnectionOptions()
  const namingStrategy = new NamingStrategy()
  const logging = logQueries ?? process.env.NODE_ENV === 'development'
  const type = process.env.NODE_ENV === 'test' ? 'sqlite' : options.type
  const database = process.env.NODE_ENV === 'test' ? ':memory:' : options.database

  return createConnection(
    Object.assign(options, {
      namingStrategy,
      database,
      logging,
      type,
    }),
  )
}

export { connect as createConnection }
