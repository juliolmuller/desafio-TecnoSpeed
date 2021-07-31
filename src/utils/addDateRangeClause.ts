import { SelectQueryBuilder } from 'typeorm'

function isQueryStringDate(queryParam: string) {
  return !!String(queryParam).match(/^\d{4}-\d{1,2}-\d{1,2}$/)
}

function addDateRangeClause<T>(
  qb: SelectQueryBuilder<T>,
  field: string,
  { from, to }: {
    from: string
    to: string
  },
) {
  if (isQueryStringDate(from)) {
    qb.andWhere(`${field} >= :from`, { from })
  }
  if (isQueryStringDate(to)) {
    qb.andWhere(`${field} <= :to`, { to: `${to} 23:59:59.99999` })
  }

  return qb
}

export default addDateRangeClause
