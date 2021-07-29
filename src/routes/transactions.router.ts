import { Router } from 'express'
import { transactionsController } from '../app/controllers'
import { transactionsValidation } from '../app/validations'

const transactionsRouter = Router()

transactionsRouter.get('/', transactionsController.index)
transactionsRouter.post('/', transactionsValidation('NEW'), transactionsController.store)
transactionsRouter.put('/:id', transactionsValidation('UPDATE'), transactionsController.update)
transactionsRouter.patch('/:id', transactionsController.update)

export default transactionsRouter
