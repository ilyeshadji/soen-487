const request = require('supertest');

const server = require('../app');

jest.useFakeTimers();

describe('Books API', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('GET/ should retrieve all books', async () => {
    return await request(server)
      .get('/api/inventory/book')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('POST/ should create a new book', async () => {
    return await request(server)
      .post('/api/inventory/book')
      .send({
        name: 'some name',
        author: 'some author',
        year: new Date(),
      })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('DELETE/ should delete an existing book', async () => {
    return await request(server)
      .del('/api/inventory/book/1')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('PUT/ should update an existing book', async () => {
    return await request(server)
      .put('/api/inventory/book/1').send({ name: 'some updated name' })
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
