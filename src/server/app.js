require('dotenv').config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const jwt = require("jsonwebtoken");

app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file serving middleware
app.use(express.static(path.join(__dirname, '../../dist')));

app.get("/hello", (req, res) => {
    res.send("Hello Vite + React!");
  });

// Check request for a token and attach decoded id to request
// .slice(7) strips unwanted prefix before token
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  try {
    // validate token with jwt.verify
    req.user = jwt.verify(token, process.env.JWT);

    // below we are catching a jsonwebtoken error and then setting req.user to null because we don't want anyone to register or login without a jsonwebtoken
  } catch (e) {
    if (e.name === "JsonWebTokenError") {
      req.user = null;
      // if it's not null, then send the other specific error
    } else {
      next(e);
    }
  }

  next();
});

// TODO: Build backend routes
// Require folders inside of /server
// separate posts, tags, users, utils folders
const usersRouter = require("./users/users");
app.use("/users", usersRouter);

const postsRouter = require("./posts/posts");
app.use("/posts", postsRouter);

// const tagsRouter = require("./tags");
// app.use("/tags", tagsRouter);

// serves the HTML file that Vite builds
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '../../dist/index.html'));
})

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Default to 404 if no other route matched
app.use((req, res) => {
res.status(404).send("Not found.");
});

module.exports = app;
