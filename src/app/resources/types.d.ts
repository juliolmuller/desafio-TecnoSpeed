
export interface ModelSerializer<T, R> {
  many: (models: T[]) => R[]
  one: (model: T) => R
}
