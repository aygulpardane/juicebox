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

    // mockResolvedValue (asynchronous so we wait for promise to resolve) vs mockReturnedValue (synchronous)
    prismaMock.user.findMany.mockResolvedValue(users);

    const response = await request(app).get('/users');

    console.log(response.body);

    expect(response.body[0]).toEqual(users[0]);

   });
});

describe('Register /users/register', () => {
    it('creates a new user with a username and password', async () => {

    });
});

describe('Login /users/login', () => {
    it('logs in a user with valid username and password', async () => {

    });
});

// we are mocking user, and post, so we're testing to see if the API is working, not if the databse is working
// if you break your code, your test should fail. if it's passing, something in your test is wrong
