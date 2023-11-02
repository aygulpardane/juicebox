const {mockDeep, JestMockExtended} = require('jest-mock-extended');
const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const prismaMock = require('../mocks/prismaMock');

jest.mock('jsonwebtoken');

describe('GET /users', () => {
   it('returns a list of all users', async () => {
    const users = [
        {id: 123, username: 'fakeUsername', password: 'fakePassword', name: 'fakeName', location: 'fakeLocation'},
        {id: 1234, username: 'fakeUsername2', password: 'fakePassword2', name: 'fakeName2', location: 'fakeLocation2'}
    ];

    prismaMock.user.findMany.mockResolvedValue(users);

    const response = await request(app).get('/users');

    expect(response.body[0]).toEqual(users[0]);

   });
});

describe('Get /users/:id', () => {
    it('returns the logged in user', async () => {

    });
});

describe('Authentication', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
    });

    describe('Register /users/register', () => {
        it('creates a new user and a token', async () => {
            const newUser = {
                username: 'testUserName',
                password: 'testPassword',
                name: 'testName',
                location: 'testLocation'
            };

            const createdUser = {
                id: 1,
                username: 'testUserName',
                password: 'testPassword',
                name: 'testName',
                location: 'testLocation'
            };

            const token = 'asdfg';

            prismaMock.user.create.mockResolvedValue(createdUser);
            jwt.sign.mockReturnValue(token);

            const response = await request(app).post('/users/register').send(newUser);

            expect(response.body.user.username).toEqual(createdUser.username);

        });
    });

    describe('Login /users/login', () => {
        it('logs in a user with valid username and password', async () => {

        });
    });

    describe('Delete /users/:id', () => {
        it('deletes the logged in user', async () => {

        });
    });
});

// mockResolvedValue (asynchronous so we wait for promise to resolve) vs mockReturnedValue (synchronous)
// we are mocking user, and post, so we're testing to see if the API is working, not if the databse is working
// if you break your code, your test should fail. if it's passing, something in your test is wrong
