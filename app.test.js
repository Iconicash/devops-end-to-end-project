const request = require('supertest');
const app = require('./app');

describe('Health & basic API checks', () => {
  test('GET /health returns 200 and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /api/todos without title returns 400', async () => {
    const res = await request(app).post('/api/todos').send({});
    expect(res.statusCode).toBe(400);
  });

  test('GET /ready responds with a status code', async () => {
    const res = await request(app).get('/ready');
    expect([200, 503]).toContain(res.statusCode);
  });
});
