/* eslint-disable no-magic-numbers */
import request from 'supertest'
import { getConnection } from 'typeorm'
import { createConnection } from '../../src/database'
import app from '../../src/app'

describe('Balance API', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Get a single object as response', async () => {
    const response = await request(app)
      .get('/api/balance').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('date_time')
    expect(response.body).toHaveProperty('total_balance')
    expect(response.body.total_balance).not.toBeNaN()
  })
})
