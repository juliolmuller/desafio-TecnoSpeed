import { ModelSerializer, CategoryResource } from './types'
import { Category } from '../models'

const categoriesResource: ModelSerializer<Category, CategoryResource> = {
  one(model) {
    return {
      id: model.id,
      name: model.name,
      created_at: model.createdAt || null,
      updated_at: model.updatedAt || null,
    }
  },
  many(models) {
    return models.map(this.one)
  },
}

export default categoriesResource
