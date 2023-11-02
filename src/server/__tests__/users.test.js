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

describe('Authentication', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
    });

    describe('Get /users/:id', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
        it('returns the logged in user', async () => {
            const user = {
                id: 1234,
                username: 'testusername',
                password: 'testpassword',
                name: 'testname',
                location: 'testlocation'
            };

            jwt.verify.mockReturnValue({id: user.id});
            prismaMock.user.findUniqueOrThrow.mockResolvedValue(user);

            const response = await request(app).get('/users/1234').set('Authorization', 'Bearer faketesttoken');

            expect(response.body.username).toEqual(user.username);
            expect(response.body.password).toEqual(user.password);
            expect(response.body.name).toEqual(user.name);
            expect(response.body.location).toEqual(user.location);
        });
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

            prismaMock.user.create.mockResolvedValue(createdUser);

            const response = await request(app).post('/users/register').send(newUser);

            expect(response.body.user.username).toEqual(createdUser.username);

        });
    });

    // describe('Login /users/login', () => {
    //     beforeEach(async () => {
    //         await prismaMock.user.create.mockResolvedValue({
    //             id: 1234,
    //             username: 'testusername',
    //             password: 'testpassword',
    //             name: 'testname',
    //             location: 'testlocation'
    //         })
    //       });

    //     it('logs in a user with valid username and password', async () => {
    //         const response = await request(app).post('/users/login').send({
    //             username: 'testusername',
    //             password: 'testpassword'
    //           })

    //           console.log(response.body);

    //         expect(response.body.username).toBe('testusername');
    //     });
    // });

    describe('Delete /users/:id', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
        it('deletes the logged in user', async () => {
            const user = {
                id: 1234,
                username: 'testusername',
                password: 'testpassword',
                name: 'testname',
                location: 'testlocation'
            };

            jwt.verify.mockReturnValue({id: user.id});
            prismaMock.user.delete.mockResolvedValue(user);

            const response = await request(app).delete('/users/1234').set('Authorization', 'Bearer faketesttoken');

            expect(response.body.username).toEqual(user.username);
            expect(response.body.password).toEqual(user.password);
            expect(response.body.name).toEqual(user.name);
            expect(response.body.location).toEqual(user.location);
        });
    });
});

// mockResolvedValue (asynchronous so we wait for promise to resolve) vs mockReturnedValue (synchronous)
// we are mocking user, and post, so we're testing to see if the API is working, not if the databse is working
// if you break your code, your test should fail. if it's passing, something in your test is wrong
