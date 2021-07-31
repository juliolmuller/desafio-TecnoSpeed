/* eslint-disable no-magic-numbers */
import request from 'supertest'
import { getConnection } from 'typeorm'
import { createConnection } from '../../src/database'
import app from '../../src/app'

describe('Balance API', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
    await Promise.all([
      request(app).post('/api/transactions').send({ value: 10 }),
      request(app).post('/api/transactions').send({ value: 20 }),
      request(app).post('/api/transactions').send({ value: 30 }),
      request(app).post('/api/transactions').send({ value: 40 }),
      request(app).post('/api/transactions').send({ value: -1 }),
      request(app).post('/api/transactions').send({ value: -2 }),
      request(app).post('/api/transactions').send({ value: -3 }),
      request(app).post('/api/transactions').send({ value: -4 }),
    ])
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
    expect(response.body).toHaveProperty('total_credits')
    expect(response.body).toHaveProperty('total_debits')
    expect(response.body).toHaveProperty('total_balance')
    expect(response.body.total_debits).toBe(-10)
    expect(response.body.total_credits).toBe(100)
    expect(response.body.total_balance).toBe(90)
  })
})
