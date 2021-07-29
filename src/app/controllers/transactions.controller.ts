import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { ResourceNotFound } from '../errors'
import { Transaction } from '../models'
import { transactionsResource } from '../resources'

class TransactionsController {
  public index: RequestHandler = async (request, response) => {
    const transactions = await Transaction
      .createQueryBuilder(Transaction.name)
      .orderBy('created_at', 'ASC')
      .getMany()

    response
      .status(StatusCodes.OK)
      .json(transactionsResource.many(transactions))
  }

  public store: RequestHandler = async (request, response) => {
    const { value, description } = request.body as Transaction
    const transaction = new Transaction()

    transaction.description = description
    transaction.value = value
    await transaction.save()

    response
      .status(StatusCodes.CREATED)
      .json(transactionsResource.one(transaction))
  }

  public update: RequestHandler = async (request, response) => {
    const { description } = request.body as Transaction
    const transactionId = Number(request.params.id)
    const transaction = await Transaction.findOne({ id: transactionId })

    if (!transaction) {
      throw new ResourceNotFound('Transaction not found')
    }

    transaction.description = description
    await transaction.save()

    response
      .status(StatusCodes.OK)
      .json(transactionsResource.one(transaction))
  }
}

export default new TransactionsController()
