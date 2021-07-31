import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { Category, Transaction } from '../models'
import { transactionsResource } from '../resources'
import { addDateRangeClause } from '../../utils'

class TransactionsController {
  public index: RequestHandler = async (request, response) => {
    const { from, to, download = false } = request.query as Record<string, string>

    const queryBuilder = await Transaction
      .createQueryBuilder('t')
      .select('t')
      .leftJoinAndSelect('t.category', 'c')
      .orderBy('t.created_at', 'ASC')

    addDateRangeClause(queryBuilder, 't.created_at', { from, to })
    const transactions = await queryBuilder.getMany()

    if (download) {
      response
        .status(StatusCodes.OK)
        .attachment('extrato.csv')
        .send(transactionsResource.csv?.(transactions))
      return
    }

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

    transaction.description = description === undefined ? transaction.description : description
    transaction.category = category === undefined ? transaction.category : category as Category
    await transaction.save()

    response
      .status(StatusCodes.OK)
      .json(transactionsResource.one(transaction))
  }
}

export default new TransactionsController()
