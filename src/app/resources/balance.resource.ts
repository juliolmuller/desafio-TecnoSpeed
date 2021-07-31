import { BalanceResource } from './types'

function balanceResource(debits: number, credits: number): BalanceResource {
  const roundedDebits = Math.round(debits * 100) / 100
  const roundedCredits = Math.round(credits * 100) / 100
  const roundedBalance = Math.round((roundedDebits + roundedCredits) * 100) / 100

  return {
    date_time: new Date(),
    total_debits: roundedDebits,
    total_credits: roundedCredits,
    total_balance: roundedBalance,
  }
}

export default balanceResource
