/* eslint-disable no-magic-numbers */
import request from 'supertest'
import { getConnection } from 'typeorm'
import { createConnection } from '../../src/database'
import app from '../../src/app'

describe('Transactions API', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Get all transactions (empty)', async () => {
    const response = await request(app)
      .get('/api/transactions').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

  it('Should create a transaction with a numeric identifier', async () => {
    const response = await request(app)
      .post('/api/transactions').send({
        description: 'foo',
        value: 1,
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toBeGreaterThanOrEqual(1)
  })

  it('Should create a transaction with positive value (w/ description)', async () => {
    const response = await request(app)
      .post('/api/transactions').send({
        description: 'bar',
        value: 20,
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).not.toHaveProperty('deleted_at')
    expect(response.body.description).toBe('bar')
    expect(response.body.value).toBe(20)
  })

  it('Should create a transaction with negative value (w/ description)', async () => {
    const response = await request(app)
      .post('/api/transactions').send({
        description: 'baz',
        value: -15,
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).not.toHaveProperty('createdAt')
    expect(response.body.description).toBe('baz')
    expect(response.body.value).toBe(-15)
  })

  it('Should create a transaction without any description', async () => {
    const response = await request(app)
      .post('/api/transactions').send({
        value: 5,
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).not.toHaveProperty('deleted_at')
    expect(response.body.description).toBeNull()
    expect(response.body.value).toBe(5)
  })

  it('Get all transactions (4 records)', async () => {
    const response = await request(app)
      .get('/api/transactions').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(4)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('value')
    expect(response.body[0]).toHaveProperty('description')
    expect(response.body[0]).toHaveProperty('created_at')
    expect(response.body[0]).toHaveProperty('updated_at')
    expect(response.body[0]).not.toHaveProperty('deleted_at')
  })

  it('Should NOT create a transaction with no value', async () => {
    const response = await request(app)
      .post('/api/transactions').send({})

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
  })

  it('Should NOT create a transaction with zero value', async () => {
    const response = await request(app)
      .post('/api/transactions').send({
        value: 0,
      })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
  })

  it('Should NOT create a transaction with too long description', async () => {
    const response = await request(app)
      .post('/api/transactions').send({
        description: 'a'.repeat(51),
        value: 2,
      })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toHaveProperty('description')
  })

  it('Should update description of a transaction', async () => {
    const { body: transactions } = await request(app)
      .get('/api/transactions').send()
    const response = await request(app)
      .put(`/api/transactions/${transactions[0].id}`).send({
        description: 'new',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).not.toHaveProperty('deleted_at')
    expect(response.body.description).toBe('new')
    expect(response.body.value).toBe(transactions[0].value)
  })

  it('Should remove description of a transaction', async () => {
    const { body: transactions } = await request(app)
      .get('/api/transactions').send()
    const response = await request(app)
      .put(`/api/transactions/${transactions[0].id}`).send({})

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).not.toHaveProperty('deleted_at')
    expect(response.body.description).toBeNull()
    expect(response.body.value).toBe(transactions[0].value)
  })

  it('Should NOT update value of a transaction', async () => {
    const { body: transactions } = await request(app)
      .get('/api/transactions').send()
    const response = await request(app)
      .put(`/api/transactions/${transactions[0].id}`).send({
        description: transactions[0].description,
        value: 7,
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).not.toHaveProperty('deleted_at')
    expect(response.body.description).toBe(transactions[0].description)
    expect(response.body.value).toBe(transactions[0].value)
  })
})
