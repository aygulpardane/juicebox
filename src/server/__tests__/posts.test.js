const {mockDeep} = require('jest-mock-extended');
const app = require('../app');
const request = require('supertest');

const prismaMock = require('../mocks/prismaMock');

describe('GET /posts', () => {
   it('returns a list of all posts', async () => {
    const posts = [
        {id: 123, authorId: 123, title: 'fakeTitle', content: 'fakeContent'}
    ];

    prismaMock.post.findMany.mockResolvedValue(posts);

    const response = await request(app).get('/posts');

    expect(response.body[0]).toEqual(posts[0]);

   });
});

describe('GET /posts/:id', () => {
    it('returns a single post', async () => {
        const singlePost = [
            {id: 123, authorId: 123, title: 'fakeTitle', content: 'fakeContent'}
        ];

        prismaMock.post.findUniqueOrThrow.mockResolvedValue(singlePost);

        const response = await request(app).get('/posts/123');

        expect(response.body[0]).toEqual(singlePost[0]);
    });
});

// describe('Create /posts', () => {
//     it('creates a post for an authenticated user', async () => {

//     });
// });

// describe('Update /posts/:id', () => {
//     it('updates a post for an authenticated user', async () => {

//     });
// });

// describe('Delete /posts/:id', () => {
//     it('deletes a post for an authenticated user', async () => {

//     });
// });
