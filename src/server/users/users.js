const express = require("express");
const usersRouter = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const {JWT} = process.env;


// Deny access if user is not logged in
// usersRouter.use((req, res, next) => {
//     if (!req.body) {
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

// TODO: Get a single user

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

        // create a token with user id
        // jwt.sign takes payload, secret, and options as arguments
        // payload is used to find our which user is the owner (has to be unique)
        const token = jwt.sign({id: user.id}, JWT);

        // send token to client in the response body
        res.status(201).send({token});
    } catch (error) {
        next(error);
    }
});


// Login to an existing user account
usersRouter.post("/login", async (req, res, next) => {
    console.log(req.body);
   try {
    const {username, password} = req.body;
    const user = await db.user.findUniqueOrThrow({
        where: {
            username,
            password
        }
    });

    if (!user) {
        return res.status(401).send("Invalid login credentials.")
    };

    const token = jwt.sign({id: user.id}, JWT);

    res.send({user, token});
   } catch (error) {
    next(error);
   }
});

// TODO: Delete a user
usersRouter.delete("/:id", async (req, res, next) => {
    try {
        const user = await db.user.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(user);
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;
