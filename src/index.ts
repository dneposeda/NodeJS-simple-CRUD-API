import dotenv from "dotenv";
import { createServer } from "http";
import { notFoundUrl } from "./api/not-found-url";
import { methods } from "./api/users/controllers";

dotenv.config();

const port = process.env.PORT || 8080;

const userApi = '/api/users';

const server = createServer();

server.on('request', (req, res) => {
    const url = req.url || '';
    const method = req.method || '';

    if (!url.startsWith(userApi)) {
        return notFoundUrl(res)
    }

    try {
        methods[method](req, res);
    } catch (e) {
        notFoundUrl(res)
    }
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port,  () => console.log(`HTTP is listening on ${ port }`));