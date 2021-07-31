import { StatusCodes } from 'http-status-codes'
import { RequestHandler } from 'express'
import { Transaction } from '../models'
import { balanceResource } from '../resources'
import { addDateRangeClause } from '../../utils'

class BalancesController {
  public total: RequestHandler = async (request, response) => {
    const { from, to } = request.query as Record<string, string>

    const debitsQueryBuilder = Transaction
      .createQueryBuilder('t')
      .select('SUM(t.value)', 'sum')
      .where('t.value < 0')
    const creditsQueryBuilder = Transaction
      .createQueryBuilder('t')
      .select('SUM(t.value)', 'sum')
      .where('t.value > 0')

    addDateRangeClause(debitsQueryBuilder, 't.created_at', { from, to })
    addDateRangeClause(creditsQueryBuilder, 't.created_at', { from, to })

    const [debitsResult, creditsResult] = await Promise.all([
      debitsQueryBuilder.getRawOne<{ sum: number}>(),
      creditsQueryBuilder.getRawOne<{ sum: number}>(),
    ])

    response
      .status(StatusCodes.OK)
      .json(balanceResource(debitsResult.sum, creditsResult.sum))
  }
}

export default new BalancesController()
