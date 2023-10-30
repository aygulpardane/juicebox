const express = require("express");
const postsRouter = express.Router();
const db = require("../db");

postsRouter.get("/", async(req, res, next) => {
    try {
        const allPosts = await db.post.findMany();
        res.send(allPosts);
    } catch (error) {
        next(error);
    }
});

// Get a single post
// Create a post
// Update a post
// Delete a post

module.exports = postsRouter;
