import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { Category, Transaction } from '../models'
import { transactionsResource } from '../resources'

class TransactionsController {
  public index: RequestHandler = async (request, response) => {
    const transactions = await Transaction.find({
      order: { createdAt: 'ASC' },
      relations: ['category'],
    })

    response
      .status(StatusCodes.OK)
      .json(transactionsResource.many(transactions))
  }

  public store: RequestHandler = async (request, response) => {
    const { value, description, category_id } = request.body
    const category = category_id && await Category.findOne({ id: category_id })
    const transaction = new Transaction()

    transaction.description = description
    transaction.category = category
    transaction.value = value
    await transaction.save()

    response
      .status(StatusCodes.CREATED)
      .json(transactionsResource.one(transaction))
  }

  public update: RequestHandler = async (request, response) => {
    const { description, category_id } = request.body
    const transactionId = Number(request.params.id)
    const category = category_id === null ? null : await Category.findOne({ id: category_id })
    const transaction = await Transaction.findOneOrFail(transactionId, {
      relations: ['category'],
    })
    console.log(category_id, category)
    transaction.description = description === undefined ? transaction.description : description
    transaction.category = category === undefined ? transaction.category : category as Category
    await transaction.save()

    response
      .status(StatusCodes.OK)
      .json(transactionsResource.one(transaction))
  }
}

export default new TransactionsController()
