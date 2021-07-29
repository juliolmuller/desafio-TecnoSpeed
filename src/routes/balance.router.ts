import { Router } from 'express'
import { balanceController } from '../app/controllers'

const balanceRouter = Router()

balanceRouter.get('/', balanceController.total)

export default balanceRouter
