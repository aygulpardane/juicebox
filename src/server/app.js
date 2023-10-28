const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file serving middleware
app.use(express.static(path.join(__dirname, '../../dist')));

app.get("/hello", (req, res) => {
    res.send("Hello Vite + React!");
  });

// TODO: Build backend routes
// Require folders inside of /server
// separate posts, tags, users, utils folders
// app.use("/users", require("./users"));
// app.use("/posts", require("./posts"));
// app.use("/tags", require("./tags"));


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
