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
                id: Number(req.params.id),
                authorId: req.user.id
            }
        });
        res.send(post);
    } catch (error) {
        next(error);
    }
});

// Create a post
postsRouter.post("/", requireUser, async (req, res, next) => {
    try {
        const {title, content} = req.body;
        const post = await db.post.create({
            data: {
                title,
                content,
                authorId: req.user.id
            }
        })
        res.status(201).send(post);
    } catch (error) {
        next(error);
    }
});

// Update a post
postsRouter.patch("/:id", requireUser, async (req, res, next) => {
    try {
        const {title, content} = req.body;
        const post = await db.post.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title,
                content
            }
        });
        res.status(201).send(post);
    } catch (error) {
        next(error);
    }
});

// Delete a post
postsRouter.delete("/:id", requireUser, async (req, res, next) => {
    try {
        const post = await db.post.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(post);
    } catch (error) {
        next(error);
    }
});

module.exports = postsRouter;
