import { createConnection } from './database'

/**
 * As TypeORM depends on the values stored on environment
 * variables, the function below already runs a "dotenv"-like
 * job and make ".env" values available  globally in Node
 * "process.env". Therefore, there's no need to run "dotenv"
 * package explicitly.
 */
createConnection()
