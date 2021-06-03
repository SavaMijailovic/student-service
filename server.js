const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 8168;
server.listen(port);

server.once('listening', function () {
    console.log('The server is started at http://localhost:' + port);
});
