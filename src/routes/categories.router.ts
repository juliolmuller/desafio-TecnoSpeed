import { Router } from 'express'
import { categoriesController } from '../app/controllers'
import { categoriesValidation } from '../app/validations'

const categoriesRouter = Router()

categoriesRouter.get('/', categoriesController.index)
categoriesRouter.get('/:id', categoriesController.show)
categoriesRouter.post('/', categoriesValidation(), categoriesController.store)

export default categoriesRouter
