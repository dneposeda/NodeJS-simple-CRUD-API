import { IncomingMessage, ServerResponse } from "http";
import { validate } from 'uuid';
import { usersData } from "../models/db";
import { getReqData, validateUserData } from "../utils";


const usersService = new usersData()

export const methods: any = {
    'GET': (req: IncomingMessage, res: ServerResponse) => {
        if (req.url === "/api/users" ) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: usersService.getUsers(),
            }));
        }

        if (req.url?.startsWith("/api/users/")) {
            const id = req.url.replace('/api/users/', '');

            if (!validate(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'User id is invalid'
                }));

                return
            }

            const user = usersService.getUser(id);

            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    data: user
                }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'User doesn\'t exist'
                }));
            }
        }
    },
    'POST': async (req: IncomingMessage, res: ServerResponse) => {
        if (req.url === "/api/users" ) {
            const userData = await getReqData(req) as string;

            if (!validateUserData(userData)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'Required fields is empty'
                }));

                return
            }

            const newUser = usersService.addUser(JSON.parse(userData));

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: newUser
            }));
        }
    },
    'PUT': async (req: IncomingMessage, res: ServerResponse) => {
        if (req.url?.startsWith("/api/users/")) {
            const id = req.url.replace('/api/users/', '');

            if (!validate(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'User id is invalid'
                }));

                return
            }

            const userData = await getReqData(req) as string;

            const user = usersService.updateUser(id, JSON.parse(userData));
            console.log(user)

            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    data: user
                }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'User doesn\'t exist'
                }));
            }
        }

    },
    'DELETE': (req: IncomingMessage, res: ServerResponse) => {
        if (req.url?.startsWith("/api/users/")) {
            const id = req.url.replace('/api/users/', '');

            if (!validate(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'User id is invalid'
                }));

                return
            }

            if (usersService.removeUser(id)) {
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end('Deleted');
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'User doesn\'t exist'
                }));
            }
        }
    }
};





