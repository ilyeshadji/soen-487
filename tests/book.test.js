const supertest = require('supertest');
const app = require('../app');
const server = require('../app');

describe('Books API', () => {
    afterAll(() => {
        server.close();
    });

    describe('POST /api/inventory/book', () => {
        test('should create new book', async () => {
            const response = await supertest(app)
                .post('/api/inventory/book')
                .send({
                    name: 'some name',
                    author: 'some author',
                    year: '2020-01-01',
                });

            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toEqual(
                expect.stringContaining('json')
            );
            expect(response.body.data.book.name).toBe('some name');
            expect(response.body.data.book.author).toBe('some author');
            expect(response.body.data.book.year).toBe('2020-01-01');
            expect(response.body.data.book.year).toBeDefined();
        });

        describe('given that the request is missing a value in the body', () => {
            test('should not create book if missing name', async () => {
                const response = await supertest(app)
                    .post('/api/inventory/book')
                    .send({
                        author: 'some author',
                        year: '2020-01-01',
                    });

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Could not create book');
            });

            test('should not create book if missing author', async () => {
                const response = await supertest(app)
                    .post('/api/inventory/book')
                    .send({
                        name: 'some name',
                        year: '2020-01-01',
                    });

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Could not create book');
            });

            test('should not create book if missing year', async () => {
                const response = await supertest(app)
                    .post('/api/inventory/book')
                    .send({
                        name: 'some name',
                        author: 'some author',
                    });

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Could not create book');
            });
        });
    });

    describe('GET /api/inventory/book', () => {
        test('should retrieve all books', async () => {
            const response = await supertest(app).get('/api/inventory/book');

            expect(response.statusCode).toBe(200);
        });
    });

    describe('DELETE /api/inventory/book', () => {
        let book;

        beforeEach(async () => {
            const response = await supertest(app)
                .post('/api/inventory/book')
                .send({
                    name: 'some name',
                    author: 'some author',
                    year: '2020-01-01',
                });

            book = response.body.data.book;
        });

        test('DELETE/ should delete an existing book', async () => {
            const response = await supertest(app).del(
                `/api/inventory/book/${book.id}`
            );

            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        describe('given that the id of the book is invalid', () => {
            test('should send an error if id passed as a parameter is not an integer', async () => {
                const response = await supertest(app).del(
                    `/api/inventory/book/asd`
                );

                expect(response.statusCode).toBe(500);
                expect(response.body.message).toBe('Could not delete book');
            });

            test('should send an error if id passed as a parameter does not exist', async () => {
                const response = await supertest(app).del(
                    `/api/inventory/book/0`
                );

                expect(response.statusCode).toBe(500);
                expect(response.body.message).toBe('Could not delete book');
            });

            test('should send an error if no id  is passed as a parameter', async () => {
                const response =
                    await supertest(app).del(`/api/inventory/book/`);

                expect(response.statusCode).toBe(404);
                expect(response.body.message).toBe('Could not find this route');
            });
        });
    });

    describe('PATCH /api/inventory/book', () => {
        let book;

        beforeEach(async () => {
            const response = await supertest(app)
                .post('/api/inventory/book')
                .send({
                    name: 'some name',
                    author: 'some author',
                    year: '2020-01-01',
                });

            book = response.body.data.book;
        });

        test('should update an existing book', async () => {
            const response = await supertest(app)
                .patch(`/api/inventory/book/${book.id}`)
                .send({ fieldName: 'name', newValue: 'new name from test' });

            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        describe('given that the id of the book is invalid', () => {
            test('should send an error if id passed as a parameter is not an integer', async () => {
                const response = await supertest(app).patch(
                    `/api/inventory/book/asd`
                );

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Could not update book');
            });

            test('should send an error if id passed as a parameter does not exist', async () => {
                const response = await supertest(app).patch(
                    `/api/inventory/book/0`
                );

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Could not update book');
            });

            test('should send an error if no id  is passed as a parameter', async () => {
                const response =
                    await supertest(app).patch(`/api/inventory/book/`);

                expect(response.statusCode).toBe(404);
                expect(response.body.message).toBe('Could not find this route');
            });
        });

        describe('given that the request is missing a value in the body', () => {
            test('should not update book if missing fieldName', async () => {
                const response = await supertest(app)
                    .patch(`/api/inventory/book/${book.id}`)
                    .send({ newValue: 'new name from test' });

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Could not update book');
            });

            test('should not update book if missing newValue', async () => {
                const response = await supertest(app)
                    .patch(`/api/inventory/book/${book.id}`)
                    .send({ fieldName: 'author' });

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Could not update book');
            });
        });

        describe('given that the request has a wrong value in the body', () => {
            test('should not update book if fieldName is not valid', async () => {
                const response = await supertest(app)
                    .patch(`/api/inventory/book/${book.id}`)
                    .send({ fieldName: 'editor', newValue: 'Disney' });

                expect(response.statusCode).toBe(500);
                expect(response.body.message).toBe('Could not update book');
            });
        });
    });
});
