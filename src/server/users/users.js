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
    try {
        const allUsers = await db.user.findMany();
        res.send(allUsers);
    } catch (error) {
        next(error);
    }
});

// Register a new user
usersRouter.post("/register", async (req, res, next) => {
    try {
        const user = await db.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                location: req.body.location
            }
        });
        res.status(201).send(user);
    } catch (error) {
        next(error);
    }
});


// Login to an existing user account
usersRouter.post("/login", async (req, res, next) => {
   try {
    const {username, password} = req.body;
    const user = await db.user.findUniqueOrThrow({
        where: {
            username,
            password
        }
    });
    res.send("success");
   } catch (error) {
    next(error);
   }
});

module.exports = usersRouter;
