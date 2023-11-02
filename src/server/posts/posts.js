const express = require("express");
const postsRouter = express.Router();
const db = require("../db");
const {requireUser} = require("../db/utils");

// GET all posts
postsRouter.get("/", async(req, res, next) => {
    try {
        const allPosts = await db.post.findMany();
        res.send(allPosts);
    } catch (error) {
        next(error);
    }
});

// GET single post
postsRouter.get("/:id", async(req, res, next) => {
    try {
        const post = await db.post.findUniqueOrThrow({
            where: {
                id: Number(req.params.id)
                // ADD authorId after creating post for logged in user
            }
        });
        res.send(post);
    } catch (error) {
        next(error);
    }
});

// Create a post
postsRouter.post("/", requireToken, async (req, res, next) => {
    try {
        const {title, content} = req.body;
        const post = await db.post.create({
            data: {
                title,
                content,
                // authorId: isValid(req.user.id) ? req.user.id : null
            }
        })
        res.status(201).send(post);
    } catch (error) {
        next(error);
    }
});

// Update a post
postsRouter.put("/:id", async (req, res, next) => {
    try {
        const {title, content} = req.body;
        const post = await db.post.update({
            data: {
                title,
                content,
                where: {
                    id: Number(req.params.id)
                    // ADD authorId
                }
            }
        });
        res.status(201).send(post);
    } catch (error) {
        next(error);
    }
});

// Delete a post
postsRouter.delete("/:id", async (req, res, next) => {
    try {
        const post = await db.post.delete({
            where: {
                id: Number(req.params.id)
                // ADD authorId
            }
        });
        res.send(post);
    } catch (error) {
        next(error);
    }
});

module.exports = postsRouter;
