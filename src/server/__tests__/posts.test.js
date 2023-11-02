const {mockDeep} = require('jest-mock-extended');
const app = require('../app');
const request = require('supertest');
jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

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

describe('Create /posts', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('creates a post for an authenticated user', async () => {
        const user = {
            id: 123,
        }

        const newPost = {
            id: 1,
            title: "Hat",
            content: "Selling one fancy hat",
            authorId: user.id
        };

        jwt.verify.mockReturnValue({id: user.id})
        prismaMock.post.create.mockResolvedValue(newPost);

        const response = await request(app)
            .post('/posts')
            .set('Authorization', 'Bearer faketesttoken');

        console.log(response.body);

        expect(response.body.id).toEqual(newPost.id);
        expect(response.body.title).toEqual(newPost.title);
        expect(response.body.description).toEqual(newPost.description);
        expect(response.body.price).toEqual(newPost.price);
        expect(response.body.authorId).toEqual(user.id);

        expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
    });
});

describe('Update /posts/:id', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('updates a post for an authenticated user', async () => {
        const user = {
            id: 123,
        }

        const postToUpdate = {
            id: 1,
            title: "Hat",
            content: "Selling one fancy hat",
            authorId: user.id
        };

        const updatedPost =  {
            id: 1,
            title: "Pants",
            content: "Selling fancy pants",
            authorId: user.id
        };

        jwt.verify.mockReturnValue({id: user.id});
        prismaMock.post.findUnique.mockResolvedValue(postToUpdate);
        prismaMock.post.update.mockResolvedValue(updatedPost);

        const response = await request(app)
            .patch('/posts/1')
            .set('Authorization', 'Bearer faketesttoken')
            .send(updatedPost);

        expect(response.body.id).toEqual(updatedPost.id);
        expect(response.body.title).toEqual(updatedPost.title);
        expect(response.body.description).toEqual(updatedPost.description);
        expect(response.body.price).toEqual(updatedPost.price);

        expect(prismaMock.post.update).toHaveBeenCalledTimes(1);
    });
});

describe('Delete /posts/:id', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('deletes a post for an authenticated user', async () => {
        const user = {
            id: 123,
        }

        const postToDelete = {
            id: 1,
            title: "Hat",
            content: "Selling one fancy hat",
            authirId: user.id
        };

        jwt.verify.mockReturnValue({id: user.id});
        prismaMock.post.findUnique.mockResolvedValue(postToDelete);
        prismaMock.post.delete.mockResolvedValue(postToDelete);

        const response = await request(app)
            .delete('/posts/1')
            .set('Authorization', 'Bearer faketesttoken');

        expect(response.body.id).toEqual(postToDelete.id);
        expect(response.body.title).toEqual(postToDelete.title);
        expect(response.body.description).toEqual(postToDelete.description);
        expect(response.body.price).toEqual(postToDelete.price);

        expect(prismaMock.post.delete).toHaveBeenCalledTimes(1);
    });
});
