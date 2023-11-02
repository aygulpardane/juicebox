const {mockDeep} = require('jest-mock-extended');
const app = require('../app');
const request = require('supertest');

const prismaMock = require('../mocks/prismaMock');

describe('GET /posts', () => {
   it('returns a list of all posts', async () => {
    const posts = [
        {id: 123, suthorId: 123, title: 'fakeTitle', content: 'fakeContent'}
    ];

    prismaMock.post.findMany.mockResolvedValue(posts);

    const response = await request(app).get('/posts');

    console.log(response.body);

    expect(response.body[0]).toEqual(posts[0]);

   });
});

// describe('GET /posts/:id', () => {
//     it('returns a single post', async () => {
//         const post = [
//             {id: 123, suthorId: 123, title: 'fakeTitle', content: 'fakeContent'}
//         ];

//         prismaMock.post.findUniqueOrThrow.mockResolvedValue(post);

//         const response = await request(app).get('/posts/:id');

//         console.log(response.body);

//         expect(response.body[0]).toEqual(post[0]);
//     });
// });

describe('Create /posts', () => {
    it('creates a post for an authenticated user', async () => {

    });
});

describe('Update /posts/:id', () => {
    it('updates a post for an authenticated user', async () => {

    });
});

describe('Delete /posts/:id', () => {
    it('deletes a post for an authenticated user', async () => {

    });
});
