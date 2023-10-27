const app = require('./app');
const ViteExpress = require('vite-express');

ViteExpress.listen(app, 3000, () => {
    console.log("The server is up on port 3000");
})
