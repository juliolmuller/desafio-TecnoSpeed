/* eslint-disable no-magic-numbers */
import request from 'supertest'
import { getConnection } from 'typeorm'
import { createConnection } from '../../src/database'
import app from '../../src/app'

describe('Categories API', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Get all categories (empty)', async () => {
    const response = await request(app)
      .get('/api/categories').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

  it('Should create a category', async () => {
    const response = await request(app)
      .post('/api/categories').send({
        name: 'foo',
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body.id).toBeGreaterThanOrEqual(1)
    expect(response.body.name).toBe('foo')
  })

  it('Get all categories (1 record)', async () => {
    const response = await request(app)
      .get('/api/categories').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('created_at')
    expect(response.body[0]).toHaveProperty('updated_at')
    expect(response.body[0]).not.toHaveProperty('deleted_at')
  })

  it('Should return status 404 when trying to update invalid category', async () => {
    const { body: categories } = await request(app)
      .get('/api/categories').send()
    const response = await request(app)
      .get(`/api/categories/${categories[0].id}`).send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).not.toHaveProperty('deleted_at')
    expect(response.body.id).toBe(categories[0].id)
  })

  it('Should return status 404 when trying to update invalid category', async () => {
    const response = await request(app)
      .get('/api/categories/any-id').send()

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })

  it('Should NOT create a category with no name', async () => {
    const response = await request(app)
      .post('/api/categories').send({})

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toHaveProperty('name')
  })

  it('Should NOT create a category with too long name', async () => {
    const response = await request(app)
      .post('/api/categories').send({
        name: 'a'.repeat(51),
      })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toHaveProperty('name')
  })
})
