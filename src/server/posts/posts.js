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

module.exports = postsRouter;
