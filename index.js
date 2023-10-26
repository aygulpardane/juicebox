// create an Express.js server
const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

// set the server to listen at PORT 3000
const { PORT = 3000 } = process.env;
server.listen(PORT, () => {
    console.log("The server is up on port", PORT);
})
