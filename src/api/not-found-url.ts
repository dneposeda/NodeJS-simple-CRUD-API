import { ServerResponse } from "http";

export const notFoundUrl = (res:  ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: 'Invalid URL'
    }));
}
