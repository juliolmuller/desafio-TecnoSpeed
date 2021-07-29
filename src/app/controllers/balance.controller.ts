import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { Transaction } from '../models'
import { balanceResource } from '../resources'

class BalancesController {
  public total: RequestHandler = async (request, response) => {
    const { balance } = await Transaction
      .createQueryBuilder(Transaction.name)
      .select('SUM(Transaction.value)', 'balance')
      .getRawOne()

    response
      .status(StatusCodes.OK)
      .json(balanceResource(balance))
  }
}

export default new BalancesController()
