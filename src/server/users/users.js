const express = require("express");
const usersRouter = express.Router();
const db = require("../db");

// Deny access if user is not logged in
// usersRouter.use((req, res, next) => {
//     if (!req.user) {
//       return res.status(401).send("You must be logged in to do that.");
//     }
//     next();
//   });

// Get all users
usersRouter.get("/", async (req, res, next) => {
    console.log(req.body);
    try {
        const allUsers = await db.user.findMany({
            where: {
                userid: req.data.user.id
            }
        });
        res.send(allUsers);
    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;
