
export interface ModelSerializer<T, R> {
  many: (models: T[]) => R[]
  one: (model: T) => R
}

export type CategoryResource = {
  id: number
  name: string
  created_at: Date | null
  updated_at: Date | null
}

export type TransactionResource = {
  id: number
  value: number
  description: string | null
  category: CategoryResource | null
  created_at: Date | null
  updated_at: Date | null
}

export type BalanceResource = {
  total_debits: number
  total_credits: number
  total_balance: number
  date_time: Date
}
