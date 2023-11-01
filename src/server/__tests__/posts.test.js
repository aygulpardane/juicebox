const {mockDeep} = require('jest-mock-extended');
const app = require('../app');
const request = require('supertest');

const prismaMock = require('../mocks/prismaMock');

describe('GET /posts', () => {

   it('returns a list of all posts', async () => {
    const posts = [
        {id: 123, suthorId: 123, title: 'fakeTitle', content: 'fakeContent'},
    ];

    prismaMock.post.findMany.mockResolvedValue(posts);

    const response = await request(app).get('/posts');

    console.log(response.body);

    expect(response.body[0]).toEqual(posts[0]);

   });
});
