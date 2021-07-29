import { Router } from 'express'
import transactionsRouter from './transactions.router'
import balanceRouter from './balance.router'

const mainRouter = Router()

mainRouter.use('/transactions', transactionsRouter)
mainRouter.use('/balance', balanceRouter)

export default mainRouter
