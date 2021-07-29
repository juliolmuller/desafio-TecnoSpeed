
export type BalanceResource = {
  total_balance: number
  date_time: Date
}

function balanceResource(balance: number): BalanceResource {
  return {
    date_time: new Date(),
    total_balance: Math.round(balance * 100) / 100,
  }
}

export default balanceResource
