import { Router } from 'express'
import transactionsRouter from './transactions.router'
import categoriesRouter from './categories.router'
import balanceRouter from './balance.router'

const mainRouter = Router()

mainRouter.use('/transactions', transactionsRouter)
mainRouter.use('/categories', categoriesRouter)
mainRouter.use('/balance', balanceRouter)

export default mainRouter
