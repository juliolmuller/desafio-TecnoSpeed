import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { Category } from '../models'
import { categoriesResource } from '../resources'

class CategoriesController {
  public index: RequestHandler = async (_request, response) => {
    const categories = await Category
      .createQueryBuilder(Category.name)
      .orderBy('name', 'ASC')
      .getMany()

    response
      .status(StatusCodes.OK)
      .json(categoriesResource.many(categories))
  }

  public show: RequestHandler = async (request, response) => {
    const categoryId = Number(request.params.id)
    const category = await Category.findOneOrFail(categoryId)

    response
      .status(StatusCodes.OK)
      .json(categoriesResource.one(category))
  }

  public store: RequestHandler = async (request, response) => {
    const { name } = request.body as Category
    const category = new Category()

    category.name = name
    await category.save()

    response
      .status(StatusCodes.CREATED)
      .json(categoriesResource.one(category))
  }
}

export default new CategoriesController()
