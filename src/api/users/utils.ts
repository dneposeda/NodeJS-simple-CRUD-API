import { IncomingMessage } from "http";

export const getReqData = (req: IncomingMessage) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    })
}

export const validateUserData = (data: string) => {
    const user = JSON.parse(data);

    return !!(user.hasOwnProperty('username') &&
        user.hasOwnProperty('age') &&
        user.hasOwnProperty('hobbies'));
}
