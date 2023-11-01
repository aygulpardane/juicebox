const {mockDeep} = require('jest-mock-extended');
const app = require('../app');
const request = require('supertest');

const prismaMock = require('../mocks/prismaMock');

describe('GET /users', () => {

   it('returns a list of all users', async () => {
    const users = [
        {id: 123, username: 'fakeUsername', password: 'fakePassword', name: 'fakeName', location: 'fakeLocation'},
        {id: 1234, username: 'fakeUsername2', password: 'fakePassword2', name: 'fakeName2', location: 'fakeLocation2'}
    ];

    prismaMock.user.findMany.mockResolvedValue(users);

    const response = await request(app).get('/users');

    console.log(response.body);

    expect(response.body[0]).toEqual(users[0]);

   });
});
