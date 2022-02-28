import supertest from 'supertest'
import app from '..'

const request = supertest(app)

describe('Test image Proceesing endpoints', async (): Promise<void> => {
  it('should respond with message to the user', async () => {
    const response: supertest.Response = await request.get('/')
    expect(response.status).toBe(200)
  })
  it('should find /api endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
