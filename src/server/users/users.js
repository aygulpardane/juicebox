const express = require("express");
const usersRouter = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const {JWT} = process.env;
const {requireUser} = require("../db/utils");

// Get all users
usersRouter.get("/", async (req, res, next) => {
    try {
        const allUsers = await db.user.findMany();
        res.send(allUsers);
    } catch (error) {
        next(error);
    }
});

// Get a single user
usersRouter.get("/:id", requireUser, async (req, res, next) => {
    try {
        const user = await db.user.findUniqueOrThrow({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(user);
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

        if (!req.body.password) {
            return res.status(401).send("Please provide a password")
        };

        // create a token with user id
        // jwt.sign takes payload, secret, and options as arguments
        // payload is used to find our which user is the owner (has to be unique)
        const token = jwt.sign({id: user.id}, process.env.JWT);

        // send token to client in the response body
        res.status(201).send({user, token});
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

    if (!user) {
        return res.status(401).send("Invalid login credentials.")
    };

    const token = jwt.sign({id: user.id}, process.env.JWT);

    res.send({token});
   } catch (error) {
    next(error);
   }
});

// TODO: Delete a user
usersRouter.delete("/:id", requireUser, async (req, res, next) => {
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
