import { Category } from '~/app/models'
import { faker } from '~/utils'

function makeCategory() {
  const category = new Category()

  category.name = faker.commerce.department()

  return category
}

async function categoryFactory(): Promise<Category>
async function categoryFactory(count: number): Promise<Category[]>
async function categoryFactory(count?: number) { // eslint-disable-line require-await
  if (typeof count === 'undefined') {
    return makeCategory()
  }

  return new Array(count).fill(null).map(makeCategory)
}

export default categoryFactory
